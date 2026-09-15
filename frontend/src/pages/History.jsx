import "./History.css";

import logo from "../assets/logo.png";

// SIDEBAR
import homeIcon from "../assets/sidebar/home.png";
import perfilIcon from "../assets/sidebar/perfil.png";
import historicoIcon from "../assets/sidebar/historico.png";
import configuracoesIcon from "../assets/sidebar/configuracoes.png";

// MINI LOGOS DA NAVBAR
import owLogo from "../assets/icon/ow icon.png";
import cs2Logo from "../assets/icon/cs icon.png";
import valorantLogo from "../assets/icon/val icon.png";
import fortniteLogo from "../assets/icon/fortinite icon.png";
import rocketLogo from "../assets/icon/rocket icon.png";
import dotaLogo from "../assets/icon/dota icon.png";
import rivalsLogo from "../assets/icon/marvel icon.png";
import lolLogo from "../assets/icon/lol icon.png";

// FUNDO
import roomsBackground from "../assets/rooms-bg.png";

// IMAGENS DOS JOGOS
import lolBackground from "../assets/games/lol.png";
import valorantBackground from "../assets/games/valorant.png";
import csBackground from "../assets/games/cs2.png";

function History({
  onHome,
  onProfile,
  onHistory,
  onFeedbacks,
  onSettings,
  onGameSelect
}) {

  // =====================================================
  // FUNÇÃO PARA SELECIONAR JOGO
  // =====================================================

  const selecionarJogo = (game) => {
    if (typeof onGameSelect === "function") {
      onGameSelect(game);
    }
  };

  // =====================================================
  // HISTÓRICO
  // =====================================================

  const historico = [
    {
      id: 1,
      jogo: "League of Legends",
      imagem: lolBackground,
      sala: "Ranked Soloqueue",
      tipo: "Participou",
      elo: "Platina",
      jogadores: "2/5",
      data: "Hoje, 12:40",
      status: "Concluída"
    },

    {
      id: 2,
      jogo: "Valorant",
      imagem: valorantBackground,
      sala: "Ranked para subir",
      tipo: "Criou",
      elo: "Diamante",
      jogadores: "4/5",
      data: "Hoje, 10:15",
      status: "Concluída"
    },

    {
      id: 3,
      jogo: "Counter-Strike 2",
      imagem: csBackground,
      sala: "Duo competitivo",
      tipo: "Participou",
      elo: "AK",
      jogadores: "2/2",
      data: "Ontem, 21:30",
      status: "Concluída"
    },

    {
      id: 4,
      jogo: "League of Legends",
      imagem: lolBackground,
      sala: "Procurando duo",
      tipo: "Criou",
      elo: "Ouro",
      jogadores: "2/2",
      data: "Ontem, 18:20",
      status: "Finalizada"
    },

    {
      id: 5,
      jogo: "Valorant",
      imagem: valorantBackground,
      sala: "Ranked 5x5",
      tipo: "Participou",
      elo: "Ascendente",
      jogadores: "5/5",
      data: "12/09/2026, 20:00",
      status: "Concluída"
    },

    {
      id: 6,
      jogo: "Counter-Strike 2",
      imagem: csBackground,
      sala: "Procurando time",
      tipo: "Criou",
      elo: "Ouro",
      jogadores: "3/5",
      data: "11/09/2026, 16:45",
      status: "Cancelada"
    }
  ];

  return (
    <div
      className="history-page"
      style={{
        backgroundImage: `url(${roomsBackground})`
      }}
    >

      <div className="history-background-overlay"></div>

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="history-sidebar">

        <nav className="history-sidebar-menu">

          {/* HOME */}

          <button
            className="history-sidebar-item"
            type="button"
            onClick={onHome}
            title="Home"
          >
            <img
              src={homeIcon}
              alt="Home"
            />
          </button>

          {/* PERFIL */}

          <button
            className="history-sidebar-item"
            type="button"
            onClick={onProfile}
            title="Perfil"
          >
            <img
              src={perfilIcon}
              alt="Perfil"
            />
          </button>

          {/* HISTÓRICO */}

          <button
            className="history-sidebar-item history-sidebar-active"
            type="button"
            onClick={onHistory}
            title="Histórico"
          >
            <img
              src={historicoIcon}
              alt="Histórico"
            />
          </button>

          {/* FEEDBACKS */}

          <button
            className="history-sidebar-item"
            type="button"
            onClick={onFeedbacks}
            title="Feedbacks"
          >
            <span className="history-feedback-star">
              ★
            </span>
          </button>

          {/* CONFIGURAÇÕES */}

          <button
            className="history-sidebar-item"
            type="button"
            onClick={onSettings}
            title="Configurações"
          >
            <img
              src={configuracoesIcon}
              alt="Configurações"
            />
          </button>

        </nav>

      </aside>

      {/* =====================================================
          CONTEÚDO
      ===================================================== */}

      <div className="history-content">

        {/* =====================================================
            NAVBAR
        ===================================================== */}

        <header className="history-navbar">

          {/* LOGO */}

          <div
            className="history-navbar-logo"
            onClick={onHome}
            title="Home"
          >
            <img
              src={logo}
              alt="LFG"
            />
          </div>

          {/* JOGOS */}

          <div className="history-games-navbar">

            {/* OVERWATCH */}

            <div
              className="history-navbar-game"
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
              className="history-navbar-game"
              onClick={() => selecionarJogo("Counter-Strike 2")}
            >
              <img
                src={cs2Logo}
                alt="Counter-Strike 2"
              />

              <span>
                CS2
              </span>
            </div>

            {/* VALORANT */}

            <div
              className="history-navbar-game"
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
              className="history-navbar-game"
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
              className="history-navbar-game"
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
              className="history-navbar-game"
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
              className="history-navbar-game"
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
              className="history-navbar-game"
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

        {/* =====================================================
            ÁREA PRINCIPAL
        ===================================================== */}

        <main className="history-main">

          {/* CABEÇALHO */}

          <div className="history-header">

            <div>

              <h1>
                Histórico
              </h1>

              <p>
                Veja suas salas criadas e partidas que você participou.
              </p>

            </div>

            {/* BUSCA */}

            <div className="history-search">

              <span>
                ⌕
              </span>

              <input
                type="text"
                placeholder="Buscar no histórico..."
              />

            </div>

          </div>

          {/* =====================================================
              RESUMO
          ===================================================== */}

          <div className="history-summary">

            <div className="history-summary-card">
              <strong>24</strong>
              <span>Atividades</span>
            </div>

            <div className="history-summary-card">
              <strong>8</strong>
              <span>Salas criadas</span>
            </div>

            <div className="history-summary-card">
              <strong>16</strong>
              <span>Salas participadas</span>
            </div>

            <div className="history-summary-card">
              <strong>21</strong>
              <span>Concluídas</span>
            </div>

          </div>

          {/* =====================================================
              FILTROS
          ===================================================== */}

          <div className="history-filters">

            <button
              type="button"
              className="history-filter active"
            >
              Todas
            </button>

            <button
              type="button"
              className="history-filter"
            >
              Criadas
            </button>

            <button
              type="button"
              className="history-filter"
            >
              Participadas
            </button>

            <button
              type="button"
              className="history-filter"
            >
              Concluídas
            </button>

          </div>

          {/* =====================================================
              LISTA
          ===================================================== */}

          <section className="history-list">

            {historico.map((item) => (

              <article
                className="history-card"
                key={item.id}
              >

                {/* IMAGEM DO JOGO */}

                <div
                  className="history-card-image"
                  style={{
                    backgroundImage: `url(${item.imagem})`
                  }}
                >
                  <div className="history-card-image-overlay"></div>
                </div>

                {/* INFORMAÇÕES */}

                <div className="history-card-info">

                  <div className="history-card-title">

                    <div>

                      <span className="history-game-name">
                        {item.jogo}
                      </span>

                      <h2>
                        {item.sala}
                      </h2>

                    </div>

                    {/* STATUS */}

                    <span
                      className={
                        item.status === "Cancelada"
                          ? "history-status cancelled"
                          : "history-status"
                      }
                    >
                      {item.status}
                    </span>

                  </div>

                  {/* TAGS */}

                  <div className="history-tags">

                    <span className="history-tag type">
                      {item.tipo}
                    </span>

                    <span className="history-tag">
                      Elo: {item.elo}
                    </span>

                    <span className="history-tag">
                      👥 {item.jogadores}
                    </span>

                  </div>

                  {/* DATA */}

                  <span className="history-date">
                    🕒 {item.data}
                  </span>

                </div>

              </article>

            ))}

          </section>

        </main>

      </div>

    </div>
  );
}

export default History;