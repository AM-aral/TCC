import { useEffect, useState } from "react";

import { apiFetch, getUsuario, getToken, salvarUsuario } from "../api";

import EditProfileModal from "../components/EditProfileModal";

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
// PADRÕES (quando o usuário ainda não personalizou)
// ======================================================

const TAGS_PADRAO = ["🎮 Casual", "🏆 Competitivo", "🔥 Tryhard"];

const PREFERENCIAS_PADRAO = [
  "🎙️ Comunicação por voz",
  "🏆 Competitivo",
  "🌎 Servidor Brasil"
];

// ======================================================
// MONTA OS CARDS DE JOGO A PARTIR DO PERFIL
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
        rankInfo: "",
        rankImage: elo?.imagem || null,

        mainLabel: "Função Principal",
        mainIcon: principal?.imagem || null,
        mainNome: principal?.nome || "—",

        secondaryLabel: "Função Secundária",
        secondaryIcon: secundaria?.imagem || null,
        secondaryNome: secundaria?.nome || "—"
      };
    })
    .filter(Boolean);
}

// ======================================================
// COMPONENTE
// ======================================================

export default function Profile({
  onHome,
  onHistory,
  onFeedbacks,
  onSettings,
  onGameSelect,
}) {
  const [perfil, setPerfil] = useState(() => getUsuario());

  const [editando, setEditando] = useState(false);

  // =====================================================
  // BUSCAR PERFIL ATUALIZADO
  // =====================================================

  useEffect(() => {
    let ativo = true;

    const carregar = async () => {
      if (!getToken()) {
        return;
      }

      try {
        const dados = await apiFetch("/auth/me");

        if (ativo && dados?.usuario) {
          setPerfil(dados.usuario);

          salvarUsuario(dados.usuario);
        }
      } catch {
        // Mantém os dados locais se o servidor falhar
      }
    };

    carregar();

    return () => {
      ativo = false;
    };
  }, []);

  // =====================================================
  // VALORES DE EXIBIÇÃO
  // =====================================================

  const email = perfil?.email || "";

  const apelido = perfil?.apelido
    ? `@${perfil.apelido}`
    : `@${email.split("@")[0] || "jogador"}`;

  const jogos = montarJogos(perfil);

  const tags = perfil?.tags?.length
    ? perfil.tags
    : TAGS_PADRAO;

  const preferencias = perfil?.preferencias?.length
    ? perfil.preferencias
    : PREFERENCIAS_PADRAO;

  // =====================================================
  // SALVAR
  // =====================================================

  const salvarPerfil = async (dados) => {
    const resposta = await apiFetch("/auth/perfil", {
      method: "PUT",
      body: JSON.stringify(dados)
    });

    if (resposta?.usuario) {
      setPerfil(resposta.usuario);

      salvarUsuario(resposta.usuario);
    }

    setEditando(false);
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="profile-page">

      {/* ==================================================
          NAVBAR
      ================================================== */}
      <header className="profile-navbar">

        {/* LOGO */}
        <div className="profile-navbar-logo">

          <img
            src={logo}
            alt="Logo"
          />

        </div>

        {/* JOGOS */}
        <div className="profile-games-navbar">

          {/* OVERWATCH */}
          <div
            className="profile-navbar-game"
            onClick={() =>
              onGameSelect("Overwatch")
            }
          >

            <img
              src={owIcon}
              alt="Overwatch"
            />

            <span>
              OVERWATCH
            </span>

          </div>

          {/* CS2 */}
          <div
            className="profile-navbar-game"
            onClick={() =>
              onGameSelect("Counter-Strike 2")
            }
          >

            <img
              src={csIcon}
              alt="CS2"
            />

            <span>
              CS2
            </span>

          </div>

          {/* VALORANT */}
          <div
            className="profile-navbar-game"
            onClick={() =>
              onGameSelect("Valorant")
            }
          >

            <img
              src={valIcon}
              alt="Valorant"
            />

            <span>
              VALORANT
            </span>

          </div>

          {/* FORTNITE */}
          <div
            className="profile-navbar-game"
            onClick={() =>
              onGameSelect("Fortnite")
            }
          >

            <img
              src={fortniteIcon}
              alt="Fortnite"
            />

            <span>
              FORTNITE
            </span>

          </div>

          {/* ROCKET LEAGUE */}
          <div
            className="profile-navbar-game"
            onClick={() =>
              onGameSelect("Rocket League")
            }
          >

            <img
              src={rocketIcon}
              alt="Rocket League"
            />

            <span>
              ROCKET LEAGUE
            </span>

          </div>

          {/* DOTA 2 */}
          <div
            className="profile-navbar-game"
            onClick={() =>
              onGameSelect("Dota 2")
            }
          >

            <img
              src={dotaIcon}
              alt="Dota 2"
            />

            <span>
              DOTA 2
            </span>

          </div>

          {/* MARVEL RIVALS */}
          <div
            className="profile-navbar-game"
            onClick={() =>
              onGameSelect("Marvel Rivals")
            }
          >

            <img
              src={rivalsIcon}
              alt="Marvel Rivals"
            />

            <span>
              MARVEL RIVALS
            </span>

          </div>

          {/* LEAGUE OF LEGENDS */}
          <div
            className="profile-navbar-game profile-navbar-active"
            onClick={() =>
              onGameSelect("League of Legends")
            }
          >

            <img
              src={lolIcon}
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
      <aside className="profile-sidebar">

        <div className="profile-sidebar-menu">

          {/* HOME */}
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

          {/* PERFIL */}
          <button
            className="profile-sidebar-item profile-sidebar-active"
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

          {/* FEEDBACKS */}
          <button
            className="profile-sidebar-item"
            type="button"
            onClick={onFeedbacks}
            title="Feedbacks"
          >

            <span className="profile-feedback-star">
              ★
            </span>

          </button>

          {/* CONFIGURAÇÕES */}
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

        {/* =================================================
            BANNER
        ================================================= */}
        <section className="profile-header-card">

          {/* BANNER */}
          <img
            src={perfil?.banner || BANNER_PADRAO}
            className="profile-banner-background"
            alt=""
          />

          {/* ESCURECIMENTO */}
          <div className="profile-banner-dark"></div>

          {/* BOTÃO EDITAR */}
          <button
            className="profile-edit-button"
            onClick={() => setEditando(true)}
            type="button"
          >
            ✏️ Editar Perfil
          </button>

          {/* INFORMAÇÕES */}
          <div className="profile-user-area">

            {/* FOTO */}
            <div className="profile-avatar-wrapper">

              <img
                src={perfil?.foto || FOTO_PADRAO}
                className="profile-avatar"
                alt="Foto de perfil"
              />

              <span className="profile-online-dot"></span>

            </div>

            {/* TEXTOS */}
            <div className="profile-user-text">

              <h1>
                {perfil?.nome || "JOGADOR"}
              </h1>

              <span className="profile-user-name">
                {apelido}
              </span>

              <p>
                {perfil?.descricao ||
                  "Procurando players para jogar e subir de elo."}
              </p>

              {/* TAGS */}
              <div className="profile-user-tags">

                {tags.map((tag) => (

                  <span key={tag}>
                    {tag}
                  </span>

                ))}

              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            MEUS JOGOS
        ================================================= */}
        <section className="profile-games-section">

          {/* TÍTULO */}
          <div className="profile-section-header">

            <h2>
              Meus Jogos
            </h2>

            <span>
              {jogos.length}{" "}
              {jogos.length === 1 ? "jogo" : "jogos"}
            </span>

          </div>

          {jogos.length === 0 && (

            <div className="profile-games-empty">

              <p>
                Você ainda não adicionou nenhum jogo.
              </p>

              <button
                className="profile-edit-button profile-edit-button-inline"
                onClick={() => setEditando(true)}
                type="button"
              >
                + Adicionar jogos
              </button>

            </div>

          )}

          {/* CARDS */}
          <div className="profile-games-grid">

            {jogos.map((game) => (

              <article
                className="profile-game-card"
                key={game.id}
              >

                {/* IMAGEM */}
                <div className="profile-game-cover">

                  <img
                    src={game.image}
                    alt={game.name}
                    className="profile-game-cover-image"
                  />

                  {/* GRADIENTE */}
                  <div className="profile-game-gradient"></div>

                  {/* NOME */}
                  <h3
                    className={`profile-game-title profile-game-title-${game.id}`}
                  >
                    {game.name}
                  </h3>

                  {/* SETA */}
                  <button
                    className="profile-game-arrow"
                    type="button"
                  >
                    →
                  </button>

                  {/* ELO */}
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

                      {game.rankInfo && (
                        <span>
                          {game.rankInfo}
                        </span>
                      )}

                    </div>

                  </div>

                </div>

                {/* RODAPÉ */}
                <div className="profile-game-footer">

                  {/* FUNÇÃO PRINCIPAL */}
                  <div className="profile-game-role">

                    {game.mainIcon && (
                      <img
                        src={game.mainIcon}
                        alt=""
                      />
                    )}

                    <div>

                      <span>
                        {game.mainLabel}
                      </span>

                      <strong>
                        {game.mainNome}
                      </strong>

                    </div>

                  </div>

                  {/* FUNÇÃO SECUNDÁRIA */}
                  <div className="profile-game-role">

                    {game.secondaryIcon && (
                      <img
                        src={game.secondaryIcon}
                        alt=""
                      />
                    )}

                    <div>

                      <span>
                        {game.secondaryLabel}
                      </span>

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

        {/* =================================================
            PARTE INFERIOR
        ================================================= */}
        <section className="profile-bottom-grid">

          {/* SOBRE MIM */}
          <div className="profile-bottom-card">

            <h2>
              Sobre Mim
            </h2>

            <p>
              {perfil?.descricao ||
                "Gosto de jogar com pessoas que levam o jogo a sério, mas sem perder a diversão."}
            </p>

          </div>

          {/* PREFERÊNCIAS */}
          <div className="profile-bottom-card">

            <h2>
              Preferências
            </h2>

            <div className="profile-preferences">

              {preferencias.map((item) => (

                <div
                  className="profile-preference-item"
                  key={item}
                >

                  <span>
                    ✦
                  </span>

                  <p>
                    {item}
                  </p>

                </div>

              ))}

            </div>

          </div>

          {/* ATIVIDADES */}
          <div className="profile-bottom-card">

            <h2>
              Atividades Recentes
            </h2>

            <div className="profile-activity">

              <div className="profile-activity-icon">
                🎮
              </div>

              <div className="profile-activity-text">

                <strong>
                  Jogou League of Legends
                </strong>

                <span>
                  Há 2 horas
                </span>

              </div>

            </div>

            <div className="profile-activity">

              <div className="profile-activity-icon">
                🔥
              </div>

              <div className="profile-activity-text">

                <strong>
                  Atualizou seu perfil
                </strong>

                <span>
                  Ontem
                </span>

              </div>

            </div>

          </div>

        </section>

      </main>

      {/* ==================================================
          MODAL DE EDIÇÃO
      ================================================== */}
      {editando && (

        <EditProfileModal
          usuario={perfil}
          onFechar={() => setEditando(false)}
          onSalvar={salvarPerfil}
        />

      )}

    </div>
  );
}
