const mongoose = require("mongoose");

const conectarBanco = async () => {
    if (!process.env.MONGO_URI) {
        console.error("MONGO_URI não definida no arquivo .env");
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB conectado com sucesso!");
    } catch (erro) {
        console.error("Erro ao conectar ao MongoDB:", erro);
        process.exit(1);
    }
};

module.exports = conectarBanco;