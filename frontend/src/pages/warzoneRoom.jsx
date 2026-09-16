import { useState } from "react";

import "./warzoneRoom.css";

import logo from "../assets/logo.png";

/* =====================================================
   SIDEBAR
===================================================== */

import homeIcon from "../assets/sidebar/home.png";
import perfilIcon from "../assets/sidebar/perfil.png";
import historicoIcon from "../assets/sidebar/historico.png";
import configuracoesIcon from "../assets/sidebar/configuracoes.png";

/* =====================================================
   ÍCONES DA NAVBAR (jogos em destaque)
===================================================== */

import owLogo from "../assets/icon/ow icon.png";
import csLogo from "../assets/icon/cs icon.png";
import valorantLogo from "../assets/icon/val icon.png";
import fortniteLogo from "../assets/icon/fortinite icon.png";
import rocketLogo from "../assets/icon/rocket icon.png";
import dotaLogo from "../assets/icon/dota icon.png";
import rivalsLogo from "../assets/icon/marvel icon.png";
import lolLogo from "../assets/icon/lol icon.png";

/* =====================================================
   LOGO GRANDE / ÍCONE DA SALA
===================================================== */

import warzoneLogo from "../assets/games-icon/warzone icon.png";

/* =====================================================
   FUNDO
===================================================== */

import background from "../assets/rooms-bg.png";


