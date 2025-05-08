import express from "express";
import { addNewCard, deleteCard, getAllCards } from "../controllers/cardController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/api/card/add", auth, addNewCard);
router.get("/api/card/get", auth, getAllCards);
router.delete("/api/card/delete", auth, deleteCard);

export default router;