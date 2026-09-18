import { useState } from "react";
import "./rocketCreateRoom.css";

import { apiFetch } from "../api";

import TeamSize from "../components/TeamSize";

import logo from "../assets/logo.png";

/* =====================================================
   SIDEBAR
===================================================== */

import homeIcon from "../assets/sidebar/home.png";
import perfilIcon from "../assets/sidebar/perfil.png";
import historicoIcon from "../assets/sidebar/historico.png";
import configuracoesIcon from "../assets/sidebar/configuracoes.png";

/* =====================================================
   ÍCONES DOS JOGOS (navbar)
===================================================== */

import owLogo from "../assets/icon/ow icon.png";
import cs2Logo from "../assets/icon/cs icon.png";
import valorantLogo from "../assets/icon/val icon.png";
import fortniteLogo from "../assets/icon/fortinite icon.png";
import rocketLogo from "../assets/icon/rocket icon.png";
import dotaLogo from "../assets/icon/dota icon.png";
import rivalsLogo from "../assets/icon/marvel icon.png";
import lolLogo from "../assets/icon/lol icon.png";

/* =====================================================
   LOGO GRANDE (ícone do Rocket League)
===================================================== */

import rocketBigLogo from "../assets/games-icon/rocket icon.png";

/* =====================================================
   ELOS DO ROCKET LEAGUE
===================================================== */

import bronzeIcon from "../assets/elos/rocket/bronze.png";
import prataIcon from "../assets/elos/rocket/prata.png";
import ouroIcon from "../assets/elos/rocket/gold.png";
import platinaIcon from "../assets/elos/rocket/platina.png";
import diamanteIcon from "../assets/elos/rocket/diamante.png";
import campeaoIcon from "../assets/elos/rocket/campiao.png";
import graoCampeaoIcon from "../assets/elos/rocket/grao campeao.png";
import sslIcon from "../assets/elos/rocket/SSL.png";

/* =====================================================
   FUNDO
===================================================== */

import rocketBackground from "../assets/rooms-bg.png";


