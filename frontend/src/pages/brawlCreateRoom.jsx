import { useState } from "react";
import "./brawlCreateRoom.css";

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
       (cor + ícone SVG em vez de imagem, já que o Brawlhalla
       não tem "mapa" fixo por modo)
    ===================================================== */

    const modes = [
        {
            name: "RANKED 1V1",
            theme: "brawl-mode-1v1",
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
            theme: "brawl-mode-2v2",
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
            theme: "brawl-mode-casual",
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
            theme: "brawl-mode-experimental",
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
       TAMANHO DAS EQUIPES
    ===================================================== */

    const teams = [
        "SOLO",
        "DUO"
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


    const modoSoloDuo = selectedMode === "RANKED 1V1";


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
       CRIAR SALA NO BACKEND
    ===================================================== */

    const tamanhos = {
        SOLO: 1,
        DUO: 2
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
            className="brawl-create-room-page"
            style={{
                backgroundImage: `url(${brawlBackground})`
            }}
        >

            <div className="brawl-create-room-overlay"></div>


            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside className="brawl-create-sidebar">

                <nav className="brawl-create-sidebar-menu">


                    {/* HOME */}

                    <button
                        className="brawl-create-sidebar-item"
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
                        className="brawl-create-sidebar-item"
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
                        className="brawl-create-sidebar-item"
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
                        className="brawl-create-sidebar-item"
                        type="button"
                        onClick={onFeedbacks}
                        title="Feedbacks"
                    >

                        <span className="brawl-create-feedback-star">
                            ★
                        </span>

                    </button>


                    {/* CONFIGURAÇÕES */}

                    <button
                        className="brawl-create-sidebar-item"
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

            <div className="brawl-create-room-content">


                {/* =================================================
                    NAVBAR
                ================================================= */}

                <header className="brawl-create-navbar">


                    {/* LOGO */}

                    <div
                        className="brawl-create-navbar-logo"
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

                    <div className="brawl-create-games-navbar">

                        {navbarGames.map((item) => (

                            <div
                                key={item.name}
                                className={
                                    `brawl-create-navbar-game ${
                                        game === item.name
                                            ? "brawl-create-navbar-active"
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

                <main className="brawl-create-room-main">


                    {/* =================================================
                        TOPO
                    ================================================= */}

                    <div className="brawl-create-room-top">

                        <button
                            className="brawl-back-button"
                            onClick={onBack}
                            type="button"
                        >
                            ← Voltar
                        </button>

                    </div>


                    {/* =================================================
                        LOGO DO JOGO
                    ================================================= */}

                    <div className="brawl-create-game-header">

                        <img
                            src={brawlBigLogo}
                            alt="Brawlhalla"
                            className="brawl-create-game-logo"
                        />

                    </div>


                    {/* =================================================
                        MODO DE JOGO
                    ================================================= */}

                    <section className="brawl-create-section">

                        <div className="brawl-section-title">

                            <span></span>

                            <p>
                                MODO DE JOGO
                            </p>

                            <span></span>

                        </div>


                        <div className="brawl-game-modes brawl-modes">

                            {modes.map((mode) => (

                                <button
                                    key={mode.name}
                                    className={
                                        `brawl-mode-card ${
                                            selectedMode === mode.name
                                                ? "brawl-selected"
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
                                            `brawl-mode-image brawl-mode-icon-wrap ${mode.theme}`
                                        }
                                    >

                                        <div className="brawl-mode-icon">
                                            {mode.icon}
                                        </div>

                                        <div className="brawl-mode-image-overlay"></div>

                                    </div>


                                    <div className="brawl-mode-name">
                                        {mode.name}
                                    </div>

                                </button>

                            ))}

                        </div>

                    </section>


                    {/* =================================================
                        ELO
                    ================================================= */}

                    <section className="brawl-create-section">

                        <div className="brawl-section-title">

                            <span></span>

                            <p>
                                ELO
                            </p>

                            <span></span>

                        </div>


                        <div
                            className={
                                `brawl-rank-selection ${
                                    !rankEnabled
                                        ? "brawl-disabled"
                                        : ""
                                }`
                            }
                        >

                            {ranks.map((rank) => (

                                <button
                                    key={rank.name}
                                    className={
                                        `brawl-rank-item ${
                                            selectedRank === rank.name
                                                ? "brawl-selected"
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

                                    <div className="brawl-rank-placeholder">

                                        <img
                                            src={rank.image}
                                            alt={rank.name}
                                            className="brawl-rank-icon"
                                        />

                                    </div>

                                </button>

                            ))}


                            {!rankEnabled && (

                                <div className="brawl-rank-disabled-message">

                                    ELO DISPONÍVEL APENAS PARA
                                    RANKED 1V1 E RANKED 2V2

                                </div>

                            )}

                        </div>

                    </section>


                    {/* =================================================
                        TAMANHO DA EQUIPE
                    ================================================= */}

                    {!modoSoloDuo && (

                    <section className="brawl-create-section">

                        <div className="brawl-section-title">

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

                    <section className="brawl-create-section">

                        <div className="brawl-section-title">

                            <span></span>

                            <p>
                                GÊNERO
                            </p>

                            <span></span>

                        </div>


                        <div className="brawl-gender-selection">

                            <button
                                type="button"
                                className={
                                    `brawl-gender-button ${
                                        selectedGender.includes("HOMEM")
                                            ? "brawl-selected"
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
                                    `brawl-gender-button ${
                                        selectedGender.includes("MULHER")
                                            ? "brawl-selected"
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

                    <section className="brawl-create-section">

                        <div className="brawl-section-title">

                            <span></span>

                            <p>
                                DETALHES DA SALA
                            </p>

                            <span></span>

                        </div>


                        <div className="brawl-room-details-form">

                            <div className="brawl-detail-box">

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


                            <div className="brawl-detail-box">

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

                    <div className="brawl-create-actions">

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
                            className="brawl-create-button"
                            onClick={criarSala}
                            type="button"
                            disabled={criando}
                        >
                            {criando ? "CRIANDO..." : "CRIAR SALA"}
                        </button>


                        <button
                            className="brawl-cancel-button"
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