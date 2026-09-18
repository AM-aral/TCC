import { useState } from "react";

import { getToken, trocarConta as trocarContaSalva } from "./api";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Buscar from "./pages/Buscar";
import PublicProfile from "./pages/PublicProfile";

// =====================================================
// ROOMS
// =====================================================

import LolRooms from "./pages/lolRooms";
import ValRoom from "./pages/valRoom";
import CSRoom from "./pages/csRoom";
import DotaRooms from "./pages/dotaRoom";
import OverRoom from "./pages/overRoom";
import FortRoom from "./pages/fortRoom";
import RocketRoom from "./pages/rocketRoom";
import MarvelRoom from "./pages/marvelRoom";
import WildRoom from "./pages/wildRoom";
import DbdRoom from "./pages/dbdRoom";
import PaladinsRoom from "./pages/paladinsRoom";
import SeaRoom from "./pages/seaRoom";
import TeamRoom from "./pages/teamRoom";
import BrawlRoom from "./pages/brawlRoom";
import WarzoneRoom from "./pages/warzoneRoom";
import R6Room from "./pages/r6Room";

// =====================================================
// CREATE ROOM
// =====================================================
//
// ✅ Agora todos os CreateRoom estão prontos e importados.
// Conforme criar um jogo novo no futuro, faça 2 coisas aqui:
//   1) adicione o import dele junto com os de baixo
//   2) troque o "null" correspondente no GAME_COMPONENTS pelo
//      componente importado

import LolCreateRoom from "./pages/lolCreateRoom";
import BrawlCreateRoom from "./pages/brawlCreateRoom";
import ValorantCreateRoom from "./pages/valCreateRoom";
import FortniteCreateRoom from "./pages/fortCreateRoom";
import TeamCreateRoom from "./pages/teamCreateRoom";
import RocketCreateRoom from "./pages/rocketCreateRoom";
import OverCreateRoom from "./pages/overCreateRoom";
import CSCreateRoom from "./pages/csCreateRoom";
import MarvelCreateRoom from "./pages/marvelCreateRoom";
import DotaCreateRoom from "./pages/dotaCreateRoom";
import WildCreateRoom from "./pages/wildCreateRoom";
import DbdCreateRoom from "./pages/dbdCreateRoom";
import PaladinsCreateRoom from "./pages/paladinsCreateRoom";
import SeaCreateRoom from "./pages/seaCreateRoom";
import WarzoneCreateRoom from "./pages/warzoneCreateRoom";
import R6CreateRoom from "./pages/r6CreateRoom";

// =====================================================
// OUTRAS PÁGINAS
// =====================================================

import Profile from "./pages/Profile";
import History from "./pages/History";
import Feedbacks from "./pages/Feedbacks";
import Settings from "./pages/Settings";


// =====================================================
// MAPA DE JOGOS -> COMPONENTES
// A chave (key) TEM que ser exatamente igual ao "name"
// que aparece no array `games` do Home.jsx e nas chamadas
// onSelectGame("...") dentro das navbars das Rooms.
// =====================================================

const GAME_COMPONENTS = {
    "League of Legends": { Room: LolRooms, CreateRoom: LolCreateRoom },
    "Valorant": { Room: ValRoom, CreateRoom: ValorantCreateRoom },
    "Counter-Strike 2": { Room: CSRoom, CreateRoom: CSCreateRoom },
    "Dota 2": { Room: DotaRooms, CreateRoom: DotaCreateRoom },
    "League of Legends Wild Rift": { Room: WildRoom, CreateRoom: WildCreateRoom },
    "Overwatch": { Room: OverRoom, CreateRoom: OverCreateRoom },
    "Marvel Rivals": { Room: MarvelRoom, CreateRoom: MarvelCreateRoom },
    "Dead By Daylight": { Room: DbdRoom, CreateRoom: DbdCreateRoom },
    "Fortnite": { Room: FortRoom, CreateRoom: FortniteCreateRoom },
    "Paladins": { Room: PaladinsRoom, CreateRoom: PaladinsCreateRoom },
    "Rocket League": { Room: RocketRoom, CreateRoom: RocketCreateRoom },
    "Sea of Thieves": { Room: SeaRoom, CreateRoom: SeaCreateRoom },
    "Team Fortress 2": { Room: TeamRoom, CreateRoom: TeamCreateRoom },
    "Brawlhalla": { Room: BrawlRoom, CreateRoom: BrawlCreateRoom },
    "Warzone": { Room: WarzoneRoom, CreateRoom: WarzoneCreateRoom },
    "Rainbow Six Siege": { Room: R6Room, CreateRoom: R6CreateRoom },
};


