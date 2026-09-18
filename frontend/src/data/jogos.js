// =====================================================
// CATÁLOGO CENTRAL DE JOGOS / ELOS / FUNÇÕES
// Usado pelo perfil para montar os seletores e as capas.
// As imagens de elo vêm de ../assets/elos/<pasta>/* e as
// funções de ../assets/funcoes/* (carregadas via Vite glob).
// =====================================================

import bannerPadrao from "../assets/profile/banner.png";
import fotoPadrao from "../assets/profile/profile-photo.png";
import lolProfile from "../assets/profile/lol-profile.png";
import valorantProfile from "../assets/profile/valorant-profile.png";
import csProfile from "../assets/profile/cs-profile.png";

// =====================================================
// IMAGENS (GLOB)
// =====================================================

const capaModules = import.meta.glob(
  "../assets/games/*",
  { eager: true, query: "?url", import: "default" }
);

const eloModules = import.meta.glob(
  "../assets/elos/*/*",
  { eager: true, query: "?url", import: "default" }
);

const funcaoModules = import.meta.glob(
  "../assets/funcoes/*",
  { eager: true, query: "?url", import: "default" }
);

// =====================================================
// HELPERS
// =====================================================

function baseDoArquivo(caminho) {
  const arquivo = caminho.split("/").pop() || "";

  return arquivo.replace(/\.[^.]+$/, "").trim();
}

function procurarUrl(modulos, sufixo) {
  const alvo = sufixo.toLowerCase();

  const chave = Object.keys(modulos).find(
    (caminho) =>
      caminho.toLowerCase().endsWith(alvo)
  );

  return chave ? modulos[chave] : null;
}

function capa(arquivo) {
  return procurarUrl(capaModules, `/${arquivo.toLowerCase()}`);
}

// =====================================================
// NOMES BONITOS PARA OS ELOS
// =====================================================

const CORRECOES = {
  dima: "Diamante",
  brozne: "Bronze",
  grao: "Grão-Mestre",
  "grao mestre": "Grão-Mestre",
  "grao campeao": "Grão-Campeão",
  vallhallan: "Valhalla",
  ssl: "Supersonic Legend",
  sem: "Sem Rank",
  se: "Prata Elite",
  s1: "Prata 1",
  s2: "Prata 2",
  s3: "Prata 3",
  s4: "Prata 4",
  gn1: "Ouro Nova 1",
  gn2: "Ouro Nova 2",
  gn3: "Ouro Nova 3",
  gnm: "Ouro Nova Mestre",
  ak1: "AK 1",
  ak2: "AK 2",
  xerife: "Xerife",
  "ak cruzada": "AK Cruzada",
  aguia1: "Águia 1",
  aguia2: "Águia 2",
  global: "Global Elite"
};

const MINUSCULAS = ["de", "da", "do", "das", "dos", "e"];

function nomeBonito(valor) {
  const chave = valor.toLowerCase().trim();

  if (CORRECOES[chave]) {
    return CORRECOES[chave];
  }

  return chave
    .split(" ")
    .map((palavra) =>
      MINUSCULAS.includes(palavra)
        ? palavra
        : palavra.charAt(0).toUpperCase() + palavra.slice(1)
    )
    .join(" ");
}

// =====================================================
// ELOS AGRUPADOS POR PASTA
// =====================================================

const elosPorPasta = {};

Object.entries(eloModules).forEach(([caminho, url]) => {
  const partes = caminho.split("/");

  const pasta = partes[partes.length - 2];

  const valor = baseDoArquivo(caminho);

  if (!elosPorPasta[pasta]) {
    elosPorPasta[pasta] = {};
  }

  // Evita duplicados (mesmo nome, arquivos diferentes)
  if (!elosPorPasta[pasta][valor]) {
    elosPorPasta[pasta][valor] = {
      valor,
      nome: nomeBonito(valor),
      imagem: url
    };
  }
});

