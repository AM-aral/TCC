const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
    {
        remetente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        destinatario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        jogo: {
            type: String,
            default: "",
            trim: true
        },

        nota: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        },

        comentario: {
            type: String,
            default: "",
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;