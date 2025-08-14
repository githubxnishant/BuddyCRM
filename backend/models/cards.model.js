import mongoose from "mongoose";
import userModel from "./user.model.js";

const cardSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    transactionType: {
        type: String,
        required: true,
    },
    transactionAmount: {
        type: Number,
        required: true,
    },
    tag: {
        type: String,
        required: true,
    },
    transactionDate: {
        type: Date,
        required: true,
    },
    notes: {
        type: String,
        required: true,
    },
    requestedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: userModel,
    }
}, { timestamps: true });

// cardSchema.index({ requestedBy: 1, email: 1 }, { unique: true });
// cardSchema.index({ requestedBy: 1, email: 1 });

export default mongoose.model("Card", cardSchema);