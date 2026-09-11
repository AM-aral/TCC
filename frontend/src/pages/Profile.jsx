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

// JOGOS
import lolGame from "../assets/games/lol.png";
import valorantGame from "../assets/games/valorant.png";
import csGame from "../assets/games/cs2.png";

// PERFIL
import profilePhoto from "../assets/profile/profile-photo.png";
import profileBanner from "../assets/profile/banner.png";

// ELOS
import lolDesafiante from "../assets/elos/lol/desafiante.png";
import csGlobal from "../assets/elos/cs/Global.png";

// FUNÇÕES
import topIcon from "../assets/funcoes/top.png";
import jungleIcon from "../assets/funcoes/jungle.png";

import duelistaIcon from "../assets/funcoes/duelista.png";
import iniciadorIcon from "../assets/funcoes/iniciador.png";

import awperIcon from "../assets/funcoes/awper.png";
import lurkerIcon from "../assets/funcoes/lurker.png";

import "./Profile.css";

// ======================================================
// PROCURAR AUTOMATICAMENTE O RADIANTE
// ======================================================

const valorantRanks = import.meta.glob(
  "../assets/elos/valorant/*",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

const valorantRadiante =
  Object.entries(valorantRanks).find(([path]) =>
    path.toLowerCase().includes("radiante")
  )?.[1] || null;

// ======================================================
// JOGOS DO PERFIL
// ======================================================

const games = [
  {
    id: "lol",

    image: lolGame,

    name: "LEAGUE OF LEGENDS",

    rank: "Desafiante",
    rankInfo: "1467 Pdl",
    rankImage: lolDesafiante,

    mainLabel: "Rota Principal",
    mainIcon: topIcon,

    secondaryLabel: "Rota Secundária",
    secondaryIcon: jungleIcon,
  },

  {
    id: "valorant",

    image: valorantGame,

    name: "VALORANT",

    rank: "Radiante",
    rankInfo: "Top 1 BR",
    rankImage: valorantRadiante,

    mainLabel: "Função Principal",
    mainIcon: duelistaIcon,

    secondaryLabel: "Função Secundária",
    secondaryIcon: iniciadorIcon,
  },

  {
    id: "cs",

    image: csGame,

    name: "COUNTER STRIKE",

    rank: "Global Elite",
    rankInfo: "★",
    rankImage: csGlobal,

    mainLabel: "Função Principal",
    mainIcon: awperIcon,

    secondaryLabel: "Função Secundária",
    secondaryIcon: lurkerIcon,
  },
];

// ======================================================
// COMPONENTE
// ======================================================

export default function Profile({
  onHome,
  onHistory,
  onFeedbacks,
  onGameSelect,
}) {

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
            src={profileBanner}
            className="profile-banner-background"
            alt=""
          />

          {/* ESCURECIMENTO */}

          <div className="profile-banner-dark"></div>

          {/* INFORMAÇÕES */}

          <div className="profile-user-area">

            {/* FOTO */}

            <div className="profile-avatar-wrapper">

              <img
                src={profilePhoto}
                className="profile-avatar"
                alt="Foto de perfil"
              />

              <span className="profile-online-dot"></span>

            </div>

            {/* TEXTOS */}

            <div className="profile-user-text">

              <h1>
                TENEBROSO_DA_CINTURA_TORTA
              </h1>

              <span className="profile-user-name">
                @ESJMELO
              </span>

              <p>
                Procurando players para jogar e subir de elo.
              </p>

              {/* TAGS */}

              <div className="profile-user-tags">

                <span>
                  🎮 Casual
                </span>

                <span>
                  🏆 Competitivo
                </span>

                <span>
                  🔥 Tryhard
                </span>

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
              3 jogos
            </span>

          </div>

          {/* CARDS */}

          <div className="profile-games-grid">

            {games.map((game) => (

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

                      <span>
                        {game.rankInfo}
                      </span>

                    </div>

                  </div>

                </div>

                {/* RODAPÉ */}

                <div className="profile-game-footer">

                  {/* FUNÇÃO PRINCIPAL */}

                  <div className="profile-game-role">

                    <img
                      src={game.mainIcon}
                      alt=""
                    />

                    <div>

                      <span>
                        {game.mainLabel}
                      </span>

                      <strong>
                        Principal
                      </strong>

                    </div>

                  </div>

                  {/* FUNÇÃO SECUNDÁRIA */}

                  <div className="profile-game-role">

                    <img
                      src={game.secondaryIcon}
                      alt=""
                    />

                    <div>

                      <span>
                        {game.secondaryLabel}
                      </span>

                      <strong>
                        Secundária
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
              Gosto de jogar com pessoas que levam o jogo
              a sério, mas sem perder a diversão.
            </p>

          </div>

          {/* PREFERÊNCIAS */}

          <div className="profile-bottom-card">

            <h2>
              Preferências
            </h2>

            <div className="profile-preferences">

              <div className="profile-preference-item">

                <span>
                  🎙️
                </span>

                <p>
                  Comunicação por voz
                </p>

              </div>

              <div className="profile-preference-item">

                <span>
                  🏆
                </span>

                <p>
                  Competitivo
                </p>

              </div>

              <div className="profile-preference-item">

                <span>
                  🌎
                </span>

                <p>
                  Servidor Brasil
                </p>

              </div>

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

    </div>
  );
}
