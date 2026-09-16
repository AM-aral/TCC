import { useState } from "react";
import "./Feedbacks.css";

import logo from "../assets/logo.png";

// ======================================================
// SIDEBAR
// ======================================================

import homeIcon from "../assets/sidebar/home.png";
import perfilIcon from "../assets/sidebar/perfil.png";
import historicoIcon from "../assets/sidebar/historico.png";
import configuracoesIcon from "../assets/sidebar/configuracoes.png";

// ======================================================
// JOGOS DA NAVBAR
// ======================================================

import owLogo from "../assets/icon/ow icon.png";
import cs2Logo from "../assets/icon/cs icon.png";
import valorantLogo from "../assets/icon/val icon.png";
import fortniteLogo from "../assets/icon/fortinite icon.png";
import rocketLogo from "../assets/icon/rocket icon.png";
import dotaLogo from "../assets/icon/dota icon.png";
import rivalsLogo from "../assets/icon/marvel icon.png";
import lolLogo from "../assets/icon/lol icon.png";

// ======================================================
// BACKGROUND
// ======================================================

import roomsBackground from "../assets/rooms-bg.png";

// ======================================================
// FEEDBACKS RECEBIDOS
// ======================================================

const feedbacksRecebidos = [
  {
    id: 1,
    nome: "RafaFPS",
    usuario: "@rafafps",
    jogo: "Valorant",
    jogoIcon: valorantLogo,
    nota: 5,
    comentario:
      "Jogou muito bem e foi super tranquilo de jogar junto. Recomendo!",
    data: "Hoje, 11:40",
  },

  {
    id: 2,
    nome: "Luanzera",
    usuario: "@luanzera",
    jogo: "League of Legends",
    jogoIcon: lolLogo,
    nota: 5,
    comentario:
      "Boa comunicação e ajudou bastante durante a partida.",
    data: "Ontem, 20:15",
  },

  {
    id: 3,
    nome: "M4rcelo",
    usuario: "@m4rcelo",
    jogo: "Counter-Strike 2",
    jogoIcon: cs2Logo,
    nota: 4,
    comentario:
      "Bom player, respeitoso e focado na partida.",
    data: "10/09/2026",
  },
];

// ======================================================
// FEEDBACKS DADOS
// ======================================================

const feedbacksDados = [
  {
    id: 4,
    nome: "Nina",
    usuario: "@nina",
    jogo: "League of Legends",
    jogoIcon: lolLogo,
    nota: 5,
    comentario:
      "Ótima jogadora, comunicação muito boa.",
    data: "09/09/2026",
  },

  {
    id: 5,
    nome: "Ghost",
    usuario: "@ghost",
    jogo: "Valorant",
    jogoIcon: valorantLogo,
    nota: 4,
    comentario:
      "Jogamos uma ótima ranked. Foi bem de boa.",
    data: "08/09/2026",
  },
];

// ======================================================
// AVATAR
// ======================================================

function Avatar({ nome }) {
  return (
    <div className="feedback-avatar">
      {nome.charAt(0).toUpperCase()}
    </div>
  );
}

// ======================================================
// ESTRELAS
// ======================================================

function Stars({ nota }) {
  return (
    <div
      className="feedback-stars"
      aria-label={`${nota} de 5 estrelas`}
    >
      {[1, 2, 3, 4, 5].map((estrela) => (
        <span
          key={estrela}
          className={
            estrela <= nota
              ? "star active"
              : "star"
          }
        >
          ★
        </span>
      ))}
    </div>
  );
}

// ======================================================
// COMPONENTE
// ======================================================

