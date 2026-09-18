const User = require("../models/User");
const Feedback = require("../models/Feedback");

const CAMPOS_PUBLICOS =
    "nome apelido email foto banner descricao tags preferencias jogos";

// ==============================
// RESUMO DAS AVALIAÇÕES
// ==============================

const resumoAvaliacoes = async (usuarioId) => {
    const feedbacks = await Feedback.find({
        destinatario: usuarioId
    });

    const distribuicao = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    let soma = 0;

    feedbacks.forEach((feedback) => {
        distribuicao[feedback.nota] =
            (distribuicao[feedback.nota] || 0) + 1;

        soma += feedback.nota;
    });

    return {
        media: feedbacks.length
            ? Math.round((soma / feedbacks.length) * 10) / 10
            : 0,
        total: feedbacks.length,
        distribuicao
    };
};


// ==============================
// BUSCAR JOGADORES
// ==============================

const buscar = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || !q.trim()) {
            return res.json([]);
        }

        const termo = q.trim();

        const regex = new RegExp(
            termo.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
            "i"
        );

        const usuarios = await User.find({
            $or: [
                { nome: regex },
                { apelido: regex },
                { email: regex }
            ]
        })
            .select(CAMPOS_PUBLICOS)
            .sort({ nome: 1 })
            .limit(12);

        res.json(usuarios);

    } catch (erro) {
        console.error("Erro ao buscar jogadores:", erro);

        res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
};


// ==============================
// PERFIL PÚBLICO DE UM JOGADOR
// ==============================

const perfil = async (req, res) => {
    try {
        const usuario = await User
            .findById(req.params.id)
            .select(CAMPOS_PUBLICOS);

        if (!usuario) {
            return res.status(404).json({
                mensagem: "Jogador não encontrado."
            });
        }

        const avaliacao = await resumoAvaliacoes(usuario._id);

        const feedbacks = await Feedback
            .find({ destinatario: usuario._id })
            .populate("remetente", "nome apelido foto email")
            .sort({ createdAt: -1 })
            .limit(10);

        res.json({
            usuario,
            avaliacao,
            feedbacks
        });

    } catch (erro) {
        console.error("Erro ao carregar perfil público:", erro);

        res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
};


module.exports = {
    buscar,
    perfil
};