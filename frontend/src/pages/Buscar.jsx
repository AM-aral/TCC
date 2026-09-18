import { useEffect, useState } from "react";

import "./Buscar.css";

import { apiFetch, getUsuario } from "../api";
import { obterJogoPorNome } from "../data/jogos";

// LOGO
import logo from "../assets/logo.png";

// SIDEBAR
import homeIcon from "../assets/sidebar/home.png";
import perfilIcon from "../assets/sidebar/perfil.png";
import historicoIcon from "../assets/sidebar/historico.png";
import configuracoesIcon from "../assets/sidebar/configuracoes.png";

// JOGOS DA NAVBAR
import owIcon from "../assets/icon/ow icon.png";
import csIcon from "../assets/icon/cs icon.png";
import valIcon from "../assets/icon/val icon.png";
import fortniteIcon from "../assets/icon/fortinite icon.png";
import rocketIcon from "../assets/icon/rocket icon.png";
import dotaIcon from "../assets/icon/dota icon.png";
import rivalsIcon from "../assets/icon/marvel icon.png";
import lolIcon from "../assets/icon/lol icon.png";

import roomsBackground from "../assets/rooms-bg.png";

// ======================================================
// JOGOS DA NAVBAR
// ======================================================

const JOGOS_NAVBAR = [
  { nome: "Overwatch", imagem: owIcon },
  { nome: "Counter-Strike 2", imagem: csIcon },
  { nome: "Valorant", imagem: valIcon },
  { nome: "Fortnite", imagem: fortniteIcon },
  { nome: "Rocket League", imagem: rocketIcon },
  { nome: "Dota 2", imagem: dotaIcon },
  { nome: "Marvel Rivals", imagem: rivalsIcon },
  { nome: "League of Legends", imagem: lolIcon }
];

// ======================================================
// APELIDO (@)
// ======================================================

function apelidoDe(item) {
  if (!item) {
    return "";
  }

  if (item.apelido) {
    return `@${item.apelido}`;
  }

  return `@${(item.email || "jogador").split("@")[0]}`;
}

// ======================================================
// AVATAR
// ======================================================

function Avatar({ nome, foto }) {
  if (foto) {
    return (
      <span className="buscar-avatar">
        <img
          src={foto}
          alt={nome}
        />
      </span>
    );
  }

  return (
    <span className="buscar-avatar">
      {String(nome || "?").charAt(0).toUpperCase()}
    </span>
  );
}

// ======================================================
// STATUS DA SALA
// ======================================================

const STATUS_NOMES = {
  aberta: "Aberta",
  concluida: "Concluída",
  cancelada: "Cancelada"
};

// ======================================================
// COMPONENTE
// ======================================================

