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
        const { jogo } = req.query;

        const filtro = jogo ? { jogo } : {};

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
    entrar,
    sair,
    deletar,
    minhas,
    atualizarStatus
};
