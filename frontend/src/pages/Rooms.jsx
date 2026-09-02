import { useState } from "react";
import "./Rooms.css";

import logo from "../assets/logo.png";

// =============================
// ÍCONES DA BARRA LATERAL
// =============================

import homeIcon from "../assets/sidebar/home.png";
import perfilIcon from "../assets/sidebar/perfil.png";
import historicoIcon from "../assets/sidebar/historico.png";
import mensagensIcon from "../assets/sidebar/mensagem.png";
import configuracoesIcon from "../assets/sidebar/configuracoes.png";

// =============================
// MINI LOGOS DO TOPO
// =============================

import owLogo from "../assets/icon/ow icon.png";
import cs2Logo from "../assets/icon/cs icon.png";
import valorantLogo from "../assets/icon/val icon.png";
import fortniteLogo from "../assets/icon/fortinite icon.png";
import rocketLogo from "../assets/icon/rocket icon.png";
import dotaLogo from "../assets/icon/dota icon.png";
import rivalsLogo from "../assets/icon/marvel icon.png";
import lolLogo from "../assets/icon/lol icon.png";

// =============================
// LOGO GRANDE
// =============================

import lolBigLogo from "../assets/LOGAO/lol-big.png";

// =============================
// FUNDO
// =============================

import lolBackground from "../assets/rooms-bg.png";


