import express from "express";
import { getUser, userLogin, userRegister } from "../controllers/userController.js";

const router = express.Router();

router.get("/api/fetch/user", getUser);

router.post("/api/auth/register", userRegister);
router.get("/api/auth/login", userLogin);

export default router;