function elosDaPasta(pasta) {
  if (!pasta || !elosPorPasta[pasta]) {
    return [];
  }

  return Object.values(elosPorPasta[pasta]).sort((a, b) =>
    a.nome.localeCompare(b.nome, "pt-BR")
  );
}

// =====================================================
// FUNÇÕES
// =====================================================

function funcao(nome, chave) {
  return {
    valor: chave,
    nome,
    imagem: chave
      ? procurarUrl(funcaoModules, `/${chave.toLowerCase()}.png`)
      : null
  };
}

// =====================================================
// JOGOS
// =====================================================

export const JOGOS = [
  {
    id: "lol",
    nome: "League of Legends",
    capa: capa("lol.png"),
    pastaElo: "lol",
    funcoes: [
      funcao("Top", "top"),
      funcao("Jungle", "jungle"),
      funcao("Mid", "mid"),
      funcao("ADC", "adc"),
      funcao("Suporte", "sup")
    ]
  },
  {
    id: "valorant",
    nome: "Valorant",
    capa: capa("valorant.png"),
    pastaElo: "valorant",
    funcoes: [
      funcao("Duelista", "duelista"),
      funcao("Iniciador", "iniciador"),
      funcao("Controlador", "controlador"),
      funcao("Sentinela", "sentinela"),
      funcao("Vanguarda", "vanguarda")
    ]
  },
  {
    id: "cs",
    nome: "Counter-Strike 2",
    capa: capa("cs2.png"),
    pastaElo: "cs",
    funcoes: [
      funcao("AWPer", "awper"),
      funcao("Entry", "entry"),
      funcao("Lurker", "lurker"),
      funcao("Suporte", "support"),
      funcao("IGL", "leader")
    ]
  },
  {
    id: "dota",
    nome: "Dota 2",
    capa: capa("dota2.png"),
    pastaElo: "dota",
    funcoes: [
      funcao("Carry", "carry dota"),
      funcao("Mid", "mid dota"),
      funcao("Off Lane", "off lane dota"),
      funcao("Soft Support", "soft support dota"),
      funcao("Hard Support", "hard support dota")
    ]
  },
  {
    id: "wild",
    nome: "League of Legends Wild Rift",
    capa: capa("lolw.png"),
    pastaElo: "wild rift",
    funcoes: [
      funcao("Top", "top"),
      funcao("Jungle", "jungle"),
      funcao("Mid", "mid"),
      funcao("ADC", "adc"),
      funcao("Suporte", "sup")
    ]
  },
  {
    id: "over",
    nome: "Overwatch",
    capa: capa("oww.png"),
    pastaElo: "over",
    funcoes: [
      funcao("Tank", "tank over"),
      funcao("Dano", "dano over"),
      funcao("Suporte", "support over")
    ]
  },
  {
    id: "marvel",
    nome: "Marvel Rivals",
    capa: capa("rivals.png"),
    pastaElo: "marvel",
    funcoes: [
      funcao("Vanguarda", "tank marvel"),
      funcao("Duelista", "duelista"),
      funcao("Estrategista", "strategista")
    ]
  },
  {
    id: "dbd",
    nome: "Dead By Daylight",
    capa: capa("dbd.png"),
    pastaElo: "dbd",
    funcoes: [
      funcao("Sobrevivente"),
      funcao("Assassino")
    ]
  },
  {
    id: "fort",
    nome: "Fortnite",
    capa: capa("fort.png"),
    pastaElo: "fortnite",
    funcoes: [
      funcao("Construtor"),
      funcao("Atirador"),
      funcao("Suporte")
    ]
  },
  {
    id: "paladins",
    nome: "Paladins",
    capa: capa("paladins.png"),
    pastaElo: "paladins",
    funcoes: [
      funcao("Tank", "tank paladins"),
      funcao("Dano", "dano paladins"),
      funcao("Suporte", "sup")
    ]
  },
  {
    id: "rocket",
    nome: "Rocket League",
    capa: capa("rocket.png"),
    pastaElo: "rocket",
    funcoes: [
      funcao("Atacante"),
      funcao("Meio-campo"),
      funcao("Defensor")
    ]
  },
  {
    id: "sea",
    nome: "Sea of Thieves",
    capa: capa("sea.png"),
    pastaElo: null,
    funcoes: [
      funcao("Capitão"),
      funcao("Timoneiro"),
      funcao("Atirador")
    ]
  },
  {
    id: "team",
    nome: "Team Fortress 2",
    capa: capa("team.png"),
    pastaElo: "team",
    funcoes: [
      funcao("Scout"),
      funcao("Soldier"),
      funcao("Pyro"),
      funcao("Demoman"),
      funcao("Heavy"),
      funcao("Engineer"),
      funcao("Medic"),
      funcao("Sniper"),
      funcao("Spy")
    ]
  },
  {
    id: "brawl",
    nome: "Brawlhalla",
    capa: capa("brawl.png"),
    pastaElo: "brawl",
    funcoes: [
      funcao("Lenda"),
      funcao("Arma")
    ]
  },
  {
    id: "warzone",
    nome: "Warzone",
    capa: capa("warzone.png"),
    pastaElo: "warzone",
    funcoes: [
      funcao("Assalto"),
      funcao("Suporte"),
      funcao("Recon"),
      funcao("Engenheiro")
    ]
  },
  {
    id: "r6",
    nome: "Rainbow Six Siege",
    capa: capa("r6.png"),
    pastaElo: "r6",
    funcoes: [
      funcao("Entry", "entry"),
      funcao("Suporte", "support"),
      funcao("Sentinela", "sentinela"),
      funcao("Flanco", "flanco"),
      funcao("IGL", "leader")
    ]
  }
];

