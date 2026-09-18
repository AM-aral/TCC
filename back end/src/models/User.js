const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        senha: {
            type: String,
            required: true
        },

        foto: {
            type: String,
            default: ""
        },

        descricao: {
            type: String,
            default: ""
        },

        apelido: {
            type: String,
            default: "",
            trim: true
        },

        banner: {
            type: String,
            default: ""
        },

        tags: {
            type: [String],
            default: []
        },

        preferencias: {
            type: [String],
            default: []
        },

        jogos: {
            type: [
                {
                    jogo: {
                        type: String,
                        default: ""
                    },

                    elo: {
                        type: String,
                        default: ""
                    },

                    funcao: {
                        type: String,
                        default: ""
                    },

                    funcao2: {
                        type: String,
                        default: ""
                    }
                }
            ],
            default: []
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;