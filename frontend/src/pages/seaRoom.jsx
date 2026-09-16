import { useState } from "react";

import "./seaRoom.css";

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

import seaLogo from "../assets/games-icon/sea icon.png";

/* =====================================================
   FUNDO
===================================================== */

import background from "../assets/rooms-bg.png";


function SeaRoom({
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
      className="sea-room-page"
      style={{
        backgroundImage: `url(${background})`
      }}
    >

      <div className="sea-room-background-overlay"></div>


      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="sea-room-sidebar">

        <nav className="sea-room-sidebar-menu">

          {/* HOME */}

          <button
            className="sea-room-sidebar-item sea-room-sidebar-active"
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
            className="sea-room-sidebar-item"
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
            className="sea-room-sidebar-item"
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
            className="sea-room-sidebar-item"
            type="button"
            onClick={onFeedbacks}
            title="Feedbacks"
          >

            <span className="sea-room-feedback-star">
              ★
            </span>

          </button>


          {/* CONFIGURAÇÕES */}

          <button
            className="sea-room-sidebar-item"
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

      <div className="sea-room-content">


        {/* =====================================================
            NAVBAR
        ===================================================== */}

        <header className="sea-room-navbar">

          {/* LOGO */}

          <div className="sea-room-navbar-logo">

            <img
              src={logo}
              alt="LFG"
            />

          </div>


          {/* JOGOS EM DESTAQUE */}

          <div className="sea-room-games-navbar">


            {/* OVERWATCH */}

            <div
              className="sea-room-navbar-game"
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
              className="sea-room-navbar-game"
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
              className="sea-room-navbar-game"
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
              className="sea-room-navbar-game"
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
              className="sea-room-navbar-game"
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
              className="sea-room-navbar-game"
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
              className="sea-room-navbar-game "
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
              className="sea-room-navbar-game"
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

        <main className="sea-room-main">


          {/* =====================================================
              PESQUISA DO TOPO
          ===================================================== */}

          <div className="sea-room-top-search">

            <input
              type="text"
            />

          </div>


          {/* =====================================================
              JOGO SELECIONADO
          ===================================================== */}

          <div className="sea-room-selected-game">

            <img
              src={seaLogo}
              alt="Sea of Thieves"
              className="sea-room-selected-game-logo"
            />

          </div>


          {/* =====================================================
              FILTROS
          ===================================================== */}

          <div className="sea-room-filters">


            {/* BUSCAR */}

            <div className="sea-room-search-box">

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

            <div className="sea-room-filter-dropdown">

              <button
                className="sea-room-filter-button"
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

                <div className="sea-room-dropdown-menu">

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

            <div className="sea-room-filter-dropdown">

              <button
                className="sea-room-filter-button"
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

                <div className="sea-room-dropdown-menu">
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

            <div className="sea-room-filter-dropdown">

              <button
                className="sea-room-filter-button"
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

                <div className="sea-room-dropdown-menu">
                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "elo",
                          "Novato"
                        )
                      }
                    >
                      Novato
                    </button>
                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "elo",
                          "Pirata Experiente"
                        )
                      }
                    >
                      Pirata Experiente
                    </button>
                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "elo",
                          "Lenda dos Mares"
                        )
                      }
                    >
                      Lenda dos Mares
                    </button>
                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "elo",
                          "Lenda Pirata"
                        )
                      }
                    >
                      Lenda Pirata
                    </button>
                </div>

              )}

            </div>


            {/* =================================================
                MODO
            ================================================= */}

            <div className="sea-room-filter-dropdown">

              <button
                className="sea-room-filter-button"
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

                <div className="sea-room-dropdown-menu">
                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "modo",
                          "PvE"
                        )
                      }
                    >
                      PvE
                    </button>
                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "modo",
                          "Arena PvP"
                        )
                      }
                    >
                      Arena PvP
                    </button>
                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "modo",
                          "Fábulas do Mar Alto"
                        )
                      }
                    >
                      Fábulas do Mar Alto
                    </button>
                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "modo",
                          "Servidor Aberto"
                        )
                      }
                    >
                      Servidor Aberto
                    </button>
                </div>

              )}

            </div>


            {/* =================================================
                CRIAR SALA
            ================================================= */}

            <button
              className="sea-room-create-room"
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

          <div className="sea-room-room-card">


            {/* PERFIL DA SALA */}

            <div className="sea-room-room-profile">

              <div className="sea-room-profile-photo">

                <span>
                  👤
                </span>

              </div>


              <div className="sea-room-room-details">

                <h2>
                  Tripulação para Sessão
                </h2>


                <div className="sea-room-room-tags">

                  <span className="sea-room-rank-tag">
                    🏴‍☠️ Pirata Experiente
                  </span>


                  <span className="sea-room-mode-tag">

                    <img
                      src={seaLogo}
                      alt=""
                    />

                    Servidor Aberto

                  </span>

                </div>


                <div className="sea-room-gender-options">

                  <span className="sea-room-male">
                    ♂
                  </span>

                  <span className="sea-room-female">
                    ♀
                  </span>

                </div>


                <p>
                  Procuro tripulação pra caçar tesouros e navegar sem compromisso.
                </p>

              </div>

            </div>


            {/* MEMBROS */}

            <div className="sea-room-room-members">

              <strong>
                1/2
              </strong>

              <span>
                Criado há 8 min
              </span>

            </div>


            {/* ENTRAR */}

            <button
              className="sea-room-join-button"
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

export default SeaRoom;
