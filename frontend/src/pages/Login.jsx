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


const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";


function Login({ onLogin }) {

  const [modoCadastro, setModoCadastro] = useState(false);

  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);


  // =====================================================
  // TROCAR PARA LOGIN
  // =====================================================

  const abrirLogin = () => {
    setErro("");
    setMensagem("");
    setModoCadastro(false);
  };


  // =====================================================
  // TROCAR PARA CADASTRO
  // =====================================================

  const abrirCadastro = () => {
    setErro("");
    setMensagem("");
    setModoCadastro(true);
  };


  // =====================================================
  // LOGIN COM O BACKEND
  // =====================================================

  const fazerLogin = async (e) => {

    e.preventDefault();

    setErro("");
    setMensagem("");

    if (!email || !senha) {
      setErro("Preencha o email e a senha.");
      return;
    }

    try {

      setCarregando(true);

      const resposta = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, senha })
      });

      const dados = await resposta.json();


      // Se o backend retornar erro
      if (!resposta.ok) {

        console.error("Erro no login:", dados);

        setErro(
          dados.mensagem || "Email ou senha incorretos."
        );

        return;
      }


      // Guarda o token e os dados básicos do usuário
      localStorage.setItem("token", dados.token);

      localStorage.setItem(
        "usuario",
        JSON.stringify(dados.usuario)
      );


      setMensagem(
        "Login realizado com sucesso!"
      );


      // Vai para o sistema
      setTimeout(() => {

        onLogin();

      }, 500);


    } catch (erro) {

      console.error(erro);

      setErro(
        "Não foi possível conectar ao servidor."
      );

    } finally {

      setCarregando(false);

    }
  };


  // =====================================================
  // CADASTRO COM O BACKEND
  // =====================================================

  const fazerCadastro = async (e) => {

    e.preventDefault();

    setErro("");
    setMensagem("");


    if (!usuario || !email || !senha) {

      setErro(
        "Preencha todos os campos."
      );

      return;
    }


    if (senha.length < 6) {

      setErro(
        "A senha precisa ter pelo menos 6 caracteres."
      );

      return;
    }


    try {

      setCarregando(true);


      // Cria o usuário no backend (MongoDB)
      const resposta = await fetch(`${API_URL}/auth/cadastro`, {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          nome: usuario,
          email,
          senha
        })

      });

      const dados = await resposta.json();


      // Se houver erro
      if (!resposta.ok) {

        console.error("Erro no cadastro:", dados);

        setErro(
          dados.mensagem || "Não foi possível cadastrar."
        );

        return;
      }


      // =================================================
      // CADASTRO REALIZADO
      // =================================================

      setMensagem(
        "Cadastro realizado! Agora faça login."
      );


      // Limpa senha
      setSenha("");


      // Depois volta para Login
      setTimeout(() => {

        setModoCadastro(false);

        setMensagem("");

      }, 1000);


    } catch (erro) {

      console.error(erro);

      setErro(
        "Não foi possível conectar ao servidor."
      );

    } finally {

      setCarregando(false);

    }
  };


  return (

    <div className="login-page">

      {/* FUNDO */}

      <div
        className="hero-background"
        style={{
          backgroundImage: `url(${hero})`
        }}
      />

      <div className="background-overlay"></div>


      {/* CONTAINER */}

      <main className="login-container">

        <img
          src={logo}
          alt="LFG"
          className="logo"
        />


        {/* =================================================
            ABAS
        ================================================= */}

        <div className="login-tabs">

          <button
            type="button"
            className={`tab ${!modoCadastro ? "active" : ""}`}
            onClick={abrirLogin}
          >
            LOGIN
          </button>


          <button
            type="button"
            className={`tab ${modoCadastro ? "active" : ""}`}
            onClick={abrirCadastro}
          >
            CADASTRAR
          </button>

        </div>


        {/* =================================================
            REDES SOCIAIS
        ================================================= */}

        <div className="social-buttons">

          <button
            className="social-button discord"
            type="button"
          >
            <img
              src={discord}
              alt="Discord"
            />
          </button>


          <button
            className="social-button google"
            type="button"
          >
            <img
              src={google}
              alt="Google"
            />
          </button>


          <button
            className="social-button twitch"
            type="button"
          >
            <img
              src={twitch}
              alt="Twitch"
            />
          </button>

        </div>


        {/* =================================================
            DIVISOR
        ================================================= */}

        <div className="divider">

          <span></span>

          <p>
            OU USE EMAIL
          </p>

          <span></span>

        </div>


        {/* =================================================
            FORMULÁRIO
        ================================================= */}

        <form
          className={`login-form ${
            modoCadastro ? "cadastro-form" : ""
          }`}
          onSubmit={
            modoCadastro
              ? fazerCadastro
              : fazerLogin
          }
        >


          {/* EMAIL */}

          <div className="input-box">

            <img
              src={emailIcon}
              alt=""
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />

          </div>


          {/* USUÁRIO */}

          {modoCadastro && (

            <div className="input-box">

              <img
                src={userIcon}
                alt=""
              />

              <input
                type="text"
                placeholder="Usuário"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                autoComplete="username"
              />

            </div>

          )}


          {/* SENHA */}

          <div className="input-box">

            <img
              src={lockIcon}
              alt=""
            />

            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete={
                modoCadastro
                  ? "new-password"
                  : "current-password"
              }

            />

          </div>


          {/* =================================================
              ERRO
          ================================================= */}

          {erro && (

            <p className="login-error">
              {erro}
            </p>

          )}


          {/* =================================================
              SUCESSO
          ================================================= */}

          {mensagem && (

            <p className="login-success">
              {mensagem}
            </p>

          )}


          {/* =================================================
              BOTÃO
          ================================================= */}

          <button
            className="enter-button"
            type="submit"
            disabled={carregando}
          >

            {carregando

              ? modoCadastro
                ? "CADASTRANDO..."
                : "ENTRANDO..."

              : modoCadastro
                ? "CADASTRAR"
                : "ENTRAR"

            }

          </button>

        </form>


        {/* =================================================
            TERMOS
        ================================================= */}

        <label className="terms">

          <input
            type="checkbox"
          />

          <span>

            Eu aceito todos os{" "}

            <a href="#">
              termos de serviço
            </a>

            {" "}e{" "}

            <a href="#">
              política de privacidade
            </a>

          </span>

        </label>

      </main>

    </div>
  );
}


export default Login;