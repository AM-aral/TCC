import { useEffect, useState } from "react";

import "./Lobby.css";

import { apiFetch, getUsuario } from "../api";

import logo from "../assets/logo.png";

/* =====================================================
   SIDEBAR
===================================================== */

import homeIcon from "../assets/sidebar/home.png";
import perfilIcon from "../assets/sidebar/perfil.png";
import historicoIcon from "../assets/sidebar/historico.png";
import configuracoesIcon from "../assets/sidebar/configuracoes.png";

/* =====================================================
   ÍCONES DOS JOGOS (NAVBAR — igual às outras abas)
===================================================== */

import owNavIcon from "../assets/icon/ow icon.png";
import csNavIcon from "../assets/icon/cs icon.png";
import valNavIcon from "../assets/icon/val icon.png";
import fortNavIcon from "../assets/icon/fortinite icon.png";
import rocketNavIcon from "../assets/icon/rocket icon.png";
import dotaNavIcon from "../assets/icon/dota icon.png";
import rivalsNavIcon from "../assets/icon/marvel icon.png";
import lolNavIcon from "../assets/icon/lol icon.png";

/* =====================================================
   LOGOS DOS JOGOS (tema da sala)
===================================================== */

import lolIcon from "../assets/games-icon/lol icon.png";
import valIcon from "../assets/games-icon/valorant icon.png";
import csIcon from "../assets/games-icon/cs2 icon.png";
import dotaIcon from "../assets/games-icon/dota 2 icon.png";
import wildIcon from "../assets/games-icon/lolw icon.png";
import owIcon from "../assets/games-icon/ow icon.png";
import rivalsIcon from "../assets/games-icon/rivals icon.png";
import dbdIcon from "../assets/games-icon/dbd icon.png";
import fortIcon from "../assets/games-icon/forticon.png";
import paladinsIcon from "../assets/games-icon/paladins icon.png";
import rocketIcon from "../assets/games-icon/rocket icon.png";
import seaIcon from "../assets/games-icon/sea icon.png";
import tf2Icon from "../assets/games-icon/TF2.png";
import brawlIcon from "../assets/games-icon/brawl icon.png";
import warzoneIcon from "../assets/games-icon/warzone icon.png";
import r6Icon from "../assets/games-icon/r6 icon.png";

/* =====================================================
   FUNDO
===================================================== */

import backgroundImage from "../assets/rooms-bg.png";


const TEMAS = {
  "League of Legends": { logo: lolIcon, nome: "LEAGUE OF LEGENDS" },
  "Valorant": { logo: valIcon, nome: "VALORANT" },
  "Counter-Strike 2": { logo: csIcon, nome: "COUNTER-STRIKE 2" },
  "Dota 2": { logo: dotaIcon, nome: "DOTA 2" },
  "League of Legends Wild Rift": { logo: wildIcon, nome: "LEAGUE OF LEGENDS WILD RIFT" },
  "Overwatch": { logo: owIcon, nome: "OVERWATCH" },
  "Marvel Rivals": { logo: rivalsIcon, nome: "MARVEL RIVALS" },
  "Dead By Daylight": { logo: dbdIcon, nome: "DEAD BY DAYLIGHT" },
  "Fortnite": { logo: fortIcon, nome: "FORTNITE" },
  "Paladins": { logo: paladinsIcon, nome: "PALADINS" },
  "Rocket League": { logo: rocketIcon, nome: "ROCKET LEAGUE" },
  "Sea of Thieves": { logo: seaIcon, nome: "SEA OF THIEVES" },
  "Team Fortress 2": { logo: tf2Icon, nome: "TEAM FORTRESS 2" },
  "Brawlhalla": { logo: brawlIcon, nome: "BRAWLHALLA" },
  "Warzone": { logo: warzoneIcon, nome: "WARZONE" },
  "Rainbow Six Siege": { logo: r6Icon, nome: "RAINBOW SIX SIEGE" }
};