function App() {

    // =====================================================
    // ESTADOS
    // =====================================================

    const [pagina, setPagina] = useState(
        getToken() ? "home" : "login"
    );

    const [jogoSelecionado, setJogoSelecionado] = useState(null);

    // Visita ao perfil público de outro jogador
    const [perfilVisita, setPerfilVisita] = useState(null);

    // Termo inicial passado para a página Buscar
    const [termoBusca, setTermoBusca] = useState("");


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
    // O Home.jsx manda o OBJETO inteiro { name, image, logo, color }.
    // As navbars das Rooms mandam só uma STRING ("Valorant" etc).
    // Por isso guardamos o valor como veio e resolvemos o nome
    // na hora de renderizar (função obterNomeJogo).
    // =====================================================

    const selecionarJogo = (game) => {

        console.log("Jogo selecionado:", game);

        setJogoSelecionado(game);

        setPagina("rooms");

    };


    function obterNomeJogo(jogo) {

        return typeof jogo === "string" ? jogo : jogo?.name;

    }


    // =====================================================
    // NAVEGAÇÃO
    // =====================================================

    const irParaHome = () => {

        setPagina("home");

    };


    const irParaPerfil = () => {

        setPagina("profile");

    };


    const irParaHistorico = () => {

        setPagina("history");

    };


    const irParaFeedbacks = () => {

        setPagina("feedbacks");

    };


    const irParaConfiguracoes = () => {

        setPagina("settings");

    };


    const irParaBuscar = (termo = "") => {

        setTermoBusca(
            typeof termo === "string" ? termo : ""
        );

        setPagina("buscar");

    };


    // =====================================================
    // PERFIL PÚBLICO
    // Abre o perfil de outro jogador. Se já estávamos vendo
    // um perfil, guarda o anterior para o "Voltar" funcionar.
    // =====================================================

    const abrirPerfil = (id) => {

        setPerfilVisita((atual) => ({

            id,

            anteriorId: atual?.id || null,

            origem: atual?.origem || pagina

        }));

        setPagina("public-profile");

    };


    const voltarDoPerfil = () => {

        if (perfilVisita?.anteriorId) {

            setPerfilVisita({
                id: perfilVisita.anteriorId,
                anteriorId: null,
                origem: perfilVisita.origem
            });

            return;
        }

        const origem = perfilVisita?.origem || "home";

        setPerfilVisita(null);

        setPagina(origem);

    };


    // =====================================================
    // TROCA DE CONTA
    // =====================================================

    const trocarConta = (contaId) => {

        if (trocarContaSalva(contaId)) {

            setPerfilVisita(null);

            setJogoSelecionado(null);

            setPagina("home");

        }

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

                onProfile={irParaPerfil}

                onHistory={irParaHistorico}

                onFeedbacks={irParaFeedbacks}

                onSettings={irParaConfiguracoes}

                onBuscar={irParaBuscar}

            />
        );

    }


    // =====================================================
    // BUSCAR
    // =====================================================

    if (pagina === "buscar") {

        return (
            <Buscar

                termoInicial={termoBusca}

                onHome={irParaHome}

                onProfile={irParaPerfil}

                onHistory={irParaHistorico}

                onFeedbacks={irParaFeedbacks}

                onSettings={irParaConfiguracoes}

                onSelectGame={selecionarJogo}

                onVerPerfil={abrirPerfil}

                onVerSala={(sala) =>
                    selecionarJogo(sala.jogo)
                }

            />
        );

    }


    // =====================================================
    // PERFIL PÚBLICO
    // =====================================================

    if (pagina === "public-profile") {

        return (
            <PublicProfile

                perfilId={perfilVisita?.id}

                onHome={irParaHome}

                onProfile={irParaPerfil}

                onHistory={irParaHistorico}

                onFeedbacks={irParaFeedbacks}

                onSettings={irParaConfiguracoes}

                onBuscar={irParaBuscar}

                onGameSelect={selecionarJogo}

                onVerPerfil={abrirPerfil}

                onVoltar={voltarDoPerfil}

            />
        );

    }


    // =====================================================
    // ROOMS
    // =====================================================

    if (pagina === "rooms") {

        const nomeJogo = obterNomeJogo(jogoSelecionado);

        const config = GAME_COMPONENTS[nomeJogo];

        // Se o jogo não estiver no mapa (ou não tiver Room ainda),
        // cai no LolRooms como fallback só pra não quebrar a tela.
        const RoomComponent = config?.Room ?? LolRooms;

        return (
            <RoomComponent

                game={nomeJogo}

                onHome={irParaHome}

                onCreateRoom={() =>
                    setPagina("create-room")
                }

                onProfile={irParaPerfil}

                onHistory={irParaHistorico}

                onFeedbacks={irParaFeedbacks}

                onSettings={irParaConfiguracoes}

                onSelectGame={selecionarJogo}

            />
        );

    }


    // =====================================================
    // CREATE ROOM
    // =====================================================

    if (pagina === "create-room") {

        const nomeJogo = obterNomeJogo(jogoSelecionado);

        const config = GAME_COMPONENTS[nomeJogo];

        // Antes isso caía sempre no LolCreateRoom quando não achava
        // o jogo no mapa. Agora só cai no LoL como último recurso
        // se o jogo realmente não tiver CreateRoom nenhum ainda.
        const CreateRoomComponent = config?.CreateRoom ?? LolCreateRoom;

        return (
            <CreateRoomComponent

                game={nomeJogo}

                // Voltar para as salas
                onBack={() =>
                    setPagina("rooms")
                }

                // Perfil
                onProfile={irParaPerfil}

                // Histórico
                onHistory={irParaHistorico}

                // Feedbacks
                onFeedbacks={irParaFeedbacks}

                // Configurações
                onSettings={irParaConfiguracoes}

                // Trocar jogo pela navbar
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

                onHome={irParaHome}

                onProfile={irParaPerfil}

                onHistory={irParaHistorico}

                onFeedbacks={irParaFeedbacks}

                onSettings={irParaConfiguracoes}

                onGameSelect={selecionarJogo}

                onBuscar={irParaBuscar}

            />
        );

    }


    // =====================================================
    // HISTORY
    // =====================================================

    if (pagina === "history") {

        return (
            <History

                onHome={irParaHome}

                onProfile={irParaPerfil}

                onHistory={irParaHistorico}

                onFeedbacks={irParaFeedbacks}

                onSettings={irParaConfiguracoes}

                onGameSelect={selecionarJogo}

                onBuscar={irParaBuscar}

            />
        );

    }


    // =====================================================
    // FEEDBACKS
    // =====================================================

    if (pagina === "feedbacks") {

        return (
            <Feedbacks

                onHome={irParaHome}

                onProfile={irParaPerfil}

                onHistory={irParaHistorico}

                onFeedbacks={irParaFeedbacks}

                onSettings={irParaConfiguracoes}

                onSelectGame={selecionarJogo}

                onBuscar={irParaBuscar}

            />
        );

    }


    // =====================================================
    // SETTINGS
    // =====================================================

    if (pagina === "settings") {

        return (
            <Settings

                onHome={irParaHome}

                onProfile={irParaPerfil}

                onHistory={irParaHistorico}

                onFeedbacks={irParaFeedbacks}

                onSettings={irParaConfiguracoes}

                onSelectGame={selecionarJogo}

                onLogout={sairDaConta}

                onBuscar={irParaBuscar}

                onTrocarConta={trocarConta}

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