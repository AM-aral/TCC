import { useState } from "react";
import "./r6CreateRoom.css";

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
   LOGO GRANDE (ícone do Rainbow Six Siege)
===================================================== */

import r6BigLogo from "../assets/games-icon/r6 icon.png";

/* =====================================================
   ELOS DO R6
   (a pasta tem 4 divisões por faixa — usamos só a divisão
   1, que é a mais alta de cada faixa antes de subir pra
   próxima, pra não lotar a tela de ícone)
===================================================== */
import esmeraldaIcon from "../assets/elos/r6/grass 1.png";
import dirt from "../assets/elos/r6/dirt 1.png";
import stone from "../assets/elos/r6/stone 1.png";
import tin from "../assets/elos/r6/tin 1.png";
import cobreIcon from "../assets/elos/r6/cobre 1.png";
import bronzeIcon from "../assets/elos/r6/bronze 1.png";
import prataIcon from "../assets/elos/r6/prata 1.png";
import ouroIcon from "../assets/elos/r6/gold 1.png";
import platinaIcon from "../assets/elos/r6/platina 1.png";
import diamanteIcon from "../assets/elos/r6/dima .png";
import campeaoIcon from "../assets/elos/r6/campeao.png";

/* =====================================================
   FUNÇÕES
===================================================== */

import entryIcon from "../assets/funcoes/entry.png";
import supportIcon from "../assets/funcoes/support.png";
import sentinelaIcon from "../assets/funcoes/sentinela.png";
import flancoIcon from "../assets/funcoes/flanco.png";
import iglIcon from "../assets/funcoes/leader.png";

/* =====================================================
   FUNDO
===================================================== */

import r6Background from "../assets/rooms-bg.png";


