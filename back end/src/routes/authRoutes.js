const express = require("express");

const router = express.Router();

const autenticar = require("../middleware/auth");

const {
    cadastrar,
    login,
    me,
    atualizarPerfil
} = require("../controllers/authController");


// Cadastro
router.post("/cadastro", cadastrar);


// Login
router.post("/login", login);


// Perfil do usuário logado
router.get("/me", autenticar, me);


// Atualizar perfil
router.put("/perfil", autenticar, atualizarPerfil);


module.exports = router;