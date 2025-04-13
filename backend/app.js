import express from 'express';
import cors from 'cors'
import { config } from 'dotenv'

const app = express();

config({
    path: "./config/logs.env",
})

app.use(cors({
    origin: ['localhost:5173'],
    credentials: true,
}));

// Middlewares
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is working...");
})

export default app;