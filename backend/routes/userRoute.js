import express from "express";
import { getUser, googleLogin, googleRegister, userLogin, userRegister } from "../controllers/userController.js";

const router = express.Router();

router.get("/api/fetch/user", getUser);

router.post("/api/auth/google-register", googleRegister)
router.post("/api/auth/google-login", googleLogin);

router.post("/api/auth/register", userRegister);
router.post("/api/auth/login", userLogin);

export default router;