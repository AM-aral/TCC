import { useState } from "react";
import "./CreateRoom.css";

import logo from "../assets/logo.png";

/* SIDEBAR */
import homeIcon from "../assets/sidebar/home.png";
import perfilIcon from "../assets/sidebar/perfil.png";
import historicoIcon from "../assets/sidebar/historico.png";
import mensagensIcon from "../assets/sidebar/mensagem.png";
import configuracoesIcon from "../assets/sidebar/configuracoes.png";

/* MINI LOGOS */
import owLogo from "../assets/icon/ow icon.png";
import cs2Logo from "../assets/icon/cs icon.png";
import valorantLogo from "../assets/icon/val icon.png";
import fortniteLogo from "../assets/icon/fortinite icon.png";
import rocketLogo from "../assets/icon/rocket icon.png";
import dotaLogo from "../assets/icon/dota icon.png";
import rivalsLogo from "../assets/icon/marvel icon.png";
import lolLogo from "../assets/icon/lol icon.png";

/* LOGO GRANDE */
import lolBigLogo from "../assets/LOGAO/lol-big.png";

/* MODOS */
import normalImg from "../assets/room-modes/normal.png";
import aramImg from "../assets/room-modes/aram.png";
import classicImg from "../assets/room-modes/classic.png";
import arenaImg from "../assets/room-modes/arena.png";
import flexImg from "../assets/room-modes/flex.png";
import soloqImg from "../assets/room-modes/soloq.png";

/* ELOS */
import ferroIcon from "../assets/elos/ferro.png";
import bronzeIcon from "../assets/elos/bronze.png";
import prataIcon from "../assets/elos/prata.png";
import goldIcon from "../assets/elos/ouro.png";
import platIcon from "../assets/elos/platina.png";
import esmerIcon from "../assets/elos/esmeralda.png";
import dimaIcon from "../assets/elos/diamante.png";
import mestreIcon from "../assets/elos/mestre.png";
import graoIcon from "../assets/elos/grao.png";
import desaIcon from "../assets/elos/desafiante.png";

import lolBackground from "../assets/rooms-bg.png";

