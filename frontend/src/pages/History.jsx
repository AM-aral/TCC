import { useEffect, useMemo, useState } from "react";

import "./History.css";

import logo from "../assets/logo.png";

// SIDEBAR
import homeIcon from "../assets/sidebar/home.png";
import perfilIcon from "../assets/sidebar/perfil.png";
import historicoIcon from "../assets/sidebar/historico.png";
import configuracoesIcon from "../assets/sidebar/configuracoes.png";

// MINI LOGOS DA NAVBAR
import owLogo from "../assets/icon/ow icon.png";
import cs2Logo from "../assets/icon/cs icon.png";
import valorantLogo from "../assets/icon/val icon.png";
import fortniteLogo from "../assets/icon/fortinite icon.png";
import rocketLogo from "../assets/icon/rocket icon.png";
import dotaLogo from "../assets/icon/dota icon.png";
import rivalsLogo from "../assets/icon/marvel icon.png";
import lolLogo from "../assets/icon/lol icon.png";

// FUNDO
import roomsBackground from "../assets/rooms-bg.png";

import { apiFetch, getUsuario } from "../api";
import { obterJogoPorNome } from "../data/jogos";

// =====================================================
// STATUS APRESENTÁVEIS
// =====================================================

const STATUS_NOMES = {
  aberta: "Aberta",
  concluida: "Concluída",
  cancelada: "Cancelada"
};

// =====================================================
// FORMATAR DATA
// =====================================================

function formatarData(iso) {
  const data = new Date(iso);

  const agora = new Date();

  const inicioHoje = new Date(agora);

  inicioHoje.setHours(0, 0, 0, 0);

  const inicioOntem = new Date(inicioHoje);

  inicioOntem.setDate(inicioOntem.getDate() - 1);

  const hora =
    `${String(data.getHours()).padStart(2, "0")}:` +
    `${String(data.getMinutes()).padStart(2, "0")}`;

  if (data >= inicioHoje) {
    return `Hoje, ${hora}`;
  }

  if (data >= inicioOntem) {
    return `Ontem, ${hora}`;
  }

  const dataTexto =
    `${String(data.getDate()).padStart(2, "0")}/` +
    `${String(data.getMonth() + 1).padStart(2, "0")}/` +
    `${data.getFullYear()}`;

  return `${dataTexto}, ${hora}`;
}