const JOGOS_NAVBAR = [
  { name: "Overwatch", logo: owNavIcon },
  { name: "Counter-Strike 2", logo: csNavIcon },
  { name: "Valorant", logo: valNavIcon },
  { name: "Fortnite", logo: fortNavIcon },
  { name: "Rocket League", logo: rocketNavIcon },
  { name: "Dota 2", logo: dotaNavIcon },
  { name: "Marvel Rivals", logo: rivalsNavIcon },
  { name: "League of Legends", logo: lolNavIcon }
];


function tempoFormatado(dataISO) {
  if (!dataISO) {
    return "";
  }

  const data = new Date(dataISO);

  return data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}


function Lobby({
  salaId,
  game,
  onBack,
  onHome,
  onBuscar,
  onProfile,
  onHistory,
  onFeedbacks,
  onSettings,
  onSelectGame,
  onVerPerfil
}) {

  const [sala, setSala] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [aviso, setAviso] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [processando, setProcessando] = useState("");

  const currentUser = getUsuario();
  const currentUserId = currentUser?.id;

  const tema = TEMAS[game] || TEMAS["League of Legends"];


  /* =====================================================
     CARREGAR SALA (LOBBY)
  ===================================================== */

  useEffect(() => {

    let ativo = true;

    const buscar = async () => {

      try {

        const dados = await apiFetch(`/rooms/${salaId}`);

        if (!ativo) {
          return;
        }

        setSala(dados);
        setErro("");

      } catch (e) {

        if (!ativo) {
          return;
        }

        setErro(e.message || "Não foi possível carregar a sala.");
        setSala(null);

      } finally {

        if (ativo) {
          setCarregando(false);
        }

      }

    };

    buscar();

    // Atualiza sozinho para ver pedidos novos e aprovações
    const intervalo = setInterval(buscar, 5000);

    return () => {
      ativo = false;
      clearInterval(intervalo);
    };

  }, [salaId]);


  /* =====================================================
     AÇÕES
  ===================================================== */

  const pedirEntrada = async () => {
    setAviso("");
    setSucesso("");
    setProcessando("pedir");

    try {
      const dados = await apiFetch(`/rooms/${salaId}/pedir`, {
        method: "POST"
      });

      setSala(dados.sala);
      setSucesso(dados.mensagem || "Pedido enviado!");
    } catch (e) {
      setAviso(e.message);
    } finally {
      setProcessando("");
    }
  };


  const cancelarPedido = async () => {
    setAviso("");
    setSucesso("");
    setProcessando("cancelar");

    try {
      const dados = await apiFetch(`/rooms/${salaId}/pedidos/cancelar`, {
        method: "POST"
      });

      setSala(dados.sala);
      setSucesso(dados.mensagem || "Pedido cancelado.");
    } catch (e) {
      setAviso(e.message);
    } finally {
      setProcessando("");
    }
  };


  const aprovar = async (jogadorId) => {
    setAviso("");
    setSucesso("");
    setProcessando(`aprovar-${jogadorId}`);

    try {
      const dados = await apiFetch(
        `/rooms/${salaId}/pedidos/${jogadorId}/aprovar`,
        { method: "POST" }
      );

      setSala(dados.sala);
      setSucesso(dados.mensagem || "Jogador aprovado!");
    } catch (e) {
      setAviso(e.message);
    } finally {
      setProcessando("");
    }
  };


  const recusar = async (jogadorId) => {
    setAviso("");
    setSucesso("");
    setProcessando(`recusar-${jogadorId}`);

    try {
      const dados = await apiFetch(
        `/rooms/${salaId}/pedidos/${jogadorId}/recusar`,
        { method: "POST" }
      );

      setSala(dados.sala);
      setSucesso(dados.mensagem || "Pedido recusado.");
    } catch (e) {
      setAviso(e.message);
    } finally {
      setProcessando("");
    }
  };


  const sairDaSala = async () => {
    setAviso("");
    setSucesso("");
    setProcessando("sair");

    try {
      await apiFetch(`/rooms/${salaId}/sair`, {
        method: "POST"
      });

      onBack?.();
    } catch (e) {
      setAviso(e.message);
    } finally {
      setProcessando("");
    }
  };


  /* =====================================================
     DERIVADOS
  ===================================================== */

  const jogadores = sala?.jogadores || [];
  const pedidos = sala?.pedidos || [];

  const criador = sala?.criador;

  const criadorId = criador?._id || criador;

  const souLider = String(criadorId) === String(currentUserId);

  const souMembro = jogadores.some(
    (jogador) => String(jogador._id || jogador) === String(currentUserId)
  );

  const souPendente = pedidos.some(
    (jogador) => String(jogador._id || jogador) === String(currentUserId)
  );

  const cheia = jogadores.length >= (sala?.maxJogadores || 0);


  const nomeDe = (usuario) => {
    if (!usuario) {
      return "Jogador";
    }

    const nome = usuario.nome || "Jogador";

    if (usuario.apelido) {
      return `${nome} (@${usuario.apelido})`;
    }

    return nome;
  };


  return (
    <div
      className="lobby-page"
      style={{
        backgroundImage: `url(${backgroundImage})`
      }}
    >

      <div className="lobby-background-overlay"></div>


      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="rooms-sidebar">

        <nav className="rooms-sidebar-menu">

          <button
            className="rooms-sidebar-item"
            onClick={onHome}
            type="button"
            title="Home"
          >
            <img
              src={homeIcon}
              alt="Home"
            />
          </button>

          <button
            className="rooms-sidebar-item"
            onClick={onBuscar}
            type="button"
            title="Buscar"
          >
            <span className="rooms-buscar-icone">
              ⌕
            </span>
          </button>
          <button
            className="rooms-sidebar-item"
            onClick={onProfile}
            type="button"
            title="Perfil"
          >
            <img
              src={perfilIcon}
              alt="Perfil"
            />
          </button>

          <button
            className="rooms-sidebar-item"
            onClick={onHistory}
            type="button"
            title="Histórico"
          >
            <img
              src={historicoIcon}
              alt="Histórico"
            />
          </button>

          <button
            className="rooms-sidebar-item"
            onClick={onFeedbacks}
            type="button"
            title="Feedbacks"
          >
            <span className="rooms-feedback-star">
              ★
            </span>
          </button>

          <button
            className="rooms-sidebar-item"
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

      <div className="rooms-content">

        {/* NAVBAR */}

        <header className="rooms-navbar">

          <div className="rooms-navbar-logo">
            <img
              src={logo}
              alt="LFG"
            />
          </div>

          <div className="rooms-games-navbar">

            {JOGOS_NAVBAR.map((jogo) => {

              const ativo = game === jogo.name;

              return (
                <div
                  key={jogo.name}
                  className={`rooms-navbar-game ${ativo ? "rooms-navbar-active" : ""}`}
                  onClick={() => onSelectGame(jogo.name)}
                >
                  <img
                    src={jogo.logo}
                    alt={jogo.name}
                  />
                  <span>
                    {jogo.name.toUpperCase()}
                  </span>
                </div>
              );

            })}

          </div>

        </header>


        {/* LOBBY */}

        <main className="lobby-main">

          {carregando && (
            <p className="lobby-empty">
              Carregando sala...
            </p>
          )}

          {!carregando && erro && (
            <div className="lobby-error">

              <p>
                {erro}
              </p>

              <button
                className="lobby-voltar-button"
                onClick={onBack}
                type="button"
              >
                VOLTAR PARA AS SALAS
              </button>

            </div>
          )}

          {!carregando && sala && (

            <div className="lobby-room">

              {/* =====================================
                  CABEÇALHO DA SALA
              ===================================== */}

              <div className="lobby-room-header">

                <div className="lobby-room-logo">

                  {criador?.foto ? (
                    <img
                      src={criador.foto}
                      alt="Líder da sala"
                      className="lobby-room-leader-foto"
                    />
                  ) : (
                    <img
                      src={tema.logo}
                      alt={tema.nome}
                    />
                  )}

                </div>

                <div className="lobby-room-info">

                  <span className="lobby-room-game">
                    {tema.nome}
                  </span>

                  <h1>
                    {sala.nome}
                  </h1>

                  <div className="lobby-room-tags">

                    {sala.modo && (
                      <span className="lobby-tag">
                        🎮 {sala.modo}
                      </span>
                    )}

                    {sala.elo && (
                      <span className="lobby-tag">
                        🏆 {sala.elo}
                      </span>
                    )}

                    {sala.time && (
                      <span className="lobby-tag">
                        ⚔️ {sala.time}
                      </span>
                    )}

                    {sala.genero && (
                      <span className="lobby-tag">
                        ⚥ {sala.genero}
                      </span>
                    )}

                    {sala.descricao && (
                      <span className="lobby-tag lobby-tag-desc">
                        {sala.descricao}
                      </span>
                    )}

                  </div>

                  <div className="lobby-room-meta">

                    <span
                      className={`lobby-status lobby-status-${sala.status}`}
                    >
                      {sala.status.toUpperCase()}
                    </span>

                    <span>
                      {jogadores.length}/{sala.maxJogadores} jogadores
                    </span>

                    {sala.createdAt && (
                      <span>
                        Criada em {tempoFormatado(sala.createdAt)}
                      </span>
                    )}

                  </div>

                </div>

              </div>


              {/* AVISOS */}

              {aviso && (
                <p className="lobby-aviso">
                  {aviso}
                </p>
              )}

              {sucesso && (
                <p className="lobby-sucesso">
                  {sucesso}
                </p>
              )}


              {/* =====================================
                  MINHA SITUAÇÃO
              ===================================== */}

              <div className="lobby-acao">

                {souMembro && (

                  <div className="lobby-acao-box lobby-acao-membro">

                    <div className="lobby-acao-texto">

                      <strong>
                        {souLider ? "👑 Você é o líder da sala" : "✅ Você está nessa sala"}
                      </strong>

                      <span>
                        {souLider
                          ? "Aprove ou recuse os pedidos de entrada abaixo."
                          : sala.status === "aberta"
                            ? "Avise os outros jogadores quando forem começar."
                            : "A sala não está mais aberta."
                        }
                      </span>

                    </div>

                    <button
                      className="lobby-botao lobby-botao-sair"
                      onClick={sairDaSala}
                      disabled={processando === "sair"}
                      type="button"
                    >
                      {processando === "sair" ? "SAINDO..." : "SAIR DA SALA"}
                    </button>

                  </div>

                )}

                {!souMembro && souPendente && (

                  <div className="lobby-acao-box lobby-acao-pendente">

                    <div className="lobby-acao-texto">

                      <strong>
                        ⏳ Pedido enviado
                      </strong>

                      <span>
                        Você está na fila de entrada. Aguarde o líder aprovar seu pedido.
                      </span>

                    </div>

                    <button
                      className="lobby-botao lobby-botao-cancelar"
                      onClick={cancelarPedido}
                      disabled={processando === "cancelar"}
                      type="button"
                    >
                      {processando === "cancelar" ? "CANCELANDO..." : "CANCELAR PEDIDO"}
                    </button>

                  </div>

                )}

                {!souMembro && !souPendente && sala.status === "aberta" && (

                  <div className="lobby-acao-box">

                    <div className="lobby-acao-texto">

                      <strong>
                        {cheia ? "Sala cheia" : "Quer jogar junto?"}
                      </strong>

                      <span>
                        {cheia
                          ? "A sala atingiu o número máximo de jogadores."
                          : "Peça para entrar e o líder vai liberar sua entrada."}
                      </span>

                    </div>

                    <button
                      className="lobby-botao lobby-botao-entrar"
                      onClick={pedirEntrada}
                      disabled={cheia || processando === "pedir"}
                      type="button"
                    >
                      {processando === "pedir" ? "PEDINDO..." : cheia ? "SALA CHEIA" : "PEDIR PARA ENTRAR"}
                    </button>

                  </div>

                )}

                {!souMembro && sala.status !== "aberta" && (

                  <div className="lobby-acao-box">

                    <div className="lobby-acao-texto">

                      <strong>
                        Sala fechada
                      </strong>

                      <span>
                        Essa sala não está mais aberta para novos pedidos.
                      </span>

                    </div>

                  </div>

                )}

              </div>


              {/* =====================================
                  JOGADORES
              ===================================== */}

              <div className="lobby-secoes">

                <section className="lobby-painel">

                  <header className="lobby-painel-header">

                    <h2>
                      JOGADORES
                    </h2>

                    <span>
                      {jogadores.length}/{sala.maxJogadores}
                    </span>

                  </header>

                  {jogadores.length === 0 && (
                    <p className="lobby-painel-vazio">
                      Nenhum jogador na sala ainda.
                    </p>
                  )}

                  <div className="lobby-jogadores">

                    {jogadores.map((jogador) => {

                      const id = jogador._id || jogador;

                      const lider = String(id) === String(criadorId);

                      return (
                        <div
                          className="lobby-jogador"
                          key={id}
                          onClick={() => onVerPerfil?.(id)}
                        >

                          <div className="lobby-jogador-foto">

                            {jogador.foto ? (
                              <img
                                src={jogador.foto}
                                alt={nomeDe(jogador)}
                              />
                            ) : (
                              <span>
                                👤
                              </span>
                            )}

                            {lider && (
                              <span className="lobby-coroa">
                                👑
                              </span>
                            )}

                          </div>

                          <div className="lobby-jogador-info">

                            <strong>
                              {jogador.nome || "Jogador"}
                            </strong>

                            <span>
                              {jogador.apelido ? `@${jogador.apelido}` : ""}
                            </span>

                            {lider && (
                              <b className="lobby-badge-lider">
                                LÍDER
                              </b>
                            )}

                          </div>

                          {String(id) === String(currentUserId) && (
                            <span className="lobby-voce">
                              você
                            </span>
                          )}

                        </div>
                      );

                    })}

                  </div>

                </section>


                {/* =====================================
                    PEDIDOS DE ENTRADA
                ===================================== */}

                <section className="lobby-painel">

                  <header className="lobby-painel-header">

                    <h2>
                      PEDIDOS DE ENTRADA
                    </h2>

                    <span className={pedidos.length > 0 ? "lobby-pedidos-count" : ""}>
                      {pedidos.length}
                    </span>

                  </header>

                  {!souLider && pedidos.length === 0 && (
                    <p className="lobby-painel-vazio">
                      Nenhum pedido no momento.
                    </p>
                  )}

                  {!souLider && pedidos.length > 0 && (
                    <p className="lobby-painel-vazio">
                      {pedidos.length} pessoa(s) aguardando o líder aprovar a entrada.
                    </p>
                  )}

                  {souLider && pedidos.length === 0 && (
                    <p className="lobby-painel-vazio">
                      Ninguém pediu para entrar ainda.
                    </p>
                  )}

                  {souLider && pedidos.length > 0 && (

                    <div className="lobby-pedidos">

                      {pedidos.map((jogador) => {

                        const id = jogador._id || jogador;

                        return (
                          <div
                            className="lobby-pedido"
                            key={id}
                            onClick={() => onVerPerfil?.(id)}
                          >

                            <div className="lobby-jogador-foto">

                              {jogador.foto ? (
                                <img
                                  src={jogador.foto}
                                  alt={nomeDe(jogador)}
                                />
                              ) : (
                                <span>
                                  👤
                                </span>
                              )}

                            </div>

                            <div className="lobby-jogador-info">

                              <strong>
                                {jogador.nome || "Jogador"}
                              </strong>

                              <span>
                                {jogador.apelido ? `@${jogador.apelido}` : ""}
                              </span>

                            </div>

                            <div className="lobby-pedido-acoes">

                              <button
                                className="lobby-botao lobby-botao-aprovar"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  aprovar(id);
                                }}
                                disabled={processando === `aprovar-${id}` || cheia}
                                type="button"
                              >
                                {processando === `aprovar-${id}` ? "..." : cheia ? "CHEIA" : "APROVAR"}
                              </button>

                              <button
                                className="lobby-botao lobby-botao-recusar"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  recusar(id);
                                }}
                                disabled={processando === `recusar-${id}`}
                                type="button"
                              >
                                {processando === `recusar-${id}` ? "..." : "RECUSAR"}
                              </button>

                            </div>

                          </div>
                        );

                      })}

                    </div>

                  )}

                </section>

              </div>


              {/* BOTÃO VOLTAR */}

              <button
                className="lobby-voltar-button"
                onClick={onBack}
                type="button"
              >
                ← VOLTAR PARA AS SALAS
              </button>

            </div>

          )}

        </main>

      </div>

    </div>
  );
}

export default Lobby;