function R6CreateRoom({
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
       (cor + ícone SVG em vez de imagem — o R6 não tem
       "mapa" fixo por modo de sala)
    ===================================================== */

    const modes = [
        {
            name: "RANQUEADA",
            theme: "r6-mode-ranked",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 5L29 18L42 20L32.5 29L35 42L24 36L13 42L15.5 29L6 20L19 18L24 5Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            name: "PADRÃO",
            theme: "r6-mode-standard",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="8" y="10" width="32" height="28" rx="4" stroke="currentColor" strokeWidth="3" />
                    <path d="M8 20H40" stroke="currentColor" strokeWidth="3" />
                    <path d="M16 26H24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
            )
        },
        {
            name: "ARCADE",
            theme: "r6-mode-arcade",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M27 5L11 27H23L21 43L37 21H25L27 5Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            name: "PERSONALIZADA",
            theme: "r6-mode-custom",
            icon: (
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="3" />
                    <path d="M24 5V12M24 36V43M43 24H36M12 24H5M37.4 10.6L32.5 15.5M15.5 32.5L10.6 37.4M37.4 37.4L32.5 32.5M15.5 15.5L10.6 10.6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
            )
        }
    ];


    /* =====================================================
       ELOS
    ===================================================== */

    const ranks = [
        {
            name: "dirt",
            image: dirt
        },       
        {
            name: "grass",
            image: esmeraldaIcon
        },
        {
            name: "stone",
            image: stone
        },
        {
            name: "tin",
            image: tin
        },
        {
            name: "COBRE",
            image: cobreIcon
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
            name: "CAMPEÃO",
            image: campeaoIcon
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
            name: "ENTRY",
            image: entryIcon
        },
        {
            name: "SUPORTE",
            image: supportIcon
        },
        {
            name: "SENTINELA",
            image: sentinelaIcon
        },
        {
            name: "FLANCO",
            image: flancoIcon
        },
        {
            name: "LÍDER",
            image: iglIcon
        }
    ];


    /* =====================================================
       HABILITAÇÃO DO ELO
       (só faz sentido no modo Ranqueada)
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
       TROCAR MODO
    ===================================================== */

    const handleModeChange = (mode) => {

        setSelectedMode(mode);

        if (mode !== "RANQUEADA") {
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
            className="r6-create-room-page"
            style={{
                backgroundImage: `url(${r6Background})`
            }}
        >

            <div className="r6-create-room-overlay"></div>


            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside className="r6-create-sidebar">

                <nav className="r6-create-sidebar-menu">


                    {/* HOME */}

                    <button
                        className="r6-create-sidebar-item"
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
                        className="r6-create-sidebar-item"
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
                        className="r6-create-sidebar-item"
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
                        className="r6-create-sidebar-item"
                        type="button"
                        onClick={onFeedbacks}
                        title="Feedbacks"
                    >

                        <span className="r6-create-feedback-star">
                            ★
                        </span>

                    </button>


                    {/* CONFIGURAÇÕES */}

                    <button
                        className="r6-create-sidebar-item"
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

            <div className="r6-create-room-content">


                {/* =================================================
                    NAVBAR
                ================================================= */}

                <header className="r6-create-navbar">


                    {/* LOGO */}

                    <div
                        className="r6-create-navbar-logo"
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

                    <div className="r6-create-games-navbar">

                        {navbarGames.map((item) => (

                            <div
                                key={item.name}
                                className={
                                    `r6-create-navbar-game ${game === item.name
                                        ? "r6-create-navbar-active"
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

                <main className="r6-create-room-main">


                    {/* =================================================
                        TOPO
                    ================================================= */}

                    <div className="r6-create-room-top">

                        <button
                            className="r6-back-button"
                            onClick={onBack}
                            type="button"
                        >
                            ← Voltar
                        </button>

                    </div>


                    {/* =================================================
                        LOGO DO JOGO
                    ================================================= */}

                    <div className="r6-create-game-header">

                        <img
                            src={r6BigLogo}
                            alt="Rainbow Six Siege"
                            className="r6-create-game-logo"
                        />

                    </div>


                    {/* =================================================
                        MODO DE JOGO
                    ================================================= */}

                    <section className="r6-create-section">

                        <div className="r6-section-title">

                            <span></span>

                            <p>
                                MODO DE JOGO
                            </p>

                            <span></span>

                        </div>


                        <div className="r6-game-modes">

                            {modes.map((mode) => (

                                <button
                                    key={mode.name}
                                    className={
                                        `r6-mode-card ${selectedMode === mode.name
                                            ? "r6-selected"
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
                                            `r6-mode-image r6-mode-icon-wrap ${mode.theme}`
                                        }
                                    >

                                        <div className="r6-mode-icon">
                                            {mode.icon}
                                        </div>

                                        <div className="r6-mode-image-overlay"></div>

                                    </div>


                                    <div className="r6-mode-name">
                                        {mode.name}
                                    </div>

                                </button>

                            ))}

                        </div>

                    </section>


                    {/* =================================================
                        ELO
                    ================================================= */}

                    <section className="r6-create-section">

                        <div className="r6-section-title">

                            <span></span>

                            <p>
                                ELO
                            </p>

                            <span></span>

                        </div>


                        <div
                            className={
                                `r6-rank-selection ${!rankEnabled
                                    ? "r6-disabled"
                                    : ""
                                }`
                            }
                        >

                            {ranks.map((rank) => (

                                <button
                                    key={rank.name}
                                    className={
                                        `r6-rank-item ${selectedRank === rank.name
                                            ? "r6-selected"
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

                                    <div className="r6-rank-placeholder">

                                        <img
                                            src={rank.image}
                                            alt={rank.name}
                                            className="r6-rank-icon"
                                        />

                                    </div>

                                </button>

                            ))}


                            {!rankEnabled && (

                                <div className="r6-rank-disabled-message">

                                    ELO DISPONÍVEL APENAS PARA
                                    PARTIDAS RANQUEADAS

                                </div>

                            )}

                        </div>

                    </section>




                    {/* =================================================
                        FUNÇÃO
                    ================================================= */}

                    <section className="r6-create-section">

                        <div className="r6-section-title">

                            <span></span>

                            <p>
                                FUNÇÃO
                            </p>

                            <span></span>

                        </div>


                        <div className="r6-role-selection">

                            {roles.map((role) => (

                                <button
                                    key={role.name}
                                    className={
                                        `r6-role-item ${selectedRole === role.name
                                            ? "r6-selected"
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

                                    <span className="r6-role-name">
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

                    <section className="r6-create-section">

                        <div className="r6-section-title">

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

                    <section className="r6-create-section">

                        <div className="r6-section-title">

                            <span></span>

                            <p>
                                GÊNERO
                            </p>

                            <span></span>

                        </div>


                        <div className="r6-gender-selection">

                            <button
                                type="button"
                                className={
                                    `r6-gender-button ${selectedGender.includes("HOMEM")
                                        ? "r6-selected"
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
                                    `r6-gender-button ${selectedGender.includes("MULHER")
                                        ? "r6-selected"
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

                    <section className="r6-create-section">

                        <div className="r6-section-title">

                            <span></span>

                            <p>
                                DETALHES DA SALA
                            </p>

                            <span></span>

                        </div>


                        <div className="r6-room-details-form">

                            <div className="r6-detail-box">

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


                            <div className="r6-detail-box">

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

                    <div className="r6-create-actions">

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
                            className="r6-create-button"
                            onClick={criarSala}
                            disabled={criando}
                            type="button"
                        >
                            {criando ? "CRIANDO..." : "CRIAR SALA"}
                        </button>


                        <button
                            className="r6-cancel-button"
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


export default R6CreateRoom;