function Rooms({ game, onHome }) {

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


  function selecionarFiltro(tipo, valor) {

    setFiltros({
      ...filtros,
      [tipo]: valor
    });

    setMenuAberto(null);
  }


  function abrirMenu(tipo) {

    if (menuAberto === tipo) {
      setMenuAberto(null);
    } else {
      setMenuAberto(tipo);
    }
  }


  return (
    <div
      className="rooms-page"
      style={{
        backgroundImage: `url(${lolBackground})`
      }}
    >

      <div className="rooms-background-overlay"></div>


      {/* =========================
          SIDEBAR
      ========================= */}

      <aside className="sidebar">

        <img
          src={logo}
          alt="LFG"
          className="sidebar-logo"
        />

        <nav className="sidebar-menu">

          <button
            className="sidebar-item active"
            onClick={onHome}
            type="button"
          >
            <img
              src={homeIcon}
              alt="Home"
            />
          </button>

          <button
            className="sidebar-item"
            type="button"
          >
            <img
              src={perfilIcon}
              alt="Perfil"
            />
          </button>

          <button
            className="sidebar-item"
            type="button"
          >
            <img
              src={historicoIcon}
              alt="Histórico"
            />
          </button>

          <button
            className="sidebar-item"
            type="button"
          >
            <img
              src={mensagensIcon}
              alt="Mensagens"
            />
          </button>

          <button
            className="sidebar-item"
            type="button"
          >
            <img
              src={configuracoesIcon}
              alt="Configurações"
            />
          </button>

        </nav>

      </aside>


      {/* =========================
          CONTEÚDO
      ========================= */}

      <div className="rooms-content">


        {/* =========================
            MINI LOGOS
        ========================= */}

        <nav className="games-menu">

          <div className="game-menu-item">
            <img src={owLogo} alt="Overwatch" />
            <span>OW</span>
          </div>

          <div className="game-menu-item">
            <img src={cs2Logo} alt="Counter Strike" />
            <span>CS</span>
          </div>

          <div className="game-menu-item">
            <img src={valorantLogo} alt="Valorant" />
            <span>Val</span>
          </div>

          <div className="game-menu-item">
            <img src={fortniteLogo} alt="Fortnite" />
            <span>Fortnite</span>
          </div>

          <div className="game-menu-item">
            <img src={rocketLogo} alt="Rocket League" />
            <span>RL</span>
          </div>

          <div className="game-menu-item">
            <img src={dotaLogo} alt="Dota 2" />
            <span>Dota</span>
          </div>

          <div className="game-menu-item">
            <img src={rivalsLogo} alt="Marvel Rivals" />
            <span>Rivals</span>
          </div>

          <div className="game-menu-item selected">
            <img src={lolLogo} alt="League of Legends" />
            <span>LoL</span>
          </div>

        </nav>


        {/* =========================
            PRINCIPAL
        ========================= */}

        <main className="rooms-main">


          {/* BUSCA */}
          <div className="top-search">
            <input
              type="text"
              placeholder=""
            />
          </div>


          {/* LOGO GRANDE */}
          <div className="selected-game">

            <img
              src={lolBigLogo}
              alt="League of Legends"
              className="selected-game-logo"
            />

          </div>


          {/* =========================
              FILTROS
          ========================= */}

          <div className="filters">


            {/* BUSCA */}

            <div className="search-box">

              <span>⌕</span>

              <input
                type="text"
                placeholder="Buscar sala..."
              />

            </div>


            {/* GÊNERO */}

            <div className="filter-dropdown">

              <button
                className="filter-button"
                onClick={() => abrirMenu("genero")}
                type="button"
              >

                <span>⚥</span>

                <span>
                  {filtros.genero}
                </span>

                <b>⌄</b>

              </button>


              {menuAberto === "genero" && (

                <div className="dropdown-menu">

                  <button
                    onClick={() =>
                      selecionarFiltro("genero", "Masculino")
                    }
                  >
                    Masculino
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro("genero", "Feminino")
                    }
                  >
                    Feminino
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro("genero", "Qualquer")
                    }
                  >
                    Qualquer
                  </button>

                </div>

              )}

            </div>


            {/* JOGADORES */}

            <div className="filter-dropdown">

              <button
                className="filter-button"
                onClick={() => abrirMenu("jogadores")}
                type="button"
              >

                <span>♟</span>

                <span>
                  {filtros.jogadores}
                </span>

                <b>⌄</b>

              </button>


              {menuAberto === "jogadores" && (

                <div className="dropdown-menu">

                  <button
                    onClick={() =>
                      selecionarFiltro("jogadores", "1 jogador")
                    }
                  >
                    1 jogador
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro("jogadores", "2 jogadores")
                    }
                  >
                    2 jogadores
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro("jogadores", "3 jogadores")
                    }
                  >
                    3 jogadores
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro("jogadores", "4 jogadores")
                    }
                  >
                    4 jogadores
                  </button>

                </div>

              )}

            </div>


            {/* ELO */}

            <div className="filter-dropdown">

              <button
                className="filter-button"
                onClick={() => abrirMenu("elo")}
                type="button"
              >

                <span>♛</span>

                <span>
                  {filtros.elo}
                </span>

                <b>⌄</b>

              </button>


              {menuAberto === "elo" && (

                <div className="dropdown-menu">

                  <button
                    onClick={() =>
                      selecionarFiltro("elo", "Ferro")
                    }
                  >
                    Ferro
                  </button>

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
                      selecionarFiltro("elo", "Grão-Mestre")
                    }
                  >
                    Grão-Mestre
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro("elo", "Desafiante")
                    }
                  >
                    Desafiante
                  </button>

                </div>

              )}

            </div>


            {/* MODO */}

            <div className="filter-dropdown">

              <button
                className="filter-button"
                onClick={() => abrirMenu("modo")}
                type="button"
              >

                <span>🎮</span>

                <span>
                  {filtros.modo}
                </span>

                <b>⌄</b>

              </button>


              {menuAberto === "modo" && (

                <div className="dropdown-menu">

                  <button
                    onClick={() =>
                      selecionarFiltro("modo", "Ranked Soloqueue")
                    }
                  >
                    Ranked Soloqueue
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro("modo", "Ranked Flex")
                    }
                  >
                    Ranked Flex
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro("modo", "ARAM")
                    }
                  >
                    ARAM
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro("modo", "Normal")
                    }
                  >
                    Normal
                  </button>

                </div>

              )}

            </div>


            {/* CRIAR SALA */}

            <button
              className="create-room"
              type="button"
            >

              <strong>+</strong>

              <span>
                Criar Sala
              </span>

            </button>

          </div>


          {/* =========================
              SALA
          ========================= */}

          <div className="room-card">

            <div className="room-profile">

              <div className="profile-photo">

                <span>
                  👤
                </span>

              </div>


              <div className="room-details">

                <h2>
                  Ranked Soloqueue
                </h2>


                <div className="room-tags">

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


                <div className="gender-options">

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

            </div>


            <div className="room-members">

              <strong>
                1/2
              </strong>

              <span>
                Criado há 8 min
              </span>

            </div>


            <button
              className="join-button"
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

export default Rooms;