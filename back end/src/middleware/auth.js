const jwt = require("jsonwebtoken");

const autenticar = (req, res, next) => {
    const header = req.headers.authorization || "";

    const [tipo, token] = header.split(" ");

    if (tipo !== "Bearer" || !token) {
        return res.status(401).json({
            mensagem: "Você precisa estar logado."
        });
    }

    try {
        const dados = jwt.verify(token, process.env.JWT_SECRET);

        req.usuario = {
            id: dados.id,
            email: dados.email
        };

        next();

    } catch (erro) {
        return res.status(401).json({
            mensagem: "Sessão inválida. Faça login novamente."
        });
    }
};

module.exports = autenticar;
