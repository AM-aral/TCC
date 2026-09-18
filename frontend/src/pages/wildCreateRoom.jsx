import { useState } from "react";
import "./wildCreateRoom.css";

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
   LOGO GRANDE (ícone do Wild Rift)
===================================================== */

import wildBigLogo from "../assets/games-icon/lolw icon.png";

/* =====================================================
   ELOS DO WILD RIFT
===================================================== */

import ferroIcon from "../assets/elos/wild rift/ferro.png";
import bronzeIcon from "../assets/elos/wild rift/bronze.png";
import prataIcon from "../assets/elos/wild rift/prata.png";
import ouroIcon from "../assets/elos/wild rift/ouro.png";
import platinaIcon from "../assets/elos/wild rift/platina.png";
import esmeraldaIcon from "../assets/elos/wild rift/esmeralda.png";
import diamanteIcon from "../assets/elos/wild rift/diamante.png";
import mestreIcon from "../assets/elos/wild rift/mestre.png";
import graoMestreIcon from "../assets/elos/wild rift/grao mestre.png";
import desafianteIcon from "../assets/elos/wild rift/desafiante.png";

/* =====================================================
   ROTAS (funções)
===================================================== */

import topIcon from "../assets/funcoes/top.png";
import jungleIcon from "../assets/funcoes/jungle.png";
import midIcon from "../assets/funcoes/mid.png";
import adcIcon from "../assets/funcoes/adc.png";
import supIcon from "../assets/funcoes/sup.png";

/* =====================================================
   FUNDO
===================================================== */

import wildBackground from "../assets/rooms-bg.png";


