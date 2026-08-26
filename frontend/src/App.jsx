import { useState } from "react";

import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  const [pagina, setPagina] = useState("login");

  return (
    <>
      {pagina === "login" && (
        <Login irParaHome={() => setPagina("home")} />
      )}

      {pagina === "home" && <Home />}
    </>
  );
}

export default App;