import { useEffect, useState } from "react";

import { apiFetch, getUsuario } from "../api";

import BuscarJogador from "../components/BuscarJogador";
import FeedbackModal from "../components/FeedbackModal";

import {
  obterJogo,
  elosDoJogo,
  funcoesDoJogo,
  BANNER_PADRAO,
  FOTO_PADRAO
} from "../data/jogos";

// LOGO
import logo from "../assets/logo.png";

// SIDEBAR
import homeIcon from "../assets/sidebar/home.png";
import perfilIcon from "../assets/sidebar/perfil.png";
import historicoIcon from "../assets/sidebar/historico.png";
import configuracoesIcon from "../assets/sidebar/configuracoes.png";

// JOGOS DO TOPO
import owIcon from "../assets/icon/ow icon.png";
import csIcon from "../assets/icon/cs icon.png";
import valIcon from "../assets/icon/val icon.png";
import fortniteIcon from "../assets/icon/fortinite icon.png";
import rocketIcon from "../assets/icon/rocket icon.png";
import dotaIcon from "../assets/icon/dota icon.png";
import rivalsIcon from "../assets/icon/marvel icon.png";
import lolIcon from "../assets/icon/lol icon.png";

import "./Profile.css";

// ======================================================
// ESTRELAS
// ======================================================

function Stars({ nota }) {
  const valor = Math.round(nota || 0);

  return (
    <div
      className="pp-stars"
      aria-label={`${nota} de 5 estrelas`}
    >
      {[1, 2, 3, 4, 5].map((estrela) => (
        <span
          key={estrela}
          className={
            estrela <= valor
              ? "pp-star active"
              : "pp-star"
          }
        >
          ★
        </span>
      ))}
    </div>
  );
}

// ======================================================
// FORMATAR DATA
// ======================================================

function formatarData(iso) {
  const data = new Date(iso);

  const dia = String(data.getDate()).padStart(2, "0");

  const mes = String(data.getMonth() + 1).padStart(2, "0");

  return `${dia}/${mes}/${data.getFullYear()}`;
}

// ======================================================
// MONTA CARDS DE JOGOS
// ======================================================

function montarJogos(perfil) {
  return (perfil?.jogos || [])
    .map((item) => {
      const jogo = obterJogo(item.jogo);

      if (!jogo) {
        return null;
      }

      const elo = elosDoJogo(item.jogo).find(
        (opcao) => opcao.valor === item.elo
      );

      const funcoes = funcoesDoJogo(item.jogo);

      const principal = funcoes.find(
        (opcao) => opcao.valor === item.funcao
      );

      const secundaria = funcoes.find(
        (opcao) => opcao.valor === item.funcao2
      );

      return {
        id: jogo.id,
        image: jogo.capa,
        name: jogo.nome,
        rank: elo?.nome || "Sem elo",
        rankImage: elo?.imagem || null,
        mainNome: principal?.nome || "—",
        secondaryNome: secundaria?.nome || "—"
      };
    })
    .filter(Boolean);
}

// ======================================================
// COMPONENTE
// ======================================================

