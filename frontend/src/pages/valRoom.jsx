
import { useState } from "react";

import "./valRoom.css";

import logo from "../assets/logo.png";

/* =====================================================
   SIDEBAR
===================================================== */

import homeIcon from "../assets/sidebar/home.png";
import perfilIcon from "../assets/sidebar/perfil.png";
import historicoIcon from "../assets/sidebar/historico.png";
import configuracoesIcon from "../assets/sidebar/configuracoes.png";

/* =====================================================
   ÍCONES DOS JOGOS
===================================================== */

import owLogo from "../assets/icon/ow icon.png";
import cs2Logo from "../assets/icon/cs icon.png";
import valorantLogo from "../assets/games-icon/valoranticon.png";
import fortniteLogo from "../assets/icon/fortinite icon.png";
import rocketLogo from "../assets/icon/rocket icon.png";
import dotaLogo from "../assets/icon/dota icon.png";
import rivalsLogo from "../assets/icon/marvel icon.png";
import lolLogo from "../assets/icon/lol icon.png";

/* =====================================================
   FUNDO
===================================================== */

import valorantBackground from "../assets/rooms-bg.png";


function ValRoom({
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
    funcao: "Função",
    modo: "Modo"
  });


  // =====================================================
  // ABRIR MENU
  // =====================================================

  function abrirMenu(tipo) {

    setMenuAberto(
      menuAberto === tipo
        ? null
        : tipo
    );

  }


  // =====================================================
  // SELECIONAR FILTRO
  // =====================================================

  function selecionarFiltro(tipo, valor) {

    setFiltros({
      ...filtros,
      [tipo]: valor
    });

    setMenuAberto(null);

  }


  return (

    <div
      className="val-room-page"
      style={{
        backgroundImage: `url(${valorantBackground})`
      }}
    >

      <div className="val-room-background-overlay"></div>


      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="val-room-sidebar">

        <nav className="val-room-sidebar-menu">

          {/* HOME */}

          <button
            className="val-room-sidebar-item val-room-sidebar-active"
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
            className="val-room-sidebar-item"
            onClick={onProfile}
            type="button"
          >

            <img
              src={perfilIcon}
              alt="Perfil"
            />

          </button>


          {/* HISTÓRICO */}

          <button
            className="val-room-sidebar-item"
            onClick={onHistory}
            type="button"
          >

            <img
              src={historicoIcon}
              alt="Histórico"
            />

          </button>


          {/* FEEDBACKS */}

          <button
            className="val-room-sidebar-item"
            onClick={onFeedbacks}
            type="button"
            title="Feedbacks"
          >

            <span className="val-room-feedback-star">
              ★
            </span>

          </button>


          {/* CONFIGURAÇÕES */}

          <button
            className="val-room-sidebar-item"
            onClick={onSettings}
            type="button"
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

      <div className="val-room-content">


        {/* =====================================================
            NAVBAR
        ===================================================== */}

        <header className="val-room-navbar">


          {/* LOGO DO SITE */}

          <div className="val-room-navbar-logo">

            <img
              src={logo}
              alt="LFG"
            />

          </div>


          {/* JOGOS */}

          <div className="val-room-games-navbar">


            {/* OVERWATCH */}

            <div
              className="val-room-navbar-game"
              onClick={() =>
                onSelectGame("Overwatch")
              }
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
              className="val-room-navbar-game"
              onClick={() =>
                onSelectGame("Counter-Strike 2")
              }
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
              className="val-room-navbar-game val-room-navbar-active"
              onClick={() =>
                onSelectGame("Valorant")
              }
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
              className="val-room-navbar-game"
              onClick={() =>
                onSelectGame("Fortnite")
              }
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
              className="val-room-navbar-game"
              onClick={() =>
                onSelectGame("Rocket League")
              }
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
              className="val-room-navbar-game"
              onClick={() =>
                onSelectGame("Dota 2")
              }
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
              className="val-room-navbar-game"
              onClick={() =>
                onSelectGame("Marvel Rivals")
              }
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
              className="val-room-navbar-game"
              onClick={() =>
                onSelectGame("League of Legends")
              }
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

        <main className="val-room-main">


          {/* =====================================================
              PESQUISA SUPERIOR
          ===================================================== */}

          <div className="val-top-search">

            <input
              type="text"
              placeholder="Pesquisar..."
            />

          </div>


          {/* =====================================================
              LOGO DO VALORANT
          ===================================================== */}

          <div className="val-selected-game">

            <img
              src={valorantLogo}
              alt="Valorant"
              className="val-selected-game-logo"
            />

          </div>


          {/* =====================================================
              FILTROS
          ===================================================== */}

          <div className="val-filters">


            {/* =================================================
                BUSCA
            ================================================= */}

            <div className="val-search-box">

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

            <div className="val-filter-dropdown">

              <button
                className="val-filter-button"
                onClick={() =>
                  abrirMenu("genero")
                }
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

                <div className="val-dropdown-menu">

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

            <div className="val-filter-dropdown">

              <button
                className="val-filter-button"
                onClick={() =>
                  abrirMenu("jogadores")
                }
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

                <div className="val-dropdown-menu">

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

                  <button
                    onClick={() =>
                      selecionarFiltro(
                        "jogadores",
                        "4 jogadores"
                      )
                    }
                  >
                    4 jogadores
                  </button>

                </div>

              )}

            </div>


            {/* =================================================
                ELO
            ================================================= */}

            <div className="val-filter-dropdown">

              <button
                className="val-filter-button"
                onClick={() =>
                  abrirMenu("elo")
                }
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

                <div className="val-dropdown-menu">

                  <button
                    onClick={() =>
                      selecionarFiltro(
                        "elo",
                        "Ascendente"
                      )
                    }
                  >
                    Ascendente
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro(
                        "elo",
                        "Ascendente 2"
                      )
                    }
                  >
                    Ascendente 2
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro(
                        "elo",
                        "Ascendente 3"
                      )
                    }
                  >
                    Ascendente 3
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro(
                        "elo",
                        "Diamante 2"
                      )
                    }
                  >
                    Diamante 2
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro(
                        "elo",
                        "Diamante 3"
                      )
                    }
                  >
                    Diamante 3
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro(
                        "elo",
                        "Imortal"
                      )
                    }
                  >
                    Imortal
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro(
                        "elo",
                        "Imortal 2"
                      )
                    }
                  >
                    Imortal 2
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro(
                        "elo",
                        "Imortal 3"
                      )
                    }
                  >
                    Imortal 3
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro(
                        "elo",
                        "Radiante"
                      )
                    }
                  >
                    Radiante
                  </button>

                </div>

              )}

            </div>


            {/* =================================================
                FUNÇÃO
            ================================================= */}

            <div className="val-filter-dropdown">

              <button
                className="val-filter-button"
                onClick={() =>
                  abrirMenu("funcao")
                }
                type="button"
              >

                <span>
                  ⚔
                </span>

                <span>
                  {filtros.funcao}
                </span>

                <b>
                  ⌄
                </b>

              </button>


              {menuAberto === "funcao" && (

                <div className="val-dropdown-menu">

                  <button
                    onClick={() =>
                      selecionarFiltro(
                        "funcao",
                        "Duelista"
                      )
                    }
                  >
                    Duelista
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro(
                        "funcao",
                        "Controlador"
                      )
                    }
                  >
                    Controlador
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro(
                        "funcao",
                        "Iniciador"
                      )
                    }
                  >
                    Iniciador
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro(
                        "funcao",
                        "Sentinela"
                      )
                    }
                  >
                    Sentinela
                  </button>

                </div>

              )}

            </div>


            {/* =================================================
                MODO
            ================================================= */}

            <div className="val-filter-dropdown">

              <button
                className="val-filter-button"
                onClick={() =>
                  abrirMenu("modo")
                }
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

                <div className="val-dropdown-menu">

                  <button
                    onClick={() =>
                      selecionarFiltro(
                        "modo",
                        "Competitivo"
                      )
                    }
                  >
                    Competitivo
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro(
                        "modo",
                        "Sem Classificação"
                      )
                    }
                  >
                    Sem Classificação
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro(
                        "modo",
                        "Swiftplay"
                      )
                    }
                  >
                    Swiftplay
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro(
                        "modo",
                        "Premier"
                      )
                    }
                  >
                    Premier
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro(
                        "modo",
                        "Deathmatch"
                      )
                    }
                  >
                    Deathmatch
                  </button>

                </div>

              )}

            </div>


            {/* =================================================
                CRIAR SALA
            ================================================= */}

            <button
              className="val-create-room"
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

          <div className="val-room-card">


            {/* =================================================
                PERFIL
            ================================================= */}

            <div className="val-room-profile">

              <div className="val-profile-photo">

                <span>
                  👤
                </span>

              </div>


              <div className="val-room-details">

                <h2>
                  Competitivo - Duo
                </h2>


                <div className="val-room-tags">

                  <span className="val-rank-tag">
                    🏆 Diamante / Ascendente
                  </span>


                  <span className="val-mode-tag">

                    <img
                      src={valorantLogo}
                      alt=""
                    />

                    Competitivo

                  </span>

                </div>


                <div className="val-gender-options">

                  <span className="val-male">
                    ♂
                  </span>

                  <span className="val-female">
                    ♀
                  </span>

                </div>


                <p>
                  Procuro duo para jogar competitivo e subir de elo.
                </p>

              </div>

            </div>


            {/* =================================================
                MEMBROS
            ================================================= */}

            <div className="val-room-members">

              <strong>
                1/2
              </strong>

              <span>
                Criado há 5 min
              </span>

            </div>


            {/* =================================================
                ENTRAR
            ================================================= */}

            <button
              className="val-join-button"
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


export default ValRoom;