function WarzoneRoom({
  game,
  onHome,
  onCreateRoom,
  onProfile,
  onHistory,
  onFeedbacks,
  onSettings,
  onSelectGame
}) {

  const [menuAberto, setMenuAberto] = useState(null);

  const [filtros, setFiltros] = useState({
    genero: "Gênero",
    jogadores: "jogadores",
    elo: "Elo",
    modo: "Modo"
  });


  if (!game) {
    return null;
  }


  /* =====================================================
     ABRIR DROPDOWN
  ===================================================== */

  function abrirMenu(tipo) {

    setMenuAberto(
      menuAberto === tipo ? null : tipo
    );

  }


  /* =====================================================
     SELECIONAR FILTRO
  ===================================================== */

  function selecionarFiltro(tipo, valor) {

    setFiltros({
      ...filtros,
      [tipo]: valor
    });

    setMenuAberto(null);

  }


  return (

    <div
      className="warzone-room-page"
      style={{
        backgroundImage: `url(${background})`
      }}
    >

      <div className="warzone-room-background-overlay"></div>


      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="warzone-room-sidebar">

        <nav className="warzone-room-sidebar-menu">

          {/* HOME */}

          <button
            className="warzone-room-sidebar-item warzone-room-sidebar-active"
            onClick={onHome}
            type="button"
          >

            <img
              src={homeIcon}
              alt="Home"
            />

          </button>


          {/* PERFIL */}

          <button
            className="warzone-room-sidebar-item"
            type="button"
            onClick={onProfile}
          >

            <img
              src={perfilIcon}
              alt="Perfil"
            />

          </button>


          {/* HISTÓRICO */}

          <button
            className="warzone-room-sidebar-item"
            type="button"
            onClick={onHistory}
          >

            <img
              src={historicoIcon}
              alt="Histórico"
            />

          </button>


          {/* FEEDBACKS */}

          <button
            className="warzone-room-sidebar-item"
            type="button"
            onClick={onFeedbacks}
            title="Feedbacks"
          >

            <span className="warzone-room-feedback-star">
              ★
            </span>

          </button>


          {/* CONFIGURAÇÕES */}

          <button
            className="warzone-room-sidebar-item"
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

      <div className="warzone-room-content">


        {/* =====================================================
            NAVBAR
        ===================================================== */}

        <header className="warzone-room-navbar">

          {/* LOGO */}

          <div className="warzone-room-navbar-logo">

            <img
              src={logo}
              alt="LFG"
            />

          </div>


          {/* JOGOS EM DESTAQUE */}

          <div className="warzone-room-games-navbar">


            {/* OVERWATCH */}

            <div
              className="warzone-room-navbar-game"
              onClick={() => onSelectGame("Overwatch")}
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
              className="warzone-room-navbar-game"
              onClick={() => onSelectGame("Counter-Strike 2")}
            >

              <img
                src={csLogo}
                alt="Counter-Strike 2"
              />

              <span>
                CS2
              </span>

            </div>


            {/* VALORANT */}

            <div
              className="warzone-room-navbar-game"
              onClick={() => onSelectGame("Valorant")}
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
              className="warzone-room-navbar-game"
              onClick={() => onSelectGame("Fortnite")}
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
              className="warzone-room-navbar-game"
              onClick={() => onSelectGame("Rocket League")}
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
              className="warzone-room-navbar-game"
              onClick={() => onSelectGame("Dota 2")}
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
              className="warzone-room-navbar-game "
              onClick={() => onSelectGame("Marvel Rivals")}
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
              className="warzone-room-navbar-game"
              onClick={() => onSelectGame("League of Legends")}
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

        <main className="warzone-room-main">


          {/* =====================================================
              PESQUISA DO TOPO
          ===================================================== */}

          <div className="warzone-room-top-search">

            <input
              type="text"
            />

          </div>


          {/* =====================================================
              JOGO SELECIONADO
          ===================================================== */}

          <div className="warzone-room-selected-game">

            <img
              src={warzoneLogo}
              alt="Warzone"
              className="warzone-room-selected-game-logo"
            />

          </div>


          {/* =====================================================
              FILTROS
          ===================================================== */}

          <div className="warzone-room-filters">


            {/* BUSCAR */}

            <div className="warzone-room-search-box">

              <span>
                ⌕
              </span>

              <input
                type="text"
                placeholder="Buscar sala..."
              />

            </div>


            {/* =================================================
                GÊNERO
            ================================================= */}

            <div className="warzone-room-filter-dropdown">

              <button
                className="warzone-room-filter-button"
                onClick={() => abrirMenu("genero")}
                type="button"
              >

                <span>
                  ⚥
                </span>

                <span>
                  {filtros.genero}
                </span>

                <b>
                  ⌄
                </b>

              </button>


              {menuAberto === "genero" && (

                <div className="warzone-room-dropdown-menu">

                  <button
                    onClick={() =>
                      selecionarFiltro(
                        "genero",
                        "Masculino"
                      )
                    }
                  >
                    Masculino
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro(
                        "genero",
                        "Feminino"
                      )
                    }
                  >
                    Feminino
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro(
                        "genero",
                        "Qualquer"
                      )
                    }
                  >
                    Qualquer
                  </button>

                </div>

              )}

            </div>


            {/* =================================================
                JOGADORES
            ================================================= */}

            <div className="warzone-room-filter-dropdown">

              <button
                className="warzone-room-filter-button"
                onClick={() => abrirMenu("jogadores")}
                type="button"
              >

                <span>
                  ♟
                </span>

                <span>
                  {filtros.jogadores}
                </span>

                <b>
                  ⌄
                </b>

              </button>


              {menuAberto === "jogadores" && (

                <div className="warzone-room-dropdown-menu">
                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "jogadores",
                          "1 jogador"
                        )
                      }
                    >
                      1 jogador
                    </button>
                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "jogadores",
                          "2 jogadores"
                        )
                      }
                    >
                      2 jogadores
                    </button>
                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "jogadores",
                          "3 jogadores"
                        )
                      }
                    >
                      3 jogadores
                    </button>
                </div>

              )}

            </div>


            {/* =================================================
                ELO
            ================================================= */}

            <div className="warzone-room-filter-dropdown">

              <button
                className="warzone-room-filter-button"
                onClick={() => abrirMenu("elo")}
                type="button"
              >

                <span>
                  ♛
                </span>

                <span>
                  {filtros.elo}
                </span>

                <b>
                  ⌄
                </b>

              </button>


              {menuAberto === "elo" && (

                <div className="warzone-room-dropdown-menu">
                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "elo",
                          "Bronze"
                        )
                      }
                    >
                      Bronze
                    </button>
                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "elo",
                          "Prata"
                        )
                      }
                    >
                      Prata
                    </button>
                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "elo",
                          "Ouro"
                        )
                      }
                    >
                      Ouro
                    </button>
                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "elo",
                          "Platina"
                        )
                      }
                    >
                      Platina
                    </button>
                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "elo",
                          "Diamante"
                        )
                      }
                    >
                      Diamante
                    </button>
                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "elo",
                          "Carmesim"
                        )
                      }
                    >
                      Carmesim
                    </button>
                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "elo",
                          "Iridescente"
                        )
                      }
                    >
                      Iridescente
                    </button>
                </div>

              )}

            </div>


            {/* =================================================
                MODO
            ================================================= */}

            <div className="warzone-room-filter-dropdown">

              <button
                className="warzone-room-filter-button"
                onClick={() => abrirMenu("modo")}
                type="button"
              >

                <span>
                  🎮
                </span>

                <span>
                  {filtros.modo}
                </span>

                <b>
                  ⌄
                </b>

              </button>


              {menuAberto === "modo" && (

                <div className="warzone-room-dropdown-menu">
                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "modo",
                          "Battle Royale"
                        )
                      }
                    >
                      Battle Royale
                    </button>
                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "modo",
                          "Ranked Play"
                        )
                      }
                    >
                      Ranked Play
                    </button>
                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "modo",
                          "Plunder"
                        )
                      }
                    >
                      Plunder
                    </button>
                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "modo",
                          "Resurgence"
                        )
                      }
                    >
                      Resurgence
                    </button>
                </div>

              )}

            </div>


            {/* =================================================
                CRIAR SALA
            ================================================= */}

            <button
              className="warzone-room-create-room"
              onClick={onCreateRoom}
              type="button"
            >

              <strong>
                +
              </strong>

              <span>
                Criar Sala
              </span>

            </button>

          </div>


          {/* =====================================================
              SALA
          ===================================================== */}

          <div className="warzone-room-room-card">


            {/* PERFIL DA SALA */}

            <div className="warzone-room-room-profile">

              <div className="warzone-room-profile-photo">

                <span>
                  👤
                </span>

              </div>


              <div className="warzone-room-room-details">

                <h2>
                  Ranked Play - Trio
                </h2>


                <div className="warzone-room-room-tags">

                  <span className="warzone-room-rank-tag">
                    🏆 Ouro/Platina
                  </span>


                  <span className="warzone-room-mode-tag">

                    <img
                      src={warzoneLogo}
                      alt=""
                    />

                    Ranked Play

                  </span>

                </div>


                <div className="warzone-room-gender-options">

                  <span className="warzone-room-male">
                    ♂
                  </span>

                  <span className="warzone-room-female">
                    ♀
                  </span>

                </div>


                <p>
                  Procuro squad pra ranked play, foco em vitória.
                </p>

              </div>

            </div>


            {/* MEMBROS */}

            <div className="warzone-room-room-members">

              <strong>
                1/2
              </strong>

              <span>
                Criado há 8 min
              </span>

            </div>


            {/* ENTRAR */}

            <button
              className="warzone-room-join-button"
              type="button"
            >
              ENTRA NA SALA
            </button>

          </div>

        </main>

      </div>

    </div>
  );
}

export default WarzoneRoom;
