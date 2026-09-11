
import { useState } from "react";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import CreateRoom from "./pages/CreateRoom";
import Profile from "./pages/Profile";
import History from "./pages/History";
import Feedbacks from "./pages/Feedbacks";


function App() {

  const [pagina, setPagina] = useState("login");

  const [jogoSelecionado, setJogoSelecionado] = useState(null);


  function irParaRooms(jogo = null) {

    if (jogo) {
      setJogoSelecionado(jogo);
    }

    setPagina("rooms");
  }


  function irParaFeedbacks() {
    setPagina("feedbacks");
  }


  return (
    <>

      {/* =====================================================
          LOGIN
      ===================================================== */}

      {pagina === "login" && (

        <Login
          onLogin={() => {
            setPagina("home");
          }}
        />

      )}


      {/* =====================================================
          HOME
      ===================================================== */}

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


      {/* =====================================================
          ROOMS
      ===================================================== */}

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

          onHistory={() => {
            setPagina("history");
          }}

          onFeedbacks={irParaFeedbacks}

        />

      )}


      {/* =====================================================
          CREATE ROOM
      ===================================================== */}

      {pagina === "create-room" && (

        <CreateRoom

          game={jogoSelecionado}

          onBack={() => {
            setPagina("rooms");
          }}

          onProfile={() => {
            setPagina("profile");
          }}

          onHistory={() => {
            setPagina("history");
          }}

          onFeedbacks={irParaFeedbacks}

        />

      )}


      {/* =====================================================
          PROFILE
      ===================================================== */}

      {pagina === "profile" && (

        <Profile

          onHome={() => {
            setPagina("home");
          }}

          onHistory={() => {
            setPagina("history");
          }}

          onFeedbacks={irParaFeedbacks}

        />

      )}


      {/* =====================================================
          HISTORY
      ===================================================== */}

      {pagina === "history" && (

        <History

          onHome={() => {
            setPagina("home");
          }}

          onProfile={() => {
            setPagina("profile");
          }}

          onHistory={() => {
            setPagina("history");
          }}

          onFeedbacks={irParaFeedbacks}

          onGameSelect={irParaRooms}

        />

      )}


      {/* =====================================================
          FEEDBACKS
      ===================================================== */}

      {pagina === "feedbacks" && (

        <Feedbacks

          onHome={() => {
            setPagina("home");
          }}

          onProfile={() => {
            setPagina("profile");
          }}

          onHistory={() => {
            setPagina("history");
          }}

          onFeedbacks={irParaFeedbacks}

          onGameSelect={irParaRooms}

        />

      )}

    </>
  );
}


export default App;