function RocketCreateRoom({
    game,
    onBack,
    onProfile,
    onHistory,
    onFeedbacks,
    onGameSelect,
    onSettings
}) {

    /* =====================================================
       ESTADOS
    ===================================================== */

    const [selectedMode, setSelectedMode] = useState("RANKED DUELO");

    const [selectedTeam, setSelectedTeam] = useState("DUO");

    const [selectedRank, setSelectedRank] = useState(null);

    const [selectedGender, setSelectedGender] = useState(["HOMEM"]);

    const [nomeSala, setNomeSala] = useState("");

    const [descricao, setDescricao] = useState("");

    const [criando, setCriando] = useState(false);

    const [erro, setErro] = useState("");


    /* =====================================================
       JOGOS DA NAVBAR
    ===================================================== */

    const navbarGames = [
        {
            name: "Overwatch",
            logo: owLogo
        },
        {
            name: "Counter-Strike 2",
            logo: cs2Logo
        },
        {
            name: "Valorant",
            logo: valorantLogo
        },
        {
            name: "Fortnite",
            logo: fortniteLogo
        },
        {
            name: "Rocket League",
            logo: rocketLogo
        },
        {
            name: "Dota 2",
            logo: dotaLogo
        },
        {
            name: "Marvel Rivals",
            logo: rivalsLogo
        },
        {
            name: "League of Legends",
            logo: lolLogo
        }
    ];


    /* =====================================================
       MODOS
       (a pasta assets/room-modes não tem "rocket", então
       os cards usam cor + ícone SVG, igual ao Brawlhalla)
    ===================================================== */

    const modes = [
        {
            name: "RANKED DUELO",
            theme: "mode-1v1",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="7" stroke="currentColor" strokeWidth="3"/>
                    <path d="M6 24H14M34 24H42M24 6V14M24 34V42" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
            )
        },
        {
            name: "RANKED DUPLA",
            theme: "mode-2v2",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="17" cy="24" r="6" stroke="currentColor" strokeWidth="3"/>
                    <circle cx="31" cy="24" r="6" stroke="currentColor" strokeWidth="3"/>
                    <path d="M6 24H11M23 24H25M37 24H42" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
            )
        },
        {
            name: "RANKED PADRÃO",
            theme: "mode-3v3",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="14" cy="24" r="5" stroke="currentColor" strokeWidth="3"/>
                    <circle cx="24" cy="16" r="5" stroke="currentColor" strokeWidth="3"/>
                    <circle cx="34" cy="24" r="5" stroke="currentColor" strokeWidth="3"/>
                    <path d="M14 33H34" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
            )
        },
        {
            name: "CASUAL",
            theme: "mode-casual",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" y="16" width="36" height="20" rx="10" stroke="currentColor" strokeWidth="3"/>
                    <path d="M15 21V31M10 26H20" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    <circle cx="32" cy="22" r="2.2" fill="currentColor"/>
                    <circle cx="37" cy="27" r="2.2" fill="currentColor"/>
                </svg>
            )
        }
    ];


    /* =====================================================
       ELOS
    ===================================================== */

    const ranks = [
        {
            name: "BRONZE",
            image: bronzeIcon
        },
        {
            name: "PRATA",
            image: prataIcon
        },
        {
            name: "OURO",
            image: ouroIcon
        },
        {
            name: "PLATINA",
            image: platinaIcon
        },
        {
            name: "DIAMANTE",
            image: diamanteIcon
        },
        {
            name: "CAMPEÃO",
            image: campeaoIcon
        },
        {
            name: "GRÃO CAMPEÃO",
            image: graoCampeaoIcon
        },
        {
            name: "SSL",
            image: sslIcon
        }
    ];


    /* =====================================================
       TAMANHO DAS EQUIPES
    ===================================================== */

    const teams = [
        "SOLO",
        "DUO",
        "TRIO"
    ];


    /* =====================================================
       HABILITAÇÃO DO ELO
       (no Rocket League, elo só faz sentido nos modos
       ranqueados — não no Casual)
    ===================================================== */

    const rankEnabled = selectedMode !== "CASUAL";


    const modoSoloDuo = selectedMode === "RANKED DUELO";


    const alternarGenero = (genero) => {

        setSelectedGender((atual) => {

            if (atual.includes(genero)) {

                if (atual.length === 1) {
                    return atual;
                }

                return atual.filter((item) => item !== genero);
            }

            return [...atual, genero];
        });
    };


    /* =====================================================
       TROCAR MODO
    ===================================================== */

    const handleModeChange = (mode) => {

        setSelectedMode(mode);

        if (mode === "CASUAL") {
            setSelectedRank(null);
        }
    };


    /* =====================================================
       TROCAR JOGO PELA NAVBAR

       IMPORTANTE:
       Aqui o jogo é enviado para o App.jsx.
    ===================================================== */

    const handleGameSelect = (selectedGame) => {

        console.log(
            "Jogo selecionado na navbar:",
            selectedGame
        );

        if (typeof onGameSelect === "function") {
            onGameSelect(selectedGame);
        }
    };


    /* =====================================================
       CRIAR SALA NO BACKEND
    ===================================================== */

    const tamanhos = {
        SOLO: 1,
        DUO: 2,
        TRIO: 3
    };


    const criarSala = async () => {

        if (!nomeSala.trim()) {
            setErro("Digite o nome da sala.");
            return;
        }

        try {

            setErro("");
            setCriando(true);

            await apiFetch("/rooms", {
                method: "POST",
                body: JSON.stringify({
                    jogo: game,
                    nome: nomeSala.trim(),
                    descricao: descricao.trim(),
                    modo: selectedMode,
                    time: selectedTeam,
                    elo: selectedRank || "",
                    funcao: "",
                    genero: selectedGender.join(", "),
                    maxJogadores: modoSoloDuo
                        ? 2
                        : (tamanhos[selectedTeam] || 2)
                })
            });

            onBack();

        } catch (e) {

            setErro(e.message);

        } finally {

            setCriando(false);

        }

    };


    /* =====================================================
       SE NÃO EXISTIR JOGO
    ===================================================== */

    if (!game) {
        return null;
    }


    return (

        <div
            className="create-room-page"
            style={{
                backgroundImage: `url(${rocketBackground})`
            }}
        >

            <div className="create-room-overlay"></div>


            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside className="create-sidebar">

                <nav className="create-sidebar-menu">


                    {/* HOME */}

                    <button
                        className="create-sidebar-item"
                        type="button"
                        onClick={onBack}
                        title="Home"
                    >

                        <img
                            src={homeIcon}
                            alt="Home"
                        />

                    </button>


                    {/* PERFIL */}

                    <button
                        className="create-sidebar-item"
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
                        className="create-sidebar-item"
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
                        className="create-sidebar-item"
                        type="button"
                        onClick={onFeedbacks}
                        title="Feedbacks"
                    >

                        <span className="create-feedback-star">
                            ★
                        </span>

                    </button>


                    {/* CONFIGURAÇÕES */}

                    <button
                        className="create-sidebar-item"
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


            {/* =================================================
                CONTEÚDO
            ================================================= */}

            <div className="create-room-content">


                {/* =================================================
                    NAVBAR
                ================================================= */}

                <header className="create-navbar">


                    {/* LOGO */}

                    <div
                        className="create-navbar-logo"
                        onClick={onBack}
                        title="Home"
                    >

                        <img
                            src={logo}
                            alt="LFG"
                        />

                    </div>


                    {/* =================================================
                        JOGOS
                    ================================================= */}

                    <div className="create-games-navbar">

                        {navbarGames.map((item) => (

                            <div
                                key={item.name}
                                className={
                                    `create-navbar-game ${
                                        game === item.name
                                            ? "create-navbar-active"
                                            : ""
                                    }`
                                }
                                onClick={() =>
                                    handleGameSelect(item.name)
                                }
                                title={`Ir para salas de ${item.name}`}
                            >

                                <img
                                    src={item.logo}
                                    alt={item.name}
                                />

                                <span>
                                    {item.name === "Counter-Strike 2"
                                        ? "CS2"
                                        : item.name.toUpperCase()
                                    }
                                </span>

                            </div>

                        ))}

                    </div>

                </header>


                {/* =================================================
                    CRIAÇÃO DA SALA
                ================================================= */}

                <main className="create-room-main">


                    {/* =================================================
                        TOPO
                    ================================================= */}

                    <div className="create-room-top">

                        <button
                            className="back-button"
                            onClick={onBack}
                            type="button"
                        >
                            ← Voltar
                        </button>

                    </div>


                    {/* =================================================
                        LOGO DO JOGO
                    ================================================= */}

                    <div className="create-game-header">

                        <img
                            src={rocketBigLogo}
                            alt="Rocket League"
                            className="create-game-logo"
                        />

                    </div>


                    {/* =================================================
                        MODO DE JOGO
                    ================================================= */}

                    <section className="create-section">

                        <div className="section-title">

                            <span></span>

                            <p>
                                MODO DE JOGO
                            </p>

                            <span></span>

                        </div>


                        <div className="game-modes rocket-modes">

                            {modes.map((mode) => (

                                <button
                                    key={mode.name}
                                    className={
                                        `mode-card ${
                                            selectedMode === mode.name
                                                ? "selected"
                                                : ""
                                        }`
                                    }
                                    onClick={() =>
                                        handleModeChange(mode.name)
                                    }
                                    type="button"
                                >

                                    <div
                                        className={
                                            `mode-image rocket-mode-image ${mode.theme}`
                                        }
                                    >

                                        <div className="rocket-mode-icon">
                                            {mode.icon}
                                        </div>

                                        <div className="mode-image-overlay"></div>

                                    </div>


                                    <div className="mode-name">
                                        {mode.name}
                                    </div>

                                </button>

                            ))}

                        </div>

                    </section>


                    {/* =================================================
                        ELO
                    ================================================= */}

                    <section className="create-section">

                        <div className="section-title">

                            <span></span>

                            <p>
                                ELO
                            </p>

                            <span></span>

                        </div>


                        <div
                            className={
                                `rank-selection ${
                                    !rankEnabled
                                        ? "disabled"
                                        : ""
                                }`
                            }
                        >

                            {ranks.map((rank) => (

                                <button
                                    key={rank.name}
                                    className={
                                        `rank-item ${
                                            selectedRank === rank.name
                                                ? "selected"
                                                : ""
                                        }`
                                    }
                                    onClick={() => {

                                        if (!rankEnabled) {
                                            return;
                                        }

                                        setSelectedRank(rank.name);

                                    }}
                                    type="button"
                                >

                                    <div className="rank-placeholder">

                                        <img
                                            src={rank.image}
                                            alt={rank.name}
                                            className="rank-icon"
                                        />

                                    </div>

                                </button>

                            ))}


                            {!rankEnabled && (

                                <div className="rank-disabled-message">

                                    ELO DISPONÍVEL APENAS PARA
                                    OS MODOS RANQUEADOS

                                </div>

                            )}

                        </div>

                    </section>


{/* =================================================
                        TAMANHO DA EQUIPE
                    ================================================= */}

                    {!modoSoloDuo && (

                    <section className="create-section">

                        <div className="section-title">

                            <span></span>

                            <p>
                                TAMANHO DA EQUIPE
                            </p>

                            <span></span>

                        </div>


                        <TeamSize
                            opcoes={teams}
                            valor={selectedTeam}
                            onChange={setSelectedTeam}
                        />

                    </section>
                    )}


                    {/* =================================================
                        GÊNERO
                    ================================================= */}

                    <section className="create-section">

                        <div className="section-title">

                            <span></span>

                            <p>
                                GÊNERO
                            </p>

                            <span></span>

                        </div>


                        <div className="gender-selection">

                            <button
                                type="button"
                                className={
                                    `gender-button male ${
                                        selectedGender.includes("HOMEM")
                                            ? "selected"
                                            : ""
                                    }`
                                }
                                onClick={() =>
                                    alternarGenero("HOMEM")
                                }
                            >

                                ♂ HOMEM

                            </button>


                            <button
                                type="button"
                                className={
                                    `gender-button female ${
                                        selectedGender.includes("MULHER")
                                            ? "selected"
                                            : ""
                                    }`
                                }
                                onClick={() =>
                                    alternarGenero("MULHER")
                                }
                            >

                                ♀ MULHER

                            </button>

                        </div>

                    </section>


                    {/* =================================================
                        DETALHES
                    ================================================= */}

                    <section className="create-section">

                        <div className="section-title">

                            <span></span>

                            <p>
                                DETALHES DA SALA
                            </p>

                            <span></span>

                        </div>


                        <div className="room-details-form">

                            <div className="detail-box">

                                <label>
                                    Nome da sala
                                </label>

                                <input
                                    type="text"
                                    placeholder="Digite o nome da sala..."
                                    value={nomeSala}
                                    onChange={(e) =>
                                        setNomeSala(e.target.value)
                                    }
                                />

                            </div>


                            <div className="detail-box">

                                <label>
                                    Descrição
                                </label>

                                <textarea
                                    placeholder="Digite uma descrição..."
                                    value={descricao}
                                    onChange={(e) =>
                                        setDescricao(e.target.value)
                                    }
                                ></textarea>

                            </div>

                        </div>

                    </section>


                    {/* =================================================
                        BOTÕES
                    ================================================= */}

                    <div className="create-actions">

                        {erro && (
                            <p
                                style={{
                                    color: "#ffb3b3",
                                    textAlign: "center",
                                    width: "100%"
                                }}
                            >
                                {erro}
                            </p>
                        )}

                        <button
                            className="create-button"
                            type="button"
                            onClick={criarSala}
                            disabled={criando}
                        >
                            {criando ? "CRIANDO..." : "CRIAR SALA"}
                        </button>


                        <button
                            className="cancel-button"
                            onClick={onBack}
                            type="button"
                        >
                            CANCELAR
                        </button>

                    </div>

                </main>

            </div>

        </div>
    );
}


export default RocketCreateRoom;