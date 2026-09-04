import { useState } from "react";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import CreateRoom from "./pages/CreateRoom";
import Profile from "./pages/Profile";

function App() {
  const [pagina, setPagina] = useState("login");
  const [jogoSelecionado, setJogoSelecionado] = useState(null);

  return (
    <>
      {/* LOGIN */}
      {pagina === "login" && (
        <Login
          onLogin={() => {
            setPagina("home");
          }}
        />
      )}

      {/* HOME */}
      {pagina === "home" && (
        <Home
          onSelectGame={(game) => {
            setJogoSelecionado(game);
            setPagina("rooms");
          }}
          onProfile={() => {
            setPagina("profile");
          }}
        />
      )}

      {/* ROOMS */}
      {pagina === "rooms" && (
        <Rooms
          game={jogoSelecionado}
          onHome={() => {
            setPagina("home");
          }}
          onCreateRoom={() => {
            setPagina("create-room");
          }}
          onProfile={() => {
            setPagina("profile");
          }}
        />
      )}

      {/* CRIAR SALA */}
      {pagina === "create-room" && (
        <CreateRoom
          game={jogoSelecionado}
          onBack={() => {
            setPagina("rooms");
          }}
          onProfile={() => {
            setPagina("profile");
          }}
        />
      )}

      {/* PERFIL */}
      {pagina === "profile" && (
        <Profile
          onHome={() => {
            setPagina("home");
          }}
        />
      )}
    </>
  );
}

export default App;