function CreateRoom({ game, onBack, onProfile }) {
    const [selectedMode, setSelectedMode] = useState("NORMAL");
    const [selectedTeam, setSelectedTeam] = useState("DUO");
    const [selectedRank, setSelectedRank] = useState(null);
    const [selectedGender, setSelectedGender] = useState("HOMEM");

    const modes = [
        { name: "NORMAL", image: normalImg },
        { name: "ARAM", image: aramImg },
        { name: "CLASSIC", image: classicImg },
        { name: "ARENA", image: arenaImg },
        { name: "SOLOQ", image: soloqImg },
        { name: "FLEX", image: flexImg },
    ];

    const teams = ["DUO", "TRIO", "SQUAD", "5V5"];

    const ranks = [
        { name: "FERRO", image: ferroIcon },
        { name: "BRONZE", image: bronzeIcon },
        { name: "PRATA", image: prataIcon },
        { name: "OURO", image: goldIcon },
        { name: "PLATINA", image: platIcon },
        { name: "ESMERALDA", image: esmerIcon },
        { name: "DIAMANTE", image: dimaIcon },
        { name: "MESTRE", image: mestreIcon },
        { name: "GM", image: graoIcon },
        { name: "DESAFIANTE", image: desaIcon },
    ];

    const rankEnabled =
        selectedMode === "SOLOQ" ||
        selectedMode === "FLEX";

    const handleModeChange = (mode) => {
        setSelectedMode(mode);

        if (mode !== "SOLOQ" && mode !== "FLEX") {
            setSelectedRank(null);
        }
    };

    if (!game) return null;

    return (
        <div
            className="create-room-page"
            style={{ backgroundImage: `url(${lolBackground})` }}
        >
            <div className="create-room-overlay"></div>

            {/* ================= SIDEBAR ================= */}

            <aside className="sidebar">

                <img
                    src={logo}
                    alt="LFG"
                    className="sidebar-logo"
                />

                <nav className="sidebar-menu">

                    <button
                        className="sidebar-item"
                        type="button"
                        onClick={onBack}
                    >
                        <img src={homeIcon} alt="Home" />
                    </button>

                    <button
                        className="sidebar-item"
                        type="button"
                        onClick={onProfile}
                    >
                        <img src={perfilIcon} alt="Perfil" />
                    </button>

                    <button
                        className="sidebar-item"
                        type="button"
                    >
                        <img src={historicoIcon} alt="Histórico" />
                    </button>

                    <button
                        className="sidebar-item"
                        type="button"
                    >
                        <img src={mensagensIcon} alt="Mensagens" />
                    </button>

                    <button
                        className="sidebar-item"
                        type="button"
                    >
                        <img src={configuracoesIcon} alt="Configurações" />
                    </button>

                </nav>

            </aside>

            {/* ================= CONTEÚDO ================= */}

            <div className="rooms-content">

                {/* ================= NAVBAR ================= */}

                <nav className="games-menu">

                    <div className="game-menu-item">
                        <img src={owLogo} alt="Overwatch" />
                        <span>OW</span>
                    </div>

                    <div className="game-menu-item">
                        <img src={cs2Logo} alt="Counter Strike" />
                        <span>CS</span>
                    </div>

                    <div className="game-menu-item">
                        <img src={valorantLogo} alt="Valorant" />
                        <span>Val</span>
                    </div>

                    <div className="game-menu-item">
                        <img src={fortniteLogo} alt="Fortnite" />
                        <span>Fortnite</span>
                    </div>

                    <div className="game-menu-item">
                        <img src={rocketLogo} alt="Rocket League" />
                        <span>RL</span>
                    </div>

                    <div className="game-menu-item">
                        <img src={dotaLogo} alt="Dota 2" />
                        <span>Dota</span>
                    </div>

                    <div className="game-menu-item">
                        <img src={rivalsLogo} alt="Marvel Rivals" />
                        <span>Rivals</span>
                    </div>

                    <div className="game-menu-item selected">
                        <img src={lolLogo} alt="League of Legends" />
                        <span>LoL</span>
                    </div>

                </nav>

                {/* ================= CRIAÇÃO DA SALA ================= */}

                <main className="create-room-main">

                    <div className="create-room-top">

                        <button
                            className="back-button"
                            onClick={onBack}
                            type="button"
                        >
                            ← Voltar
                        </button>

                    </div>

                    <div className="create-game-header">

                        <img
                            src={lolBigLogo}
                            alt="League of Legends"
                            className="create-game-logo"
                        />

                    </div>

                    {/* ================= MODO ================= */}

                    <section className="create-section">

                        <div className="section-title">
                            <span></span>
                            <p>MODO DE JOGO</p>
                            <span></span>
                        </div>

                        <div className="game-modes">

                            {modes.map((mode) => (

                                <button
                                    key={mode.name}
                                    className={`mode-card ${selectedMode === mode.name
                                            ? "selected"
                                            : ""
                                        }`}
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

                    {/* ================= TAMANHO ================= */}

                    <section className="create-section">

                        <div className="section-title">
                            <span></span>
                            <p>TAMANHO DA EQUIPE</p>
                            <span></span>
                        </div>

                        <div className="team-size">

                            {teams.map((team) => (

                                <button
                                    key={team}
                                    className={`team-button ${selectedTeam === team
                                            ? "selected"
                                            : ""
                                        }`}
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

                    {/* ================= ELO ================= */}

                    <section className="create-section">

                        <div className="section-title">
                            <span></span>
                            <p>ELO</p>
                            <span></span>
                        </div>

                        <div
                            className={`rank-selection ${!rankEnabled ? "disabled" : ""
                                }`}
                        >

                            {ranks.map((rank) => (

                                <button
                                    key={rank.name}
                                    className={`rank-item ${selectedRank === rank.name
                                            ? "selected"
                                            : ""
                                        }`}
                                    onClick={() => {

                                        if (!rankEnabled) return;

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
                                    ELO DISPONÍVEL APENAS PARA SOLOQ E FLEX
                                </div>

                            )}

                        </div>

                    </section>

                    {/* ================= GÊNERO ================= */}

                    <section className="create-section">

                        <div className="section-title">
                            <span></span>
                            <p>GÊNERO</p>
                            <span></span>
                        </div>

                        <div className="gender-selection">

                            <button
                                type="button"
                                className={`gender-button male ${selectedGender === "HOMEM"
                                        ? "selected"
                                        : ""
                                    }`}
                                onClick={() =>
                                    setSelectedGender("HOMEM")
                                }
                            >
                                ♂ HOMEM
                            </button>

                            <button
                                type="button"
                                className={`gender-button female ${selectedGender === "MULHER"
                                        ? "selected"
                                        : ""
                                    }`}
                                onClick={() =>
                                    setSelectedGender("MULHER")
                                }
                            >
                                ♀ MULHER
                            </button>

                        </div>

                    </section>

                    {/* ================= DETALHES ================= */}

                    <section className="create-section">

                        <div className="section-title">
                            <span></span>
                            <p>DETALHES DA SALA</p>
                            <span></span>
                        </div>

                        <div className="room-details-form">

                            <div className="detail-box">

                                <label>Nome da sala</label>

                                <input
                                    type="text"
                                    placeholder="Digite o nome da sala..."
                                />

                            </div>

                            <div className="detail-box">

                                <label>Descrição</label>

                                <textarea
                                    placeholder="Digite uma descrição..."
                                ></textarea>

                            </div>

                        </div>

                    </section>

                    {/* ================= BOTÕES ================= */}

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

export default CreateRoom;