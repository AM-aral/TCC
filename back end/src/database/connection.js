const dns = require("node:dns");

// O MongoDB Atlas usa consultas DNS SRV para descobrir os servidores.
// Se a máquina apontar para um resolver local que não responda a SRV,
// o Node recebe ECONNREFUSED antes mesmo de tentar abrir a conexão.
const dnsServers = (
    process.env.MONGODB_DNS_SERVERS || "8.8.8.8,1.1.1.1"
)
    .split(",")
    .map((server) => server.trim())
    .filter(Boolean);

dns.setServers(dnsServers);

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