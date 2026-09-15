require("dotenv").config();

const express = require("express");
const cors = require("cors");

const conectarBanco = require("./database/connection");
const authRoutes = require("./routes/authRoutes");


// ==============================
// CRIAR APLICAÇÃO
// ==============================

const app = express();


// ==============================
// MIDDLEWARES
// ==============================

app.use(cors());

app.use(express.json());


// ==============================
// CONECTAR BANCO
// ==============================

conectarBanco();


// ==============================
// ROTAS
// ==============================

app.use("/auth", authRoutes);


// ==============================
// ROTA PRINCIPAL
// ==============================

app.get("/", (req, res) => {
    res.json({
        mensagem: "Backend LFGP funcionando!"
    });
});


// ==============================
// SERVIDOR
// ==============================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});