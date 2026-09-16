import { useState } from "react";

import "./overRoom.css";

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

// ÍCONE DA NAVBAR — permanece na pasta icon
import owIcon from "../assets/icon/ow icon.png";

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

import owBigLogo from "../assets/games-icon/ow icon.png";

/* =====================================================
   FUNDO
===================================================== */

import overBackground from "../assets/rooms-bg.png";


function OverRoom({
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
      className="over-room-page"
      style={{
        backgroundImage: `url(${overBackground})`
      }}
    >

      <div className="over-room-background-overlay"></div>


      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="over-room-sidebar">

        <nav className="over-room-sidebar-menu">

          {/* HOME */}

          <button
            className="over-room-sidebar-item over-room-sidebar-active"
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
            className="over-room-sidebar-item"
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
            className="over-room-sidebar-item"
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
            className="over-room-sidebar-item"
            type="button"
            onClick={onFeedbacks}
            title="Feedbacks"
          >

            <span className="over-room-feedback-star">
              ★
            </span>

          </button>


          {/* CONFIGURAÇÕES */}

          <button
            className="over-room-sidebar-item"
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

      <div className="over-room-content">


        {/* =====================================================
            NAVBAR
        ===================================================== */}

        <header className="over-room-navbar">

          {/* LOGO */}

          <div className="over-room-navbar-logo">

            <img
              src={logo}
              alt="LFG"
            />

          </div>


          {/* JOGOS */}

          <div className="over-room-games-navbar">


            {/* OVERWATCH */}

            <div
              className="over-room-navbar-game over-room-navbar-active"
              onClick={() => onSelectGame("Overwatch")}
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
              className="over-room-navbar-game"
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
              className="over-room-navbar-game"
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
              className="over-room-navbar-game"
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
              className="over-room-navbar-game"
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
              className="over-room-navbar-game"
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
              className="over-room-navbar-game"
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
              className="over-room-navbar-game"
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

        <main className="over-room-main">


          {/* =====================================================
              PESQUISA DO TOPO
          ===================================================== */}

          <div className="over-top-search">

            <input
              type="text"
            />

          </div>


          {/* =====================================================
              JOGO SELECIONADO
          ===================================================== */}

          <div className="over-selected-game">

            <img
              src={owBigLogo}
              alt="Overwatch"
              className="over-selected-game-logo"
            />

          </div>


          {/* =====================================================
              FILTROS
          ===================================================== */}

          <div className="over-filters">


            {/* BUSCAR */}

            <div className="over-search-box">

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

            <div className="over-filter-dropdown">

              <button
                className="over-filter-button"
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

                <div className="over-dropdown-menu">

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

            <div className="over-filter-dropdown">

              <button
                className="over-filter-button"
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

                <div className="over-dropdown-menu">

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

            <div className="over-filter-dropdown">

              <button
                className="over-filter-button"
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

                <div className="over-dropdown-menu">

                  <button
                    onClick={() =>
                      selecionarFiltro("elo", "Bronze")
                    }
                  >
                    Bronze
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro("elo", "Prata")
                    }
                  >
                    Prata
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro("elo", "Ouro")
                    }
                  >
                    Ouro
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro("elo", "Platina")
                    }
                  >
                    Platina
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro("elo", "Diamante")
                    }
                  >
                    Diamante
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro("elo", "Mestre")
                    }
                  >
                    Mestre
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro(
                        "elo",
                        "Grão-Mestre"
                      )
                    }
                  >
                    Grão-Mestre
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro(
                        "elo",
                        "Campeão"
                      )
                    }
                  >
                    Campeão
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro(
                        "elo",
                        "Top 500"
                      )
                    }
                  >
                    Top 500
                  </button>

                </div>

              )}

            </div>


            {/* =================================================
                MODO
            ================================================= */}

            <div className="over-filter-dropdown">

              <button
                className="over-filter-button"
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

                <div className="over-dropdown-menu">

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
                        "Modo Rápido"
                      )
                    }
                  >
                    Modo Rápido
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro(
                        "modo",
                        "Arcade"
                      )
                    }
                  >
                    Arcade
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro(
                        "modo",
                        "Controle"
                      )
                    }
                  >
                    Controle
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro(
                        "modo",
                        "Sem Restrições"
                      )
                    }
                  >
                    Sem Restrições
                  </button>

                </div>

              )}

            </div>


            {/* =================================================
                CRIAR SALA
            ================================================= */}

            <button
              className="over-create-room"
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

          <div className="over-room-card">


            {/* PERFIL DA SALA */}

            <div className="over-room-profile">

              <div className="over-profile-photo">

                <span>
                  👤
                </span>

              </div>


              <div className="over-room-details">

                <h2>
                  Competitivo - Duo
                </h2>


                <div className="over-room-tags">

                  <span className="over-rank-tag">
                    🏆 Diamante/Mestre
                  </span>


                  <span className="over-mode-tag">

                    <img
                      src={owBigLogo}
                      alt=""
                    />

                    Competitivo

                  </span>

                </div>


                <div className="over-gender-options">

                  <span className="over-male">
                    ♂
                  </span>

                  <span className="over-female">
                    ♀
                  </span>

                </div>


                <p>
                  Procuro duo de suporte/tanque pra subir de elo com resenha.
                </p>

              </div>

            </div>


            {/* MEMBROS */}

            <div className="over-room-members">

              <strong>
                1/2
              </strong>

              <span>
                Criado há 8 min
              </span>

            </div>


            {/* ENTRAR */}

            <button
              className="over-join-button"
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

export default OverRoom;