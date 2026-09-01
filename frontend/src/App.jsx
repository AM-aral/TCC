import { useState } from "react";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";

function App() {
  const [pagina, setPagina] = useState("login");
  const [jogoSelecionado, setJogoSelecionado] = useState(null);

  return (
    <>
      {pagina === "login" && (
        <Login
          onLogin={() => setPagina("home")}
        />
      )}

      {pagina === "home" && (
        <Home
          onSelectGame={(game) => {
            setJogoSelecionado(game);
            setPagina("rooms");
          }}
        />
      )}

      {pagina === "rooms" && (
        <Rooms
          game={jogoSelecionado}
        />
      )}
    </>
  );
}

export default App;