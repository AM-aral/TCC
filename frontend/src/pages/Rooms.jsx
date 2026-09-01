import "./Rooms.css";

import logo from "../assets/logo.png";

// MINI LOGOS
import owLogo from "../assets/icon/ow icon.png";
import cs2Logo from "../assets/icon/cs icon.png";
import valorantLogo from "../assets/icon/val icon.png";
import fortniteLogo from "../assets/icon/fortinite icon.png";
import rocketLogo from "../assets/icon/rocket icon.png";
import dotaLogo from "../assets/icon/dota icon.png";
import rivalsLogo from "../assets/icon/marvel icon.png";
import lolLogo from "../assets/icon/lol icon.png";

// FUNDO DO LOL
import lolBackground from "../assets/games/lol.png";

function Rooms({ game }) {

  if (!game) {
    return null;
  }

  return (
    <div
      className="rooms-page"
      style={{
        backgroundImage: `url(${lolBackground})`
      }}
    >

      {/* CAMADA ESCURA DO FUNDO */}
      <div className="rooms-background-overlay"></div>


      {/* ==============================
          BARRA LATERAL
      ============================== */}

      <aside className="sidebar">

        <img
          src={logo}
          alt="LFG"
          className="sidebar-logo"
        />

        <div className="sidebar-menu">

          <button className="sidebar-item active">
            <span>▥</span>
          </button>

          <button className="sidebar-item">
            <span>♟</span>
          </button>

          <button className="sidebar-item">
            <span>↶</span>
          </button>

          <button className="sidebar-item">
            <span>▤</span>
          </button>

          <button className="sidebar-item">
            <span>⚙</span>
          </button>

        </div>

      </aside>


      {/* ==============================
          CONTEÚDO
      ============================== */}

      <main className="rooms-content">


        {/* ==============================
            MINI LOGOS DOS JOGOS
        ============================== */}

        <nav className="games-menu">

          <div className="game-menu-item">

            <img
              src={owLogo}
              alt="Overwatch"
            />

            <span>OW</span>

          </div>


          <div className="game-menu-item">

            <img
              src={cs2Logo}
              alt="Counter Strike"
            />

            <span>CS</span>

          </div>


          <div className="game-menu-item">

            <img
              src={valorantLogo}
              alt="Valorant"
            />

            <span>Val</span>

          </div>


          <div className="game-menu-item">

            <img
              src={fortniteLogo}
              alt="Fortnite"
            />

            <span>Fortnite</span>

          </div>


          <div className="game-menu-item">

            <img
              src={rocketLogo}
              alt="Rocket League"
            />

            <span>RL</span>

          </div>


          <div className="game-menu-item">

            <img
              src={dotaLogo}
              alt="Dota 2"
            />

            <span>Dota</span>

          </div>


          <div className="game-menu-item">

            <img
              src={rivalsLogo}
              alt="Marvel Rivals"
            />

            <span>Rivals</span>

          </div>


          {/* LOL SELECIONADO */}

          <div className="game-menu-item selected">

            <img
              src={lolLogo}
              alt="League of Legends"
            />

            <span>LoL</span>

          </div>

        </nav>


        {/* ==============================
            ÁREA PRINCIPAL
        ============================== */}

        <section className="rooms-main">


          {/* LOGO GRANDE */}

          <div className="selected-game">

            <img
              src={game.logo}
              alt={game.name}
              className="selected-game-logo"
            />

          </div>


          {/* ==============================
              FILTROS
          ============================== */}

          <div className="filters">


            <div className="search-box">

              <span className="filter-icon">
                🔍
              </span>

              <input
                type="text"
                placeholder="Buscar sala..."
              />

            </div>


            <button className="filter-button">

              <span>
                ⚥
              </span>

              Gênero

              <b>⌄</b>

            </button>


            <button className="filter-button">

              <span>
                ♟
              </span>

              jogadores

              <b>⌄</b>

            </button>


            <button className="filter-button">

              <span>
                🏆
              </span>

              Elo

              <b>⌄</b>

            </button>


            <button className="filter-button">

              <span>
                🎮
              </span>

              Modo

              <b>⌄</b>

            </button>


            <button className="create-room">

              <strong>＋</strong>

              Criar Sala

            </button>

          </div>


          {/* ==============================
              SALA
          ============================== */}

          <div className="room-card">


            {/* FOTO */}

            <div className="profile-photo">

              <span>
                👤
              </span>

            </div>


            {/* INFORMAÇÕES */}

            <div className="room-info">

              <h2>
                Ranked Soloqueue
              </h2>


              <div className="tags">

                <span className="rank-tag">
                  🏆 Silver/Gold/Platina
                </span>

                <span className="mode-tag">

                  <img
                    src={lolLogo}
                    alt=""
                  />

                  Ranked Soloqueue

                </span>

              </div>


              <div className="gender">

                <span className="male">
                  ♂
                </span>

                <span className="female">
                  ♀
                </span>

              </div>


              <p>
                Procuro por um duo focado na vitória e na resenha
              </p>

            </div>


            {/* MEMBROS */}

            <div className="room-members">

              <strong>
                1/2
              </strong>

              <small>
                Criado há 8 min
              </small>

            </div>


            {/* ENTRAR */}

            <button className="join-button">
              ENTRA NA SALA
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Rooms;