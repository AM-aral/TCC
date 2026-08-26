import "./Login.css";
import hero from "../assets/hero.png";
import logo from "../assets/logo.png";

function Login() {
  return (
    <div className="login-page">

      {/* Fundo com os jogos */}
      <div
        className="hero-background"
        style={{
          backgroundImage: `url(${hero})`,
        }}
      />

      {/* Escurecimento do fundo */}
      <div className="background-overlay" />

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
          <button className="tab active">
            LOGIN
          </button>

          <button className="tab">
            CADASTRAR
          </button>
        </div>

        {/* Redes sociais */}
        <div className="social-buttons">

          <button className="social-button discord">
            Discord
          </button>

          <button className="social-button google">
            Google
          </button>

          <button className="social-button twitch">
            Twitch
          </button>

        </div>

        {/* Divisor */}
        <div className="divider">
          <span></span>
          <p>OU USE EMAIL</p>
          <span></span>
        </div>

        {/* Inputs */}
        <div className="login-form">

          <div className="input-container">
            <span className="input-icon">✉</span>

            <input
              type="email"
              placeholder="Email"
            />
          </div>

          <div className="input-container">
            <span className="input-icon">👤</span>

            <input
              type="text"
              placeholder="Usuário"
            />
          </div>

          <div className="input-container">
            <span className="input-icon">🔒</span>

            <input
              type="password"
              placeholder="Senha"
            />
          </div>

          <button className="enter-button">
            ENTRAR
          </button>

          {/* Termos */}
          <label className="terms">
            <input type="checkbox" />

            <span>
              Eu aceito todos os{" "}
              <a href="#">termos de serviço</a>{" "}
              e{" "}
              <a href="#">política de privacidade</a>
            </span>
          </label>

        </div>

      </main>

    </div>
  );
}

export default Login;