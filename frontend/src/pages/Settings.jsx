
import { useState } from "react";

import "./Settings.css";

import { getContasSalvas, getUsuario, removerConta, getToken } from "../api";

import { FOTO_PADRAO } from "../data/jogos";

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
    onSelectGame,
    onBuscar,
    onTrocarConta
}) {

    const [contas, setContas] = useState(() => getContasSalvas());

    const usuario = getUsuario();

    const temToken = Boolean(getToken());

    const apelidoDe = (conta) => {
        const u = conta?.usuario || {};

        if (!u) {
            return "";
        }

        if (u.apelido) {
            return `@${u.apelido}`;
        }

        return `@${(u.email || "jogador").split("@")[0]}`;
    };

    const entrar = (contaId) => {
        if (typeof onTrocarConta === "function") {
            onTrocarConta(contaId);
        }
    };

    const excluir = (contaId) => {
        removerConta(contaId);

        setContas(getContasSalvas());
    };

    const contaAtualId = usuario?.id || null;

    const jogos = [
        { nome: "Overwatch", imagem: owIcon },
        { nome: "Counter-Strike 2", imagem: csIcon },
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

                    {/* HOME */}

                    <button
                        className="settings-sidebar-item"
                        onClick={onHome}
                        title="Início"
                        type="button"
                    >
                        <img
                            src={homeIcon}
                            alt="Início"
                        />
                    </button>


                    {/* PERFIL */}

                    <button
                        className="settings-sidebar-item"
                        onClick={onProfile}
                        title="Perfil"
                        type="button"
                    >
                        <img
                            src={perfilIcon}
                            alt="Perfil"
                        />
                    </button>


                    {/* BUSCAR */}

                    <button
                        className="settings-sidebar-item"
                        onClick={onBuscar}
                        title="Buscar"
                        type="button"
                    >
                        <span className="settings-buscar-icone">
                            ⌕
                        </span>
                    </button>


                    {/* HISTÓRICO */}

                    <button
                        className="settings-sidebar-item"
                        onClick={onHistory}
                        title="Histórico"
                        type="button"
                    >
                        <img
                            src={historicoIcon}
                            alt="Histórico"
                        />
                    </button>


                    {/* CONFIGURAÇÕES */}

                    <button
                        className="settings-sidebar-item active"
                        title="Configurações"
                        type="button"
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

            <nav className="profile-navbar">

                {/* LOGO */}

                <div className="profile-navbar-logo">

                    <img
                        src={logo}
                        alt="LFGP"
                    />

                </div>


                {/* JOGOS */}

                <div className="profile-games-navbar">

                    {jogos.map((jogo) => (

                        <div
                            key={jogo.nome}
                            className="profile-navbar-game"
                            onClick={() => {

                                if (onSelectGame) {
                                    onSelectGame(jogo.nome);
                                }

                            }}
                            title={jogo.nome}
                        >

                            <img
                                src={jogo.imagem}
                                alt={jogo.nome}
                            />

                            <span>
                                {jogo.nome.toUpperCase()}
                            </span>

                        </div>

                    ))}

                </div>

            </nav>


            {/* =========================
                CONTEÚDO
            ========================= */}

            <main className="settings-content">

                <div className="settings-header">

                    <h1>
                        Configurações
                    </h1>

                    <p>
                        Gerencie as configurações da sua conta.
                    </p>

                </div>


                {/* TROCAR DE CONTA */}

                <section className="settings-card settings-card-conta">

                    <div className="settings-card-info">

                        <h2>
                            Trocar de conta
                        </h2>

                        <p>
                            Você está com{" "}
                            <strong>
                                {usuario?.nome || "sua conta"}
                            </strong>
                            . Use outra conta salva para entrar
                            rapidamente.
                        </p>

                    </div>

                    <div className="settings-conta-acoes">

                        <span className="settings-conta-badge">
                            {temToken ? "Logada" : "Sem sessão"}
                        </span>

                    </div>

                </section>


                {/* LISTA DE CONTAS SALVAS */}

                {contas.length > 0 && (

                    <section className="settings-contas">

                        {contas.map((conta) => {

                            const u = conta.usuario || {};

                            const ehAtual =
                                String(conta.id) === String(contaAtualId);

                            return (

                                <div
                                    className={
                                        ehAtual
                                            ? "settings-conta-item atual"
                                            : "settings-conta-item"
                                    }
                                    key={conta.id}
                                >

                                    <span className="settings-conta-avatar">

                                        <img
                                            src={u.foto || FOTO_PADRAO}
                                            alt={u.nome}
                                        />

                                    </span>

                                    <div className="settings-conta-dados">

                                        <strong>
                                            {u.nome || "Jogador"}
                                        </strong>

                                        <span>
                                            {apelidoDe(conta)}
                                        </span>

                                    </div>

                                    {ehAtual ? (

                                        <span className="settings-conta-badge">
                                            Conta atual
                                        </span>

                                    ) : (

                                        <div className="settings-conta-acoes">

                                            <button
                                                type="button"
                                                className="settings-conta-entrar"
                                                onClick={() => entrar(conta.id)}
                                            >
                                                Entrar
                                            </button>

                                            <button
                                                type="button"
                                                className="settings-conta-remover"
                                                title="Remover conta salva"
                                                onClick={() => excluir(conta.id)}
                                            >
                                                ✕
                                            </button>

                                        </div>

                                    )}

                                </div>

                            );

                        })}

                    </section>

                )}


                {/* ENTRAR EM OUTRA CONTA */}

                <section className="settings-card">

                    <div className="settings-card-info">

                        <h2>
                            Entrar em outra conta
                        </h2>

                        <p>
                            Crie ou faça login com outra conta.
                            As contas já usadas aqui ficam salvas
                            para troca rápida.
                        </p>

                    </div>


                    <button
                        className="settings-logout-button"
                        onClick={onLogout}
                        type="button"
                    >
                        Entrar com outra conta
                    </button>

                </section>


                {/* SAIR DA CONTA */}

                <section className="settings-card">

                    <div className="settings-card-info">

                        <h2>
                            Sair da conta
                        </h2>

                        <p>
                            Encerre sua sessão atual e volte para a tela
                            de login.
                        </p>

                    </div>


                    <button
                        className="settings-logout-button"
                        onClick={onLogout}
                        type="button"
                    >
                        Sair da conta
                    </button>

                </section>

            </main>

        </div>
    );
}

export default Settings;
