import { useState } from "react";
import "./csCreateRoom.css";

import { apiFetch } from "../api";

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
import cs2Logo from "../assets/icon/cs icon.png";
import valorantLogo from "../assets/icon/val icon.png";
import fortniteLogo from "../assets/icon/fortinite icon.png";
import rocketLogo from "../assets/icon/rocket icon.png";
import dotaLogo from "../assets/icon/dota icon.png";
import rivalsLogo from "../assets/icon/marvel icon.png";
import lolLogo from "../assets/icon/lol icon.png";

/* =====================================================
   LOGO GRANDE (ícone do CS2)
   OBS: a pasta LOGAO não tem cs-big.png, então usamos o
   mesmo ícone padrão que o Rocket usa (games-icon), que
   já existe no projeto.
===================================================== */

import csBigLogo from "../assets/games-icon/cs2 icon.png";

/* =====================================================
   ELOS
   (mostramos só a MELHOR divisão de cada faixa de elo,
   em vez das 18 imagens separadas — Prata I a IV vira só
   "Prata", Ouro Nova I a III + Mestre vira só "Ouro Nova",
   etc. Isso deixa a seção muito mais limpa)
===================================================== */

import semIcon from "../assets/elos/cs/SEM.png";
import gnmIcon from "../assets/elos/cs/GNM .png";
import akCruzadaIcon from "../assets/elos/cs/AK CRUZADA.png";
import xerifeIcon from "../assets/elos/cs/XERIFE.png";
import aguia2Icon from "../assets/elos/cs/Aguia2.png";
import supremoIcon from "../assets/elos/cs/Supremo.png";
import globalIcon from "../assets/elos/cs/Global.png";

/* =====================================================
   ÍCONES DE FUNÇÃO
===================================================== */

import awperIcon from "../assets/funcoes/awper.png";
import entryIcon from "../assets/funcoes/entry.png";
import lurkerIcon from "../assets/funcoes/lurker.png";
import supportIcon from "../assets/funcoes/support.png";
import iglIcon from "../assets/funcoes/leader.png";

/* =====================================================
   FUNDO
===================================================== */

import csBackground from "../assets/rooms-bg.png";


function CreateRoom({
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

    const [selectedTeam, setSelectedTeam] = useState("DUO");

    const [selectedRank, setSelectedRank] = useState(null);

    const [selectedGender, setSelectedGender] = useState(["HOMEM"]);

    const [selectedFunction, setSelectedFunction] = useState(null);

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
       (a pasta assets/room-modes/cs não existe, então os
       cards usam cor + ícone SVG, igual ao Rocket League)
    ===================================================== */

    const modes = [
        {
            name: "COMPETITIVO",
            theme: "mode-competitivo",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="3"/>
                    <circle cx="24" cy="24" r="4" fill="currentColor"/>
                    <path d="M24 4V12M24 36V44M4 24H12M36 24H44" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
            )
        },
        {
            name: "PREMIER",
            theme: "mode-premier",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 6L28.5 18.5L42 19L31.5 27L35 40L24 32.5L13 40L16.5 27L6 19L19.5 18.5Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            name: "WINGMAN",
            theme: "mode-wingman",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="17" cy="24" r="6" stroke="currentColor" strokeWidth="3"/>
                    <circle cx="31" cy="24" r="6" stroke="currentColor" strokeWidth="3"/>
                    <path d="M6 24H11M23 24H25M37 24H42" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
            )
        },
        {
            name: "DEATHMATCH",
            theme: "mode-deathmatch",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="3"/>
                    <path d="M17 17L31 31M31 17L17 31" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
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
            name: "ARMS RACE",
            theme: "mode-arms-race",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 40V8M24 8L14 18M24 8L34 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 40H38" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
            )
        }
    ];


    /* =====================================================
       TAMANHO DAS EQUIPES
    ===================================================== */

    const teams = [
        "DUO",
        "TRIO",
        "GRUPO",
        "5V5"
    ];


    /* =====================================================
       ELOS
       (uma única imagem por faixa, usando sempre a divisão
       mais alta dela como representante)
    ===================================================== */

    const ranks = [
        {
            name: "PRATA",
            image: semIcon
        },
        {
            name: "OURO NOVA",
            image: gnmIcon
        },
        {
            name: "MESTRE GUARDIÃO",
            image: akCruzadaIcon
        },
        {
            name: "GUARDIÃO DISTINTO",
            image: xerifeIcon
        },
        {
            name: "ÁGUIA",
            image: aguia2Icon
        },
        {
            name: "SUPREMO",
            image: supremoIcon
        },
        {
            name: "GLOBAL ELITE",
            image: globalIcon
        }
    ];


    /* =====================================================
       FUNÇÕES
    ===================================================== */

    const functions = [
        {
            name: "AWPER",
            image: awperIcon
        },
        {
            name: "ENTRY",
            image: entryIcon
        },
        {
            name: "LURKER",
            image: lurkerIcon
        },
        {
            name: "SUPORTE",
            image: supportIcon
        },
        {
            name: "IGL",
            image: iglIcon
        }
    ];


    /* =====================================================
       HABILITAÇÃO DO ELO
    ===================================================== */

    const rankEnabled =
        selectedMode === "COMPETITIVO" ||
        selectedMode === "WINGMAN";


    const modoSoloDuo = selectedMode === "WINGMAN";


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

        if (
            mode !== "COMPETITIVO" &&
            mode !== "WINGMAN"
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
       CRIAR SALA NO BACKEND
    ===================================================== */

    const tamanhos = {
        DUO: 2,
        TRIO: 3,
        SQUAD: 4,
        GRUPO: 4,
        "5V5": 5,
        "6V6": 6,
        DUPLA: 2,
        SOLO: 1,
        "ESQUADRÃO": 4
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
                    funcao: selectedFunction || "",
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
                backgroundImage: `url(${csBackground})`
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
                            src={csBigLogo}
                            alt="Counter-Strike 2"
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


                        <div className="game-modes">

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
                                            `mode-image cs-mode-image ${mode.theme}`
                                        }
                                    >

                                        <div className="cs-mode-icon">
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


                        <div className="team-size">

                            {teams.map((team) => (

                                <button
                                    key={team}
                                    className={
                                        `team-button ${
                                            selectedTeam === team
                                                ? "selected"
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
                    )}


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
                                    title={rank.name}
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
                                    COMPETITIVO E WINGMAN

                                </div>

                            )}

                        </div>

                    </section>


                    {/* =================================================
                        FUNÇÃO
                    ================================================= */}

                    <section className="create-section">

                        <div className="section-title">

                            <span></span>

                            <p>
                                FUNÇÃO
                            </p>

                            <span></span>

                        </div>


                        <div className="function-selection">

                            {functions.map((func) => (

                                <button
                                    key={func.name}
                                    type="button"
                                    className={
                                        `function-button ${
                                            selectedFunction === func.name
                                                ? "selected"
                                                : ""
                                        }`
                                    }
                                    onClick={() =>
                                        setSelectedFunction(func.name)
                                    }
                                >

                                    <img
                                        src={func.image}
                                        alt={func.name}
                                        className="function-icon"
                                    />

                                    <span>
                                        {func.name}
                                    </span>

                                </button>

                            ))}

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


export default CreateRoom;