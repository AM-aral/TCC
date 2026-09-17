import { useState } from "react";
import "./seaCreateRoom.css";

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
import r6Logo from "../assets/games-icon/r6 icon.png";

/* =====================================================
   LOGO GRANDE (ícone do Sea of Thieves)
===================================================== */

import sotBigLogo from "../assets/games-icon/sea icon.png";

/* =====================================================
   FUNDO
===================================================== */

import sotBackground from "../assets/rooms-bg.png";


function SotCreateRoom({
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

    const [selectedMode, setSelectedMode] = useState("AVENTURA");

    const [selectedShip, setSelectedShip] = useState(null);

    const [selectedRole, setSelectedRole] = useState(null);

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
        },
        {
            name: "Rainbow Six Siege",
            logo: r6Logo
        }
    ];


    /* =====================================================
       MODOS
       (cor + ícone SVG — aventura é o mundo aberto com PvP
       ambiental, arena é o PvP competitivo, mares seguros é
       só PvE, e personalizada fica livre)
    ===================================================== */

    const modes = [
        {
            name: "AVENTURA",
            theme: "sot-mode-adventure",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="3"/>
                    <path d="M31 17L26 26L17 31L22 22L31 17Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                    <circle cx="24" cy="24" r="1.5" fill="currentColor"/>
                </svg>
            )
        },
        {
            name: "ARENA",
            theme: "sot-mode-arena",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 8L40 40M40 8L8 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M8 8L14 8L8 14Z" fill="currentColor"/>
                    <path d="M40 8L34 8L40 14Z" fill="currentColor"/>
                    <path d="M8 40L14 40L8 34Z" fill="currentColor"/>
                    <path d="M40 40L34 40L40 34Z" fill="currentColor"/>
                </svg>
            )
        },
        {
            name: "MARES SEGUROS",
            theme: "sot-mode-safe",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 5C24 5 36 10 36 10V22C36 32 30 39 24 43C18 39 12 32 12 22V10C12 10 24 5 24 5Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                    <path d="M17 23L22 28L32 17" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            name: "PERSONALIZADA",
            theme: "sot-mode-custom",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="3"/>
                    <path d="M24 5V12M24 36V43M43 24H36M12 24H5M37.4 10.6L32.5 15.5M15.5 32.5L10.6 37.4M37.4 37.4L32.5 32.5M15.5 15.5L10.6 10.6" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
            )
        }
    ];


    /* =====================================================
       TIPOS DE NAVIO

       OBS: não existe nenhum ícone de navio no projeto ainda
       (nem pasta assets/navios). Por isso os ícones aqui são
       SVG inline, no mesmo padrão dos "modos de jogo" acima.
       Quando tiver as artes reais, dá pra trocar cada `icon`
       por uma tag <img src={...} /> apontando para o arquivo.
    ===================================================== */

    const ships = [
        {
            name: "SLOOP",
            crew: "2 PIRATAS",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 30L24 36L42 30L38 40H10L6 30Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                    <path d="M24 30V8" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M24 10L36 22H24V10Z" fill="currentColor"/>
                </svg>
            )
        },
        {
            name: "BRIGUE",
            crew: "3 PIRATAS",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 30L24 37L44 30L39 41H9L4 30Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                    <path d="M16 30V10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M32 30V6" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M16 12L26 21H16V12Z" fill="currentColor"/>
                    <path d="M32 8L42 19H32V8Z" fill="currentColor"/>
                </svg>
            )
        },
        {
            name: "GALEÃO",
            crew: "4 PIRATAS",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 29L24 38L46 29L40 42H8L2 29Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                    <path d="M13 29V12" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M24 29V6" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M35 29V12" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M13 14L21 22H13V14Z" fill="currentColor"/>
                    <path d="M24 8L34 18H24V8Z" fill="currentColor"/>
                    <path d="M35 14L43 22H35V14Z" fill="currentColor"/>
                </svg>
            )
        }
    ];


    /* =====================================================
       FUNÇÕES NA TRIPULAÇÃO
    ===================================================== */

    const roles = [
        "TIMONEIRO",
        "ARTILHEIRO",
        "NAVEGADOR",
        "VIGIA",
        "REPARADOR"
    ];


    /* =====================================================
       HABILITAÇÃO DO NAVIO
       (na Arena o navio é sempre o Galeão 4v4, então a
       escolha fica travada — nos outros modos é livre)
    ===================================================== */

    const shipEnabled = selectedMode !== "ARENA";


    /* =====================================================
       TROCAR MODO
    ===================================================== */

    const handleModeChange = (mode) => {

        setSelectedMode(mode);

        if (mode === "ARENA") {
            setSelectedShip("GALEÃO");
        } else if (selectedShip === "GALEÃO") {
            setSelectedShip(null);
        }
    };


    /* =====================================================
       TROCAR NAVIO
    ===================================================== */

    const handleShipChange = (ship) => {

        if (!shipEnabled) {
            return;
        }

        setSelectedShip(ship);
    };


    /* =====================================================
       TROCAR FUNÇÃO
       (clicar de novo na mesma função desmarca)
    ===================================================== */

    const handleRoleChange = (role) => {

        setSelectedRole(
            (atual) => (atual === role ? null : role)
        );
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
            jogo: "Sea of Thieves",
            modo: selectedMode,
            navio: selectedShip,
            funcao: selectedRole,
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
            className="sot-create-room-page"
            style={{
                backgroundImage: `url(${sotBackground})`
            }}
        >

            <div className="sot-create-room-overlay"></div>


            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside className="sot-create-sidebar">

                <nav className="sot-create-sidebar-menu">


                    {/* HOME */}

                    <button
                        className="sot-create-sidebar-item"
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
                        className="sot-create-sidebar-item"
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
                        className="sot-create-sidebar-item"
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
                        className="sot-create-sidebar-item"
                        type="button"
                        onClick={onFeedbacks}
                        title="Feedbacks"
                    >

                        <span className="sot-create-feedback-star">
                            ★
                        </span>

                    </button>


                    {/* CONFIGURAÇÕES */}

                    <button
                        className="sot-create-sidebar-item"
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

            <div className="sot-create-room-content">


                {/* =================================================
                    NAVBAR
                ================================================= */}

                <header className="sot-create-navbar">


                    {/* LOGO */}

                    <div
                        className="sot-create-navbar-logo"
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

                    <div className="sot-create-games-navbar">

                        {navbarGames.map((item) => (

                            <div
                                key={item.name}
                                className={
                                    `sot-create-navbar-game ${
                                        game === item.name
                                            ? "sot-create-navbar-active"
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
                                        : item.name === "Rainbow Six Siege"
                                        ? "R6"
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

                <main className="sot-create-room-main">


                    {/* =================================================
                        TOPO
                    ================================================= */}

                    <div className="sot-create-room-top">

                        <button
                            className="sot-back-button"
                            onClick={onBack}
                            type="button"
                        >
                            ← Voltar
                        </button>

                    </div>


                    {/* =================================================
                        LOGO DO JOGO
                    ================================================= */}

                    <div className="sot-create-game-header">

                        <img
                            src={sotBigLogo}
                            alt="Sea of Thieves"
                            className="sot-create-game-logo"
                        />

                    </div>


                    {/* =================================================
                        MODO DE JOGO
                    ================================================= */}

                    <section className="sot-create-section">

                        <div className="sot-section-title">

                            <span></span>

                            <p>
                                MODO DE JOGO
                            </p>

                            <span></span>

                        </div>


                        <div className="sot-game-modes">

                            {modes.map((mode) => (

                                <button
                                    key={mode.name}
                                    className={
                                        `sot-mode-card ${
                                            selectedMode === mode.name
                                                ? "sot-selected"
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
                                            `sot-mode-image sot-mode-icon-wrap ${mode.theme}`
                                        }
                                    >

                                        <div className="sot-mode-icon">
                                            {mode.icon}
                                        </div>

                                        <div className="sot-mode-image-overlay"></div>

                                    </div>


                                    <div className="sot-mode-name">
                                        {mode.name}
                                    </div>

                                </button>

                            ))}

                        </div>

                    </section>


                    {/* =================================================
                        TIPO DE NAVIO
                    ================================================= */}

                    <section className="sot-create-section">

                        <div className="sot-section-title">

                            <span></span>

                            <p>
                                TIPO DE NAVIO
                            </p>

                            <span></span>

                        </div>


                        <div
                            className={
                                `sot-ship-selection ${
                                    !shipEnabled
                                        ? "sot-disabled"
                                        : ""
                                }`
                            }
                        >

                            {ships.map((ship) => (

                                <button
                                    key={ship.name}
                                    className={
                                        `sot-ship-item ${
                                            selectedShip === ship.name
                                                ? "sot-selected"
                                                : ""
                                        }`
                                    }
                                    onClick={() =>
                                        handleShipChange(ship.name)
                                    }
                                    title={ship.name}
                                    type="button"
                                >

                                    <div className="sot-ship-placeholder">

                                        <div className="sot-ship-icon">
                                            {ship.icon}
                                        </div>

                                    </div>


                                    <span className="sot-ship-label">
                                        {ship.name}
                                    </span>

                                    <span className="sot-ship-crew">
                                        {ship.crew}
                                    </span>

                                </button>

                            ))}


                            {!shipEnabled && (

                                <div className="sot-ship-disabled-message">

                                    NA ARENA O NAVIO É SEMPRE
                                    GALEÃO (4 PIRATAS)

                                </div>

                            )}

                        </div>

                    </section>


                    {/* =================================================
                        FUNÇÃO
                    ================================================= */}

                    <section className="sot-create-section">

                        <div className="sot-section-title">

                            <span></span>

                            <p>
                                FUNÇÃO NA TRIPULAÇÃO
                            </p>

                            <span></span>

                        </div>


                        <div className="sot-role-selection">

                            {roles.map((role) => (

                                <button
                                    key={role}
                                    className={
                                        `sot-role-item ${
                                            selectedRole === role
                                                ? "sot-selected"
                                                : ""
                                        }`
                                    }
                                    onClick={() =>
                                        handleRoleChange(role)
                                    }
                                    type="button"
                                >

                                    <span className="sot-role-name">
                                        {role}
                                    </span>

                                </button>

                            ))}

                        </div>

                    </section>


                    {/* =================================================
                        GÊNERO
                    ================================================= */}

                    <section className="sot-create-section">

                        <div className="sot-section-title">

                            <span></span>

                            <p>
                                GÊNERO
                            </p>

                            <span></span>

                        </div>


                        <div className="sot-gender-selection">

                            <button
                                type="button"
                                className={
                                    `sot-gender-button ${
                                        selectedGender === "HOMEM"
                                            ? "sot-selected"
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
                                    `sot-gender-button ${
                                        selectedGender === "MULHER"
                                            ? "sot-selected"
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

                    <section className="sot-create-section">

                        <div className="sot-section-title">

                            <span></span>

                            <p>
                                DETALHES DA SALA
                            </p>

                            <span></span>

                        </div>


                        <div className="sot-room-details-form">

                            <div className="sot-detail-box">

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


                            <div className="sot-detail-box">

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

                    <div className="sot-create-actions">

                        <button
                            className="sot-create-button"
                            onClick={handleCreateRoom}
                            type="button"
                        >
                            CRIAR SALA
                        </button>


                        <button
                            className="sot-cancel-button"
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


export default SotCreateRoom;