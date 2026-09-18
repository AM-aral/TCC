import { useState } from "react";
import "./dotaCreateRoom.css";

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
   LOGO GRANDE (ícone do Dota 2)
===================================================== */

import dotaBigLogo from "../assets/games-icon/dota 2 icon.png";

/* =====================================================
   ELOS DO DOTA 2
===================================================== */

import arautoIcon from "../assets/elos/dota/Arauto.png";
import guardiaoIcon from "../assets/elos/dota/guardiao.png";
import cruzadoIcon from "../assets/elos/dota/cruzado.png";
import arconteIcon from "../assets/elos/dota/arconte.png";
import lendaIcon from "../assets/elos/dota/lenda.png";
import anciaoIcon from "../assets/elos/dota/anciao.png";
import divinoIcon from "../assets/elos/dota/divino.png";
import imortalIcon from "../assets/elos/dota/imortal.png";

/* =====================================================
   FUNÇÕES DO DOTA 2
===================================================== */

import carryIcon from "../assets/funcoes/carry dota.png";
import midIcon from "../assets/funcoes/mid dota.png";
import offlaneIcon from "../assets/funcoes/off lane dota.png";
import softSupportIcon from "../assets/funcoes/soft support dota.png";
import hardSupportIcon from "../assets/funcoes/hard support.png";

/* =====================================================
   FUNDO
===================================================== */

import dotaBackground from "../assets/rooms-bg.png";


