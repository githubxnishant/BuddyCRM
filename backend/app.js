import express from 'express';
import cors from 'cors';
import helmet from 'helmet'
import { config } from 'dotenv';
import userRouter from "./routes/userRoute.js";
import cardRouter from './routes/cardRoute.js';
import cookieParser from 'cookie-parser';

const app = express();

config({
    path: ".env",
})

app.use(express.json());
app.use(cookieParser());
app.use(helmet())
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none');
    res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
    next();
});

app.get('/auth/google/callback', (req, res, next) => {
    res.removeHeader('Cross-Origin-Opener-Policy');
    res.removeHeader('Cross-Origin-Embedder-Policy');
    next();
});

app.use("/", userRouter);
app.use("/", cardRouter);

app.get("/", (req, res) => {
    res.send("BuddyCRM server is working...");
})

export default app;