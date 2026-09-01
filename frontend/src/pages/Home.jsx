import "./Home.css";

import logo from "../assets/logo.png";

/* IMAGENS DOS JOGOS */
import brawlImage from "../assets/games/brawl.png";
import cs2Image from "../assets/games/cs2.png";
import dbdImage from "../assets/games/dbd.png";
import dota2Image from "../assets/games/dota2.png";
import fortImage from "../assets/games/fort.png";
import lolImage from "../assets/games/lol.png";
import lolwImage from "../assets/games/lolw.png";
import owImage from "../assets/games/oww.png";
import paladinsImage from "../assets/games/paladins.png";
import r6Image from "../assets/games/r6.png";
import rivalsImage from "../assets/games/rivals.png";
import rocketImage from "../assets/games/rocket.png";
import seaImage from "../assets/games/sea.png";
import tf2Image from "../assets/games/team.png";
import valorantImage from "../assets/games/valorant.png";
import warzoneImage from "../assets/games/warzone.png";

/* LOGOS DOS JOGOS */
import brawlLogo from "../assets/games-icon/brawl icon.png";
import cs2Logo from "../assets/games-icon/cs2 icon.png";
import dbdLogo from "../assets/games-icon/dbd icon.png";
import dota2Logo from "../assets/games-icon/dota 2 icon.png";
import fortLogo from "../assets/games-icon/forticon.png";
import lolLogo from "../assets/games-icon/lol icon.png";
import lolwLogo from "../assets/games-icon/lolw icon.png";
import owLogo from "../assets/games-icon/ow icon.png";
import paladinsLogo from "../assets/games-icon/paladins icon.png";
import r6Logo from "../assets/games-icon/r6 icon.png";
import rivalsLogo from "../assets/games-icon/rivals icon.png";
import rocketLogo from "../assets/games-icon/rocket icon.png";
import seaLogo from "../assets/games-icon/sea icon.png";
import tf2Logo from "../assets/games-icon/TF2.png";
import valorantLogo from "../assets/games-icon/valoranticon.png";
import warzoneLogo from "../assets/games-icon/warzone icon.png";

function Home({ onSelectGame }) {

  const games = [

    {
      name: "League of Legends",
      image: lolImage,
      logo: lolLogo,
      color: "lol"
    },

    {
      name: "Valorant",
      image: valorantImage,
      logo: valorantLogo,
      color: "valorant"
    },

    {
      name: "Counter Strike 2",
      image: cs2Image,
      logo: cs2Logo,
      color: "cs2"
    },

    {
      name: "Dota 2",
      image: dota2Image,
      logo: dota2Logo,
      color: "dota2"
    },

    {
      name: "League of Legends Wild Rift",
      image: lolwImage,
      logo: lolwLogo,
      color: "lolw"
    },

    {
      name: "Overwatch",
      image: owImage,
      logo: owLogo,
      color: "ow"
    },

    {
      name: "Marvel Rivals",
      image: rivalsImage,
      logo: rivalsLogo,
      color: "rivals"
    },

    {
      name: "Dead By Daylight",
      image: dbdImage,
      logo: dbdLogo,
      color: "dbd"
    },

    {
      name: "Fortnite",
      image: fortImage,
      logo: fortLogo,
      color: "fort"
    },

    {
      name: "Paladins",
      image: paladinsImage,
      logo: paladinsLogo,
      color: "paladins"
    },

    {
      name: "Rocket League",
      image: rocketImage,
      logo: rocketLogo,
      color: "rocket"
    },

    {
      name: "Sea of Thieves",
      image: seaImage,
      logo: seaLogo,
      color: "sea"
    },

    {
      name: "Team Fortress 2",
      image: tf2Image,
      logo: tf2Logo,
      color: "tf2"
    },

    {
      name: "Brawlhalla",
      image: brawlImage,
      logo: brawlLogo,
      color: "brawl"
    },

    {
      name: "Warzone",
      image: warzoneImage,
      logo: warzoneLogo,
      color: "warzone"
    },

    {
      name: "Rainbow Six Siege",
      image: r6Image,
      logo: r6Logo,
      color: "r6"
    }

  ];

  return (
    <div className="home-page">

      <header className="home-header">

        <img
          src={logo}
          alt="LFG"
          className="home-logo"
        />

        <h1>
          Look For Group Presh
        </h1>

      </header>

      <section className="games-section">

        <div className="games-grid">

          {games.map((game) => (

            <button
              className="game-card"
              key={game.name}
              onClick={() => onSelectGame(game)}
            >

              <img
                src={game.image}
                alt={game.name}
                className="game-background"
              />

              <div
                className={`game-overlay ${game.color}`}
              ></div>

              <img
                src={game.logo}
                alt={game.name}
                className="game-logo"
              />

            </button>

          ))}

        </div>

      </section>

      <section className="features">

        <div className="feature">

          <div className="feature-icon proposito">
            P
          </div>

          <h2>
            Propósito
          </h2>

          <p>
            Plataforma web para conectar jogadores
            e formar equipes por interesses em comum.
          </p>

        </div>

        <div className="feature">

          <div className="feature-icon impacto">
            !
          </div>

          <h2>
            Impacto
          </h2>

          <p>
            Substitui o pareamento aleatório por
            amizades reais e jogos mais divertidos.
          </p>

        </div>

        <div className="feature">

          <div className="feature-icon funcionalidades">
            F
          </div>

          <h2>
            Funcionalidades
          </h2>

          <p>
            Perfil de usuário, criação de salas,
            filtro por jogo e comunicação.
          </p>

        </div>

      </section>

    </div>
  );
}

export default Home;