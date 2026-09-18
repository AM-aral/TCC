const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
    {
        jogo: {
            type: String,
            required: true,
            trim: true,
            index: true
        },

        nome: {
            type: String,
            required: true,
            trim: true
        },

        descricao: {
            type: String,
            default: "",
            trim: true
        },

        modo: {
            type: String,
            default: ""
        },

        time: {
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

        genero: {
            type: String,
            default: ""
        },

        maxJogadores: {
            type: Number,
            default: 2
        },

        status: {
            type: String,
            default: "aberta"
        },

        criador: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        jogadores: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    {
        timestamps: true
    }
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
