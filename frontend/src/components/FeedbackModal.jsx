import { useEffect, useMemo, useState } from "react";

import { apiFetch, getUsuario } from "../api";

// ======================================================
// MODAL DE ENVIO DE FEEDBACK
//
// Dois modos:
// - Modo "salas": sem destinatarioId. O usuário escolhe
//   uma sala do histórico e depois um jogador da sala.
// - Modo "direto": com destinatarioId/destinatarioNome.
//   Já vem com o jogador definido (ex.: perfil público).
// ======================================================

export default function FeedbackModal({
  aberto,
  destinatarioId,
  destinatarioNome,
  destinatarioFoto,
  onFechar,
  onEnviado
}) {

  const modoDireto = Boolean(destinatarioId);

  const [salas, setSalas] = useState([]);

  const [salaId, setSalaId] = useState("");

  const [jogadorId, setJogadorId] = useState("");

  const [nota, setNota] = useState(0);

  const [comentario, setComentario] = useState("");

  const [enviando, setEnviando] = useState(false);

  const [erro, setErro] = useState("");

  const [carregando, setCarregando] = useState(false);

  // =====================================================
  // CARREGAR SALAS (só no modo salas)
  // =====================================================

  useEffect(() => {
    if (!aberto || modoDireto) {
      return undefined;
    }

    let ativo = true;

    const carregar = async () => {
      setCarregando(true);

      try {
        const minhasSalas = await apiFetch("/rooms/minhas");

        if (ativo) {
          setSalas(minhasSalas || []);
        }
      } catch (e) {
        if (ativo) {
          setErro(e.message || "Não foi possível carregar suas salas.");
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    };

    carregar();

    return () => {
      ativo = false;
    };
  }, [aberto, modoDireto]);

  // =====================================================
  // OPÇÕES DE JOGADORES (modo salas)
  // =====================================================

  const usuario = getUsuario();

  const meuId = usuario?.id || "";

  const opcoesAvaliacao = useMemo(
    () => salas
      .map((sala) => ({
        salaId: sala._id,
        salaNome: sala.nome,
        jogo: sala.jogo,
        jogadores: (sala.jogadores || []).filter((jogador) =>
          jogador &&
          String(jogador._id || jogador) !== String(meuId)
        )
      }))
      .filter((opcao) => opcao.jogadores.length > 0),
    [salas, meuId]
  );

  const salaEscolhida = opcoesAvaliacao.find(
    (opcao) => opcao.salaId === salaId
  );

  // =====================================================
  // ENVIAR
  // =====================================================

  const enviar = async () => {
    setEnviando(true);

    setErro("");

    const alvo = modoDireto
      ? destinatarioId
      : jogadorId;

    try {
      await apiFetch("/feedbacks", {
        method: "POST",
        body: JSON.stringify({
          destinatario: alvo,
          jogo: modoDireto ? "" : (salaEscolhida?.jogo || ""),
          nota,
          comentario
        })
      });

      setEnviando(false);

      if (typeof onEnviado === "function") {
        onEnviado();
      }

      fechar();

    } catch (e) {
      setEnviando(false);

      setErro(e.message || "Não foi possível enviar o feedback.");
    }
  };

  // =====================================================
  // FECHAR / LIMPAR
  // =====================================================

  const fechar = () => {
    setSalas([]);

    setSalaId("");

    setJogadorId("");

    setNota(0);

    setComentario("");

    setErro("");

    setCarregando(false);

    onFechar();
  };

  if (!aberto) {
    return null;
  }

  return (
    <div
      className="fb-modal-overlay"
      onClick={fechar}
    >

      <div
        className="fb-modal"
        onClick={(evento) =>
          evento.stopPropagation()
        }
      >

        <div className="fb-modal-header">

          <div>

            <span className="fb-modal-kicker">
              REPUTAÇÃO
            </span>

            <h2>
              Enviar feedback
            </h2>

          </div>

          <button
            type="button"
            className="fb-modal-fechar"
            onClick={fechar}
            title="Fechar"
          >
            ✕
          </button>

        </div>


        <div className="fb-modal-body">

          {/* MODO DIRETO: JOGADOR FIXO */}

          {modoDireto && (

            <div className="fb-alvo">

              {destinatarioFoto && (

                <img
                  src={destinatarioFoto}
                  alt={destinatarioNome}
                />

              )}

              <div>

                <span>Avaliando</span>

                <strong>
                  {destinatarioNome || "Jogador"}
                </strong>

              </div>

            </div>

          )}


          {/* MODO SALAS: ESCOLHER SALA */}

          {!modoDireto && !carregando && opcoesAvaliacao.length > 0 && (

            <label className="fb-campo">

              <span>Sala em que jogou</span>

              <select
                value={salaId}
                onChange={(evento) => {
                  setSalaId(evento.target.value);
                  setJogadorId("");
                }}
              >
                <option value="">
                  Selecione uma sala
                </option>

                {opcoesAvaliacao.map((opcao) => (

                  <option
                    key={opcao.salaId}
                    value={opcao.salaId}
                  >
                    {opcao.jogo} — {opcao.salaNome}
                  </option>

                ))}

              </select>

            </label>

          )}


          {/* MODO SALAS: ESCOLHER JOGADOR */}

          {!modoDireto && salaEscolhida && (

            <div className="fb-campo">

              <span>Quem você vai avaliar</span>

              <div className="fb-jogadores">

                {salaEscolhida.jogadores.map((jogador) => {

                  const idJogador = String(jogador._id || jogador);

                  const selecionado = idJogador === jogadorId;

                  return (

                    <button
                      type="button"
                      key={idJogador}
                      className={
                        selecionado
                          ? "fb-jogador active"
                          : "fb-jogador"
                      }
                      onClick={() =>
                        setJogadorId(idJogador)
                      }
                    >

                      {jogador.nome || "Jogador"}

                    </button>

                  );

                })}

              </div>

            </div>

          )}


          {/* MODO SALAS SEM SALAS DISPONÍVEIS */}

          {!modoDireto && !carregando && opcoesAvaliacao.length === 0 && (

            <p className="fb-sem-opcoes">
              Você ainda não jogou em uma sala com outros jogadores.
              Entre em uma sala e depois volte aqui para avaliar.
            </p>

          )}


          {/* NOTA */}

          <div className="fb-campo">

            <span>Nota</span>

            <div className="fb-notas">

              {[1, 2, 3, 4, 5].map((estrela) => (

                <button
                  type="button"
                  key={estrela}
                  className={
                    estrela <= nota
                      ? "fb-estrela active"
                      : "fb-estrela"
                  }
                  onClick={() =>
                    setNota(estrela)
                  }
                  aria-label={`${estrela} estrelas`}
                >
                  ★
                </button>

              ))}

            </div>

          </div>


          {/* COMENTÁRIO */}

          <label className="fb-campo">

            <span>Comentário</span>

            <textarea
              value={comentario}
              placeholder="Conte como foi jogar junto..."
              maxLength={300}
              onChange={(evento) =>
                setComentario(evento.target.value)
              }
            />

          </label>


          {erro && (

            <p className="fb-erro-modal">
              {erro}
            </p>

          )}

        </div>


        <div className="fb-modal-rodape">

          <button
            type="button"
            className="fb-cancelar"
            onClick={fechar}
            disabled={enviando}
          >
            Cancelar
          </button>

          <button
            type="button"
            className="fb-confirmar"
            onClick={enviar}
            disabled={
              enviando ||
              carregando ||
              (!modoDireto && !jogadorId) ||
              nota === 0
            }
          >
            {enviando
              ? "Enviando..."
              : "Enviar feedback"}
          </button>

        </div>

      </div>

    </div>
  );
}