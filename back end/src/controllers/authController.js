const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Feedback = require("../models/Feedback");
const Room = require("../models/Room");

// ==============================
// PERFIL PÚBLICO
// ==============================

const perfilPublico = (usuario) => ({
    id: usuario._id,
    nome: usuario.nome,
    email: usuario.email,
    foto: usuario.foto,
    descricao: usuario.descricao,
    apelido: usuario.apelido,
    banner: usuario.banner,
    tags: usuario.tags,
    preferencias: usuario.preferencias,
    jogos: usuario.jogos
});


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

        // Verificar se o usuário (apelido) já existe (ignorando maiúsculas)
        const nomeEmUso = await User.findOne({
            nome: new RegExp(`^${nome.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i")
        });

        if (nomeEmUso) {
            return res.status(400).json({
                mensagem: "Esse usuário já está em uso. Escolha outro apelido."
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
            usuario: perfilPublico(usuario)
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

            usuario: perfilPublico(usuario)
        });

    } catch (erro) {
        console.error("Erro ao fazer login:", erro);

        res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
};


// ==============================
// BUSCAR PERFIL LOGADO
// ==============================

const me = async (req, res) => {
    try {
        const usuario = await User.findById(req.usuario.id);

        if (!usuario) {
            return res.status(404).json({
                mensagem: "Usuário não encontrado."
            });
        }

        res.json({
            usuario: perfilPublico(usuario)
        });

    } catch (erro) {
        console.error("Erro ao buscar perfil:", erro);

        res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
};


// ==============================
// ATUALIZAR PERFIL
// ==============================

const atualizarPerfil = async (req, res) => {
    try {
        const {
            nome,
            apelido,
            descricao,
            foto,
            banner,
            tags,
            preferencias,
            jogos
        } = req.body;

        const usuario = await User.findById(req.usuario.id);

        if (!usuario) {
            return res.status(404).json({
                mensagem: "Usuário não encontrado."
            });
        }

        const escapar = (texto) =>
            texto.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        if (typeof nome === "string" && nome.trim()) {
            const novoNome = nome.trim();

            const nomeEmUso = await User.findOne({
                nome: new RegExp(`^${escapar(novoNome)}$`, "i"),
                _id: { $ne: usuario._id }
            });

            if (nomeEmUso) {
                return res.status(400).json({
                    mensagem: "Esse usuário já está em uso. Escolha outro apelido."
                });
            }

            usuario.nome = novoNome;
        }

        if (typeof apelido === "string") {
            const novoApelido = apelido.trim();

            if (novoApelido) {
                const apelidoEmUso = await User.findOne({
                    apelido: new RegExp(`^${escapar(novoApelido)}$`, "i"),
                    _id: { $ne: usuario._id }
                });

                if (apelidoEmUso) {
                    return res.status(400).json({
                        mensagem: "Esse @apelido já está em uso. Escolha outro."
                    });
                }
            }

            usuario.apelido = novoApelido;
        }

        if (typeof descricao === "string") {
            usuario.descricao = descricao;
        }

        if (typeof foto === "string") {
            usuario.foto = foto;
        }

        if (typeof banner === "string") {
            usuario.banner = banner;
        }

        if (Array.isArray(tags)) {
            usuario.tags = tags
                .map((tag) => String(tag).trim())
                .filter(Boolean)
                .slice(0, 20);
        }

        if (Array.isArray(preferencias)) {
            usuario.preferencias = preferencias
                .map((item) => String(item).trim())
                .filter(Boolean)
                .slice(0, 20);
        }

        if (Array.isArray(jogos)) {
            usuario.jogos = jogos
                .slice(0, 20)
                .map((item) => ({
                    jogo: String(item?.jogo || "").trim(),
                    elo: String(item?.elo || "").trim(),
                    funcao: String(item?.funcao || "").trim(),
                    funcao2: String(item?.funcao2 || "").trim()
                }))
                .filter((item) => item.jogo);
        }

        await usuario.save();

        res.json({
            mensagem: "Perfil atualizado com sucesso!",
            usuario: perfilPublico(usuario)
        });

    } catch (erro) {
        console.error("Erro ao atualizar perfil:", erro);

        res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
};


// ==============================
// EXCLUIR CONTA
// ==============================

const excluirConta = async (req, res) => {
    try {
        const usuario = await User.findById(req.usuario.id);

        if (!usuario) {
            return res.status(404).json({
                mensagem: "Usuário não encontrado."
            });
        }

        const usuarioId = usuario._id;

        // Apagar feedbacks que envolvem o usuário (enviados e recebidos)
        await Feedback.deleteMany({
            $or: [
                { remetente: usuarioId },
                { destinatario: usuarioId }
            ]
        });

        // Remover o usuário das salas em que participava ou pediu para entrar
        await Room.updateMany(
            {},
            {
                $pull: {
                    jogadores: usuarioId,
                    pedidos: usuarioId
                }
            }
        );

        // Apagar as salas que o usuário criou
        await Room.deleteMany({ criador: usuarioId });

        // Apagar o usuário
        await usuario.deleteOne();

        res.json({
            mensagem: "Conta excluída."
        });

    } catch (erro) {
        console.error("Erro ao excluir conta:", erro);

        res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
};


module.exports = {
    cadastrar,
    login,
    me,
    atualizarPerfil,
    excluirConta
};