function WildCreateRoom({
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
       (cor + ícone SVG em vez de imagem)
    ===================================================== */

    const modes = [
        {
            name: "RANQUEADA",
            theme: "wild-mode-ranked",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 5L29 18L42 20L32.5 29L35 42L24 36L13 42L15.5 29L6 20L19 18L24 5Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            name: "NORMAL",
            theme: "wild-mode-normal",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 40L40 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    <circle cx="13" cy="35" r="6" stroke="currentColor" strokeWidth="3"/>
                    <circle cx="35" cy="13" r="6" stroke="currentColor" strokeWidth="3"/>
                </svg>
            )
        },
        {
            name: "ARAM",
            theme: "wild-mode-aram",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 6L38 14V34L24 42L10 34V14L24 6Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                    <path d="M18 19L30 31M30 19L18 31" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
            )
        },
        {
            name: "CO-OP VS IA",
            theme: "wild-mode-coop",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="9" y="14" width="30" height="22" rx="6" stroke="currentColor" strokeWidth="3"/>
                    <path d="M24 6V14" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    <circle cx="18" cy="25" r="2.5" fill="currentColor"/>
                    <circle cx="30" cy="25" r="2.5" fill="currentColor"/>
                </svg>
            )
        },
        {
            name: "PERSONALIZADA",
            theme: "wild-mode-custom",
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
            name: "ESMERALDA",
            image: esmeraldaIcon
        },
        {
            name: "DIAMANTE",
            image: diamanteIcon
        },
        {
            name: "MESTRE",
            image: mestreIcon
        },
        {
            name: "GRÃO-MESTRE",
            image: graoMestreIcon
        },
        {
            name: "DESAFIANTE",
            image: desafianteIcon
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
       ROTAS
    ===================================================== */

    const roles = [
        {
            name: "TOPO",
            image: topIcon
        },
        {
            name: "SELVA",
            image: jungleIcon
        },
        {
            name: "MEIO",
            image: midIcon
        },
        {
            name: "ATIRADOR",
            image: adcIcon
        },
        {
            name: "SUPORTE",
            image: supIcon
        }
    ];


    /* =====================================================
       HABILITAÇÃO DO ELO
       (só faz sentido em partidas ranqueadas)
    ===================================================== */

    const rankEnabled = selectedMode === "RANQUEADA";


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
       HABILITAÇÃO DA ROTA
       (no ARAM não existe rota)
    ===================================================== */

    const roleEnabled = selectedMode !== "ARAM";


    /* =====================================================
       TROCAR MODO
    ===================================================== */

    const handleModeChange = (mode) => {

        setSelectedMode(mode);

        if (mode !== "RANQUEADA") {
            setSelectedRank(null);
        }

        if (mode === "ARAM") {
            setSelectedRole(null);
        }
    };


    /* =====================================================
       TROCAR ROTA
       (clicar de novo na mesma rota desmarca)
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
            className="wild-create-room-page"
            style={{
                backgroundImage: `url(${wildBackground})`
            }}
        >

            <div className="wild-create-room-overlay"></div>


            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside className="wild-create-sidebar">

                <nav className="wild-create-sidebar-menu">


                    {/* HOME */}

                    <button
                        className="wild-create-sidebar-item"
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
                        className="wild-create-sidebar-item"
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
                        className="wild-create-sidebar-item"
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
                        className="wild-create-sidebar-item"
                        type="button"
                        onClick={onFeedbacks}
                        title="Feedbacks"
                    >

                        <span className="wild-create-feedback-star">
                            ★
                        </span>

                    </button>


                    {/* CONFIGURAÇÕES */}

                    <button
                        className="wild-create-sidebar-item"
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

            <div className="wild-create-room-content">


                {/* =================================================
                    NAVBAR
                ================================================= */}

                <header className="wild-create-navbar">


                    {/* LOGO */}

                    <div
                        className="wild-create-navbar-logo"
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

                    <div className="wild-create-games-navbar">

                        {navbarGames.map((item) => (

                            <div
                                key={item.name}
                                className={
                                    `wild-create-navbar-game ${
                                        game === item.name
                                            ? "wild-create-navbar-active"
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

                <main className="wild-create-room-main">


                    {/* =================================================
                        TOPO
                    ================================================= */}

                    <div className="wild-create-room-top">

                        <button
                            className="wild-back-button"
                            onClick={onBack}
                            type="button"
                        >
                            ← Voltar
                        </button>

                    </div>


                    {/* =================================================
                        LOGO DO JOGO
                    ================================================= */}

                    <div className="wild-create-game-header">

                        <img
                            src={wildBigLogo}
                            alt="Wild Rift"
                            className="wild-create-game-logo"
                        />

                    </div>


                    {/* =================================================
                        MODO DE JOGO
                    ================================================= */}

                    <section className="wild-create-section">

                        <div className="wild-section-title">

                            <span></span>

                            <p>
                                MODO DE JOGO
                            </p>

                            <span></span>

                        </div>


                        <div className="wild-game-modes">

                            {modes.map((mode) => (

                                <button
                                    key={mode.name}
                                    className={
                                        `wild-mode-card ${
                                            selectedMode === mode.name
                                                ? "wild-selected"
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
                                            `wild-mode-image wild-mode-icon-wrap ${mode.theme}`
                                        }
                                    >

                                        <div className="wild-mode-icon">
                                            {mode.icon}
                                        </div>

                                        <div className="wild-mode-image-overlay"></div>

                                    </div>


                                    <div className="wild-mode-name">
                                        {mode.name}
                                    </div>

                                </button>

                            ))}

                        </div>

                    </section>


                    {/* =================================================
                        ELO
                    ================================================= */}

                    <section className="wild-create-section">

                        <div className="wild-section-title">

                            <span></span>

                            <p>
                                ELO
                            </p>

                            <span></span>

                        </div>


                        <div
                            className={
                                `wild-rank-selection ${
                                    !rankEnabled
                                        ? "wild-disabled"
                                        : ""
                                }`
                            }
                        >

                            {ranks.map((rank) => (

                                <button
                                    key={rank.name}
                                    className={
                                        `wild-rank-item ${
                                            selectedRank === rank.name
                                                ? "wild-selected"
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

                                    <div className="wild-rank-placeholder">

                                        <img
                                            src={rank.image}
                                            alt={rank.name}
                                            className="wild-rank-icon"
                                        />

                                    </div>

                                </button>

                            ))}


                            {!rankEnabled && (

                                <div className="wild-rank-disabled-message">

                                    ELO DISPONÍVEL APENAS PARA
                                    PARTIDAS RANQUEADAS

                                </div>

                            )}

                        </div>

                    </section>


                    {/* =================================================
                        ROTA
                    ================================================= */}

                    <section className="wild-create-section">

                        <div className="wild-section-title">

                            <span></span>

                            <p>
                                ROTA
                            </p>

                            <span></span>

                        </div>


                        <div
                            className={
                                `wild-role-selection ${
                                    !roleEnabled
                                        ? "wild-disabled"
                                        : ""
                                }`
                            }
                        >

                            {roles.map((role) => (

                                <button
                                    key={role.name}
                                    className={
                                        `wild-role-item ${
                                            selectedRole === role.name
                                                ? "wild-selected"
                                                : ""
                                        }`
                                    }
                                    onClick={() => {

                                        if (!roleEnabled) {
                                            return;
                                        }

                                        handleRoleChange(role.name);

                                    }}
                                    type="button"
                                >

                                    <img
                                        src={role.image}
                                        alt={role.name}
                                    />

                                    <span className="wild-role-name">
                                        {role.name}
                                    </span>

                                </button>

                            ))}


                            {!roleEnabled && (

                                <div className="wild-role-disabled-message">

                                    O ARAM NÃO TEM ROTAS

                                </div>

                            )}

                        </div>

                    </section>


                    {/* =================================================
                        TAMANHO DA EQUIPE
                    ================================================= */}

                    {!modoSoloDuo && (

                    <section className="wild-create-section">

                        <div className="wild-section-title">

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

                    <section className="wild-create-section">

                        <div className="wild-section-title">

                            <span></span>

                            <p>
                                GÊNERO
                            </p>

                            <span></span>

                        </div>


                        <div className="wild-gender-selection">

                            <button
                                type="button"
                                className={
                                    `wild-gender-button ${
                                        selectedGender.includes("HOMEM")
                                            ? "wild-selected"
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
                                    `wild-gender-button ${
                                        selectedGender.includes("MULHER")
                                            ? "wild-selected"
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

                    <section className="wild-create-section">

                        <div className="wild-section-title">

                            <span></span>

                            <p>
                                DETALHES DA SALA
                            </p>

                            <span></span>

                        </div>


                        <div className="wild-room-details-form">

                            <div className="wild-detail-box">

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


                            <div className="wild-detail-box">

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

                    <div className="wild-create-actions">

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
                            className="wild-create-button"
                            onClick={criarSala}
                            disabled={criando}
                            type="button"
                        >
                            {criando ? "CRIANDO..." : "CRIAR SALA"}
                        </button>


                        <button
                            className="wild-cancel-button"
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


export default WildCreateRoom;