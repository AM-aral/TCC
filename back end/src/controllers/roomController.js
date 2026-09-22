const Room = require("../models/Room");

// ==============================
// TAMANHO DA SALA PELO NOME DO TIME
// ==============================

const tamanhos = {
    "DUO": 2,
    "TRIO": 3,
    "SQUAD": 4,
    "5V5": 5,
    "2V2": 2,
    "3V3": 3
};


// ==============================
// POPULAR SALA (LOBBY)
// ==============================

const populacoes = [
    { path: "criador", select: "nome foto apelido" },
    { path: "jogadores", select: "nome foto apelido" },
    { path: "pedidos", select: "nome foto apelido" }
];


// ==============================
// CRIAR SALA
// ==============================

const criar = async (req, res) => {
    try {
        const {
            jogo,
            nome,
            descricao,
            modo,
            time,
            elo,
            funcao,
            genero,
            maxJogadores
        } = req.body;

        if (!jogo || !nome) {
            return res.status(400).json({
                mensagem: "Informe o jogo e o nome da sala."
            });
        }

        const tamanho =
            Number(maxJogadores) ||
            tamanhos[time] ||
            2;

        const sala = await Room.create({
            jogo,
            nome,
            descricao: descricao || "",
            modo: modo || "",
            time: time || "",
            elo: elo || "",
            funcao: funcao || "",
            genero: genero || "",
            maxJogadores: tamanho,
            criador: req.usuario.id,
            jogadores: [req.usuario.id]
        });

        const salaPopulada = await sala.populate([
            { path: "criador", select: "nome foto" },
            { path: "jogadores", select: "nome foto" }
        ]);

        res.status(201).json({
            mensagem: "Sala criada com sucesso!",
            sala: salaPopulada
        });

    } catch (erro) {
        console.error("Erro ao criar sala:", erro);

        res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
};


// ==============================
// LISTAR SALAS DE UM JOGO
// ==============================

const listar = async (req, res) => {
    try {
        const { jogo, q, status } = req.query;

        const filtro = {};

        if (jogo) {
            filtro.jogo = jogo;
        }

        if (status) {
            filtro.status = status;
        } else {
            filtro.status = "aberta";
        }

        if (q && q.trim()) {
            const termo = q.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

            const regex = new RegExp(termo, "i");

            filtro.$or = [
                { nome: regex },
                { descricao: regex },
                { jogo: regex }
            ];
        }

        const salas = await Room.find(filtro)
            .populate("criador", "nome foto")
            .populate("jogadores", "nome foto")
            .sort({ createdAt: -1 });

        res.json(salas);

    } catch (erro) {
        console.error("Erro ao listar salas:", erro);

        res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
};


// ==============================
// DETALHES DA SALA (LOBBY)
// ==============================

const obter = async (req, res) => {
    try {
        const sala = await Room.findById(req.params.id).populate(populacoes);

        if (!sala) {
            return res.status(404).json({
                mensagem: "Sala não encontrada."
            });
        }

        res.json(sala);

    } catch (erro) {
        console.error("Erro ao buscar sala:", erro);

        res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
};


// ==============================
// PEDIR PARA ENTRAR NA SALA
// ==============================

const pedir = async (req, res) => {
    try {
        const sala = await Room.findById(req.params.id);

        if (!sala) {
            return res.status(404).json({
                mensagem: "Sala não encontrada."
            });
        }

        if (sala.status !== "aberta") {
            return res.status(400).json({
                mensagem: "Essa sala não está mais aberta."
            });
        }

        const userId = req.usuario.id;

        const jaMembro = sala.jogadores.some(
            (id) => id.toString() === userId
        );

        if (jaMembro) {
            return res.status(400).json({
                mensagem: "Você já está nessa sala."
            });
        }

        const jaPediu = sala.pedidos.some(
            (id) => id.toString() === userId
        );

        if (jaPediu) {
            return res.status(400).json({
                mensagem: "Você já pediu para entrar. Aguarde o líder aprovar."
            });
        }

        if (sala.jogadores.length >= sala.maxJogadores) {
            return res.status(400).json({
                mensagem: "A sala já está cheia."
            });
        }

        if (!sala.pedidos) {
            sala.pedidos = [];
        }

        sala.pedidos.push(userId);

        await sala.save();

        await sala.populate(populacoes);

        res.json({
            mensagem: "Pedido enviado! Aguarde o líder aprovar.",
            sala
        });

    } catch (erro) {
        console.error("Erro ao pedir entrada na sala:", erro);

        res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
};


// ==============================
// LÍDER APROVA PEDIDO
// ==============================

const aprovar = async (req, res) => {
    try {
        const sala = await Room.findById(req.params.id);

        if (!sala) {
            return res.status(404).json({
                mensagem: "Sala não encontrada."
            });
        }

        if (sala.criador.toString() !== req.usuario.id) {
            return res.status(403).json({
                mensagem: "Só o líder pode aprovar pedidos."
            });
        }

        if (!sala.pedidos) {
            sala.pedidos = [];
        }

        const alvo = req.params.usuarioId;

        if (!sala.pedidos.some((id) => id.toString() === alvo)) {
            return res.status(400).json({
                mensagem: "Esse pedido não existe mais."
            });
        }

        if (sala.jogadores.length >= sala.maxJogadores) {
            return res.status(400).json({
                mensagem: "A sala já está cheia."
            });
        }

        sala.pedidos = sala.pedidos.filter(
            (id) => id.toString() !== alvo
        );

        sala.jogadores.push(alvo);

        await sala.save();

        await sala.populate(populacoes);

        res.json({
            mensagem: "Jogador aprovado e adicionado à sala!",
            sala
        });

    } catch (erro) {
        console.error("Erro ao aprovar pedido:", erro);

        res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
};


// ==============================
// LÍDER RECUSA PEDIDO
// ==============================

const recusar = async (req, res) => {
    try {
        const sala = await Room.findById(req.params.id);

        if (!sala) {
            return res.status(404).json({
                mensagem: "Sala não encontrada."
            });
        }

        if (sala.criador.toString() !== req.usuario.id) {
            return res.status(403).json({
                mensagem: "Só o líder pode recusar pedidos."
            });
        }

        if (!sala.pedidos) {
            sala.pedidos = [];
        }

        const alvo = req.params.usuarioId;

        sala.pedidos = sala.pedidos.filter(
            (id) => id.toString() !== alvo
        );

        await sala.save();

        await sala.populate(populacoes);

        res.json({
            mensagem: "Pedido recusado.",
            sala
        });

    } catch (erro) {
        console.error("Erro ao recusar pedido:", erro);

        res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
};


// ==============================
// CANCELAR O PRÓPRIO PEDIDO
// ==============================

const cancelarPedido = async (req, res) => {
    try {
        const sala = await Room.findById(req.params.id);

        if (!sala) {
            return res.status(404).json({
                mensagem: "Sala não encontrada."
            });
        }

        if (!sala.pedidos) {
            sala.pedidos = [];
        }

        sala.pedidos = sala.pedidos.filter(
            (id) => id.toString() !== req.usuario.id
        );

        await sala.save();

        await sala.populate(populacoes);

        res.json({
            mensagem: "Seu pedido foi cancelado.",
            sala
        });

    } catch (erro) {
        console.error("Erro ao cancelar pedido:", erro);

        res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
};


// ==============================
// ENTRAR NA SALA
// ==============================

const entrar = async (req, res) => {
    try {
        const sala = await Room.findById(req.params.id);

        if (!sala) {
            return res.status(404).json({
                mensagem: "Sala não encontrada."
            });
        }

        const jaEsta = sala.jogadores.some(
            (id) => id.toString() === req.usuario.id
        );

        if (jaEsta) {
            return res.status(400).json({
                mensagem: "Você já está nessa sala."
            });
        }

        if (sala.jogadores.length >= sala.maxJogadores) {
            return res.status(400).json({
                mensagem: "A sala já está cheia."
            });
        }

        sala.jogadores.push(req.usuario.id);

        if (sala.pedidos) {
            sala.pedidos = sala.pedidos.filter(
                (id) => id.toString() !== req.usuario.id
            );
        }

        await sala.save();

        await sala.populate([
            { path: "criador", select: "nome foto" },
            { path: "jogadores", select: "nome foto" }
        ]);

        res.json({
            mensagem: "Você entrou na sala!",
            sala
        });

    } catch (erro) {
        console.error("Erro ao entrar na sala:", erro);

        res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
};


// ==============================
// SAIR DA SALA
// ==============================

const sair = async (req, res) => {
    try {
        const sala = await Room.findById(req.params.id);

        if (!sala) {
            return res.status(404).json({
                mensagem: "Sala não encontrada."
            });
        }

        // Se o líder sair, a sala é excluída
        if (sala.criador.toString() === req.usuario.id) {
            await sala.deleteOne();

            return res.json({
                mensagem: "Você saiu e a sala foi excluída.",
                sala: null
            });
        }

        sala.jogadores = sala.jogadores.filter(
            (id) => id.toString() !== req.usuario.id
        );

        await sala.save();

        await sala.populate([
            { path: "criador", select: "nome foto" },
            { path: "jogadores", select: "nome foto" }
        ]);

        res.json({
            mensagem: "Você saiu da sala.",
            sala
        });

    } catch (erro) {
        console.error("Erro ao sair da sala:", erro);

        res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
};


// ==============================
// MINHAS SALAS (HISTÓRICO)
// ==============================

const minhas = async (req, res) => {
    try {
        const salas = await Room.find({
            $or: [
                { criador: req.usuario.id },
                { jogadores: req.usuario.id }
            ]
        })
            .populate("criador", "nome foto")
            .populate("jogadores", "nome foto")
            .sort({ createdAt: -1 });

        res.json(salas);

    } catch (erro) {
        console.error("Erro ao listar salas do usuário:", erro);

        res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
};


// ==============================
// ALTERAR STATUS (CRIADOR)
// ==============================

const STATUS_VALIDOS = ["aberta", "concluida", "cancelada"];

const atualizarStatus = async (req, res) => {
    try {
        const sala = await Room.findById(req.params.id);

        if (!sala) {
            return res.status(404).json({
                mensagem: "Sala não encontrada."
            });
        }

        if (sala.criador.toString() !== req.usuario.id) {
            return res.status(403).json({
                mensagem: "Só o criador pode alterar o status da sala."
            });
        }

        const { status } = req.body;

        if (!STATUS_VALIDOS.includes(status)) {
            return res.status(400).json({
                mensagem: "Status inválido."
            });
        }

        sala.status = status;

        await sala.save();

        await sala.populate([
            { path: "criador", select: "nome foto" },
            { path: "jogadores", select: "nome foto" }
        ]);

        res.json({
            mensagem: "Status da sala atualizado!",
            sala
        });

    } catch (erro) {
        console.error("Erro ao alterar status da sala:", erro);

        res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
};


// ==============================
// DELETAR SALA
// ==============================

const deletar = async (req, res) => {
    try {
        const sala = await Room.findById(req.params.id);

        if (!sala) {
            return res.status(404).json({
                mensagem: "Sala não encontrada."
            });
        }

        if (sala.criador.toString() !== req.usuario.id) {
            return res.status(403).json({
                mensagem: "Só o criador pode apagar a sala."
            });
        }

        await sala.deleteOne();

        res.json({
            mensagem: "Sala apagada."
        });

    } catch (erro) {
        console.error("Erro ao deletar sala:", erro);

        res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
};


module.exports = {
    criar,
    listar,
    obter,
    entrar,
    sair,
    pedir,
    aprovar,
    recusar,
    cancelarPedido,
    deletar,
    minhas,
    atualizarStatus
};
