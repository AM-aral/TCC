import { useState } from "react";

import "./fortRoom.css";

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
   ÍCONES DOS JOGOS
===================================================== */

import owLogo from "../assets/icon/ow icon.png";
import csLogo from "../assets/icon/cs icon.png";
import valorantLogo from "../assets/icon/val icon.png";

// ÍCONE DA NAVBAR — permanece na pasta icon
import fortniteIcon from "../assets/icon/fortinite icon.png";

import rocketLogo from "../assets/icon/rocket icon.png";
import dotaLogo from "../assets/icon/dota icon.png";
import rivalsLogo from "../assets/icon/marvel icon.png";
import lolLogo from "../assets/icon/lol icon.png";

/* =====================================================
   LOGO GRANDE / ÍCONE DA SALA
===================================================== */

import fortniteBigLogo from "../assets/games-icon/forticon.png";

/* =====================================================
   FUNDO
===================================================== */

import fortBackground from "../assets/rooms-bg.png";


function FortRoom({
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
      className="fort-room-page"
      style={{
        backgroundImage: `url(${fortBackground})`
      }}
    >

      <div className="fort-room-background-overlay"></div>


      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="fort-room-sidebar">

        <nav className="fort-room-sidebar-menu">

          {/* HOME */}

          <button
            className="fort-room-sidebar-item fort-room-sidebar-active"
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
            className="fort-room-sidebar-item"
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
            className="fort-room-sidebar-item"
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
            className="fort-room-sidebar-item"
            type="button"
            onClick={onFeedbacks}
            title="Feedbacks"
          >

            <span className="fort-room-feedback-star">
              ★
            </span>

          </button>


          {/* CONFIGURAÇÕES */}

          <button
            className="fort-room-sidebar-item"
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

      <div className="fort-room-content">


        {/* =====================================================
            NAVBAR
        ===================================================== */}

        <header className="fort-room-navbar">

          {/* LOGO */}

          <div className="fort-room-navbar-logo">

            <img
              src={logo}
              alt="LFG"
            />

          </div>


          {/* JOGOS */}

          <div className="fort-room-games-navbar">


            {/* OVERWATCH */}

            <div
              className="fort-room-navbar-game"
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
              className="fort-room-navbar-game"
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
              className="fort-room-navbar-game"
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
              className="fort-room-navbar-game fort-room-navbar-active"
              onClick={() => onSelectGame("Fortnite")}
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
              className="fort-room-navbar-game"
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
              className="fort-room-navbar-game"
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
              className="fort-room-navbar-game"
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
              className="fort-room-navbar-game"
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

        <main className="fort-room-main">


          {/* =====================================================
              JOGO SELECIONADO
          ===================================================== */}

          <div className="fort-selected-game">

            <img
              src={fortniteBigLogo}
              alt="Fortnite"
              className="fort-selected-game-logo"
            />

          </div>


          {/* =====================================================
              FILTROS
          ===================================================== */}

          <div className="fort-filters">


            {/* BUSCAR */}

            <div className="fort-search-box">

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

            <div className="fort-filter-dropdown">

              <button
                className="fort-filter-button"
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

                <div className="fort-dropdown-menu">

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

            <div className="fort-filter-dropdown">

              <button
                className="fort-filter-button"
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

                <div className="fort-dropdown-menu">

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

            <div className="fort-filter-dropdown">

              <button
                className="fort-filter-button"
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

                <div className="fort-dropdown-menu">

                  <button
                    onClick={() =>
                      selecionarFiltro("elo", "BRONZE")
                    }
                  >
                    Bronze
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro("elo", "PRATA")
                    }
                  >
                    Prata
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro("elo", "OURO")
                    }
                  >
                    Ouro
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro("elo", "PLATINA")
                    }
                  >
                    Platina
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro("elo", "DIAMANTE")
                    }
                  >
                    Diamante
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro("elo", "ELITE")
                    }
                  >
                    Elite
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro(
                        "elo",
                        "CAMPEÃO"
                      )
                    }
                  >
                    Campeão
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro(
                        "elo",
                        "UNREAL"
                      )
                    }
                  >
                    Surreal
                  </button>

                </div>

              )}

            </div>


            {/* =================================================
                MODO
            ================================================= */}

            <div className="fort-filter-dropdown">

              <button
                className="fort-filter-button"
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

                <div className="fort-dropdown-menu">

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
                        "ZERO BUILD"
                      )
                    }
                  >
                    Zero Build
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro(
                        "modo",
                        "RELOAD"
                      )
                    }
                  >
                    Reload
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro(
                        "modo",
                        "RANKED"
                      )
                    }
                  >
                    Ranqueada
                  </button>

                  <button
                    onClick={() =>
                      selecionarFiltro(
                        "modo",
                        "TEAM RUMBLE"
                      )
                    }
                  >
                    Team Rumble
                  </button>

                </div>

              )}

            </div>


            {/* =================================================
                CRIAR SALA
            ================================================= */}

            <button
              className="fort-create-room"
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
                icon={fortniteBigLogo}
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

export default FortRoom;