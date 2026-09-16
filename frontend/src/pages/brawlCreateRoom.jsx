import { useState } from "react";
import "./brawlCreateRoom.css";

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
   LOGO GRANDE (ícone do Brawlhalla)
===================================================== */

import brawlBigLogo from "../assets/games-icon/brawl icon.png";

/* =====================================================
   ELOS DO BRAWLHALLA
===================================================== */

import tinIcon from "../assets/elos/brawl/tin.png";
import bronzeIcon from "../assets/elos/brawl/bronze.png";
import prataIcon from "../assets/elos/brawl/prata.png";
import ouroIcon from "../assets/elos/brawl/ouro.png";
import platinaIcon from "../assets/elos/brawl/platina.png";
import diamanteIcon from "../assets/elos/brawl/diamante.png";
import vallhallanIcon from "../assets/elos/brawl/vallhallan.png";

/* =====================================================
   FUNDO
===================================================== */

import brawlBackground from "../assets/rooms-bg.png";


function BrawlCreateRoom({
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

    const [selectedMode, setSelectedMode] = useState("RANKED 1V1");

    const [selectedRank, setSelectedRank] = useState(null);

    const [selectedGender, setSelectedGender] = useState("HOMEM");


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
       (cor + ícone SVG em vez de imagem, já que o Brawlhalla
       não tem "mapa" fixo por modo)
    ===================================================== */

    const modes = [
        {
            name: "RANKED 1V1",
            theme: "mode-1v1",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 42L20 28M42 6L28 20" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
                    <path d="M6 6L20 20M42 42L28 28" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
                    <circle cx="24" cy="24" r="3" fill="currentColor"/>
                </svg>
            )
        },
        {
            name: "RANKED 2V2",
            theme: "mode-2v2",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 6L22 10V22L15 26L8 22V10L15 6Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                    <path d="M33 6L40 10V22L33 26L26 22V10L33 6Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                    <path d="M15 26V34C15 38 19 41 24 42C29 41 33 38 33 34V26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
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
        },
        {
            name: "EXPERIMENTAL",
            theme: "mode-experimental",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 6H29" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M21 6V18L10 36C9 39 11 42 14 42H34C37 42 39 39 38 36L27 18V6" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                    <path d="M16 30H32" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
            )
        }
    ];


    /* =====================================================
       ELOS
    ===================================================== */

    const ranks = [
        {
            name: "TIN",
            image: tinIcon
        },
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
            name: "VALHALLAN",
            image: vallhallanIcon
        }
    ];


    /* =====================================================
       HABILITAÇÃO DO ELO
       (só faz sentido em partidas ranqueadas)
    ===================================================== */

    const rankEnabled =
        selectedMode === "RANKED 1V1" ||
        selectedMode === "RANKED 2V2";


    /* =====================================================
       TROCAR MODO
    ===================================================== */

    const handleModeChange = (mode) => {

        setSelectedMode(mode);

        if (
            mode !== "RANKED 1V1" &&
            mode !== "RANKED 2V2"
        ) {
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
       SE NÃO EXISTIR JOGO
    ===================================================== */

    if (!game) {
        return null;
    }


    return (

        <div
            className="create-room-page"
            style={{
                backgroundImage: `url(${brawlBackground})`
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
                            src={brawlBigLogo}
                            alt="Brawlhalla"
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


                        <div className="game-modes brawl-modes">

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
                                            `mode-image brawl-mode-image ${mode.theme}`
                                        }
                                    >

                                        <div className="brawl-mode-icon">
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
                                    RANKED 1V1 E RANKED 2V2

                                </div>

                            )}

                        </div>

                    </section>


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
                                        selectedGender === "HOMEM"
                                            ? "selected"
                                            : ""
                                    }`
                                }
                                onClick={() =>
                                    setSelectedGender("HOMEM")
                                }
                            >

                                ♂ HOMEM

                            </button>


                            <button
                                type="button"
                                className={
                                    `gender-button female ${
                                        selectedGender === "MULHER"
                                            ? "selected"
                                            : ""
                                    }`
                                }
                                onClick={() =>
                                    setSelectedGender("MULHER")
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
                                />

                            </div>


                            <div className="detail-box">

                                <label>
                                    Descrição
                                </label>

                                <textarea
                                    placeholder="Digite uma descrição..."
                                ></textarea>

                            </div>

                        </div>

                    </section>


                    {/* =================================================
                        BOTÕES
                    ================================================= */}

                    <div className="create-actions">

                        <button
                            className="create-button"
                            type="button"
                        >
                            CRIAR SALA
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


export default BrawlCreateRoom;