const express = require("express");

const router = express.Router();

const {
    buscar,
    perfil
} = require("../controllers/usuarioController");


// Buscar jogadores (público)
router.get("/", buscar);


// Perfil público de um jogador (público)
router.get("/:id", perfil);


module.exports = router;