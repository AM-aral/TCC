import "./Login.css";

import hero from "../assets/hero.png";
import logo from "../assets/logo.png";

import discord from "../assets/discord.png";
import google from "../assets/google.png";
import twitch from "../assets/twitch.png";

import emailIcon from "../assets/email.png";
import userIcon from "../assets/user.png";
import lockIcon from "../assets/lock.png";

function Login({ onLogin }) {
  return (
    <div className="login-page">

      <div
        className="hero-background"
        style={{
          backgroundImage: `url(${hero})`,
        }}
      />

      <div className="background-overlay"></div>

      <main className="login-container">

        <img
          src={logo}
          alt="LFG"
          className="logo"
        />

        <div className="login-tabs">
          <button className="tab active">
            LOGIN
          </button>

          <button className="tab">
            CADASTRAR
          </button>
        </div>

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

        <div className="divider">
          <span></span>
          <p>OU USE EMAIL</p>
          <span></span>
        </div>

        <div className="login-form">

          <div className="input-box">
            <img src={emailIcon} alt="" />
            <input
              type="email"
              placeholder="Email"
            />
          </div>

          <div className="input-box">
            <img src={userIcon} alt="" />
            <input
              type="text"
              placeholder="Usuário"
            />
          </div>

          <div className="input-box">
            <img src={lockIcon} alt="" />
            <input
              type="password"
              placeholder="Senha"
            />
          </div>

        </div>

        {/* AGORA O BOTÃO MANDA PARA HOME */}
        <button
          className="enter-button"
          onClick={onLogin}
        >
          ENTRAR
        </button>

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