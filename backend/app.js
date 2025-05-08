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
app.use(express.json());
app.use(cors({
    origin: ["https://buddy-crm.vercel.app/login", "https://buddy-crm.vercel.app/dashboard", "https://buddy-crm.vercel.app/", "https://buddy-crm.vercel.app", "https://buddy-crm-git-main-nishant-chauhans-projects.vercel.app/", "https://buddy-crm-nishant-chauhans-projects.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

app.use("/", userRouter);
app.use("/", cardRouter);

app.get("/", (req, res) => {
    res.send("Server is working...");
})

export default app;