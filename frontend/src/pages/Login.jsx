import { useState } from "react";
import "./Login.css";

import { supabase } from "../supabase";

import hero from "../assets/hero.png";
import logo from "../assets/logo.png";

import discord from "../assets/discord.png";
import google from "../assets/google.png";
import twitch from "../assets/twitch.png";

import emailIcon from "../assets/email.png";
import userIcon from "../assets/user.png";
import lockIcon from "../assets/lock.png";


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
  // LOGIN COM SUPABASE
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

      // Login usando Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: senha
      });


      // Se o Supabase retornar erro
      if (error) {

        console.error("Erro no login:", error);

        setErro(
          "Email ou senha incorretos."
        );

        return;
      }


      // Verifica se o usuário realmente foi encontrado
      if (!data.user) {

        setErro(
          "Não foi possível realizar o login."
        );

        return;
      }


      // Guarda os dados básicos do usuário
      localStorage.setItem(
        "usuario",
        JSON.stringify(data.user)
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
        "Não foi possível conectar ao Supabase."
      );

    } finally {

      setCarregando(false);

    }
  };


  // =====================================================
  // CADASTRO COM SUPABASE
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


      // Cria o usuário no Supabase Auth
      const { data, error } = await supabase.auth.signUp({

        email: email,

        password: senha,

        options: {
          data: {
            nome: usuario
          }
        }

      });


      // Se houver erro
      if (error) {

        console.error("Erro no cadastro:", error);

        setErro(
          error.message || "Não foi possível cadastrar."
        );

        return;
      }


      console.log(
        "Usuário criado:",
        data.user
      );


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
        "Não foi possível conectar ao Supabase."
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