export default function Feedbacks({
  onHome,
  onProfile,
  onHistory,
  onGameSelect,
  onSettings,
}) {

  const [aba, setAba] = useState("recebidos");

  const lista =
    aba === "recebidos"
      ? feedbacksRecebidos
      : feedbacksDados;

  return (
    <div
      className="feedbacks-page"
      style={{
        backgroundImage: `url(${roomsBackground})`,
      }}
    >

      {/* ==================================================
          OVERLAY
      ================================================== */}

      <div className="feedbacks-overlay"></div>


      {/* ==================================================
          NAVBAR
      ================================================== */}

      <header className="feedbacks-navbar">

        {/* LOGO */}

        <div className="feedbacks-navbar-logo">

          <img
            src={logo}
            alt="Logo"
          />

        </div>


        {/* JOGOS */}

        <div className="feedbacks-games-navbar">

          {/* OVERWATCH */}

          <div
            className="feedbacks-navbar-game"
            onClick={() => onGameSelect("Overwatch")}
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
            className="feedbacks-navbar-game"
            onClick={() => onGameSelect("Counter-Strike 2")}
          >

            <img
              src={cs2Logo}
              alt="CS2"
            />

            <span>
              CS2
            </span>

          </div>


          {/* VALORANT */}

          <div
            className="feedbacks-navbar-game"
            onClick={() => onGameSelect("Valorant")}
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
            className="feedbacks-navbar-game"
            onClick={() => onGameSelect("Fortnite")}
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
            className="feedbacks-navbar-game"
            onClick={() => onGameSelect("Rocket League")}
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
            className="feedbacks-navbar-game"
            onClick={() => onGameSelect("Dota 2")}
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
            className="feedbacks-navbar-game"
            onClick={() => onGameSelect("Marvel Rivals")}
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
            className="feedbacks-navbar-game"
            onClick={() => onGameSelect("League of Legends")}
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


      {/* ==================================================
          SIDEBAR
      ================================================== */}

      <aside className="feedbacks-sidebar">

        <div className="feedbacks-sidebar-menu">

          {/* HOME */}

          <button
            className="feedbacks-sidebar-item"
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
            className="feedbacks-sidebar-item"
            onClick={onProfile}
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
            className="feedbacks-sidebar-item"
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
            className="feedbacks-sidebar-item feedbacks-sidebar-active"
            title="Feedbacks"
            type="button"
          >

            <span className="feedbacks-feedback-star">
              ★
            </span>

          </button>


          {/* CONFIGURAÇÕES */}

          <button
            className="feedbacks-sidebar-item"
            onClick={onSettings}
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

      <main className="feedbacks-main">

        {/* ==================================================
            CABEÇALHO
        ================================================== */}

        <header className="feedbacks-header">

          <div className="feedbacks-header-text">

            <span className="feedbacks-kicker">
              REPUTAÇÃO
            </span>

            <h1>
              Feedbacks
            </h1>

            <p>
              Veja as avaliações recebidas e os feedbacks
              que você enviou.
            </p>

          </div>


          <div className="feedbacks-average">

            <strong>
              4.8
            </strong>

            <Stars nota={5} />

            <span>
              Média geral
            </span>

          </div>

        </header>


        {/* ==================================================
            RESUMO
        ================================================== */}

        <section className="feedbacks-summary">

          {/* NOTA */}

          <div className="feedback-summary-card">

            <div className="summary-icon">
              ★
            </div>

            <div>

              <strong>
                4.8
              </strong>

              <span>
                Nota média
              </span>

            </div>

          </div>


          {/* RECEBIDOS */}

          <div className="feedback-summary-card">

            <div className="summary-icon">
              ↙
            </div>

            <div>

              <strong>
                {feedbacksRecebidos.length}
              </strong>

              <span>
                Recebidos
              </span>

            </div>

          </div>


          {/* ENVIADOS */}

          <div className="feedback-summary-card">

            <div className="summary-icon">
              ↗
            </div>

            <div>

              <strong>
                {feedbacksDados.length}
              </strong>

              <span>
                Enviados
              </span>

            </div>

          </div>

        </section>


        {/* ==================================================
            ABAS
        ================================================== */}

        <div className="feedbacks-tabs">

          <button
            type="button"
            className={
              aba === "recebidos"
                ? "active"
                : ""
            }
            onClick={() =>
              setAba("recebidos")
            }
          >
            Feedbacks recebidos
          </button>


          <button
            type="button"
            className={
              aba === "dados"
                ? "active"
                : ""
            }
            onClick={() =>
              setAba("dados")
            }
          >
            Feedbacks dados
          </button>

        </div>


        {/* ==================================================
            LISTA DE FEEDBACKS
        ================================================== */}

        <section className="feedbacks-list">

          {lista.map((feedback) => (

            <article
              className="feedback-card"
              key={feedback.id}
            >

              {/* AVATAR */}

              <Avatar
                nome={feedback.nome}
              />


              <div className="feedback-card-main">

                {/* TOPO */}

                <div className="feedback-card-top">

                  <div>

                    <h2>
                      {feedback.nome}
                    </h2>

                    <span>
                      {feedback.usuario}
                    </span>

                  </div>


                  <div className="feedback-date">
                    {feedback.data}
                  </div>

                </div>


                {/* META */}

                <div className="feedback-meta">

                  <span className="feedback-game">

                    <img
                      src={feedback.jogoIcon}
                      alt={feedback.jogo}
                    />

                    {feedback.jogo}

                  </span>


                  <Stars
                    nota={feedback.nota}
                  />

                </div>


                {/* COMENTÁRIO */}

                <p>
                  {feedback.comentario}
                </p>

              </div>

            </article>

          ))}

        </section>

      </main>

    </div>
  );
}