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
    company: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
    },
    lastContacted: {
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

cardSchema.index({ requestedBy: 1, email: 1 }, { unique: true });

export default mongoose.model("Card", cardSchema);