const Feedback = require("../models/Feedback");
const User = require("../models/User");

// ==============================
// ENVIAR FEEDBACK
// ==============================

const criar = async (req, res) => {
    try {
        const { destinatario, jogo, nota, comentario } = req.body;

        if (!destinatario) {
            return res.status(400).json({
                mensagem: "Escolha o jogador que será avaliado."
            });
        }

        if (String(destinatario) === String(req.usuario.id)) {
            return res.status(400).json({
                mensagem: "Você não pode avaliar você mesmo."
            });
        }

        const notaNum = Number(nota);

        if (!Number.isInteger(notaNum) || notaNum < 1 || notaNum > 5) {
            return res.status(400).json({
                mensagem: "A nota deve ser entre 1 e 5 estrelas."
            });
        }

        const alvo = await User.findById(destinatario);

        if (!alvo) {
            return res.status(404).json({
                mensagem: "Jogador não encontrado."
            });
        }

        const feedback = await Feedback.create({
            remetente: req.usuario.id,
            destinatario,
            jogo: jogo || "",
            nota: notaNum,
            comentario: comentario || ""
        });

        await feedback.populate([
            { path: "remetente", select: "nome foto apelido email" },
            { path: "destinatario", select: "nome foto apelido email" }
        ]);

        res.status(201).json({
            mensagem: "Feedback enviado!",
            feedback
        });

    } catch (erro) {
        console.error("Erro ao enviar feedback:", erro);

        res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
};


// ==============================
// LISTAR MEUS FEEDBACKS
// ==============================

const listar = async (req, res) => {
    try {
        const recebidos = await Feedback.find({
            destinatario: req.usuario.id
        })
            .populate("remetente", "nome foto apelido email")
            .sort({ createdAt: -1 });

        const dados = await Feedback.find({
            remetente: req.usuario.id
        })
            .populate("destinatario", "nome foto apelido email")
            .sort({ createdAt: -1 });

        const mediaRecebida = recebidos.length
            ? recebidos.reduce((soma, f) => soma + f.nota, 0) / recebidos.length
            : 0;

        res.json({
            recebidos,
            dados,
            mediaRecebida: Math.round(mediaRecebida * 10) / 10
        });

    } catch (erro) {
        console.error("Erro ao listar feedbacks:", erro);

        res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
};


// ==============================
// EDITAR FEEDBACK (SOMENTE REMETENTE)
// ==============================

const atualizar = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);

        if (!feedback) {
            return res.status(404).json({
                mensagem: "Feedback não encontrado."
            });
        }

        if (feedback.remetente.toString() !== req.usuario.id) {
            return res.status(403).json({
                mensagem: "Só quem enviou o feedback pode editá-lo."
            });
        }

        const { nota, comentario } = req.body;

        if (nota !== undefined) {
            const notaNum = Number(nota);

            if (!Number.isInteger(notaNum) || notaNum < 1 || notaNum > 5) {
                return res.status(400).json({
                    mensagem: "A nota deve ser entre 1 e 5 estrelas."
                });
            }

            feedback.nota = notaNum;
        }

        if (comentario !== undefined) {
            feedback.comentario = String(comentario || "");
        }

        await feedback.save();

        await feedback.populate([
            { path: "remetente", select: "nome foto apelido email" },
            { path: "destinatario", select: "nome foto apelido email" }
        ]);

        res.json({
            mensagem: "Feedback atualizado!",
            feedback
        });

    } catch (erro) {
        console.error("Erro ao editar feedback:", erro);

        res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
};


// ==============================
// EXCLUIR FEEDBACK (SOMENTE REMETENTE)
// ==============================

const deletar = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);

        if (!feedback) {
            return res.status(404).json({
                mensagem: "Feedback não encontrado."
            });
        }

        if (feedback.remetente.toString() !== req.usuario.id) {
            return res.status(403).json({
                mensagem: "Só quem enviou o feedback pode excluí-lo."
            });
        }

        await feedback.deleteOne();

        res.json({
            mensagem: "Feedback excluído."
        });

    } catch (erro) {
        console.error("Erro ao excluir feedback:", erro);

        res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
};


module.exports = {
    criar,
    listar,
    atualizar,
    deletar
};