function DotaCreateRoom({
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

    const [selectedMode, setSelectedMode] = useState("RANQUEADA");

    const [selectedRank, setSelectedRank] = useState(null);

    const [selectedRole, setSelectedRole] = useState(null);

    const [selectedGender, setSelectedGender] = useState(["HOMEM"]);

    const [selectedTeam, setSelectedTeam] = useState("DUO");

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
       (cor + ícone SVG em vez de imagem, já que o Dota
       só tem um mapa)
    ===================================================== */

    const modes = [
        {
            name: "RANQUEADA",
            theme: "dota-mode-ranked",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 5L29 18L42 20L32.5 29L35 42L24 36L13 42L15.5 29L6 20L19 18L24 5Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            name: "NÃO RANQUEADA",
            theme: "dota-mode-normal",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="3"/>
                    <path d="M24 15V25L30 29" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            name: "TURBO",
            theme: "dota-mode-turbo",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M27 5L11 27H23L21 43L37 21H25L27 5Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            name: "MODO CAPITÃES",
            theme: "dota-mode-captains",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 5L38 11V23C38 33 31 39 24 43C17 39 10 33 10 23V11L24 5Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                    <path d="M18 24L22 28L31 19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            name: "ABILITY DRAFT",
            theme: "dota-mode-ability",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M33 6L42 15L18 39H9V30L33 6Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                    <path d="M28 11L37 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
            )
        },
        {
            name: "PERSONALIZADA",
            theme: "dota-mode-custom",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="3"/>
                    <path d="M24 5V12M24 36V43M43 24H36M12 24H5M37.4 10.6L32.5 15.5M15.5 32.5L10.6 37.4M37.4 37.4L32.5 32.5M15.5 15.5L10.6 10.6" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
            )
        }
    ];


    /* =====================================================
       ELOS
    ===================================================== */

    const ranks = [
        {
            name: "ARAUTO",
            image: arautoIcon
        },
        {
            name: "GUARDIÃO",
            image: guardiaoIcon
        },
        {
            name: "CRUZADO",
            image: cruzadoIcon
        },
        {
            name: "ARCONTE",
            image: arconteIcon
        },
        {
            name: "LENDA",
            image: lendaIcon
        },
        {
            name: "ANCIÃO",
            image: anciaoIcon
        },
        {
            name: "DIVINO",
            image: divinoIcon
        },
        {
            name: "IMORTAL",
            image: imortalIcon
        }
    ];


    /* =====================================================
       TAMANHO DAS EQUIPES
    ===================================================== */

    const teams = [
        "SOLO",
        "DUO",
        "TRIO",
        "SQUAD",
        "5V5"
    ];


    /* =====================================================
       FUNÇÕES
    ===================================================== */

    const roles = [
        {
            name: "CARRY",
            image: carryIcon
        },
        {
            name: "MEIO",
            image: midIcon
        },
        {
            name: "OFFLANE",
            image: offlaneIcon
        },
        {
            name: "SUPORTE 4",
            image: softSupportIcon
        },
        {
            name: "SUPORTE 5",
            image: hardSupportIcon
        }
    ];


    /* =====================================================
       HABILITAÇÃO DO ELO
       (só faz sentido em partidas ranqueadas)
    ===================================================== */

    const rankEnabled =
        selectedMode === "RANQUEADA" ||
        selectedMode === "MODO CAPITÃES";


    /* =====================================================
       GÊNERO MÚLTIPLO
    ===================================================== */

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
            mode !== "RANQUEADA" &&
            mode !== "MODO CAPITÃES"
        ) {
            setSelectedRank(null);
        }
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
       CRIAR SALA NO BACKEND
    ===================================================== */

    const tamanhos = {
        SOLO: 1,
        DUO: 2,
        TRIO: 3,
        SQUAD: 4,
        "5V5": 5
    };


    const modoSoloDuo = false;


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
                    elo: selectedRank || "",
                    funcao: selectedRole || "",
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
            className="dota-create-room-page"
            style={{
                backgroundImage: `url(${dotaBackground})`
            }}
        >

            <div className="dota-create-room-overlay"></div>


            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside className="dota-create-sidebar">

                <nav className="dota-create-sidebar-menu">


                    {/* HOME */}

                    <button
                        className="dota-create-sidebar-item"
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
                        className="dota-create-sidebar-item"
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
                        className="dota-create-sidebar-item"
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
                        className="dota-create-sidebar-item"
                        type="button"
                        onClick={onFeedbacks}
                        title="Feedbacks"
                    >

                        <span className="dota-create-feedback-star">
                            ★
                        </span>

                    </button>


                    {/* CONFIGURAÇÕES */}

                    <button
                        className="dota-create-sidebar-item"
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

            <div className="dota-create-room-content">


                {/* =================================================
                    NAVBAR
                ================================================= */}

                <header className="dota-create-navbar">


                    {/* LOGO */}

                    <div
                        className="dota-create-navbar-logo"
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

                    <div className="dota-create-games-navbar">

                        {navbarGames.map((item) => (

                            <div
                                key={item.name}
                                className={
                                    `dota-create-navbar-game ${
                                        game === item.name
                                            ? "dota-create-navbar-active"
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

                <main className="dota-create-room-main">


                    {/* =================================================
                        TOPO
                    ================================================= */}

                    <div className="dota-create-room-top">

                        <button
                            className="dota-back-button"
                            onClick={onBack}
                            type="button"
                        >
                            ← Voltar
                        </button>

                    </div>


                    {/* =================================================
                        LOGO DO JOGO
                    ================================================= */}

                    <div className="dota-create-game-header">

                        <img
                            src={dotaBigLogo}
                            alt="Dota 2"
                            className="dota-create-game-logo"
                        />

                    </div>


                    {/* =================================================
                        MODO DE JOGO
                    ================================================= */}

                    <section className="dota-create-section">

                        <div className="dota-section-title">

                            <span></span>

                            <p>
                                MODO DE JOGO
                            </p>

                            <span></span>

                        </div>


                        <div className="dota-game-modes">

                            {modes.map((mode) => (

                                <button
                                    key={mode.name}
                                    className={
                                        `dota-mode-card ${
                                            selectedMode === mode.name
                                                ? "dota-selected"
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
                                            `dota-mode-image dota-mode-icon-wrap ${mode.theme}`
                                        }
                                    >

                                        <div className="dota-mode-icon">
                                            {mode.icon}
                                        </div>

                                        <div className="dota-mode-image-overlay"></div>

                                    </div>


                                    <div className="dota-mode-name">
                                        {mode.name}
                                    </div>

                                </button>

                            ))}

                        </div>

                    </section>


                    {/* =================================================
                        ELO
                    ================================================= */}

                    <section className="dota-create-section">

                        <div className="dota-section-title">

                            <span></span>

                            <p>
                                ELO
                            </p>

                            <span></span>

                        </div>


                        <div
                            className={
                                `dota-rank-selection ${
                                    !rankEnabled
                                        ? "dota-disabled"
                                        : ""
                                }`
                            }
                        >

                            {ranks.map((rank) => (

                                <button
                                    key={rank.name}
                                    className={
                                        `dota-rank-item ${
                                            selectedRank === rank.name
                                                ? "dota-selected"
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

                                    <div className="dota-rank-placeholder">

                                        <img
                                            src={rank.image}
                                            alt={rank.name}
                                            className="dota-rank-icon"
                                        />

                                    </div>

                                </button>

                            ))}


                            {!rankEnabled && (

                                <div className="dota-rank-disabled-message">

                                    ELO DISPONÍVEL APENAS PARA
                                    RANQUEADA E MODO CAPITÃES

                                </div>

                            )}

                        </div>

                    </section>


                    {/* =================================================
                        FUNÇÃO
                    ================================================= */}

                    <section className="dota-create-section">

                        <div className="dota-section-title">

                            <span></span>

                            <p>
                                FUNÇÃO
                            </p>

                            <span></span>

                        </div>


                        <div className="dota-role-selection">

                            {roles.map((role) => (

                                <button
                                    key={role.name}
                                    className={
                                        `dota-role-item ${
                                            selectedRole === role.name
                                                ? "dota-selected"
                                                : ""
                                        }`
                                    }
                                    onClick={() =>
                                        handleRoleChange(role.name)
                                    }
                                    type="button"
                                >

                                    <img
                                        src={role.image}
                                        alt={role.name}
                                    />

                                    <span className="dota-role-name">
                                        {role.name}
                                    </span>

                                </button>

                            ))}

                        </div>

                    </section>


                    {/* =================================================
                        TAMANHO DA EQUIPE
                    ================================================= */}

                    {!modoSoloDuo && (

                    <section className="dota-create-section">

                        <div className="dota-section-title">

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

                    <section className="dota-create-section">

                        <div className="dota-section-title">

                            <span></span>

                            <p>
                                GÊNERO
                            </p>

                            <span></span>

                        </div>


                        <div className="dota-gender-selection">

                            <button
                                type="button"
                                className={
                                    `dota-gender-button ${
                                        selectedGender.includes("HOMEM")
                                            ? "dota-selected"
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
                                    `dota-gender-button ${
                                        selectedGender.includes("MULHER")
                                            ? "dota-selected"
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

                    <section className="dota-create-section">

                        <div className="dota-section-title">

                            <span></span>

                            <p>
                                DETALHES DA SALA
                            </p>

                            <span></span>

                        </div>


                        <div className="dota-room-details-form">

                            <div className="dota-detail-box">

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


                            <div className="dota-detail-box">

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

                    <div className="dota-create-actions">

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
                            className="dota-create-button"
                            onClick={criarSala}
                            disabled={criando}
                            type="button"
                        >
                            {criando ? "CRIANDO..." : "CRIAR SALA"}
                        </button>


                        <button
                            className="dota-cancel-button"
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


export default DotaCreateRoom;