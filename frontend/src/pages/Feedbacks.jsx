import { useEffect, useMemo, useState } from "react";
import "./Feedbacks.css";

import logo from "../assets/logo.png";

// ======================================================
// SIDEBAR
// ======================================================

import homeIcon from "../assets/sidebar/home.png";
import perfilIcon from "../assets/sidebar/perfil.png";
import historicoIcon from "../assets/sidebar/historico.png";
import configuracoesIcon from "../assets/sidebar/configuracoes.png";

// ======================================================
// JOGOS DA NAVBAR
// ======================================================

import owLogo from "../assets/icon/ow icon.png";
import cs2Logo from "../assets/icon/cs icon.png";
import valorantLogo from "../assets/icon/val icon.png";
import fortniteLogo from "../assets/icon/fortinite icon.png";
import rocketLogo from "../assets/icon/rocket icon.png";
import dotaLogo from "../assets/icon/dota icon.png";
import rivalsLogo from "../assets/icon/marvel icon.png";
import lolLogo from "../assets/icon/lol icon.png";

// ======================================================
// BACKGROUND
// ======================================================

import roomsBackground from "../assets/rooms-bg.png";

import { apiFetch, getUsuario } from "../api";
import { obterJogoPorNome } from "../data/jogos";

// ======================================================
// FORMATAR DATA
// ======================================================

function formatarData(iso) {
  const data = new Date(iso);

  const agora = new Date();

  const inicioHoje = new Date(agora);

  inicioHoje.setHours(0, 0, 0, 0);

  const inicioOntem = new Date(inicioHoje);

  inicioOntem.setDate(inicioOntem.getDate() - 1);

  const hora =
    `${String(data.getHours()).padStart(2, "0")}:` +
    `${String(data.getMinutes()).padStart(2, "0")}`;

  if (data >= inicioHoje) {
    return `Hoje, ${hora}`;
  }

  if (data >= inicioOntem) {
    return `Ontem, ${hora}`;
  }

  const dataTexto =
    `${String(data.getDate()).padStart(2, "0")}/` +
    `${String(data.getMonth() + 1).padStart(2, "0")}/` +
    `${data.getFullYear()}`;

  return `${dataTexto}, ${hora}`;
}

// ======================================================
// NOME CURTO DO USUÁRIO (@)
// ======================================================

function usuarioDe(email) {
  if (!email) {
    return "";
  }

  const parte = email.split("@")[0] || email;

  return `@${parte}`;
}

// ======================================================
// AVATAR
// ======================================================

function Avatar({ nome, foto }) {
  if (foto) {
    return (
      <div className="feedback-avatar">
        <img
          src={foto}
          alt={nome}
        />
      </div>
    );
  }

  return (
    <div className="feedback-avatar">
      {String(nome || "?").charAt(0).toUpperCase()}
    </div>
  );
}

// ======================================================
// ESTRELAS
// ======================================================

function Stars({ nota }) {
  return (
    <div
      className="feedback-stars"
      aria-label={`${nota} de 5 estrelas`}
    >
      {[1, 2, 3, 4, 5].map((estrela) => (
        <span
          key={estrela}
          className={
            estrela <= nota
              ? "star active"
              : "star"
          }
        >
          ★
        </span>
      ))}
    </div>
  );
}

// ======================================================
// COMPONENTE
// ======================================================

