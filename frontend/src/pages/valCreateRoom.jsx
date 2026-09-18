import { useState } from "react";
import "./valCreateRoom.css";

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
   ÍCONES DE FUNÇÃO
===================================================== */

import duelistaIcon from "../assets/funcoes/duelista.png";
import controladorIcon from "../assets/funcoes/controlador.png";
import iniciadorIcon from "../assets/funcoes/iniciador.png";
import sentinelaIcon from "../assets/funcoes/sentinela.png";

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

    const [selectedGender, setSelectedGender] = useState(["HOMEM"]);

    const [selectedTeam, setSelectedTeam] = useState("DUO");

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

    const functions = [
        {
            name: "DUELISTA",
            image: duelistaIcon
        },
        {
            name: "CONTROLADOR",
            image: controladorIcon
        },
        {
            name: "INICIADOR",
            image: iniciadorIcon
        },
        {
            name: "SENTINELA",
            image: sentinelaIcon
        }
    ];


    /* =====================================================
       HABILITAÇÃO DO ELO
       (no Valorant, elo só faz sentido no Competitivo)
    ===================================================== */

    const rankEnabled = selectedMode === "COMPETITIVO";


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
            className="val-create-room-page"
            style={{
                backgroundImage: `url(${valorantBackground})`
            }}
        >

            <div className="val-create-room-overlay"></div>


            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside className="val-create-sidebar">

                <nav className="val-create-sidebar-menu">


                    {/* HOME */}

                    <button
                        className="val-create-sidebar-item"
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
                        className="val-create-sidebar-item"
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
                        className="val-create-sidebar-item"
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
                        className="val-create-sidebar-item"
                        type="button"
                        onClick={onFeedbacks}
                        title="Feedbacks"
                    >

                        <span className="val-create-feedback-star">
                            ★
                        </span>

                    </button>


                    {/* CONFIGURAÇÕES */}

                    <button
                        className="val-create-sidebar-item"
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

            <div className="val-create-room-content">


                {/* =================================================
                    NAVBAR
                ================================================= */}

                <header className="val-create-navbar">


                    {/* LOGO */}

                    <div
                        className="val-create-navbar-logo"
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

                    <div className="val-create-games-navbar">

                        {navbarGames.map((item) => (

                            <div
                                key={item.name}
                                className={
                                    `val-create-navbar-game ${
                                        game === item.name
                                            ? "val-create-navbar-active"
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

                <main className="val-create-room-main">


                    {/* =================================================
                        TOPO
                    ================================================= */}

                    <div className="val-create-room-top">

                        <button
                            className="val-back-button"
                            onClick={onBack}
                            type="button"
                        >
                            ← Voltar
                        </button>

                    </div>


                    {/* =================================================
                        LOGO DO JOGO
                    ================================================= */}

                    <div className="val-create-game-header">

                        <img
                            src={valorantBigLogo}
                            alt="Valorant"
                            className="val-create-game-logo"
                        />

                    </div>


                    {/* =================================================
                        MODO DE JOGO
                    ================================================= */}

                    <section className="val-create-section">

                        <div className="val-section-title">

                            <span></span>

                            <p>
                                MODO DE JOGO
                            </p>

                            <span></span>

                        </div>


                        <div className="val-game-modes val-modes">

                            {modes.map((mode) => (

                                <button
                                    key={mode.name}
                                    className={
                                        `val-mode-card ${
                                            selectedMode === mode.name
                                                ? "val-selected"
                                                : ""
                                        }`
                                    }
                                    onClick={() =>
                                        handleModeChange(mode.name)
                                    }
                                    type="button"
                                >

                                    <div className="val-mode-image">

                                        <img
                                            src={mode.image}
                                            alt={mode.name}
                                        />

                                        <div className="val-mode-image-overlay"></div>

                                    </div>


                                    <div className="val-mode-name">
                                        {mode.name}
                                    </div>

                                </button>

                            ))}

                        </div>

                    </section>


                    {/* =================================================
                        ELO
                    ================================================= */}

                    <section className="val-create-section">

                        <div className="val-section-title">

                            <span></span>

                            <p>
                                ELO
                            </p>

                            <span></span>

                        </div>


                        <div
                            className={
                                `val-rank-selection ${
                                    !rankEnabled
                                        ? "val-disabled"
                                        : ""
                                }`
                            }
                        >

                            {ranks.map((rank) => (

                                <button
                                    key={rank.name}
                                    className={
                                        `val-rank-item ${
                                            selectedRank === rank.name
                                                ? "val-selected"
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

                                    <div className="val-rank-placeholder">

                                        <img
                                            src={rank.image}
                                            alt={rank.name}
                                            className="val-rank-icon"
                                        />

                                    </div>

                                </button>

                            ))}


                            {!rankEnabled && (

                                <div className="val-rank-disabled-message">

                                    ELO DISPONÍVEL APENAS PARA
                                    O MODO COMPETITIVO

                                </div>

                            )}

                        </div>

                    </section>


                    {/* =================================================
                        TAMANHO DA EQUIPE
                    ================================================= */}

                    {!modoSoloDuo && (

                    <section className="val-create-section">

                        <div className="val-section-title">

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

                    <section className="val-create-section">

                        <div className="val-section-title">

                            <span></span>

                            <p>
                                GÊNERO
                            </p>

                            <span></span>

                        </div>


                        <div className="val-gender-selection">

                            <button
                                type="button"
                                className={
                                    `val-gender-button ${
                                        selectedGender.includes("HOMEM")
                                            ? "val-selected"
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
                                    `val-gender-button ${
                                        selectedGender.includes("MULHER")
                                            ? "val-selected"
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
                        FUNÇÃO
                    ================================================= */}

                    <section className="val-create-section">

                        <div className="val-section-title">

                            <span></span>

                            <p>
                                FUNÇÃO
                            </p>

                            <span></span>

                        </div>


                        <div className="val-function-selection">

                            {functions.map((func) => (

                                <button
                                    key={func.name}
                                    type="button"
                                    className={
                                        `val-function-button ${
                                            selectedFunction === func.name
                                                ? "val-selected"
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
                                        className="val-function-icon"
                                    />

                                    <span>
                                        {func.name}
                                    </span>

                                </button>

                            ))}

                        </div>

                    </section>


                    {/* =================================================
                        DETALHES
                    ================================================= */}

                    <section className="val-create-section">

                        <div className="val-section-title">

                            <span></span>

                            <p>
                                DETALHES DA SALA
                            </p>

                            <span></span>

                        </div>


                        <div className="val-room-details-form">

                            <div className="val-detail-box">

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


                            <div className="val-detail-box">

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

                    <div className="val-create-actions">

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
                            className="val-create-button"
                            type="button"
                            onClick={criarSala}
                            disabled={criando}
                        >
                            {criando ? "CRIANDO..." : "CRIAR SALA"}
                        </button>


                        <button
                            className="val-cancel-button"
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


export default ValorantCreateRoom;