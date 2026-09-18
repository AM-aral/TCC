import { useState } from "react";
import "./dbdCreateRoom.css";

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
   Mesmo conjunto fixo usado em todas as CreateRoom
   (é o que existe em assets/icon).
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
   LOGO GRANDE (ícone do Dead by Daylight)
===================================================== */

import dbdBigLogo from "../assets/games-icon/dbd icon.png";

/* =====================================================
   GRAUS DO DBD
===================================================== */

import cinzaIcon from "../assets/elos/dbd/cinza.png";
import cobreIcon from "../assets/elos/dbd/cobre.png";
import prataIcon from "../assets/elos/dbd/prata.png";
import ouroIcon from "../assets/elos/dbd/gold.png";
import iridescenteIcon from "../assets/elos/dbd/iridescente.png";
import iridescente24Icon from "../assets/elos/dbd/iridescente 2-4.png";

/* =====================================================
   FUNDO
===================================================== */

import dbdBackground from "../assets/rooms-bg.png";


function DbdCreateRoom({
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

    const [selectedMode, setSelectedMode] = useState("CLASSIFICADA");

    const [selectedTeam, setSelectedTeam] = useState("DUO");

    const [selectedGrade, setSelectedGrade] = useState(null);

    const [selectedGender, setSelectedGender] = useState(["HOMEM"]);

    const [roomName, setRoomName] = useState("");

    const [roomDescription, setRoomDescription] = useState("");

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
       (o DBD não tem "mapa" fixo por modo de sala — cor +
       ícone SVG, igual aos outros jogos assim)
    ===================================================== */

    const modes = [
        {
            name: "CLASSIFICADA",
            theme: "dbd-mode-ranked",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 6V26" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M24 26C17 26 15 32 18 37C20 40 24 41 24 41C24 41 28 40 30 37C33 32 31 26 24 26Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                    <circle cx="24" cy="9" r="3" stroke="currentColor" strokeWidth="3"/>
                </svg>
            )
        },
        {
            name: "SWF",
            theme: "dbd-mode-swf",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="3"/>
                    <circle cx="32" cy="16" r="6" stroke="currentColor" strokeWidth="3"/>
                    <path d="M6 40C6 32 10 27 16 27C22 27 26 32 26 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M22 40C22 32 26 27 32 27C38 27 42 32 42 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
            )
        },
        {
            name: "PERSONALIZADA",
            theme: "dbd-mode-custom",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="3"/>
                    <path d="M24 5V12M24 36V43M43 24H36M12 24H5M37.4 10.6L32.5 15.5M15.5 32.5L10.6 37.4M37.4 37.4L32.5 32.5M15.5 15.5L10.6 10.6" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
            )
        },
        {
            name: "TREINO",
            theme: "dbd-mode-training",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="3"/>
                    <circle cx="24" cy="24" r="9" stroke="currentColor" strokeWidth="3"/>
                    <circle cx="24" cy="24" r="1.8" fill="currentColor"/>
                </svg>
            )
        }
    ];


    /* =====================================================
       GRAUS
    ===================================================== */

    const grades = [
        {
            name: "CINZA",
            image: cinzaIcon
        },
        {
            name: "COBRE",
            image: cobreIcon
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
            name: "IRIDESCENTE",
            image: iridescenteIcon
        },
        {
            name: "IRIDESCENTE II-IV",
            image: iridescente24Icon
        }
    ];


    /* =====================================================
       TAMANHO DAS EQUIPES
    ===================================================== */

    const teams = [
        "SOLO",
        "DUO",
        "TRIO",
        "SQUAD"
    ];


    /* =====================================================
       HABILITAÇÃO DO GRAU
       (grau só importa em partidas com matchmaking —
       Personalizada e Treino não usam grau)
    ===================================================== */

    const gradeEnabled =
        selectedMode !== "PERSONALIZADA" &&
        selectedMode !== "TREINO";


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

        if (mode === "PERSONALIZADA" || mode === "TREINO") {
            setSelectedGrade(null);
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
        TRIO: 3,
        SQUAD: 4
    };


    const criarSala = async () => {

        if (!roomName.trim()) {
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
                    nome: roomName.trim(),
                    descricao: roomDescription.trim(),
                    modo: selectedMode,
                    time: selectedTeam,
                    elo: selectedGrade || "",
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
            className="dbd-create-room-page"
            style={{
                backgroundImage: `url(${dbdBackground})`
            }}
        >

            <div className="dbd-create-room-overlay"></div>


            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside className="dbd-create-sidebar">

                <nav className="dbd-create-sidebar-menu">


                    {/* HOME */}

                    <button
                        className="dbd-create-sidebar-item"
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
                        className="dbd-create-sidebar-item"
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
                        className="dbd-create-sidebar-item"
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
                        className="dbd-create-sidebar-item"
                        type="button"
                        onClick={onFeedbacks}
                        title="Feedbacks"
                    >

                        <span className="dbd-create-feedback-star">
                            ★
                        </span>

                    </button>


                    {/* CONFIGURAÇÕES */}

                    <button
                        className="dbd-create-sidebar-item"
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

            <div className="dbd-create-room-content">


                {/* =================================================
                    NAVBAR
                ================================================= */}

                <header className="dbd-create-navbar">


                    {/* LOGO */}

                    <div
                        className="dbd-create-navbar-logo"
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

                    <div className="dbd-create-games-navbar">

                        {navbarGames.map((item) => (

                            <div
                                key={item.name}
                                className={
                                    `dbd-create-navbar-game ${
                                        game === item.name
                                            ? "dbd-create-navbar-active"
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

                <main className="dbd-create-room-main">


                    {/* =================================================
                        TOPO
                    ================================================= */}

                    <div className="dbd-create-room-top">

                        <button
                            className="dbd-back-button"
                            onClick={onBack}
                            type="button"
                        >
                            ← Voltar
                        </button>

                    </div>


                    {/* =================================================
                        LOGO DO JOGO
                    ================================================= */}

                    <div className="dbd-create-game-header">

                        <img
                            src={dbdBigLogo}
                            alt="Dead By Daylight"
                            className="dbd-create-game-logo"
                        />

                    </div>


                    {/* =================================================
                        MODO DE JOGO
                    ================================================= */}

                    <section className="dbd-create-section">

                        <div className="dbd-section-title">

                            <span></span>

                            <p>
                                MODO DE JOGO
                            </p>

                            <span></span>

                        </div>


                        <div className="dbd-game-modes">

                            {modes.map((mode) => (

                                <button
                                    key={mode.name}
                                    className={
                                        `dbd-mode-card ${
                                            selectedMode === mode.name
                                                ? "dbd-selected"
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
                                            `dbd-mode-image dbd-mode-icon-wrap ${mode.theme}`
                                        }
                                    >

                                        <div className="dbd-mode-icon">
                                            {mode.icon}
                                        </div>

                                        <div className="dbd-mode-image-overlay"></div>

                                    </div>


                                    <div className="dbd-mode-name">
                                        {mode.name}
                                    </div>

                                </button>

                            ))}

                        </div>

                    </section>


                    {/* =================================================
                        GRAU
                    ================================================= */}

                    <section className="dbd-create-section">

                        <div className="dbd-section-title">

                            <span></span>

                            <p>
                                GRAU
                            </p>

                            <span></span>

                        </div>


                        <div
                            className={
                                `dbd-grade-selection ${
                                    !gradeEnabled
                                        ? "dbd-disabled"
                                        : ""
                                }`
                            }
                        >

                            {grades.map((grade) => (

                                <button
                                    key={grade.name}
                                    className={
                                        `dbd-grade-item ${
                                            selectedGrade === grade.name
                                                ? "dbd-selected"
                                                : ""
                                        }`
                                    }
                                    onClick={() => {

                                        if (!gradeEnabled) {
                                            return;
                                        }

                                        setSelectedGrade(grade.name);

                                    }}
                                    title={grade.name}
                                    type="button"
                                >

                                    <div className="dbd-grade-placeholder">

                                        <img
                                            src={grade.image}
                                            alt={grade.name}
                                            className="dbd-grade-icon"
                                        />

                                    </div>

                                </button>

                            ))}


                            {!gradeEnabled && (

                                <div className="dbd-grade-disabled-message">

                                    GRAU DISPONÍVEL APENAS EM
                                    PARTIDAS CLASSIFICADAS OU SWF

                                </div>

                            )}

                        </div>

                    </section>


{/* =================================================
                        TAMANHO DA EQUIPE
                    ================================================= */}

                    {!modoSoloDuo && (

                    <section className="dbd-create-section">

                        <div className="dbd-section-title">

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

                    <section className="dbd-create-section">

                        <div className="dbd-section-title">

                            <span></span>

                            <p>
                                GÊNERO
                            </p>

                            <span></span>

                        </div>


                        <div className="dbd-gender-selection">

                            <button
                                type="button"
                                className={
                                    `dbd-gender-button ${
                                        selectedGender.includes("HOMEM")
                                            ? "dbd-selected"
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
                                    `dbd-gender-button ${
                                        selectedGender.includes("MULHER")
                                            ? "dbd-selected"
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

                    <section className="dbd-create-section">

                        <div className="dbd-section-title">

                            <span></span>

                            <p>
                                DETALHES DA SALA
                            </p>

                            <span></span>

                        </div>


                        <div className="dbd-room-details-form">

                            <div className="dbd-detail-box">

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


                            <div className="dbd-detail-box">

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

                    <div className="dbd-create-actions">

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
                            className="dbd-create-button"
                            onClick={criarSala}
                            type="button"
                            disabled={criando}
                        >
                            {criando ? "CRIANDO..." : "CRIAR SALA"}
                        </button>


                        <button
                            className="dbd-cancel-button"
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


export default DbdCreateRoom;