import { useState } from "react";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import CreateRoom from "./pages/CreateRoom";
import Profile from "./pages/Profile";
import History from "./pages/History";
import Feedbacks from "./pages/Feedbacks";
import Settings from "./pages/Settings";


function App() {

    // =====================================================
    // ESTADOS
    // =====================================================

    const [pagina, setPagina] = useState("login");

    const [jogoSelecionado, setJogoSelecionado] = useState(null);


    // =====================================================
    // LOGIN
    // =====================================================

    const entrarNoSite = () => {
        setPagina("home");
    };


    // =====================================================
    // LOGOUT
    // =====================================================

    const sairDaConta = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("usuario");

        setJogoSelecionado(null);

        setPagina("login");
    };


    // =====================================================
    // SELECIONAR JOGO
    // =====================================================

    const selecionarJogo = (game) => {

        console.log("Jogo selecionado:", game);

        // Guarda o jogo selecionado
        setJogoSelecionado(game);

        // Vai para a tela de salas
        setPagina("rooms");
    };


    // =====================================================
    // FEEDBACKS
    // =====================================================

    const irParaFeedbacks = () => {
        setPagina("feedbacks");
    };


    // =====================================================
    // LOGIN
    // =====================================================

    if (pagina === "login") {

        return (
            <Login
                onLogin={entrarNoSite}
            />
        );
    }


    // =====================================================
    // HOME
    // =====================================================

    if (pagina === "home") {

        return (
            <Home

                onSelectGame={selecionarJogo}

                onProfile={() => setPagina("profile")}

                onHistory={() => setPagina("history")}

                onFeedbacks={irParaFeedbacks}

                onSettings={() => setPagina("settings")}

            />
        );
    }


    // =====================================================
    // ROOMS
    // =====================================================

    if (pagina === "rooms") {

        return (
            <Rooms

                game={jogoSelecionado}

                onHome={() => setPagina("home")}

                onCreateRoom={() => setPagina("create-room")}

                onProfile={() => setPagina("profile")}

                onHistory={() => setPagina("history")}

                onFeedbacks={irParaFeedbacks}

                onSettings={() => setPagina("settings")}

                /*
                 * IMPORTANTE:
                 * Permite trocar de jogo pela navbar
                 * da página Rooms.
                 */
                onSelectGame={selecionarJogo}

            />
        );
    }


    // =====================================================
    // CREATE ROOM
    // =====================================================

    if (pagina === "create-room") {

        return (
            <CreateRoom

                game={jogoSelecionado}

                /*
                 * Voltar para as salas
                 */
                onBack={() => setPagina("rooms")}

                /*
                 * Perfil
                 */
                onProfile={() => setPagina("profile")}

                /*
                 * Histórico
                 */
                onHistory={() => setPagina("history")}

                /*
                 * Feedbacks
                 */
                onFeedbacks={irParaFeedbacks}

                /*
                 * Configurações
                 */
                onSettings={() => setPagina("settings")}

                /*
                 * IMPORTANTE:
                 * Permite trocar o jogo pela navbar.
                 */
                onGameSelect={selecionarJogo}

            />
        );
    }


    // =====================================================
    // PROFILE
    // =====================================================

    if (pagina === "profile") {

        return (
            <Profile

                onHome={() => setPagina("home")}

                onProfile={() => setPagina("profile")}

                onHistory={() => setPagina("history")}

                onFeedbacks={irParaFeedbacks}

                onSettings={() => setPagina("settings")}

                onSelectGame={selecionarJogo}

            />
        );
    }


    // =====================================================
    // HISTORY
    // =====================================================

    if (pagina === "history") {

        return (
            <History

                onHome={() => setPagina("home")}

                onProfile={() => setPagina("profile")}

                onHistory={() => setPagina("history")}

                onFeedbacks={irParaFeedbacks}

                onSettings={() => setPagina("settings")}

                /*
                 * IMPORTANTE:
                 * É isso que faz o LoL da navbar
                 * ir para Rooms.
                 */
                onGameSelect={selecionarJogo}

            />
        );
    }


    // =====================================================
    // FEEDBACKS
    // =====================================================

    if (pagina === "feedbacks") {

        return (
            <Feedbacks

                onHome={() => setPagina("home")}

                onProfile={() => setPagina("profile")}

                onHistory={() => setPagina("history")}

                onFeedbacks={irParaFeedbacks}

                onSettings={() => setPagina("settings")}

                onSelectGame={selecionarJogo}

            />
        );
    }


    // =====================================================
    // SETTINGS
    // =====================================================

    if (pagina === "settings") {

        return (
            <Settings

                onHome={() => setPagina("home")}

                onProfile={() => setPagina("profile")}

                onHistory={() => setPagina("history")}

                onFeedbacks={irParaFeedbacks}

                onSettings={() => setPagina("settings")}

                onSelectGame={selecionarJogo}

                onLogout={sairDaConta}

            />
        );
    }


    // =====================================================
    // FALLBACK
    // =====================================================

    return (
        <Login
            onLogin={entrarNoSite}
        />
    );
}


export default App;