import { useState } from "react";
import "./valCreateRoom.css";

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
   LOGO GRANDE (ícone do Valorant)
===================================================== */

import valorantBigLogo from "../assets/games-icon/valorant icon.png";

/* =====================================================
   IMAGENS DOS MODOS
   (únicas 4 que existem em assets/room-modes/valorant)
===================================================== */

import competitivoImg from "../assets/room-modes/valorant/competitivo.png";
import freneticoImg from "../assets/room-modes/valorant/frenetico.png";
import mataMataImg from "../assets/room-modes/valorant/matamata.png";
import semClassImg from "../assets/room-modes/valorant/sem class.png";

/* =====================================================
   ELOS DO VALORANT
   (pegando o ícone "tier 1" de cada rank)
===================================================== */

import ferroIcon from "../assets/elos/valorant/ferro.png";
import bronzeIcon from "../assets/elos/valorant/bronze .png";
import prataIcon from "../assets/elos/valorant/silver.png";
import ouroIcon from "../assets/elos/valorant/gold.png";
import platinaIcon from "../assets/elos/valorant/platina 1.png";
import diamanteIcon from "../assets/elos/valorant/diamante 1.png";
import ascendenteIcon from "../assets/elos/valorant/ascendente.png";
import imortalIcon from "../assets/elos/valorant/imortal.png";
import radianteIcon from "../assets/elos/valorant/radiante.png";

/* =====================================================
   FUNDO
===================================================== */

import valorantBackground from "../assets/rooms-bg.png";


function ValorantCreateRoom({
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

    const [selectedMode, setSelectedMode] = useState("COMPETITIVO");

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
    ===================================================== */

    const modes = [
        {
            name: "COMPETITIVO",
            image: competitivoImg
        },
        {
            name: "NÃO-CLASSIFICATÓRIA",
            image: semClassImg
        },
        {
            name: "MATA-MATA",
            image: mataMataImg
        },
        {
            name: "FRENÉTICO",
            image: freneticoImg
        }
    ];


    /* =====================================================
       ELOS
    ===================================================== */

    const ranks = [
        {
            name: "FERRO",
            image: ferroIcon
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
            name: "ASCENDENTE",
            image: ascendenteIcon
        },
        {
            name: "IMORTAL",
            image: imortalIcon
        },
        {
            name: "RADIANTE",
            image: radianteIcon
        }
    ];


    /* =====================================================
       HABILITAÇÃO DO ELO
       (no Valorant, elo só faz sentido no Competitivo)
    ===================================================== */

    const rankEnabled = selectedMode === "COMPETITIVO";


    /* =====================================================
       TROCAR MODO
    ===================================================== */

    const handleModeChange = (mode) => {

        setSelectedMode(mode);

        if (mode !== "COMPETITIVO") {
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
                backgroundImage: `url(${valorantBackground})`
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
                            src={valorantBigLogo}
                            alt="Valorant"
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


                        <div className="game-modes valorant-modes">

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

                                    <div className="mode-image">

                                        <img
                                            src={mode.image}
                                            alt={mode.name}
                                        />

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
                                    O MODO COMPETITIVO

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


export default ValCreateRoom;