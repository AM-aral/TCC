const express = require("express");

const router = express.Router();

const autenticar = require("../middleware/auth");

const {
    criar,
    listar,
    entrar,
    sair,
    deletar,
    minhas,
    atualizarStatus
} = require("../controllers/roomController");


// Listar salas (público)
router.get("/", listar);


// Minhas salas / histórico (logado)
router.get("/minhas", autenticar, minhas);


// Criar sala (logado)
router.post("/", autenticar, criar);


// Entrar / sair da sala (logado)
router.post("/:id/entrar", autenticar, entrar);

router.post("/:id/sair", autenticar, sair);


// Alterar status da sala (logado, só o criador)
router.put("/:id/status", autenticar, atualizarStatus);


// Deletar sala (logado, só o criador)
router.delete("/:id", autenticar, deletar);


module.exports = router;