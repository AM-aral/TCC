const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

// ==============================
// CADASTRAR USUÁRIO
// ==============================

const cadastrar = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        // Verificar campos
        if (!nome || !email || !senha) {
            return res.status(400).json({
                mensagem: "Preencha todos os campos."
            });
        }

        // Verificar se email já existe
        const usuarioExistente = await User.findOne({ email });

        if (usuarioExistente) {
            return res.status(400).json({
                mensagem: "Esse email já está cadastrado."
            });
        }

        // Criptografar senha
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        // Criar usuário
        const usuario = await User.create({
            nome,
            email,
            senha: senhaCriptografada
        });

        res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso!",
            usuario: {
                id: usuario._id,
                nome: usuario.nome,
                email: usuario.email
            }
        });

    } catch (erro) {
        console.error("Erro ao cadastrar:", erro);

        res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
};


// ==============================
// LOGIN
// ==============================

const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        // Verificar campos
        if (!email || !senha) {
            return res.status(400).json({
                mensagem: "Informe email e senha."
            });
        }

        // Procurar usuário
        const usuario = await User.findOne({ email });

        if (!usuario) {
            return res.status(401).json({
                mensagem: "Email ou senha incorretos."
            });
        }

        // Comparar senha
        const senhaCorreta = await bcrypt.compare(
            senha,
            usuario.senha
        );

        if (!senhaCorreta) {
            return res.status(401).json({
                mensagem: "Email ou senha incorretos."
            });
        }

        // Criar token
        const token = jwt.sign(
            {
                id: usuario._id,
                email: usuario.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.json({
            mensagem: "Login realizado com sucesso!",

            token,

            usuario: {
                id: usuario._id,
                nome: usuario.nome,
                email: usuario.email,
                foto: usuario.foto,
                descricao: usuario.descricao
            }
        });

    } catch (erro) {
        console.error("Erro ao fazer login:", erro);

        res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
};


module.exports = {
    cadastrar,
    login
};