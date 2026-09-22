const express = require("express");

const router = express.Router();

const autenticar = require("../middleware/auth");

const {
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
} = require("../controllers/roomController");


// Listar salas (público)
router.get("/", listar);


// Minhas salas / histórico (logado)
router.get("/minhas", autenticar, minhas);


// Criar sala (logado)
router.post("/", autenticar, criar);


// Detalhes de uma sala (lobby)
router.get("/:id", obter);


// Pedir para entrar na sala (logado)
router.post("/:id/pedir", autenticar, pedir);


// Cancelar pedido de entrada (logado)
router.post("/:id/pedidos/cancelar", autenticar, cancelarPedido);


// Líder aprova / recusa um pedido de entrada (logado)
router.post("/:id/pedidos/:usuarioId/aprovar", autenticar, aprovar);

router.post("/:id/pedidos/:usuarioId/recusar", autenticar, recusar);


// Entrar / sair da sala (logado)
router.post("/:id/entrar", autenticar, entrar);

router.post("/:id/sair", autenticar, sair);


// Alterar status da sala (logado, só o criador)
router.put("/:id/status", autenticar, atualizarStatus);


// Deletar sala (logado, só o criador)
router.delete("/:id", autenticar, deletar);


module.exports = router;