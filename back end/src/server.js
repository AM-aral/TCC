require("dotenv").config();

const express = require("express");
const cors = require("cors");

const conectarBanco = require("./database/connection");
const authRoutes = require("./routes/authRoutes");
const roomRoutes = require("./routes/roomRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");


// ==============================
// CRIAR APLICAÇÃO
// ==============================

const app = express();


// ==============================
// MIDDLEWARES
// ==============================

app.use(cors());

// Limite maior para aceitar imagens em base64 (foto/banner)
app.use(express.json({ limit: "8mb" }));


// ==============================
// CONECTAR BANCO
// ==============================

// A conexão é feita dentro de iniciarServidor()


// ==============================
// ROTAS
// ==============================

app.use("/auth", authRoutes);

app.use("/rooms", roomRoutes);

app.use("/feedbacks", feedbackRoutes);

app.use("/usuarios", usuarioRoutes);


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

const iniciarServidor = async () => {
    await conectarBanco();

    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
};

iniciarServidor();