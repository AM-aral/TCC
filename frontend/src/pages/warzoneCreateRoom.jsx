import { useState } from "react";
import "./warzoneCreateRoom.css";

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
   LOGO GRANDE (ícone do Warzone)
===================================================== */

import warzoneBigLogo from "../assets/games-icon/warzone icon.png";

/* =====================================================
   ELOS DO WARZONE
   (a pasta já tem só 1 ícone por faixa, então não precisa
   reduzir nada aqui)
===================================================== */

import bronzeIcon from "../assets/elos/warzone/brozne.png";
import prataIcon from "../assets/elos/warzone/prata.png";
import ouroIcon from "../assets/elos/warzone/ouro.png";
import platinaIcon from "../assets/elos/warzone/platina.png";
import diamanteIcon from "../assets/elos/warzone/dima.png";
import crimsonIcon from "../assets/elos/warzone/crimson.png";
import iridescenteIcon from "../assets/elos/warzone/iridescent.png";
import top250Icon from "../assets/elos/warzone/top 250.png";

/* =====================================================
   FUNDO
===================================================== */

import warzoneBackground from "../assets/rooms-bg.png";


function WarzoneCreateRoom({
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

    const [selectedMode, setSelectedMode] = useState("BATTLE ROYALE");

    const [selectedTeam, setSelectedTeam] = useState("TRIO");

    const [selectedRank, setSelectedRank] = useState(null);

    const [selectedGender, setSelectedGender] = useState("HOMEM");

    const [roomName, setRoomName] = useState("");

    const [roomDescription, setRoomDescription] = useState("");


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
       (cor + ícone SVG em vez de imagem — o Warzone não
       tem "mapa" fixo por modo de sala)
    ===================================================== */

    const modes = [
        {
            name: "BATTLE ROYALE",
            theme: "warzone-mode-br",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4L44 14V34L24 44L4 34V14L24 4Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                    <path d="M24 4V44M4 14L44 34M44 14L4 34" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.5"/>
                </svg>
            )
        },
        {
            name: "RESSURGÊNCIA",
            theme: "warzone-mode-resurgence",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M38 16C35 10 29.5 6 23 6C13.6 6 6 13.6 6 23C6 32.4 13.6 40 23 40C31 40 37.6 34.5 39.4 27" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M38 6V16H28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            name: "RANQUEADA",
            theme: "warzone-mode-ranked",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 5L29 18L42 20L32.5 29L35 42L24 36L13 42L15.5 29L6 20L19 18L24 5Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            name: "PLUNDER",
            theme: "warzone-mode-plunder",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 20L16 8H32L36 20" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                    <path d="M8 20H40L37 41H11L8 20Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                    <path d="M24 26V34" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
            )
        },
        {
            name: "DMZ",
            theme: "warzone-mode-dmz",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 6L38 12V24C38 33 32 39 24 42C16 39 10 33 10 24V12L24 6Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                    <path d="M18 24L22 28L31 19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        }
    ];


    /* =====================================================
       TAMANHO DA EQUIPE
    ===================================================== */

    const teams = [
        "SOLO",
        "DUPLA",
        "TRIO",
        "ESQUADRÃO"
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
            name: "CARMESIM",
            image: crimsonIcon
        },
        {
            name: "IRIDESCENTE",
            image: iridescenteIcon
        },
        {
            name: "TOP 250",
            image: top250Icon
        }
    ];


    /* =====================================================
       HABILITAÇÃO DO ELO
       (o Warzone só tem elo no modo Ranqueada)
    ===================================================== */

    const rankEnabled = selectedMode === "RANQUEADA";


    /* =====================================================
       TROCAR MODO
    ===================================================== */

    const handleModeChange = (mode) => {

        setSelectedMode(mode);

        if (mode !== "RANQUEADA") {
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
       CRIAR SALA
    ===================================================== */

    const handleCreateRoom = () => {

        const novaSala = {
            jogo: "Warzone",
            modo: selectedMode,
            equipe: selectedTeam,
            elo: rankEnabled ? selectedRank : null,
            genero: selectedGender,
            nome: roomName,
            descricao: roomDescription
        };

        console.log("Sala criada:", novaSala);
    };


    /* =====================================================
       SE NÃO EXISTIR JOGO
    ===================================================== */

    if (!game) {
        return null;
    }


    return (

        <div
            className="warzone-create-room-page"
            style={{
                backgroundImage: `url(${warzoneBackground})`
            }}
        >

            <div className="warzone-create-room-overlay"></div>


            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside className="warzone-create-sidebar">

                <nav className="warzone-create-sidebar-menu">


                    {/* HOME */}

                    <button
                        className="warzone-create-sidebar-item"
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
                        className="warzone-create-sidebar-item"
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
                        className="warzone-create-sidebar-item"
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
                        className="warzone-create-sidebar-item"
                        type="button"
                        onClick={onFeedbacks}
                        title="Feedbacks"
                    >

                        <span className="warzone-create-feedback-star">
                            ★
                        </span>

                    </button>


                    {/* CONFIGURAÇÕES */}

                    <button
                        className="warzone-create-sidebar-item"
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

            <div className="warzone-create-room-content">


                {/* =================================================
                    NAVBAR
                ================================================= */}

                <header className="warzone-create-navbar">


                    {/* LOGO */}

                    <div
                        className="warzone-create-navbar-logo"
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

                    <div className="warzone-create-games-navbar">

                        {navbarGames.map((item) => (

                            <div
                                key={item.name}
                                className={
                                    `warzone-create-navbar-game ${
                                        game === item.name
                                            ? "warzone-create-navbar-active"
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

                <main className="warzone-create-room-main">


                    {/* =================================================
                        TOPO
                    ================================================= */}

                    <div className="warzone-create-room-top">

                        <button
                            className="warzone-back-button"
                            onClick={onBack}
                            type="button"
                        >
                            ← Voltar
                        </button>

                    </div>


                    {/* =================================================
                        LOGO DO JOGO
                    ================================================= */}

                    <div className="warzone-create-game-header">

                        <img
                            src={warzoneBigLogo}
                            alt="Warzone"
                            className="warzone-create-game-logo"
                        />

                    </div>


                    {/* =================================================
                        MODO DE JOGO
                    ================================================= */}

                    <section className="warzone-create-section">

                        <div className="warzone-section-title">

                            <span></span>

                            <p>
                                MODO DE JOGO
                            </p>

                            <span></span>

                        </div>


                        <div className="warzone-game-modes">

                            {modes.map((mode) => (

                                <button
                                    key={mode.name}
                                    className={
                                        `warzone-mode-card ${
                                            selectedMode === mode.name
                                                ? "warzone-selected"
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
                                            `warzone-mode-image warzone-mode-icon-wrap ${mode.theme}`
                                        }
                                    >

                                        <div className="warzone-mode-icon">
                                            {mode.icon}
                                        </div>

                                        <div className="warzone-mode-image-overlay"></div>

                                    </div>


                                    <div className="warzone-mode-name">
                                        {mode.name}
                                    </div>

                                </button>

                            ))}

                        </div>

                    </section>


                    {/* =================================================
                        TAMANHO DA EQUIPE
                    ================================================= */}

                    <section className="warzone-create-section">

                        <div className="warzone-section-title">

                            <span></span>

                            <p>
                                TAMANHO DA EQUIPE
                            </p>

                            <span></span>

                        </div>


                        <div className="warzone-team-size">

                            {teams.map((team) => (

                                <button
                                    key={team}
                                    className={
                                        `warzone-team-button ${
                                            selectedTeam === team
                                                ? "warzone-selected"
                                                : ""
                                        }`
                                    }
                                    onClick={() =>
                                        setSelectedTeam(team)
                                    }
                                    type="button"
                                >

                                    {team}

                                </button>

                            ))}

                        </div>

                    </section>


                    {/* =================================================
                        ELO
                    ================================================= */}

                    <section className="warzone-create-section">

                        <div className="warzone-section-title">

                            <span></span>

                            <p>
                                ELO
                            </p>

                            <span></span>

                        </div>


                        <div
                            className={
                                `warzone-rank-selection ${
                                    !rankEnabled
                                        ? "warzone-disabled"
                                        : ""
                                }`
                            }
                        >

                            {ranks.map((rank) => (

                                <button
                                    key={rank.name}
                                    className={
                                        `warzone-rank-item ${
                                            selectedRank === rank.name
                                                ? "warzone-selected"
                                                : ""
                                        }`
                                    }
                                    onClick={() => {

                                        if (!rankEnabled) {
                                            return;
                                        }

                                        setSelectedRank(rank.name);

                                    }}
                                    title={rank.name}
                                    type="button"
                                >

                                    <div className="warzone-rank-placeholder">

                                        <img
                                            src={rank.image}
                                            alt={rank.name}
                                            className="warzone-rank-icon"
                                        />

                                    </div>

                                </button>

                            ))}


                            {!rankEnabled && (

                                <div className="warzone-rank-disabled-message">

                                    ELO DISPONÍVEL APENAS PARA
                                    O MODO RANQUEADA

                                </div>

                            )}

                        </div>

                    </section>


                    {/* =================================================
                        GÊNERO
                    ================================================= */}

                    <section className="warzone-create-section">

                        <div className="warzone-section-title">

                            <span></span>

                            <p>
                                GÊNERO
                            </p>

                            <span></span>

                        </div>


                        <div className="warzone-gender-selection">

                            <button
                                type="button"
                                className={
                                    `warzone-gender-button ${
                                        selectedGender === "HOMEM"
                                            ? "warzone-selected"
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
                                    `warzone-gender-button ${
                                        selectedGender === "MULHER"
                                            ? "warzone-selected"
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

                    <section className="warzone-create-section">

                        <div className="warzone-section-title">

                            <span></span>

                            <p>
                                DETALHES DA SALA
                            </p>

                            <span></span>

                        </div>


                        <div className="warzone-room-details-form">

                            <div className="warzone-detail-box">

                                <label>
                                    Nome da sala
                                </label>

                                <input
                                    type="text"
                                    placeholder="Digite o nome da sala..."
                                    value={roomName}
                                    onChange={(e) =>
                                        setRoomName(e.target.value)
                                    }
                                />

                            </div>


                            <div className="warzone-detail-box">

                                <label>
                                    Descrição
                                </label>

                                <textarea
                                    placeholder="Digite uma descrição..."
                                    value={roomDescription}
                                    onChange={(e) =>
                                        setRoomDescription(e.target.value)
                                    }
                                ></textarea>

                            </div>

                        </div>

                    </section>


                    {/* =================================================
                        BOTÕES
                    ================================================= */}

                    <div className="warzone-create-actions">

                        <button
                            className="warzone-create-button"
                            onClick={handleCreateRoom}
                            type="button"
                        >
                            CRIAR SALA
                        </button>


                        <button
                            className="warzone-cancel-button"
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


export default WarzoneCreateRoom;