// =====================================================
// BANNERS PRONTOS
// =====================================================

export const BANNERS = [
  { valor: bannerPadrao, nome: "Padrão" },
  { valor: lolProfile, nome: "League of Legends" },
  { valor: valorantProfile, nome: "Valorant" },
  { valor: csProfile, nome: "Counter-Strike" }
];

export const BANNER_PADRAO = bannerPadrao;

export const FOTO_PADRAO = fotoPadrao;

// =====================================================
// CONSULTAS
// =====================================================

export function obterJogo(id) {
  return JOGOS.find((jogo) => jogo.id === id) || null;
}

const NOMES_RELACIONADOS = {
  "cs": "Counter-Strike 2",
  "csgo": "Counter-Strike 2",
  "cs:go": "Counter-Strike 2",
  "counter strike": "Counter-Strike 2",
  "overwatch 2": "Overwatch",
  "ow2": "Overwatch",
  "rainbow six": "Rainbow Six Siege",
  "r6": "Rainbow Six Siege",
  "wild rift": "League of Legends Wild Rift",
  "sea of thieves": "Sea of Thieves",
  "tf2": "Team Fortress 2",
  "dbd": "Dead By Daylight",
  "marvel rivals": "Marvel Rivals"
};

export function obterJogoPorNome(nome) {
  if (!nome) {
    return null;
  }

  const alvo = String(nome).toLowerCase().trim();

  const direto = JOGOS.find(
    (jogo) => jogo.nome.toLowerCase() === alvo
  );

  if (direto) {
    return direto;
  }

  const relacionado = NOMES_RELACIONADOS[alvo];

  if (relacionado) {
    return JOGOS.find(
      (jogo) => jogo.nome.toLowerCase() === relacionado.toLowerCase()
    ) || null;
  }

  return null;
}

export function elosDoJogo(id) {
  const jogo = obterJogo(id);

  return elosDaPasta(jogo?.pastaElo);
}

export function funcoesDoJogo(id) {
  return obterJogo(id)?.funcoes || [];
}