export default function Feedbacks({
  onHome,
  onProfile,
  onHistory,
  onFeedbacks,
  onSettings,
  onSelectGame,
  onBuscar
}) {

  // ======================================================
  // ESTADOS
  // ======================================================

  const [aba, setAba] = useState("recebidos");

  const [recebidos, setRecebidos] = useState([]);

  const [dados, setDados] = useState([]);

  const [media, setMedia] = useState(0);

  const [carregando, setCarregando] = useState(true);

  const [erro, setErro] = useState("");

  const [salas, setSalas] = useState([]);

  const [modalAberto, setModalAberto] = useState(false);

  const [salaId, setSalaId] = useState("");

  const [jogadorId, setJogadorId] = useState("");

  const [notaForm, setNotaForm] = useState(0);

  const [comentario, setComentario] = useState("");

  const [enviando, setEnviando] = useState(false);

  const [erroModal, setErroModal] = useState("");

  const [editandoId, setEditandoId] = useState(null);

  const [excluindoId, setExcluindoId] = useState(null);

  const usuario = getUsuario();

  const meuId = usuario?.id || "";

  const selecionarJogo = (game) => {
    if (typeof onSelectGame === "function") {
      onSelectGame(game);
    }
  };

  // ======================================================
  // CARREGAR DADOS
  // ======================================================

  const carregarFeedbacks = async () => {
    try {
      const dadosResposta = await apiFetch("/feedbacks");

      setRecebidos(dadosResposta.recebidos || []);

      setDados(dadosResposta.dados || []);

      setMedia(dadosResposta.mediaRecebida || 0);

    } catch (e) {
      setErro(e.message || "Não foi possível carregar os feedbacks.");
    }
  };

  useEffect(() => {
    let ativo = true;

    const carregar = async () => {
      try {
        setCarregando(true);
        setErro("");

        const [dadosResposta, minhasSalas] = await Promise.all([
          apiFetch("/feedbacks"),
          apiFetch("/rooms/minhas")
        ]);

        if (ativo) {
          setRecebidos(dadosResposta.recebidos || []);
          setDados(dadosResposta.dados || []);
          setMedia(dadosResposta.mediaRecebida || 0);
          setSalas(minhasSalas || []);
        }

      } catch (e) {
        if (ativo) {
          setErro(e.message || "Não foi possível carregar os feedbacks.");
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
  }, []);

  // ======================================================
  // OPÇÕES DE JOGADORES PARA AVALIAR
  // ======================================================

  const opcoesAvaliacao = useMemo(
    () => salas
      .map((sala) => ({
        salaId: sala._id,
        salaNome: sala.nome,
        jogo: sala.jogo,
        jogadores: (sala.jogadores || []).filter((jogador) =>
          String(jogador._id || jogador) !== String(meuId)
        )
      }))
      .filter((opcao) => opcao.jogadores.length > 0),
    [salas, meuId]
  );

  const salaEscolhida = opcoesAvaliacao.find(
    (opcao) => opcao.salaId === salaId
  );

  // ======================================================
  // ENVIAR FEEDBACK
  // ======================================================

  const abrirModal = () => {
    setModalAberto(true);

    setEditandoId(null);

    setSalaId("");

    setJogadorId("");

    setNotaForm(0);

    setComentario("");

    setErroModal("");
  };

  const fecharModal = () => {
    setModalAberto(false);

    setEditandoId(null);

    setSalaId("");

    setJogadorId("");

    setNotaForm(0);

    setComentario("");

    setErroModal("");
  };

  const abrirEdicao = (feedback) => {
    setModalAberto(true);

    setEditandoId(feedback._id);

    setSalaId("");

    setJogadorId("");

    setNotaForm(feedback.nota);

    setComentario(feedback.comentario || "");

    setErroModal("");
  };

  const salvarFeedback = async () => {
    setEnviando(true);

    setErroModal("");

    try {
      if (editandoId) {
        await apiFetch(`/feedbacks/${editandoId}`, {
          method: "PUT",
          body: JSON.stringify({
            nota: notaForm,
            comentario
          })
        });

      } else {
        await apiFetch("/feedbacks", {
          method: "POST",
          body: JSON.stringify({
            destinatario: jogadorId,
            jogo: salaEscolhida?.jogo || "",
            nota: notaForm,
            comentario
          })
        });
      }

      setEnviando(false);

      await carregarFeedbacks();

      fecharModal();

    } catch (e) {
      setEnviando(false);

      setErroModal(e.message || "Não foi possível enviar o feedback.");
    }
  };

  const excluirFeedback = async (feedback) => {
    if (!window.confirm("Excluir esse feedback?")) {
      return;
    }

    setExcluindoId(feedback._id);

    try {
      await apiFetch(`/feedbacks/${feedback._id}`, {
        method: "DELETE"
      });

      await carregarFeedbacks();

    } catch (e) {
      setErro(e.message || "Não foi possível excluir o feedback.");

    } finally {
      setExcluindoId(null);
    }
  };

  // ======================================================
  // LISTA ATUAL
  // ======================================================

  const lista =
    aba === "recebidos"
      ? recebidos
      : dados;

  const pessoaDo = (feedback) =>
    aba === "recebidos"
      ? feedback.remetente
      : feedback.destinatario;

  return (
    <div
      className="feedbacks-page"
      style={{
        backgroundImage: `url(${roomsBackground})`,
      }}
    >

      {/* ==================================================
          OVERLAY
      ================================================== */}

      <div className="feedbacks-overlay"></div>


      {/* ==================================================
          NAVBAR
      ================================================== */}

      <header className="feedbacks-navbar">

        {/* LOGO */}

        <div className="feedbacks-navbar-logo">

          <img
            src={logo}
            alt="Logo"
          />

        </div>


        {/* JOGOS */}

        <div className="feedbacks-games-navbar">

          {/* OVERWATCH */}

          <div
            className="feedbacks-navbar-game"
            onClick={() => selecionarJogo("Overwatch")}
          >

            <img
              src={owLogo}
              alt="Overwatch"
            />

            <span>
              OVERWATCH
            </span>

          </div>


          {/* CS2 */}

          <div
            className="feedbacks-navbar-game"
            onClick={() => selecionarJogo("Counter-Strike 2")}
          >

            <img
              src={cs2Logo}
              alt="CS2"
            />

            <span>
              CS2
            </span>

          </div>


          {/* VALORANT */}

          <div
            className="feedbacks-navbar-game"
            onClick={() => selecionarJogo("Valorant")}
          >

            <img
              src={valorantLogo}
              alt="Valorant"
            />

            <span>
              VALORANT
            </span>

          </div>


          {/* FORTNITE */}

          <div
            className="feedbacks-navbar-game"
            onClick={() => selecionarJogo("Fortnite")}
          >

            <img
              src={fortniteLogo}
              alt="Fortnite"
            />

            <span>
              FORTNITE
            </span>

          </div>


          {/* ROCKET LEAGUE */}

          <div
            className="feedbacks-navbar-game"
            onClick={() => selecionarJogo("Rocket League")}
          >

            <img
              src={rocketLogo}
              alt="Rocket League"
            />

            <span>
              ROCKET LEAGUE
            </span>

          </div>


          {/* DOTA 2 */}

          <div
            className="feedbacks-navbar-game"
            onClick={() => selecionarJogo("Dota 2")}
          >

            <img
              src={dotaLogo}
              alt="Dota 2"
            />

            <span>
              DOTA 2
            </span>

          </div>


          {/* MARVEL RIVALS */}

          <div
            className="feedbacks-navbar-game"
            onClick={() => selecionarJogo("Marvel Rivals")}
          >

            <img
              src={rivalsLogo}
              alt="Marvel Rivals"
            />

            <span>
              MARVEL RIVALS
            </span>

          </div>


          {/* LEAGUE OF LEGENDS */}

          <div
            className="feedbacks-navbar-game"
            onClick={() => selecionarJogo("League of Legends")}
          >

            <img
              src={lolLogo}
              alt="League of Legends"
            />

            <span>
              LEAGUE OF LEGENDS
            </span>

          </div>

        </div>

      </header>


      {/* ==================================================
          SIDEBAR
      ================================================== */}

      <aside className="feedbacks-sidebar">

        <div className="feedbacks-sidebar-menu">

          {/* HOME */}

          <button
            className="feedbacks-sidebar-item"
            onClick={onHome}
            title="Home"
            type="button"
          >

            <img
              src={homeIcon}
              alt="Home"
            />

          </button>


          {/* BUSCAR */}

          <button
            className="feedbacks-sidebar-item"
            onClick={onBuscar}
            title="Buscar"
            type="button"
          >

            <span className="feedbacks-buscar-icone">
              ⌕
            </span>

          </button>


          {/* PERFIL */}

          <button
            className="feedbacks-sidebar-item"
            onClick={onProfile}
            title="Perfil"
            type="button"
          >

            <img
              src={perfilIcon}
              alt="Perfil"
            />

          </button>


          {/* HISTÓRICO */}

          <button
            className="feedbacks-sidebar-item"
            onClick={onHistory}
            title="Histórico"
            type="button"
          >

            <img
              src={historicoIcon}
              alt="Histórico"
            />

          </button>


          {/* FEEDBACKS */}

          <button
            className="feedbacks-sidebar-item feedbacks-sidebar-active"
            onClick={onFeedbacks}
            title="Feedbacks"
            type="button"
          >

            <span className="feedbacks-feedback-star">
              ★
            </span>

          </button>


          {/* CONFIGURAÇÕES */}

          <button
            className="feedbacks-sidebar-item"
            onClick={onSettings}
            title="Configurações"
            type="button"
          >

            <img
              src={configuracoesIcon}
              alt="Configurações"
            />

          </button>

        </div>

      </aside>


      {/* ==================================================
          CONTEÚDO
      ================================================== */}

      <main className="feedbacks-main">

        {/* ==================================================
            CABEÇALHO
        ================================================== */}

        <header className="feedbacks-header">

          <div className="feedbacks-header-text">

            <span className="feedbacks-kicker">
              REPUTAÇÃO
            </span>

            <h1>
              Feedbacks
            </h1>

            <p>
              Veja as avaliações recebidas e os feedbacks
              que você enviou.
            </p>

          </div>


          <div className="feedbacks-average">

            <strong>
              {media || "0.0"}
            </strong>

            <Stars nota={Math.round(media)} />

            <span>
              Média geral
            </span>

          </div>

        </header>


        {/* ==================================================
            RESUMO
        ================================================== */}

        <section className="feedbacks-summary">

          {/* NOTA */}

          <div className="feedback-summary-card">

            <div className="summary-icon">
              ★
            </div>

            <div>

              <strong>
                {media || "0.0"}
              </strong>

              <span>
                Nota média
              </span>

            </div>

          </div>


          {/* RECEBIDOS */}

          <div className="feedback-summary-card">

            <div className="summary-icon">
              ↙
            </div>

            <div>

              <strong>
                {recebidos.length}
              </strong>

              <span>
                Recebidos
              </span>

            </div>

          </div>


          {/* ENVIADOS */}

          <div className="feedback-summary-card">

            <div className="summary-icon">
              ↗
            </div>

            <div>

              <strong>
                {dados.length}
              </strong>

              <span>
                Enviados
              </span>

            </div>

          </div>

        </section>


        {/* ==================================================
            ABAS
        ================================================== */}

        <div className="feedbacks-tabs">

          <button
            type="button"
            className={
              aba === "recebidos"
                ? "active"
                : ""
            }
            onClick={() =>
              setAba("recebidos")
            }
          >
            Feedbacks recebidos
          </button>


          <button
            type="button"
            className={
              aba === "dados"
                ? "active"
                : ""
            }
            onClick={() =>
              setAba("dados")
            }
          >
            Feedbacks dados
          </button>

          <span className="fb-spacer"></span>

          <button
            type="button"
            className="fb-enviar"
            onClick={abrirModal}
          >
            + Enviar feedback
          </button>

        </div>


        {/* ==================================================
            ERRO / CARREGANDO
        ================================================== */}

        {erro && !modalAberto && (

          <div className="fb-estado">

            <p>⚠ {erro}</p>

          </div>

        )}

        {carregando && !erro && !modalAberto && (

          <div className="fb-estado">

            <p>⌛ Carregando feedbacks...</p>

          </div>

        )}


        {/* ==================================================
            LISTA DE FEEDBACKS
        ================================================== */}

        {!carregando && !erro && lista.length === 0 && !modalAberto && (

          <div className="fb-estado">

            <p>
              {aba === "recebidos"
                ? "Você ainda não recebeu feedbacks."
                : "Você ainda não enviou feedbacks."}
            </p>

          </div>

        )}

        <section className="feedbacks-list">

          {lista.map((feedback) => {

            const pessoa = pessoaDo(feedback);

            const jogo = obterJogoPorNome(feedback.jogo) || {};

            return (

              <article
                className="feedback-card"
                key={feedback._id}
              >

                {/* AVATAR */}

                <Avatar
                  nome={pessoa?.nome || "?"}
                  foto={pessoa?.foto || ""}
                />

                <div className="feedback-card-main">

                  {/* TOPO */}

                  <div className="feedback-card-top">

                    <div>

                      <h2>
                        {pessoa?.nome || "Jogador"}
                      </h2>

                      <span>
                        {usuarioDe(pessoa?.email)}
                      </span>

                    </div>

                    <div className="feedback-date">
                      {formatarData(feedback.createdAt)}
                    </div>

                  </div>


                  {/* META */}

                  <div className="feedback-meta">

                    <span className="feedback-game">

                      <img
                        src={jogo.capa || roomsBackground}
                        alt={feedback.jogo}
                      />

                      {feedback.jogo}

                    </span>


                    <Stars
                      nota={feedback.nota}
                    />

                  </div>


                  {/* COMENTÁRIO */}

                  {feedback.comentario && (

                    <p>
                      {feedback.comentario}
                    </p>

                  )}

                </div>


                {/* AÇÕES (só nos feedbacks enviados) */}

                {aba === "dados" && (

                  <div className="feedback-card-acoes">

                    <button
                      type="button"
                      className="fb-editar"
                      onClick={() => abrirEdicao(feedback)}
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      className="fb-excluir"
                      onClick={() => excluirFeedback(feedback)}
                      disabled={excluindoId === feedback._id}
                    >
                      {excluindoId === feedback._id
                        ? "Excluindo..."
                        : "Excluir"}
                    </button>

                  </div>

                )}

              </article>

            );

          })}

        </section>

      </main>


      {/* ==================================================
          MODAL: ENVIAR FEEDBACK
      ================================================== */}

      {modalAberto && (

        <div
          className="fb-modal-overlay"
          onClick={fecharModal}
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
                    {editandoId
                      ? "Editar feedback"
                      : "Enviar feedback"}
                  </h2>

                </div>

              <button
                type="button"
                className="fb-modal-fechar"
                onClick={fecharModal}
                title="Fechar"
              >
                ✕
              </button>

            </div>


            <div className="fb-modal-body">

              {/* ESCOLHER SALA (só ao enviar novo) */}

              {!editandoId && (
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

              {/* ESCOLHER JOGADOR (só ao enviar novo) */}

              {!editandoId && salaEscolhida && (

                <div className="fb-campo">

                  <span>Quem você vai avaliar</span>

                  <div className="fb-jogadores">

                    {salaEscolhida.jogadores.map((jogador) => {

                      const selecionado =
                        String(jogador._id || jogador) === jogadorId;

                      return (

                        <button
                          type="button"
                          key={jogador._id || jogador}
                          className={
                            selecionado
                              ? "fb-jogador active"
                              : "fb-jogador"
                          }
                          onClick={() =>
                            setJogadorId(String(jogador._id || jogador))
                          }
                        >

                          {jogador.nome || "Jogador"}

                        </button>

                      );

                    })}

                  </div>

                </div>

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
                        estrela <= notaForm
                          ? "fb-estrela active"
                          : "fb-estrela"
                      }
                      onClick={() =>
                        setNotaForm(estrela)
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


              {erroModal && (

                <p className="fb-erro-modal">
                  {erroModal}
                </p>

              )}

            </div>


            <div className="fb-modal-rodape">

              <button
                type="button"
                className="fb-cancelar"
                onClick={fecharModal}
                disabled={enviando}
              >
                Cancelar
              </button>

              <button
                type="button"
                className="fb-confirmar"
                onClick={salvarFeedback}
                disabled={
                  enviando ||
                  notaForm === 0 ||
                  (!editandoId && !jogadorId)
                }
              >
                {enviando
                  ? "Salvando..."
                  : editandoId
                    ? "Salvar"
                    : "Enviar feedback"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}