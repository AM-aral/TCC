import { useRef, useState } from "react";

import {
  JOGOS,
  BANNERS,
  obterJogo,
  elosDoJogo,
  funcoesDoJogo
} from "../data/jogos";

// =====================================================
// SUGESTÕES
// =====================================================

const TAG_SUGESTOES = [
  "Casual",
  "Competitivo",
  "Tryhard",
  "Diversão",
  "Ranked",
  "Amistoso"
];

const PREFERENCIA_SUGESTOES = [
  "🎙️ Comunicação por voz",
  "🏆 Competitivo",
  "🌎 Servidor Brasil",
  "🎮 Casual",
  "🔥 Tryhard",
  "🤝 Jogar em grupo"
];

// =====================================================
// REDIMENSIONAR IMAGEM
// =====================================================

function arquivoParaDataUrl(arquivo, larguraMax) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();

    leitor.onload = () => {
      const imagem = new Image();

      imagem.onload = () => {
        const escala = Math.min(
          1,
          larguraMax / imagem.width
        );

        const canvas = document.createElement("canvas");

        canvas.width = Math.round(imagem.width * escala);

        canvas.height = Math.round(imagem.height * escala);

        const contexto = canvas.getContext("2d");

        contexto.drawImage(
          imagem,
          0,
          0,
          canvas.width,
          canvas.height
        );

        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };

      imagem.onerror = reject;

      imagem.src = leitor.result;
    };

    leitor.onerror = reject;

    leitor.readAsDataURL(arquivo);
  });
}

// =====================================================
// COMPONENTE
// =====================================================

