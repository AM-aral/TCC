import dns from "dns";
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import Produtosroutes from "./routes/Produtosroutes.js";
import { connectDatabase } from "./database/connection.js";

const app = express();

console.log("ESTE É O SERVER.TS DA TECHSTORE");

const PORT = 3001;

connectDatabase();

app.use(express.json());

console.log("Rotas de produtos carregadas");
app.use("/produto", Produtosroutes);

app.get("/", (req, res) => {
  res.json({
    message: "API está funcionando!"
  });
});

app.get("/teste", (req, res) => {
  res.send("Servidor de teste funcionando!");
});

const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});