export default function PublicProfile({
  perfilId,
  onHome,
  onProfile,
  onHistory,
  onFeedbacks,
  onSettings,
  onGameSelect,
  onVerPerfil,
  onVoltar
}) {

  const [dados, setDados] = useState(null);

  const [carregando, setCarregando] = useState(true);

  const [erro, setErro] = useState("");

  const [avaliando, setAvaliando] = useState(false);

  const usuario = getUsuario();

  const meuId = usuario?.id || "";

  const ehEu = String(perfilId) === String(meuId);

  // =====================================================
  // CARREGAR PERFIL PÚBLICO
  // =====================================================

  const carregar = async () => {
    setCarregando(true);

    setErro("");

    try {
      const resposta = await apiFetch(`/usuarios/${perfilId}`);

      setDados(resposta);
    } catch (e) {
      setErro(e.message || "Não foi possível carregar o perfil.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    let ativo = true;

    const iniciar = async () => {
      setCarregando(true);

      setErro("");

      try {
        const resposta = await apiFetch(`/usuarios/${perfilId}`);

        if (ativo) {
          setDados(resposta);
        }
      } catch (e) {
        if (ativo) {
          setErro(e.message || "Não foi possível carregar o perfil.");
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    };

    iniciar();

    return () => {
      ativo = false;
    };
  }, [perfilId]);

  const perfil = dados?.usuario || null;

  const avaliacao = dados?.avaliacao || {
    media: 0,
    total: 0,
    distribuicao: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  };

  const feedbacks = dados?.feedbacks || [];

  const jogos = montarJogos(perfil);

  const apelido = perfil?.apelido
    ? `@${perfil.apelido}`
    : `@${(perfil?.email || "jogador").split("@")[0]}`;

  const maxDistribuicao = Math.max(
    1,
    ...Object.values(avaliacao.distribuicao)
  );

  return (
    <div className="profile-page">

      {/* ==================================================
          NAVBAR
      ================================================== */}
      <header className="profile-navbar">

        <div className="profile-navbar-logo">

          <img
            src={logo}
            alt="Logo"
          />

        </div>

        <div className="profile-games-navbar">

          <div
            className="profile-navbar-game"
            onClick={() => onGameSelect("Overwatch")}
          >
            <img
              src={owIcon}
              alt="Overwatch"
            />
            <span>OVERWATCH</span>
          </div>

          <div
            className="profile-navbar-game"
            onClick={() => onGameSelect("Counter-Strike 2")}
          >
            <img
              src={csIcon}
              alt="CS2"
            />
            <span>CS2</span>
          </div>

          <div
            className="profile-navbar-game"
            onClick={() => onGameSelect("Valorant")}
          >
            <img
              src={valIcon}
              alt="Valorant"
            />
            <span>VALORANT</span>
          </div>

          <div
            className="profile-navbar-game"
            onClick={() => onGameSelect("Fortnite")}
          >
            <img
              src={fortniteIcon}
              alt="Fortnite"
            />
            <span>FORTNITE</span>
          </div>

          <div
            className="profile-navbar-game"
            onClick={() => onGameSelect("Rocket League")}
          >
            <img
              src={rocketIcon}
              alt="Rocket League"
            />
            <span>ROCKET LEAGUE</span>
          </div>

          <div
            className="profile-navbar-game"
            onClick={() => onGameSelect("Dota 2")}
          >
            <img
              src={dotaIcon}
              alt="Dota 2"
            />
            <span>DOTA 2</span>
          </div>

          <div
            className="profile-navbar-game"
            onClick={() => onGameSelect("Marvel Rivals")}
          >
            <img
              src={rivalsIcon}
              alt="Marvel Rivals"
            />
            <span>MARVEL RIVALS</span>
          </div>

          <div
            className="profile-navbar-game"
            onClick={() => onGameSelect("League of Legends")}
          >
            <img
              src={lolIcon}
              alt="League of Legends"
            />
            <span>LEAGUE OF LEGENDS</span>
          </div>

        </div>

      </header>

      {/* ==================================================
          SIDEBAR
      ================================================== */}
      <aside className="profile-sidebar">

        <div className="profile-sidebar-menu">

          <button
            className="profile-sidebar-item"
            onClick={onHome}
            title="Home"
            type="button"
          >
            <img
              src={homeIcon}
              alt="Home"
            />
          </button>

          <button
            className="profile-sidebar-item"
            onClick={onProfile}
            title="Perfil"
            type="button"
          >
            <img
              src={perfilIcon}
              alt="Perfil"
            />
          </button>

          <button
            className="profile-sidebar-item"
            onClick={onHistory}
            title="Histórico"
            type="button"
          >
            <img
              src={historicoIcon}
              alt="Histórico"
            />
          </button>

          <button
            className="profile-sidebar-item"
            onClick={onFeedbacks}
            title="Feedbacks"
            type="button"
          >
            <span className="profile-feedback-star">
              ★
            </span>
          </button>

          <button
            className="profile-sidebar-item"
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
      <main className="profile-main">

        {/* BUSCAR JOGADOR */}

        <div className="pp-buscar-top">

          <div className="pp-voltar">

            <button
              type="button"
              onClick={onVoltar}
            >
              ← Voltar
            </button>

          </div>

          <BuscarJogador
            onSelecionar={(jogador) =>
              onVerPerfil(jogador._id)
            }
          />

        </div>

        {/* =================================================
            ERRO / CARREGANDO
        ================================================= */}

        {erro && !carregando && (

          <div className="pp-estado">

            <p>⚠ {erro}</p>

            <button
              type="button"
              className="profile-edit-button profile-edit-button-inline"
              onClick={onVoltar}
            >
              Voltar
            </button>

          </div>

        )}

        {carregando && !erro && (

          <div className="pp-estado">

            <p>Carregando perfil...</p>

          </div>

        )}

        {!carregando && !erro && perfil && (

          <>

            {/* =============================================
                CABEÇALHO
            ============================================= */}

            <section className="profile-header-card">

              <img
                src={perfil.banner || BANNER_PADRAO}
                className="profile-banner-background"
                alt=""
              />

              <div className="profile-banner-dark"></div>

              {ehEu ? (

                <button
                  className="profile-edit-button"
                  onClick={onProfile}
                  type="button"
                >
                  ✏️ Este é você — editar
                </button>

              ) : (

                <button
                  className="profile-edit-button"
                  onClick={() => setAvaliando(true)}
                  type="button"
                >
                  ★ Avaliar jogador
                </button>

              )}

              <div className="profile-user-area">

                <div className="profile-avatar-wrapper">

                  <img
                    src={perfil.foto || FOTO_PADRAO}
                    className="profile-avatar"
                    alt="Foto de perfil"
                  />

                </div>

                <div className="profile-user-text">

                  <h1>
                    {perfil.nome || "JOGADOR"}
                  </h1>

                  <span className="profile-user-name">
                    {apelido}
                  </span>

                  <p>
                    {perfil.descricao ||
                      "Procurando players para jogar e subir de elo."}
                  </p>

                  {perfil.tags?.length > 0 && (

                    <div className="profile-user-tags">

                      {perfil.tags.map((tag) => (
                        <span key={tag}>
                          {tag}
                        </span>
                      ))}

                    </div>

                  )}

                </div>

              </div>

            </section>

            {/* =============================================
                AVALIAÇÃO
            ============================================= */}

            <section className="pp-avaliacao">

              <div className="pp-avaliacao-numero">

                <strong>
                  {avaliacao.media || "0.0"}
                </strong>

                <Stars nota={avaliacao.media} />

                <span>
                  {avaliacao.total}{" "}
                  {avaliacao.total === 1
                    ? "avaliação"
                    : "avaliações"}
                </span>

              </div>

              <div className="pp-barras">

                {[5, 4, 3, 2, 1].map((nota) => {

                  const quantidade =
                    avaliacao.distribuicao[nota] || 0;

                  const largura =
                    Math.round(
                      (quantidade / maxDistribuicao) * 100
                    );

                  return (

                    <div
                      className="pp-barra"
                      key={nota}
                    >

                      <span>{nota} ★</span>

                      <div className="pp-barra-trilha">

                        <div
                          className="pp-barra-preenchida"
                          style={{ width: `${largura}%` }}
                        ></div>

                      </div>

                      <small>{quantidade}</small>

                    </div>

                  );

                })}

              </div>

            </section>

            {/* =============================================
                JOGOS
            ============================================= */}

            {jogos.length > 0 && (

              <section className="profile-games-section">

                <div className="profile-section-header">

                  <h2>
                    Jogos
                  </h2>

                  <span>
                    {jogos.length}{" "}
                    {jogos.length === 1 ? "jogo" : "jogos"}
                  </span>

                </div>

                <div className="profile-games-grid">

                  {jogos.map((game) => (

                    <article
                      className="profile-game-card"
                      key={game.id}
                    >

                      <div className="profile-game-cover">

                        <img
                          src={game.image}
                          alt={game.name}
                          className="profile-game-cover-image"
                        />

                        <div className="profile-game-gradient"></div>

                        <h3
                          className={`profile-game-title profile-game-title-${game.id}`}
                        >
                          {game.name}
                        </h3>

                        <div className="profile-game-rank">

                          {game.rankImage && (

                            <img
                              src={game.rankImage}
                              className="profile-rank-image"
                              alt={game.rank}
                            />

                          )}

                          <div className="profile-rank-text">

                            <strong>
                              {game.rank}
                            </strong>

                          </div>

                        </div>

                      </div>

                      <div className="profile-game-footer">

                        <div className="profile-game-role">

                          <div>

                            <span>Função Principal</span>

                            <strong>
                              {game.mainNome}
                            </strong>

                          </div>

                        </div>

                        <div className="profile-game-role">

                          <div>

                            <span>Função Secundária</span>

                            <strong>
                              {game.secondaryNome}
                            </strong>

                          </div>

                        </div>

                      </div>

                    </article>

                  ))}

                </div>

              </section>

            )}

            {/* =============================================
                FEEDBACKS RECEBIDOS
            ============================================= */}

            <section className="profile-games-section">

              <div className="profile-section-header">

                <h2>
                  Feedbacks recebidos
                </h2>

                <span>
                  {feedbacks.length}
                </span>

              </div>

              {feedbacks.length === 0 && (

                <div className="profile-games-empty">

                  <p>
                    Este jogador ainda não recebeu avaliações.
                  </p>

                </div>

              )}

              <div className="pp-feedbacks">

                {feedbacks.map((feedback) => {

                  const autor = feedback.remetente;

                  return (

                    <article
                      className="pp-feedback"
                      key={feedback._id}
                    >

                      <span className="pp-feedback-avatar">

                        {autor?.foto ? (

                          <img
                            src={autor.foto}
                            alt={autor.nome}
                          />

                        ) : (

                          String(autor?.nome || "?").charAt(0).toUpperCase()

                        )}

                      </span>

                      <div className="pp-feedback-conteudo">

                        <div className="pp-feedback-topo">

                          <button
                            type="button"
                            className="pp-feedback-nome"
                            onClick={() =>
                              onVerPerfil(autor._id)
                            }
                          >
                            {autor?.nome || "Jogador"}
                          </button>

                          <Stars nota={feedback.nota} />

                          <span className="pp-feedback-data">
                            {formatarData(feedback.createdAt)}
                          </span>

                        </div>

                        {feedback.comentario && (

                          <p>
                            {feedback.comentario}
                          </p>

                        )}

                      </div>

                    </article>

                  );

                })}

              </div>

            </section>

          </>

        )}

      </main>

      {/* ==================================================
          MODAL DE AVALIAÇÃO
      ================================================== */}

      {!ehEu && perfil && (

        <FeedbackModal
          aberto={avaliando}
          destinatarioId={perfil._id}
          destinatarioNome={perfil.nome}
          destinatarioFoto={perfil.foto}
          onFechar={() => setAvaliando(false)}
          onEnviado={() => {
            carregar();
          }}
        />

      )}

    </div>
  );
}