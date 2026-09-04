import "./Profile.css";

function Profile() {
  return (
    <div className="profile-page">

      {/* BARRA SUPERIOR */}
      <header className="top-bar">
        <div className="logo">LFGP</div>

        <div className="games">
          <span>◉ OW</span>
          <span>♟ CS</span>
          <span>◈ Val</span>
          <span>F Fortnite</span>
          <span>◉ RL</span>
          <span>◈ Dota</span>
          <span>≋ Rivals</span>
          <span>▣ LoL</span>
        </div>
      </header>

      {/* MENU LATERAL */}
      <aside className="sidebar">
        <div className="side-icon">▦</div>

        {/* PERFIL */}
        <div
          className="side-icon profile-icon"
          onClick={() => window.location.href = "/profile"}
        >
          👤
        </div>

        <div className="side-icon">↶</div>
        <div className="side-icon">▤</div>
        <div className="side-icon">⚙</div>
      </aside>

      {/* CONTEÚDO */}
      <main className="profile-content">

        {/* BANNER / CABEÇALHO */}
        <section className="profile-header">

          {/* FOTO */}
          <div className="profile-photo">
            <img
              src="/images/profile.png"
              alt="Foto de perfil"
            />
          </div>

          <div className="profile-info">
            <div className="online">
              <span></span> ONLINE
            </div>

            <h1>TENEBROSO_DA_CINTURA_TORTA</h1>

            <h3>@SEJMELO</h3>

            <p>Competitivo, mas pela resenha.</p>

            <div className="profile-tags">
              <span>📅 Entrou em jan 15, 2024</span>
              <span>⭐ Avaliação: 4.7</span>
            </div>
          </div>

          {/* IMAGEM DO BANNER */}
          <div className="banner-image">
            <img
              src="/images/profile-banner.png"
              alt="Banner"
            />
          </div>

        </section>


        {/* MEUS JOGOS */}
        <section className="games-section">

          <h2>Meus Jogos</h2>

          <div className="games-container">

            {/* LEAGUE OF LEGENDS */}
            <div className="game-card">
              <img
                src="/images/lol.png"
                alt="League of Legends"
              />

              <div className="game-info">
                <span>Desafiante</span>
                <span>1467 LP</span>
              </div>

              <div className="game-bottom">
                <div>
                  <small>Rota Principal</small>
                  <strong>🛡️</strong>
                </div>

                <div>
                  <small>Rota Secundária</small>
                  <strong>⚔️</strong>
                </div>
              </div>
            </div>


            {/* VALORANT */}
            <div className="game-card">
              <img
                src="/images/valorant.png"
                alt="Valorant"
              />

              <div className="game-info">
                <span>Radiante</span>
                <span>Top 1 BR</span>
              </div>

              <div className="game-bottom">
                <div>
                  <small>Função Principal</small>
                  <strong>◈</strong>
                </div>

                <div>
                  <small>Rota Secundária</small>
                  <strong>✕</strong>
                </div>
              </div>
            </div>


            {/* CS */}
            <div className="game-card">
              <img
                src="/images/cs.png"
                alt="Counter Strike"
              />

              <div className="game-info">
                <span>Global Elite</span>
                <span>⭐</span>
              </div>

              <div className="game-bottom">
                <div>
                  <small>Função Principal</small>
                  <strong>🎯</strong>
                </div>

                <div>
                  <small>Disponibilidade</small>
                  <strong>🌙</strong>
                </div>
              </div>
            </div>

          </div>

        </section>


        {/* PARTE INFERIOR */}
        <section className="bottom-section">

          {/* SOBRE MIM */}
          <div className="info-box">
            <h2>👤 Sobre Mim</h2>

            <p>
              Gosto de jogar para vencer, mas o mais importante
              é me divertir e conhecer pessoas novas.
              Comunicação é tudo.
            </p>
          </div>


          {/* PREFERÊNCIAS */}
          <div className="info-box">
            <h2>💜 Preferências</h2>

            <div className="preferences">
              <span>🏆 Competitivo</span>
              <span>👥 Competitivo</span>
              <span>🎙️ Comunicação</span>
              <span>🤝 Respeito sempre</span>
            </div>
          </div>


          {/* ATIVIDADES */}
          <div className="info-box activities">
            <h2>↶ Atividades Recentes</h2>

            <div className="activity">
              <span>◈</span>
              Entrou em uma sala de Valorant
              <small>há 20 min</small>
            </div>

            <div className="activity">
              <span>▣</span>
              Entrou em uma sala de League of Legends
              <small>Ontem</small>
            </div>

            <div className="activity">
              <span>F</span>
              Entrou em uma sala de Fortnite
              <small>há 2 dias</small>
            </div>

          </div>

        </section>

      </main>
    </div>
  );
}

export default Profile;