function History({
  onHome,
  onProfile,
  onHistory,
  onFeedbacks,
  onSettings,
  onGameSelect,
  onBuscar
}) {

  // =====================================================
  // FUNÇÃO PARA SELECIONAR JOGO
  // =====================================================

  const selecionarJogo = (game) => {
    if (typeof onGameSelect === "function") {
      onGameSelect(game);
    }
  };

  // =====================================================
  // ESTADOS
  // =====================================================

  const [salas, setSalas] = useState([]);

  const [carregando, setCarregando] = useState(true);

  const [erro, setErro] = useState("");

  const [filtro, setFiltro] = useState("todas");

  const [busca, setBusca] = useState("");

  const [acaoId, setAcaoId] = useState(null);

  const usuario = getUsuario();

  const meuId = usuario?.id || "";

  // =====================================================
  // CARREGAR HISTÓRICO
  // =====================================================

  const carregarHistorico = async () => {
    try {
      setCarregando(true);
      setErro("");

      const minhasSalas = await apiFetch("/rooms/minhas");

      setSalas(minhasSalas);

    } catch (e) {
      setErro(e.message || "Não foi possível carregar o histórico.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    let ativo = true;

    const carregar = async () => {
      try {
        setCarregando(true);
        setErro("");

        const minhasSalas = await apiFetch("/rooms/minhas");

        if (ativo) {
          setSalas(minhasSalas);
        }

      } catch (e) {
        if (ativo) {
          setErro(e.message || "Não foi possível carregar o histórico.");
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    };

    carregar();

    return () => {
      ativo = false;
    };
  }, []);

  // =====================================================
  // ITENS DO HISTÓRICO
  // =====================================================

  const itens = useMemo(() => salas.map((sala) => {
    const criadorId =
      sala.criador?._id ||
      sala.criador ||
      "";

    const euCriei =
      String(criadorId) === String(meuId);

    const jogo = obterJogoPorNome(sala.jogo) || {};

    return {
      id: sala._id,
      jogo: sala.jogo,
      imagem: jogo.capa || roomsBackground,
      sala: sala.nome,
      tipo: euCriei ? "Criou" : "Participou",
      elo: sala.elo || "",
      jogadores: `${sala.jogadores?.length || 0}/${sala.maxJogadores || 2}`,
      data: formatarData(sala.createdAt),
      statusRaw: sala.status || "aberta",
      status: STATUS_NOMES[sala.status] || "Aberta",
      euSouCriador: euCriei
    };
  }), [salas, meuId]);

  // =====================================================
  // RESUMO
  // =====================================================

  const resumo = useMemo(() => {
    const criadas = itens.filter(
      (item) => item.tipo === "Criou"
    ).length;

    const participadas = itens.filter(
      (item) => item.tipo === "Participou"
    ).length;

    const concluidas = itens.filter(
      (item) => item.statusRaw === "concluida"
    ).length;

    return {
      atividades: itens.length,
      criadas,
      participadas,
      concluidas
    };
  }, [itens]);

  // =====================================================
  // FILTRO + BUSCA
  // =====================================================

  const historicoFiltrado = itens.filter((item) => {
    if (filtro === "criadas") {
      if (item.tipo !== "Criou") {
        return false;
      }
    }

    if (filtro === "participadas") {
      if (item.tipo !== "Participou") {
        return false;
      }
    }

    if (filtro === "concluidas") {
      if (item.statusRaw !== "concluida") {
        return false;
      }
    }

    if (busca.trim()) {
      const alvo = busca.trim().toLowerCase();

      const achou =
        item.jogo.toLowerCase().includes(alvo) ||
        item.sala.toLowerCase().includes(alvo) ||
        item.status.toLowerCase().includes(alvo) ||
        item.tipo.toLowerCase().includes(alvo);

      if (!achou) {
        return false;
      }
    }

    return true;
  });

  // =====================================================
  // ALTERAR STATUS DA SALA
  // =====================================================

  const atualizarStatusSala = async (idSala, status) => {
    setAcaoId(idSala);
    setErro("");

    try {
      await apiFetch(`/rooms/${idSala}/status`, {
        method: "PUT",
        body: JSON.stringify({ status })
      });

      setAcaoId(null);

      await carregarHistorico();

    } catch (e) {
      setAcaoId(null);

      setErro(e.message || "Não foi possível atualizar a sala.");
    }
  };

  return (
    <div
      className="history-page"
      style={{
        backgroundImage: `url(${roomsBackground})`
      }}
    >

      <div className="history-background-overlay"></div>

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="history-sidebar">

        <nav className="history-sidebar-menu">

          {/* HOME */}

          <button
            className="history-sidebar-item"
            type="button"
            onClick={onHome}
            title="Home"
          >
            <img
              src={homeIcon}
              alt="Home"
            />
          </button>

          {/* BUSCAR */}

          <button
            className="history-sidebar-item"
            type="button"
            onClick={onBuscar}
            title="Buscar"
          >

            <span className="history-buscar-icone">
              ⌕
            </span>

          </button>

          {/* PERFIL */}

          <button
            className="history-sidebar-item"
            type="button"
            onClick={onProfile}
            title="Perfil"
          >
            <img
              src={perfilIcon}
              alt="Perfil"
            />
          </button>

          {/* HISTÓRICO */}

          <button
            className="history-sidebar-item history-sidebar-active"
            type="button"
            onClick={onHistory}
            title="Histórico"
          >
            <img
              src={historicoIcon}
              alt="Histórico"
            />
          </button>

          {/* FEEDBACKS */}

          <button
            className="history-sidebar-item"
            type="button"
            onClick={onFeedbacks}
            title="Feedbacks"
          >
            <span className="history-feedback-star">
              ★
            </span>
          </button>

          {/* CONFIGURAÇÕES */}

          <button
            className="history-sidebar-item"
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

      <div className="history-content">

        {/* =====================================================
            NAVBAR
        ===================================================== */}

        <header className="history-navbar">

          {/* LOGO */}

          <div
            className="history-navbar-logo"
            onClick={onHome}
            title="Home"
          >
            <img
              src={logo}
              alt="LFG"
            />
          </div>

          {/* JOGOS */}

          <div className="history-games-navbar">

            {/* OVERWATCH */}

            <div
              className="history-navbar-game"
              onClick={() => selecionarJogo("Overwatch")}
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
              className="history-navbar-game"
              onClick={() => selecionarJogo("Counter-Strike 2")}
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
              className="history-navbar-game"
              onClick={() => selecionarJogo("Valorant")}
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
              className="history-navbar-game"
              onClick={() => selecionarJogo("Fortnite")}
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
              className="history-navbar-game"
              onClick={() => selecionarJogo("Rocket League")}
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
              className="history-navbar-game"
              onClick={() => selecionarJogo("Dota 2")}
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
              className="history-navbar-game"
              onClick={() => selecionarJogo("Marvel Rivals")}
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
              className="history-navbar-game"
              onClick={() => selecionarJogo("League of Legends")}
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

        <main className="history-main">

          {/* CABEÇALHO */}

          <div className="history-header">

            <div>

              <h1>
                Histórico
              </h1>

              <p>
                Veja suas salas criadas e partidas que você participou.
              </p>

            </div>

            {/* BUSCA */}

            <div className="history-search">

              <span>
                ⌕
              </span>

              <input
                type="text"
                placeholder="Buscar no histórico..."
                value={busca}
                onChange={(evento) =>
                  setBusca(evento.target.value)
                }
              />

            </div>

          </div>

          {/* =====================================================
              RESUMO
          ===================================================== */}

          <div className="history-summary">

            <div className="history-summary-card">
              <strong>{resumo.atividades}</strong>
              <span>Atividades</span>
            </div>

            <div className="history-summary-card">
              <strong>{resumo.criadas}</strong>
              <span>Salas criadas</span>
            </div>

            <div className="history-summary-card">
              <strong>{resumo.participadas}</strong>
              <span>Salas participadas</span>
            </div>

            <div className="history-summary-card">
              <strong>{resumo.concluidas}</strong>
              <span>Concluídas</span>
            </div>

          </div>

          {/* =====================================================
              FILTROS
          ===================================================== */}

          <div className="history-filters">

            <button
              type="button"
              className={
                filtro === "todas"
                  ? "history-filter active"
                  : "history-filter"
              }
              onClick={() => setFiltro("todas")}
            >
              Todas
            </button>

            <button
              type="button"
              className={
                filtro === "criadas"
                  ? "history-filter active"
                  : "history-filter"
              }
              onClick={() => setFiltro("criadas")}
            >
              Criadas
            </button>

            <button
              type="button"
              className={
                filtro === "participadas"
                  ? "history-filter active"
                  : "history-filter"
              }
              onClick={() => setFiltro("participadas")}
            >
              Participadas
            </button>

            <button
              type="button"
              className={
                filtro === "concluidas"
                  ? "history-filter active"
                  : "history-filter"
              }
              onClick={() => setFiltro("concluidas")}
            >
              Concluídas
            </button>

          </div>

          {/* =====================================================
              ERRO
          ===================================================== */}

          {erro && (

            <div className="history-empty">

              <span className="history-empty-icon">
                ⚠
              </span>

              <p>{erro}</p>

            </div>

          )}

          {/* =====================================================
              CARREGANDO
          ===================================================== */}

          {carregando && !erro && (

            <div className="history-empty">

              <span className="history-empty-icon">
                ⌛
              </span>

              <p>Carregando histórico...</p>

            </div>

          )}

          {/* =====================================================
              VAZIO
          ===================================================== */}

          {!carregando && !erro && historicoFiltrado.length === 0 && (

            <div className="history-empty">

              <span className="history-empty-icon">
                📭
              </span>

              <p>
                {salas.length === 0
                  ? "Você ainda não tem salas no histórico. Crie ou participe de uma sala para começar."
                  : "Nenhuma sala encontrada com esses filtros."}
              </p>

            </div>

          )}

          {/* =====================================================
              LISTA
          ===================================================== */}

          <section className="history-list">

            {historicoFiltrado.map((item) => (

              <article
                className="history-card"
                key={item.id}
              >

                {/* IMAGEM DO JOGO */}

                <div
                  className="history-card-image"
                  style={{
                    backgroundImage: `url(${item.imagem})`
                  }}
                >
                  <div className="history-card-image-overlay"></div>
                </div>

                {/* INFORMAÇÕES */}

                <div className="history-card-info">

                  <div className="history-card-title">

                    <div>

                      <span className="history-game-name">
                        {item.jogo}
                      </span>

                      <h2>
                        {item.sala}
                      </h2>

                    </div>

                    {/* STATUS */}

                    <span
                      className={
                        item.statusRaw === "cancelada"
                          ? "history-status cancelled"
                          : item.statusRaw === "aberta"
                            ? "history-status open"
                            : "history-status"
                      }
                    >
                      {item.status}
                    </span>

                  </div>

                  {/* TAGS */}

                  <div className="history-tags">

                    <span className="history-tag type">
                      {item.tipo}
                    </span>

                    {item.elo && (

                      <span className="history-tag">
                        Elo: {item.elo}
                      </span>

                    )}

                    <span className="history-tag">
                      👥 {item.jogadores}
                    </span>

                  </div>

                  {/* RODAPÉ: DATA + AÇÕES */}

                  <div className="history-card-footer">

                    <span className="history-date">
                      🕒 {item.data}
                    </span>

                    {/* AÇÕES DO CRIADOR */}

                    {item.euSouCriador && item.statusRaw === "aberta" && (

                      <div className="history-actions">

                        <button
                          type="button"
                          className="history-action finalizar"
                          disabled={acaoId === item.id}
                          onClick={() =>
                            atualizarStatusSala(item.id, "concluida")
                          }
                        >
                          {acaoId === item.id
                            ? "Salvando..."
                            : "Finalizar"}
                        </button>

                        <button
                          type="button"
                          className="history-action cancelar"
                          disabled={acaoId === item.id}
                          onClick={() =>
                            atualizarStatusSala(item.id, "cancelada")
                          }
                        >
                          Cancelar
                        </button>

                      </div>

                    )}

                    {item.euSouCriador && item.statusRaw !== "aberta" && (

                      <div className="history-actions">

                        <button
                          type="button"
                          className="history-action reabrir"
                          disabled={acaoId === item.id}
                          onClick={() =>
                            atualizarStatusSala(item.id, "aberta")
                          }
                        >
                          {acaoId === item.id
                            ? "Salvando..."
                            : "Reabrir"}
                        </button>

                      </div>

                    )}

                  </div>

                </div>

              </article>

            ))}

          </section>

        </main>

      </div>

    </div>
  );
}

export default History;