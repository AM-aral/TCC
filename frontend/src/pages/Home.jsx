import "./Home.css";
import valorant from "../assets/valorant.png";

function Home() {
  return (
    <div className="home-page">

      <div className="game-card">

        <img
          src={valorant}
          alt="Valorant"
        />

        <div className="game-overlay"></div>

        <span>VALORANT</span>

      </div>

    </div>
  );
}

export default Home;