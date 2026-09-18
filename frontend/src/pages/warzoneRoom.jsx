import { useState } from "react";

import "./warzoneRoom.css";

import { apiFetch, getUsuario } from "../api";
import { useRooms } from "../hooks/useRooms";
import RoomCard from "../components/RoomCard";
import { salaPassaFiltros } from "../utils/filtros";

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

  const [busca, setBusca] = useState("");

  const [filtros, setFiltros] = useState({
    genero: "",
    jogadores: "",
    elo: "",
    modo: ""
  });


  /* =====================================================
     SALAS REAIS (vindas do backend)
  ===================================================== */

  const currentUserId = getUsuario()?.id;

  const { salas, carregando, erro, recarregar } = useRooms(game);

  const salasFiltradas = salas.filter((sala) =>
    salaPassaFiltros(sala, filtros, busca)
  );

  const [processandoId, setProcessandoId] = useState(null);

  const [aviso, setAviso] = useState("");


  const entrarNaSala = async (sala) => {

    try {

      setAviso("");
      setProcessandoId(sala._id);

      await apiFetch(`/rooms/${sala._id}/entrar`, {
        method: "POST"
      });

      await recarregar();

    } catch (e) {

      setAviso(e.message);

    } finally {

      setProcessandoId(null);

    }

  };


  const sairDaSala = async (sala) => {

    try {

      setAviso("");
      setProcessandoId(sala._id);

      await apiFetch(`/rooms/${sala._id}/sair`, {
        method: "POST"
      });

      await recarregar();

    } catch (e) {

      setAviso(e.message);

    } finally {

      setProcessandoId(null);

    }

  };


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

    setFiltros((atual) => ({
      ...atual,
      [tipo]: atual[tipo] === valor ? "" : valor
    }));

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
                value={busca}
                onChange={(evento) => setBusca(evento.target.value)}
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
                  {filtros.genero || "Gênero"}
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
                          "HOMEM"
                        )
                      }
                    >
                      Masculino
                    </button>

                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "genero",
                          "MULHER"
                        )
                      }
                    >
                      Feminino
                    </button>

                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "genero",
                          ""
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
                  {filtros.jogadores
                    ? `${filtros.jogadores} jogadores`
                    : "jogadores"}
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
                          1
                        )
                      }
                    >
                      1 jogador
                    </button>
                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "jogadores",
                          2
                        )
                      }
                    >
                      2 jogadores
                    </button>
                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "jogadores",
                          3
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
                  {filtros.elo || "Elo"}
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
                          "BRONZE"
                        )
                      }
                    >
                      Bronze
                    </button>
                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "elo",
                          "PRATA"
                        )
                      }
                    >
                      Prata
                    </button>
                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "elo",
                          "OURO"
                        )
                      }
                    >
                      Ouro
                    </button>
                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "elo",
                          "PLATINA"
                        )
                      }
                    >
                      Platina
                    </button>
                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "elo",
                          "DIAMANTE"
                        )
                      }
                    >
                      Diamante
                    </button>
                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "elo",
                          "CARMESIM"
                        )
                      }
                    >
                      Carmesim
                    </button>
                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "elo",
                          "IRIDESCENTE"
                        )
                      }
                    >
                      Iridescente
                    </button>
                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "elo",
                          "TOP 250"
                        )
                      }
                    >
                      Top 250
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
                  {filtros.modo || "Modo"}
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
                          "BATTLE ROYALE"
                        )
                      }
                    >
                      Battle Royale
                    </button>
                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "modo",
                          "RANQUEADA"
                        )
                      }
                    >
                      Ranked Play
                    </button>
                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "modo",
                          "PLUNDER"
                        )
                      }
                    >
                      Plunder
                    </button>
                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "modo",
                          "RESSURGÊNCIA"
                        )
                      }
                    >
                      Resurgence
                    </button>
                    <button
                      onClick={() =>
                        selecionarFiltro(
                          "modo",
                          "DMZ"
                        )
                      }
                    >
                      DMZ
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
              SALAS
          ===================================================== */}

          {aviso && (
            <p className="rooms-aviso">
              {aviso}
            </p>
          )}

          <div className="rooms-list">

            {carregando && (
              <p className="rooms-empty">
                Carregando salas...
              </p>
            )}

            {!carregando && erro && (
              <p className="rooms-empty">
                {erro}
              </p>
            )}

            {!carregando && !erro && salas.length === 0 && (
              <p className="rooms-empty">
                Nenhuma sala por aqui ainda. Crie a primeira!
              </p>
            )}

            {!carregando && !erro && salas.length > 0 &&
              salasFiltradas.length === 0 && (
              <p className="rooms-empty">
                Nenhuma sala com esses filtros.
              </p>
            )}

            {salasFiltradas.map((sala) => (
              <RoomCard
                key={sala._id}
                room={sala}
                icon={warzoneLogo}
                currentUserId={currentUserId}
                onJoin={entrarNaSala}
                onLeave={sairDaSala}
                processando={processandoId === sala._id}
                onAfterDelete={recarregar}
              />
            ))}

          </div>

        </main>

      </div>

    </div>
  );
}

export default WarzoneRoom;
