import { useState } from "react";
import "./fortCreateRoom.css";

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
   LOGO GRANDE (ícone do Fortnite)
===================================================== */

import fortniteBigLogo from "../assets/games-icon/forticon.png";

/* =====================================================
   ELOS DO FORTNITE (RANKED)
===================================================== */

import bronzeIcon from "../assets/elos/fortnite/bronze.png";
import prataIcon from "../assets/elos/fortnite/prata.png";
import ouroIcon from "../assets/elos/fortnite/gold.png";
import platinaIcon from "../assets/elos/fortnite/platina.png";
import diamanteIcon from "../assets/elos/fortnite/diamante.png";
import eliteIcon from "../assets/elos/fortnite/elite.png";
import campeaoIcon from "../assets/elos/fortnite/campeao.png";
import unrealIcon from "../assets/elos/fortnite/surreal.png";

/* =====================================================
   FUNDO
===================================================== */

import fortniteBackground from "../assets/rooms-bg.png";


function FortniteCreateRoom({
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
       (a pasta assets/room-modes não tem "fortnite", então
       os cards usam cor + ícone SVG, igual ao Brawlhalla)
    ===================================================== */

    const modes = [
        {
            name: "BATTLE ROYALE",
            theme: "fort-mode-br",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4L40 11V22C40 32 33 39 24 44C15 39 8 32 8 22V11L24 4Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                    <path d="M24 14V26M24 32V33" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
            )
        },
        {
            name: "ZERO BUILD",
            theme: "fort-mode-zb",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 24L24 10L40 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 21V38H35V21" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                    <path d="M9 41L39 11" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
            )
        },
        {
            name: "RANKED",
            theme: "fort-mode-ranked",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 8H34V20C34 28 30 33 24 35C18 33 14 28 14 20V8Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                    <path d="M14 12H8V17C8 22 11 25 14 25" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M34 12H40V17C40 22 37 25 34 25" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M24 35V41M17 41H31" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
            )
        },
        {
            name: "TEAM RUMBLE",
            theme: "fort-mode-rumble",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="14" r="5" stroke="currentColor" strokeWidth="3"/>
                    <circle cx="32" cy="14" r="5" stroke="currentColor" strokeWidth="3"/>
                    <path d="M6 40C6 32 10 27 16 27C22 27 26 32 26 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M22 40C22 32 26 27 32 27C38 27 42 32 42 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
            )
        },
        {
            name: "RELOAD",
            theme: "fort-mode-reload",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M40 24C40 15.2 32.8 8 24 8C17 8 11 12.4 8.6 18.6" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M8 24C8 32.8 15.2 40 24 40C31 40 37 35.6 39.4 29.4" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M8.6 9V18.6H18.2" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M39.4 39V29.4H29.8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
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
            name: "ELITE",
            image: eliteIcon
        },
        {
            name: "CAMPEÃO",
            image: campeaoIcon
        },
        {
            name: "UNREAL",
            image: unrealIcon
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
       HABILITAÇÃO DO ELO
       (no Fortnite, elo só faz sentido no modo RANKED)
    ===================================================== */

    const rankEnabled = selectedMode === "RANKED";


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

        if (mode !== "RANKED") {
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
        TRIO: 3,
        SQUAD: 4
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
            className="fort-create-room-page"
            style={{
                backgroundImage: `url(${fortniteBackground})`
            }}
        >

            <div className="fort-create-room-overlay"></div>


            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside className="fort-create-sidebar">

                <nav className="fort-create-sidebar-menu">


                    {/* HOME */}

                    <button
                        className="fort-create-sidebar-item"
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
                        className="fort-create-sidebar-item"
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
                        className="fort-create-sidebar-item"
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
                        className="fort-create-sidebar-item"
                        type="button"
                        onClick={onFeedbacks}
                        title="Feedbacks"
                    >

                        <span className="fort-create-feedback-star">
                            ★
                        </span>

                    </button>


                    {/* CONFIGURAÇÕES */}

                    <button
                        className="fort-create-sidebar-item"
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

            <div className="fort-create-room-content">


                {/* =================================================
                    NAVBAR
                ================================================= */}

                <header className="fort-create-navbar">


                    {/* LOGO */}

                    <div
                        className="fort-create-navbar-logo"
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

                    <div className="fort-create-games-navbar">

                        {navbarGames.map((item) => (

                            <div
                                key={item.name}
                                className={
                                    `fort-create-navbar-game ${
                                        game === item.name
                                            ? "fort-create-navbar-active"
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

                <main className="fort-create-room-main">


                    {/* =================================================
                        TOPO
                    ================================================= */}

                    <div className="fort-create-room-top">

                        <button
                            className="fort-back-button"
                            onClick={onBack}
                            type="button"
                        >
                            ← Voltar
                        </button>

                    </div>


                    {/* =================================================
                        LOGO DO JOGO
                    ================================================= */}

                    <div className="fort-create-game-header">

                        <img
                            src={fortniteBigLogo}
                            alt="Fortnite"
                            className="fort-create-game-logo"
                        />

                    </div>


                    {/* =================================================
                        MODO DE JOGO
                    ================================================= */}

                    <section className="fort-create-section">

                        <div className="fort-section-title">

                            <span></span>

                            <p>
                                MODO DE JOGO
                            </p>

                            <span></span>

                        </div>


                        <div className="fort-game-modes fort-modes">

                            {modes.map((mode) => (

                                <button
                                    key={mode.name}
                                    className={
                                        `fort-mode-card ${
                                            selectedMode === mode.name
                                                ? "fort-selected"
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
                                            `fort-mode-image fort-mode-icon-wrap ${mode.theme}`
                                        }
                                    >

                                        <div className="fort-mode-icon">
                                            {mode.icon}
                                        </div>

                                        <div className="fort-mode-image-overlay"></div>

                                    </div>


                                    <div className="fort-mode-name">
                                        {mode.name}
                                    </div>

                                </button>

                            ))}

                        </div>

                    </section>


                    {/* =================================================
                        ELO
                    ================================================= */}

                    <section className="fort-create-section">

                        <div className="fort-section-title">

                            <span></span>

                            <p>
                                ELO
                            </p>

                            <span></span>

                        </div>


                        <div
                            className={
                                `fort-rank-selection ${
                                    !rankEnabled
                                        ? "fort-disabled"
                                        : ""
                                }`
                            }
                        >

                            {ranks.map((rank) => (

                                <button
                                    key={rank.name}
                                    className={
                                        `fort-rank-item ${
                                            selectedRank === rank.name
                                                ? "fort-selected"
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

                                    <div className="fort-rank-placeholder">

                                        <img
                                            src={rank.image}
                                            alt={rank.name}
                                            className="fort-rank-icon"
                                        />

                                    </div>

                                </button>

                            ))}


                            {!rankEnabled && (

                                <div className="fort-rank-disabled-message">

                                    ELO DISPONÍVEL APENAS PARA
                                    O MODO RANKED

                                </div>

                            )}

                        </div>

                    </section>


{/* =================================================
                        TAMANHO DA EQUIPE
                    ================================================= */}

                    {!modoSoloDuo && (

                    <section className="fort-create-section">

                        <div className="fort-section-title">

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

                    <section className="fort-create-section">

                        <div className="fort-section-title">

                            <span></span>

                            <p>
                                GÊNERO
                            </p>

                            <span></span>

                        </div>


                        <div className="fort-gender-selection">

                            <button
                                type="button"
                                className={
                                    `fort-gender-button ${
                                        selectedGender.includes("HOMEM")
                                            ? "fort-selected"
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
                                    `fort-gender-button ${
                                        selectedGender.includes("MULHER")
                                            ? "fort-selected"
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

                    <section className="fort-create-section">

                        <div className="fort-section-title">

                            <span></span>

                            <p>
                                DETALHES DA SALA
                            </p>

                            <span></span>

                        </div>


                        <div className="fort-room-details-form">

                            <div className="fort-detail-box">

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


                            <div className="fort-detail-box">

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

                    <div className="fort-create-actions">

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
                            className="fort-create-button"
                            type="button"
                            onClick={criarSala}
                            disabled={criando}
                        >
                            {criando ? "CRIANDO..." : "CRIAR SALA"}
                        </button>


                        <button
                            className="fort-cancel-button"
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


export default FortniteCreateRoom;