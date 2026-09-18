import { useState } from "react";
import "./marvelCreateRoom.css";

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
   LOGO GRANDE
===================================================== */

import marvelBigLogo from "../assets/games-icon/rivals icon.png";

/* =====================================================
   ELOS
===================================================== */

import bronzeIcon from "../assets/elos/marvel/bronze.png";
import prataIcon from "../assets/elos/marvel/prata.png";
import ouroIcon from "../assets/elos/marvel/ouro.png";
import platinaIcon from "../assets/elos/marvel/platina.png";
import diamanteIcon from "../assets/elos/marvel/diamante.png";
import graoMestreIcon from "../assets/elos/marvel/grao mestre.png";
import celestialIcon from "../assets/elos/marvel/celestial.png";
import eternidadeIcon from "../assets/elos/marvel/eternidade.png";
import acimaDeTodosIcon from "../assets/elos/marvel/acima de todos.png";

/* =====================================================
   ÍCONES DE FUNÇÃO
===================================================== */

import vanguardaIcon from "../assets/funcoes/vanguarda.png";
import duelistaIcon from "../assets/funcoes/duelista.png";
import estrategistaIcon from "../assets/funcoes/strategista.png";

/* =====================================================
   FUNDO
===================================================== */

import marvelBackground from "../assets/rooms-bg.png";


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

    const [selectedMode, setSelectedMode] = useState("PARTIDA RÁPIDA");

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
       (a pasta assets/room-modes/marvel não existe, então
       os cards usam cor + ícone SVG, igual ao Rocket League)
    ===================================================== */

    const modes = [
        {
            name: "CLASSIFICATÓRIA",
            theme: "mode-classificatoria",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 6L38 12V22C38 32 32 39 24 42C16 39 10 32 10 22V12L24 6Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                    <path d="M18 24L22 28L30 19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            name: "PARTIDA RÁPIDA",
            theme: "mode-partida-rapida",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M26 4L12 26H22L20 44L38 20H27L26 4Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            name: "PERSONALIZADA",
            theme: "mode-personalizada",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="3"/>
                    <path d="M24 4V10M24 38V44M44 24H38M10 24H4M37.5 10.5L33.5 14.5M14.5 33.5L10.5 37.5M37.5 37.5L33.5 33.5M14.5 14.5L10.5 10.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
            )
        },
        {
            name: "TREINO",
            theme: "mode-treino",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 24H14M34 24H40M18 24H30" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    <rect x="14" y="15" width="4" height="18" rx="1.5" fill="currentColor"/>
                    <rect x="30" y="15" width="4" height="18" rx="1.5" fill="currentColor"/>
                </svg>
            )
        },
        {
            name: "DOOM MATCH",
            theme: "mode-doom-match",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 6C15 6 8 13 8 22C8 28 11 32 14 35V40H20V36H28V40H34V35C37 32 40 28 40 22C40 13 33 6 24 6Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                    <circle cx="17" cy="22" r="3" fill="currentColor"/>
                    <circle cx="31" cy="22" r="3" fill="currentColor"/>
                </svg>
            )
        },
        {
            name: "EVENTO",
            theme: "mode-evento",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="8" y="20" width="32" height="20" rx="2" stroke="currentColor" strokeWidth="3"/>
                    <path d="M8 28H40M24 20V40" stroke="currentColor" strokeWidth="3"/>
                    <path d="M24 20C24 20 18 12 14 14C10 16 14 20 24 20Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                    <path d="M24 20C24 20 30 12 34 14C38 16 34 20 24 20Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
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
        "6V6"
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
            name: "GRÃO-MESTRE",
            image: graoMestreIcon
        },
        {
            name: "CELESTIAL",
            image: celestialIcon
        },
        {
            name: "ETERNIDADE",
            image: eternidadeIcon
        },
        {
            name: "ACIMA DE TODOS",
            image: acimaDeTodosIcon
        }
    ];


    /* =====================================================
       FUNÇÕES
    ===================================================== */

    const functions = [
        {
            name: "VANGUARDA",
            image: vanguardaIcon
        },
        {
            name: "DUELISTA",
            image: duelistaIcon
        },
        {
            name: "ESTRATEGISTA",
            image: estrategistaIcon
        }
    ];


    /* =====================================================
       HABILITAÇÃO DO ELO
    ===================================================== */

    const rankEnabled =
        selectedMode === "CLASSIFICATÓRIA";


    const modoSoloDuo = false;


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

        if (mode !== "CLASSIFICATÓRIA") {
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
                backgroundImage: `url(${marvelBackground})`
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
                            src={marvelBigLogo}
                            alt="Marvel Rivals"
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
                                            `mode-image marvel-mode-image ${mode.theme}`
                                        }
                                    >

                                        <div className="marvel-mode-icon">
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
                                    CLASSIFICATÓRIA

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