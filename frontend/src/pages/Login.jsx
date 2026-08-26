import { useState } from "react";
import "./Login.css";

import hero from "../assets/hero.png";
import logo from "../assets/logo.png";

import discord from "../assets/discord.png";
import google from "../assets/google.png";
import twitch from "../assets/twitch.png";

import emailIcon from "../assets/email.png";
import userIcon from "../assets/user.png";
import lockIcon from "../assets/lock.png";

function Login({ irParaHome }) {
    const [modo, setModo] = useState("login");

    return (
        <div className="login-page">

            {/* Imagem de fundo */}
            <div
                className="hero-background"
                style={{
                    backgroundImage: `url(${hero})`,
                }}
            />

            {/* Degradê */}
            <div className="background-overlay"></div>

            {/* Conteúdo */}
            <main className="login-container">

                {/* Logo */}
                <img
                    src={logo}
                    alt="LFG"
                    className="logo"
                />

                {/* Abas */}
                <div className="login-tabs">

                    <button
                        className={`tab ${modo === "login" ? "active" : ""}`}
                        onClick={() => setModo("login")}
                    >
                        LOGIN
                    </button>

                    <button
                        className={`tab ${modo === "cadastro" ? "active" : ""}`}
                        onClick={() => setModo("cadastro")}
                    >
                        CADASTRAR
                    </button>

                </div>

                {/* Botões sociais */}
                <div className="social-buttons">

                    <button className="social-button discord">
                        <img src={discord} alt="Discord" />
                    </button>

                    <button className="social-button google">
                        <img src={google} alt="Google" />
                    </button>

                    <button className="social-button twitch">
                        <img src={twitch} alt="Twitch" />
                    </button>

                </div>

                {/* Divisor */}
                <div className="divider">
                    <span></span>
                    <p>OU USE EMAIL</p>
                    <span></span>
                </div>

                {/* Formulário */}
                <div className="login-form">

                    {/* Email */}
                    <div className="input-container">
                        <img
                            src={emailIcon}
                            alt=""
                            className="input-icon"
                        />

                        <input
                            type="email"
                            placeholder="Email"
                        />
                    </div>

                    {/* Usuário */}
                    <div className="input-container">
                        <img
                            src={userIcon}
                            alt=""
                            className="input-icon"
                        />

                        <input
                            type="text"
                            placeholder="Usuário"
                        />
                    </div>

                    {/* Senha */}
                    <div className="input-container">
                        <img
                            src={lockIcon}
                            alt=""
                            className="input-icon"
                        />

                        <input
                            type="password"
                            placeholder="Senha"
                        />
                    </div>

                    {/* Confirmar senha - aparece só no cadastro */}
                    {modo === "cadastro" && (
                        <div className="input-container">
                            <img
                                src={lockIcon}
                                alt=""
                                className="input-icon"
                            />

                            <input
                                type="password"
                                placeholder="Confirmar senha"
                            />
                        </div>
                    )}

                </div>

                {/* Botão principal */}
                <button
                    className="enter-button"
                    onClick={irParaHome}
                >
                    {modo === "login" ? "ENTRAR" : "CADASTRAR"}
                </button>

                {/* Termos */}
                <label className="terms">

                    <input type="checkbox" />

                    <span>
                        Eu aceito todos os{" "}
                        <a href="#">termos de serviço</a>
                        {" "}e{" "}
                        <a href="#">política de privacidade</a>
                    </span>

                </label>

            </main>

        </div>
    );
}

export default Login;