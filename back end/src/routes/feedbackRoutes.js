const express = require("express");

const router = express.Router();

const autenticar = require("../middleware/auth");

const {
    criar,
    listar,
    atualizar,
    deletar
} = require("../controllers/feedbackController");


// Listar meus feedbacks (logado)
router.get("/", autenticar, listar);


// Enviar feedback (logado)
router.post("/", autenticar, criar);


// Editar feedback (somente o remetente)
router.put("/:id", autenticar, atualizar);


// Excluir feedback (somente o remetente)
router.delete("/:id", autenticar, deletar);


module.exports = router;