const express = require("express");

const router = express.Router();

const autenticar = require("../middleware/auth");

const {
    criar,
    listar
} = require("../controllers/feedbackController");


// Listar meus feedbacks (logado)
router.get("/", autenticar, listar);


// Enviar feedback (logado)
router.post("/", autenticar, criar);


module.exports = router;