export default function Buscar({
  termoInicial,
  onHome,
  onProfile,
  onHistory,
  onFeedbacks,
  onSettings,
  onSelectGame,
  onVerPerfil,
  onVerSala
}) {

  const [aba, setAba] = useState("salas");

  const [termo, setTermo] = useState(termoInicial || "");

  const [jogadores, setJogadores] = useState([]);

  const [salas, setSalas] = useState([]);

  const [buscando, setBuscando] = useState(false);

  const [erro, setErro] = useState("");

  const usuario = getUsuario();

  const meuId = usuario?.id || "";

  // =====================================================
  // BUSCAR (com debounce)
  // =====================================================

  useEffect(() => {
    const texto = termo.trim();

    if (texto.length < 2 && aba !== "salas") {
      return undefined;
    }

    let ativo = true;

    if (texto.length < 2) {
      const carregarAbertas = async () => {
        setBuscando(true);
        setErro("");

        try {
          const lista = await apiFetch("/rooms?status=aberta");

          if (ativo) {
            setSalas(lista || []);
          }
        } catch (e) {
          if (ativo) {
            setSalas([]);
            setErro(e.message || "Não foi possível carregar as salas.");
          }
        } finally {
          if (ativo) {
            setBuscando(false);
          }
        }
      };

      carregarAbertas();

      return () => {
        ativo = false;
      };
    }

    const timeout = setTimeout(async () => {
      setBuscando(true);
      setErro("");

      try {
        if (aba === "jogadores") {
          const lista = await apiFetch(
            `/usuarios?q=${encodeURIComponent(texto)}`
          );

          if (ativo) {
            setJogadores(
              (lista || []).filter(
                (item) => String(item._id) !== String(meuId)
              )
            );
            setSalas([]);
          }
        } else {
          const lista = await apiFetch(
            `/rooms?q=${encodeURIComponent(texto)}`
          );

          if (ativo) {
            setSalas(lista || []);
            setJogadores([]);
          }
        }
      } catch (e) {
        if (ativo) {
          setJogadores([]);
          setSalas([]);
          setErro(e.message || "Não foi possível buscar.");
        }
      } finally {
        if (ativo) {
          setBuscando(false);
        }
      }
    }, 350);

    return () => {
      ativo = false;
      clearTimeout(timeout);
    };
  }, [termo, aba, meuId]);

  const temBusca = termo.trim().length >= 2;

  const semResultados =
    !buscando &&
    temBusca &&
    !erro &&
    jogadores.length === 0 &&
    salas.length === 0;

  const entrarNaSala = (sala) => {
    if (typeof onVerSala === "function") {
      onVerSala(sala);
    }
  };

  return (
    <div
      className="buscar-page"
      style={{
        backgroundImage: `url(${roomsBackground})`
      }}
    >

      <div className="buscar-overlay"></div>

      {/* ==================================================
          NAVBAR
      ================================================== */}

      <header className="buscar-navbar">

        <div className="buscar-navbar-logo">

          <img
            src={logo}
            alt="LFGP"
          />

        </div>

        <div className="buscar-games-navbar">

          {JOGOS_NAVBAR.map((jogo) => (

            <div
              className="buscar-navbar-game"
              key={jogo.nome}
              onClick={() => onSelectGame(jogo.nome)}
            >

              <img
                src={jogo.imagem}
                alt={jogo.nome}
              />

              <span>
                {jogo.nome}
              </span>

            </div>

          ))}

        </div>

      </header>

      {/* ==================================================
          SIDEBAR
      ================================================== */}

      <aside className="buscar-sidebar">

        <div className="buscar-sidebar-menu">

          {/* HOME */}

          <button
            className="buscar-sidebar-item"
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
            className="buscar-sidebar-item"
            onClick={onProfile}
            title="Perfil"
            type="button"
          >

            <img
              src={perfilIcon}
              alt="Perfil"
            />

          </button>

          {/* BUSCA (ativo) */}

          <button
            className="buscar-sidebar-item buscar-sidebar-active"
            title="Buscar"
            type="button"
          >

            <span className="buscar-sidebar-icone">
              ⌕
            </span>

          </button>

          {/* HISTÓRICO */}

          <button
            className="buscar-sidebar-item"
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
            className="buscar-sidebar-item"
            onClick={onFeedbacks}
            title="Feedbacks"
            type="button"
          >

            <span className="buscar-sidebar-icone">
              ★
            </span>

          </button>

          {/* CONFIGURAÇÕES */}

          <button
            className="buscar-sidebar-item"
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

      <main className="buscar-main">

        {/* CABEÇALHO */}

        <div className="buscar-header">

          <div>

            <span className="buscar-kicker">
              EXPLORAR
            </span>

            <h1>
              Buscar perfis e salas
            </h1>

            <p>
              Encontre jogadores para avaliar ou salas para
              entrar em qualquer jogo.
            </p>

          </div>

        </div>

        {/* CAMPO DE BUSCA */}

        <div className="buscar-campo">

          <span className="buscar-campo-lupa">
            ⌕
          </span>

          <input
            type="text"
            placeholder={
              aba === "jogadores"
                ? "Buscar jogadores por nome ou @apelido..."
                : "Buscar salas por nome, descrição ou jogo..."
            }
            value={termo}
            onChange={(evento) => {
              const valor = evento.target.value;

              setTermo(valor);

              setErro("");

              if (valor.trim().length < 2) {
                setJogadores([]);
                setSalas([]);
                setBuscando(false);
              }
            }}
          />

          {buscando && (
            <span className="buscar-campo-status">
              buscando...
            </span>
          )}

        </div>

        {/* ABAS */}

        <div className="buscar-tabs">

          <button
            type="button"
            className={
              aba === "jogadores"
                ? "buscar-tab active"
                : "buscar-tab"
            }
            onClick={() => setAba("jogadores")}
          >

            <span className="buscar-tab-icone">
              👤
            </span>

            <span>
              Jogadores
            </span>

          </button>

          <button
            type="button"
            className={
              aba === "salas"
                ? "buscar-tab active"
                : "buscar-tab"
            }
            onClick={() => setAba("salas")}
          >

            <span className="buscar-tab-icone">
              🎮
            </span>

            <span>
              Salas
            </span>

          </button>

        </div>

        {/* ERRO */}

        {erro && (temBusca || aba === "salas") && (

          <div className="buscar-estado">

            <p>⚠ {erro}</p>

          </div>

        )}

        {/* SEM BUSCA AINDA */}

        {aba === "jogadores" && !temBusca && !erro && (

          <div className="buscar-estado">

            <span className="buscar-estado-icone">
              ⌕
            </span>

            <p>
              Digite pelo menos 2 letras para buscar jogadores.
            </p>

          </div>

        )}

        {/* EXPLORAR SEM SALAS ABERTAS */}

        {aba === "salas" && !temBusca && !erro && !buscando &&
          salas.length === 0 && (

          <div className="buscar-estado">

            <span className="buscar-estado-icone">
              🏟️
            </span>

            <p>
              Nenhuma sala em aberto no momento. Que tal criar uma?
            </p>

          </div>

        )}

        {/* SEM RESULTADOS */}

        {semResultados && (

          <div className="buscar-estado">

            <span className="buscar-estado-icone">
              📭
            </span>

            <p>
              Nenhum resultado encontrado.
            </p>

          </div>

        )}

        {/* ==================================================
            RESULTADO: JOGADORES
        ================================================== */}

        {aba === "jogadores" && jogadores.length > 0 && (

          <section className="buscar-resultados-jogadores">

            <div className="buscar-lista-titulo">

              <h2>
                Jogadores
              </h2>

              <span>
                {jogadores.length}{" "}
                {jogadores.length === 1
                  ? "resultado"
                  : "resultados"}
              </span>

            </div>

            <div className="buscar-jogadores-grid">

              {jogadores.map((jogador) => (

                <button
                  type="button"
                  className="buscar-jogador-card"
                  key={jogador._id}
                  onClick={() =>
                    onVerPerfil(jogador._id)
                  }
                >

                  <Avatar
                    nome={jogador.nome}
                    foto={jogador.foto}
                  />

                  <div className="buscar-jogador-info">

                    <strong>
                      {jogador.nome}
                    </strong>

                    <span>
                      {apelidoDe(jogador)}
                    </span>

                  </div>

                  <span className="buscar-jogador-seta">
                    →
                  </span>

                </button>

              ))}

            </div>

          </section>

        )}

        {/* ==================================================
            RESULTADO: SALAS
        ================================================== */}

        {aba === "salas" && salas.length > 0 && (

          <section className="buscar-resultados-salas">

            <div className="buscar-lista-titulo">

              <h2>
                {temBusca ? "Salas" : "Explorar"}
              </h2>

              <span>
                {temBusca
                  ? `${salas.length} ${
                      salas.length === 1
                        ? "resultado"
                        : "resultados"
                    }`
                  : "Salas em aberto"}
              </span>

            </div>

            <div className="buscar-salas-grid">

              {salas.map((sala) => {

                const jogo = obterJogoPorNome(sala.jogo);

                const status =
                  STATUS_NOMES[sala.status] || "Aberta";

                const aoClicar = () => entrarNaSala(sala);

                return (

                  <button
                    type="button"
                    className="buscar-sala-card"
                    key={sala._id}
                    onClick={aoClicar}
                  >

                    <div
                      className="buscar-sala-capa"
                      style={{
                        backgroundImage: `url(${
                          jogo?.capa || roomsBackground
                        })`
                      }}
                    >

                      <div className="buscar-sala-capa-overlay"></div>

                      <span className="buscar-sala-jogo">
                        {sala.jogo}
                      </span>

                      <h3>
                        {sala.nome}
                      </h3>

                    </div>

                    <div className="buscar-sala-info">

                      <div className="buscar-sala-tags">

                        {sala.elo && (

                          <span className="buscar-sala-tag">
                            Elo: {sala.elo}
                          </span>

                        )}

                        {sala.modo && (

                          <span className="buscar-sala-tag">
                            {sala.modo}
                          </span>

                        )}

                        <span
                          className={
                            sala.status === "aberta"
                              ? "buscar-sala-tag aberta"
                              : "buscar-sala-tag"
                          }
                        >
                          {status}
                        </span>

                      </div>

                      <div className="buscar-sala-rodape">

                        <span>
                          👥 {sala.jogadores?.length || 0}/
                          {sala.maxJogadores || 2}
                        </span>

                        <span>
                          Criada por{" "}
                          {sala.criador?.nome || "Jogador"}
                        </span>

                        <span className="buscar-sala-seta">
                          Entrar →
                        </span>

                      </div>

                    </div>

                  </button>

                );

              })}

            </div>

          </section>

        )}

      </main>

    </div>
  );
}