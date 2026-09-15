import "./Settings.css";

// LOGO
import logo from "../assets/logo.png";

// SIDEBAR
import homeIcon from "../assets/sidebar/home.png";
import perfilIcon from "../assets/sidebar/perfil.png";
import historicoIcon from "../assets/sidebar/historico.png";
import configuracoesIcon from "../assets/sidebar/configuracoes.png";

// JOGOS DO TOPO
import owIcon from "../assets/icon/ow icon.png";
import csIcon from "../assets/icon/cs icon.png";
import valIcon from "../assets/icon/val icon.png";
import fortniteIcon from "../assets/icon/fortinite icon.png";
import rocketIcon from "../assets/icon/rocket icon.png";
import dotaIcon from "../assets/icon/dota icon.png";
import rivalsIcon from "../assets/icon/marvel icon.png";
import lolIcon from "../assets/icon/lol icon.png";

function Settings({
    onHome,
    onProfile,
    onHistory,
    onLogout,
    onSelectGame
}) {
    const jogos = [
        { nome: "Overwatch", imagem: owIcon },
        { nome: "Counter Strike 2", imagem: csIcon },
        { nome: "Valorant", imagem: valIcon },
        { nome: "Fortnite", imagem: fortniteIcon },
        { nome: "Rocket League", imagem: rocketIcon },
        { nome: "Dota 2", imagem: dotaIcon },
        { nome: "Marvel Rivals", imagem: rivalsIcon },
        { nome: "League of Legends", imagem: lolIcon }
    ];

    return (
        <div className="settings-page">

            {/* =========================
                SIDEBAR
            ========================= */}

            <aside className="settings-sidebar">

                <div className="settings-sidebar-menu">

                    <button
                        className="settings-sidebar-item"
                        onClick={onHome}
                        title="Início"
                    >
                        <img src={homeIcon} alt="Início" />
                    </button>

                    <button
                        className="settings-sidebar-item"
                        onClick={onProfile}
                        title="Perfil"
                    >
                        <img src={perfilIcon} alt="Perfil" />
                    </button>

                    <button
                        className="settings-sidebar-item"
                        onClick={onHistory}
                        title="Histórico"
                    >
                        <img src={historicoIcon} alt="Histórico" />
                    </button>

                    <button
                        className="settings-sidebar-item active"
                        title="Configurações"
                    >
                        <img
                            src={configuracoesIcon}
                            alt="Configurações"
                        />
                    </button>

                </div>

            </aside>


            {/* =========================
                NAVBAR
            ========================= */}

            <nav className="settings-navbar">

                <div className="settings-navbar-logo">
                    <img src={logo} alt="LFGP" />
                </div>

                <div className="settings-games">

                    {jogos.map((jogo) => (
                        <button
                            key={jogo.nome}
                            className="settings-game-button"
                            title={jogo.nome}
                            onClick={() => {
                                if (onSelectGame) {
                                    onSelectGame(jogo);
                                }
                            }}
                        >
                            <img
                                src={jogo.imagem}
                                alt={jogo.nome}
                            />
                        </button>
                    ))}

                </div>

            </nav>


            {/* =========================
                CONTEÚDO
            ========================= */}

            <main className="settings-content">

                <div className="settings-header">
                    <h1>Configurações</h1>
                    <p>
                        Gerencie as configurações da sua conta.
                    </p>
                </div>


                <section className="settings-card">

                    <div className="settings-card-info">
                        <h2>Sair da conta</h2>

                        <p>
                            Encerre sua sessão atual e volte para a tela
                            de login.
                        </p>
                    </div>

                    <button
                        className="settings-logout-button"
                        onClick={onLogout}
                    >
                        Sair da conta
                    </button>

                </section>

            </main>

        </div>
    );
}

export default Settings;    