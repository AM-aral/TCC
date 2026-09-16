import { useState, useEffect } from "react";
import { supabase } from "./supabase";

console.log("Supabase:", supabase);

import Login from "./pages/Login";
import Home from "./pages/Home";

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
// ⚠️ Por enquanto só o CreateRoom do LoL, Brawlhalla, Valorant e
// Fortnite estão prontos de verdade. Os outros arquivos
// xxxCreateRoom.jsx existem na pasta mas ainda estão
// vazios/incompletos (sem "export default"), e importar um
// arquivo desses quebra o site inteiro (foi o erro que você
// teve com o brawlCreateRoom.jsx antes de terminá-lo).
//
// Conforme for terminando cada CreateRoom, faça 2 coisas aqui:
//   1) adicione o import dele junto com os de baixo
//   2) troque o "null" correspondente no GAME_COMPONENTS pelo
//      componente importado
//
// Exemplo pra quando terminar o da Dota:
//   import DotaCreateRoom from "./pages/dotaCreateRoom";
//   ... e no mapa: "Dota 2": { Room: DotaRooms, CreateRoom: DotaCreateRoom },

import LolCreateRoom from "./pages/lolCreateRoom";
import BrawlCreateRoom from "./pages/brawlCreateRoom";
import ValorantCreateRoom from "./pages/valCreateRoom";
import FortniteCreateRoom from "./pages/fortCreateRoom";

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
    "Counter-Strike 2": { Room: CSRoom, CreateRoom: null },
    "Dota 2": { Room: DotaRooms, CreateRoom: null },
    "League of Legends Wild Rift": { Room: WildRoom, CreateRoom: null },
    "Overwatch": { Room: OverRoom, CreateRoom: null },
    "Marvel Rivals": { Room: MarvelRoom, CreateRoom: null },
    "Dead By Daylight": { Room: DbdRoom, CreateRoom: null },
    "Fortnite": { Room: FortRoom, CreateRoom: FortniteCreateRoom },
    "Paladins": { Room: PaladinsRoom, CreateRoom: null },
    "Rocket League": { Room: RocketRoom, CreateRoom: null },
    "Sea of Thieves": { Room: SeaRoom, CreateRoom: null },
    "Team Fortress 2": { Room: TeamRoom, CreateRoom: null },
    "Brawlhalla": { Room: BrawlRoom, CreateRoom: BrawlCreateRoom },
    "Warzone": { Room: WarzoneRoom, CreateRoom: null },
    "Rainbow Six Siege": { Room: R6Room, CreateRoom: null },
};


function App() {

    // =====================================================
    // ESTADOS
    // =====================================================

    const [pagina, setPagina] = useState("home");

    const [jogoSelecionado, setJogoSelecionado] = useState(null);


    // =====================================================
    // TESTE SUPABASE
    // =====================================================

    useEffect(() => {

        async function testarSupabase() {

            const { data, error } = await supabase
                .from("jogos")
                .select("*")
                .limit(1);

            console.log("Dados do Supabase:", data);
            console.log("Erro do Supabase:", error);
        }

        testarSupabase();

    }, []);


    // =====================================================
    // LOGIN
    // =====================================================

    const entrarNoSite = () => {

        setPagina("home");

    };


    // =====================================================
    // LOGOUT
    // =====================================================

    const sairDaConta = async () => {

        try {

            const { error } = await supabase.auth.signOut();

            if (error) {

                console.error(
                    "Erro ao sair do Supabase:",
                    error
                );

            }

        } catch (error) {

            console.error(
                "Erro ao fazer logout:",
                error
            );

        }

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