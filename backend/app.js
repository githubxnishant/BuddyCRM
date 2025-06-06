import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import userRouter from "./routes/userRoute.js";
import cardRouter from './routes/cardRoute.js';

const app = express();

config({
    path: "./config/.env",
})

// Middlewares
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(express.json());

app.use("/", userRouter);
app.use("/", cardRouter);

app.get("/", (req, res) => {
    res.send("BuddyCRM server is working...");
})

export default app;