export default function EditProfileModal({
  usuario,
  onFechar,
  onSalvar
}) {
  const [aba, setAba] = useState("perfil");

  const [nome, setNome] = useState(usuario?.nome || "");

  const [apelido, setApelido] = useState(
    usuario?.apelido || ""
  );

  const [descricao, setDescricao] = useState(
    usuario?.descricao || ""
  );

  const [foto, setFoto] = useState(usuario?.foto || "");

  const [banner, setBanner] = useState(
    usuario?.banner || ""
  );

  const [tags, setTags] = useState(
    Array.isArray(usuario?.tags) ? usuario.tags : []
  );

  const [preferencias, setPreferencias] = useState(
    Array.isArray(usuario?.preferencias)
      ? usuario.preferencias
      : []
  );

  const [jogos, setJogos] = useState(
    Array.isArray(usuario?.jogos) ? usuario.jogos : []
  );

  const [novaTag, setNovaTag] = useState("");

  const [novaPreferencia, setNovaPreferencia] =
    useState("");

  const [salvando, setSalvando] = useState(false);

  const [erro, setErro] = useState("");

  const fotoInputRef = useRef(null);

  const bannerInputRef = useRef(null);

  // =====================================================
  // FOTO
  // =====================================================

  const escolherFoto = async (evento) => {
    const arquivo = evento.target.files?.[0];

    if (!arquivo) {
      return;
    }

    try {
      const dataUrl = await arquivoParaDataUrl(arquivo, 500);

      setFoto(dataUrl);
    } catch {
      setErro("Não foi possível carregar a imagem.");
    }
  };

  // =====================================================
  // BANNER
  // =====================================================

  const escolherBanner = async (evento) => {
    const arquivo = evento.target.files?.[0];

    if (!arquivo) {
      return;
    }

    try {
      const dataUrl = await arquivoParaDataUrl(
        arquivo,
        1600
      );

      setBanner(dataUrl);
    } catch {
      setErro("Não foi possível carregar a imagem.");
    }
  };

  // =====================================================
  // TAGS / PREFERÊNCIAS
  // =====================================================

  const adicionarItem = (lista, setLista, valor) => {
    const limpo = valor.trim();

    if (!limpo || lista.includes(limpo)) {
      return;
    }

    setLista([...lista, limpo]);
  };

  const removerItem = (lista, setLista, valor) => {
    setLista(lista.filter((item) => item !== valor));
  };

  // =====================================================
  // JOGOS
  // =====================================================

  const adicionarJogo = () => {
    const disponiveis = JOGOS.filter(
      (jogo) => !jogos.some((item) => item.jogo === jogo.id)
    );

    const escolhido = disponiveis[0];

    if (!escolhido) {
      return;
    }

    setJogos([
      ...jogos,
      {
        jogo: escolhido.id,
        elo: "",
        funcao: "",
        funcao2: ""
      }
    ]);
  };

  const atualizarJogo = (indice, campo, valor) => {
    setJogos((atual) =>
      atual.map((item, i) => {
        if (i !== indice) {
          return item;
        }

        if (campo === "jogo") {
          return {
            jogo: valor,
            elo: "",
            funcao: "",
            funcao2: ""
          };
        }

        return { ...item, [campo]: valor };
      })
    );
  };

  const removerJogo = (indice) => {
    setJogos((atual) =>
      atual.filter((_, i) => i !== indice)
    );
  };

  // =====================================================
  // SALVAR
  // =====================================================

  const salvar = async () => {
    setErro("");

    if (!nome.trim()) {
      setErro("O nome não pode ficar vazio.");
      return;
    }

    try {
      setSalvando(true);

      await onSalvar({
        nome: nome.trim(),
        apelido: apelido.trim(),
        descricao,
        foto,
        banner,
        tags,
        preferencias,
        jogos
      });
    } catch (falha) {
      setErro(
        falha?.message || "Não foi possível salvar o perfil."
      );
    } finally {
      setSalvando(false);
    }
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="edit-overlay" onClick={onFechar}>

      <div
        className="edit-modal"
        onClick={(evento) => evento.stopPropagation()}
      >

        {/* CABEÇALHO */}
        <header className="edit-header">

          <h2>Editar Perfil</h2>

          <button
            className="edit-fechar"
            onClick={onFechar}
            type="button"
          >
            ✕
          </button>

        </header>

        {/* ABAS */}
        <nav className="edit-abas">

          <button
            className={
              `edit-aba ${aba === "perfil" ? "edit-aba-ativa" : ""}`
            }
            onClick={() => setAba("perfil")}
            type="button"
          >
            Perfil
          </button>

          <button
            className={
              `edit-aba ${aba === "jogos" ? "edit-aba-ativa" : ""}`
            }
            onClick={() => setAba("jogos")}
            type="button"
          >
            Jogos ({jogos.length})
          </button>

          <button
            className={
              `edit-aba ${aba === "preferencias" ? "edit-aba-ativa" : ""}`
            }
            onClick={() => setAba("preferencias")}
            type="button"
          >
            Preferências
          </button>

        </nav>

        <div className="edit-conteudo">

          {/* =================================================
              ABA PERFIL
          ================================================= */}
          {aba === "perfil" && (

            <div className="edit-secao">

              {/* BANNER */}
              <label className="edit-label">
                Banner
              </label>

              <div className="edit-banner-preview">

                {banner ? (
                  <img src={banner} alt="Banner" />
                ) : (
                  <span>Sem banner selecionado</span>
                )}

              </div>

              <div className="edit-linha-botoes">

                <button
                  className="edit-botao-secundario"
                  onClick={() => bannerInputRef.current?.click()}
                  type="button"
                >
                  Upload do PC
                </button>

                <input
                  ref={bannerInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={escolherBanner}
                />

                <input
                  className="edit-input"
                  placeholder="Ou cole uma URL..."
                  onChange={(evento) =>
                    setBanner(evento.target.value)
                  }
                />

              </div>

              <div className="edit-galeria">

                {BANNERS.map((item) => (

                  <button
                    key={item.nome}
                    className={
                      `edit-galeria-item ${
                        banner === item.valor
                          ? "edit-galeria-ativa"
                          : ""
                      }`
                    }
                    onClick={() => setBanner(item.valor)}
                    title={item.nome}
                    type="button"
                  >
                    <img src={item.valor} alt={item.nome} />
                  </button>

                ))}

              </div>

              {/* FOTO */}
              <label className="edit-label">
                Foto de perfil
              </label>

              <div className="edit-foto-area">

                <div className="edit-foto-preview">

                  {foto ? (
                    <img src={foto} alt="Foto" />
                  ) : (
                    <span>Sem foto</span>
                  )}

                </div>

                <div className="edit-foto-controles">

                  <button
                    className="edit-botao-secundario"
                    onClick={() => fotoInputRef.current?.click()}
                    type="button"
                  >
                    Upload do PC
                  </button>

                  <input
                    ref={fotoInputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={escolherFoto}
                  />

                  <input
                    className="edit-input"
                    placeholder="Ou cole uma URL..."
                    onChange={(evento) =>
                      setFoto(evento.target.value)
                    }
                  />

                </div>

              </div>

              {/* NOME */}
              <label className="edit-label">
                Nome de exibição
              </label>

              <input
                className="edit-input"
                value={nome}
                maxLength={40}
                onChange={(evento) =>
                  setNome(evento.target.value)
                }
              />

              {/* APELIDO */}
              <label className="edit-label">
                @ Usuário
              </label>

              <input
                className="edit-input"
                value={apelido}
                maxLength={30}
                placeholder="ex: esjmelo"
                onChange={(evento) =>
                  setApelido(evento.target.value)
                }
              />

              {/* BIO */}
              <label className="edit-label">
                Sobre mim
              </label>

              <textarea
                className="edit-input edit-textarea"
                value={descricao}
                maxLength={280}
                placeholder="Conte algo sobre você..."
                onChange={(evento) =>
                  setDescricao(evento.target.value)
                }
              />

              {/* TAGS */}
              <label className="edit-label">
                Tags
              </label>

              <div className="edit-chips">

                {tags.map((tag) => (

                  <span className="edit-chip" key={tag}>

                    {tag}

                    <button
                      onClick={() =>
                        removerItem(tags, setTags, tag)
                      }
                      type="button"
                    >
                      ✕
                    </button>

                  </span>

                ))}

              </div>

              <div className="edit-linha-botoes">

                <input
                  className="edit-input"
                  value={novaTag}
                  maxLength={20}
                  placeholder="Nova tag..."
                  onChange={(evento) =>
                    setNovaTag(evento.target.value)
                  }
                  onKeyDown={(evento) => {
                    if (evento.key === "Enter") {
                      evento.preventDefault();

                      adicionarItem(tags, setTags, novaTag);

                      setNovaTag("");
                    }
                  }}
                />

                <button
                  className="edit-botao-secundario"
                  onClick={() => {
                    adicionarItem(tags, setTags, novaTag);

                    setNovaTag("");
                  }}
                  type="button"
                >
                  Adicionar
                </button>

              </div>

              <div className="edit-sugestoes">

                {TAG_SUGESTOES.filter(
                  (tag) => !tags.includes(tag)
                ).map((tag) => (

                  <button
                    key={tag}
                    className="edit-sugestao"
                    onClick={() =>
                      adicionarItem(tags, setTags, tag)
                    }
                    type="button"
                  >
                    + {tag}
                  </button>

                ))}

              </div>

            </div>

          )}

          {/* =================================================
              ABA JOGOS
          ================================================= */}
          {aba === "jogos" && (

            <div className="edit-secao">

              {jogos.length === 0 && (
                <p className="edit-vazio">
                  Você ainda não adicionou nenhum jogo.
                </p>
              )}

              {jogos.map((item, indice) => {

                const jogo = obterJogo(item.jogo);

                const elos = elosDoJogo(item.jogo);

                const funcoes = funcoesDoJogo(item.jogo);

                return (

                  <div
                    className="edit-jogo-card"
                    key={`${item.jogo}-${indice}`}
                  >

                    <div className="edit-jogo-topo">

                      {jogo?.capa && (
                        <img
                          className="edit-jogo-capa"
                          src={jogo.capa}
                          alt={jogo.nome}
                        />
                      )}

                      <select
                        className="edit-input"
                        value={item.jogo}
                        onChange={(evento) =>
                          atualizarJogo(
                            indice,
                            "jogo",
                            evento.target.value
                          )
                        }
                      >

                        {JOGOS.map((opcao) => (
                          <option
                            key={opcao.id}
                            value={opcao.id}
                          >
                            {opcao.nome}
                          </option>
                        ))}

                      </select>

                      <button
                        className="edit-remover"
                        onClick={() => removerJogo(indice)}
                        type="button"
                      >
                        Remover
                      </button>

                    </div>

                    <div className="edit-jogo-linha">

                      <div className="edit-campo">

                        <span>Elo</span>

                        <select
                          className="edit-input"
                          value={item.elo}
                          disabled={elos.length === 0}
                          onChange={(evento) =>
                            atualizarJogo(
                              indice,
                              "elo",
                              evento.target.value
                            )
                          }
                        >

                          <option value="">
                            {elos.length
                              ? "Sem elo"
                              : "Jogo sem elos"}
                          </option>

                          {elos.map((elo) => (
                            <option
                              key={elo.valor}
                              value={elo.valor}
                            >
                              {elo.nome}
                            </option>
                          ))}

                        </select>

                      </div>

                      <div className="edit-campo">

                        <span>Função principal</span>

                        <select
                          className="edit-input"
                          value={item.funcao}
                          disabled={funcoes.length === 0}
                          onChange={(evento) =>
                            atualizarJogo(
                              indice,
                              "funcao",
                              evento.target.value
                            )
                          }
                        >

                          <option value="">Sem função</option>

                          {funcoes.map((funcaoItem) => (
                            <option
                              key={funcaoItem.valor}
                              value={funcaoItem.valor}
                            >
                              {funcaoItem.nome}
                            </option>
                          ))}

                        </select>

                      </div>

                      <div className="edit-campo">

                        <span>Função secundária</span>

                        <select
                          className="edit-input"
                          value={item.funcao2}
                          disabled={funcoes.length === 0}
                          onChange={(evento) =>
                            atualizarJogo(
                              indice,
                              "funcao2",
                              evento.target.value
                            )
                          }
                        >

                          <option value="">Sem função</option>

                          {funcoes.map((funcaoItem) => (
                            <option
                              key={funcaoItem.valor}
                              value={funcaoItem.valor}
                            >
                              {funcaoItem.nome}
                            </option>
                          ))}

                        </select>

                      </div>

                    </div>

                  </div>

                );
              })}

              <button
                className="edit-botao-secundario edit-adicionar-jogo"
                onClick={adicionarJogo}
                type="button"
              >
                + Adicionar jogo
              </button>

            </div>

          )}

          {/* =================================================
              ABA PREFERÊNCIAS
          ================================================= */}
          {aba === "preferencias" && (

            <div className="edit-secao">

              <label className="edit-label">
                Minhas preferências
              </label>

              <div className="edit-chips">

                {preferencias.map((item) => (

                  <span className="edit-chip" key={item}>

                    {item}

                    <button
                      onClick={() =>
                        removerItem(
                          preferencias,
                          setPreferencias,
                          item
                        )
                      }
                      type="button"
                    >
                      ✕
                    </button>

                  </span>

                ))}

              </div>

              <div className="edit-linha-botoes">

                <input
                  className="edit-input"
                  value={novaPreferencia}
                  maxLength={40}
                  placeholder="Nova preferência..."
                  onChange={(evento) =>
                    setNovaPreferencia(evento.target.value)
                  }
                  onKeyDown={(evento) => {
                    if (evento.key === "Enter") {
                      evento.preventDefault();

                      adicionarItem(
                        preferencias,
                        setPreferencias,
                        novaPreferencia
                      );

                      setNovaPreferencia("");
                    }
                  }}
                />

                <button
                  className="edit-botao-secundario"
                  onClick={() => {
                    adicionarItem(
                      preferencias,
                      setPreferencias,
                      novaPreferencia
                    );

                    setNovaPreferencia("");
                  }}
                  type="button"
                >
                  Adicionar
                </button>

              </div>

              <div className="edit-sugestoes">

                {PREFERENCIA_SUGESTOES.filter(
                  (item) => !preferencias.includes(item)
                ).map((item) => (

                  <button
                    key={item}
                    className="edit-sugestao"
                    onClick={() =>
                      adicionarItem(
                        preferencias,
                        setPreferencias,
                        item
                      )
                    }
                    type="button"
                  >
                    + {item}
                  </button>

                ))}

              </div>

            </div>

          )}

        </div>

        {/* RODAPÉ */}
        <footer className="edit-rodape">

          {erro && (
            <span className="edit-erro">
              {erro}
            </span>
          )}

          <button
            className="edit-botao-secundario"
            onClick={onFechar}
            type="button"
          >
            Cancelar
          </button>

          <button
            className="edit-botao-salvar"
            onClick={salvar}
            disabled={salvando}
            type="button"
          >
            {salvando ? "Salvando..." : "Salvar"}
          </button>

        </footer>

      </div>

    </div>
  );
}
