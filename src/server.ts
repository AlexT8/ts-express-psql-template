import express, { Express } from "express";
import compression from "compression";
import bodyParser from "body-parser";
import { connectDB } from "./db";
import routes from './routes'
import dotenv from 'dotenv'
import cors from 'cors'

import { exceptionHandler } from "./exceptions/HttpException";

dotenv.config() //Init .env constants

const app:Express = express();
connectDB()

app.use(bodyParser.json()) // Parse every request with JSON
app.use(compression()) // Compress every HTTP request

const corsOptions = {
    credentials: true,
    origin: process.env.APP_URL
}

app.use(cors(corsOptions))
app.use(exceptionHandler) // Manage exceptions

app.get('/', (_req, res) => res.send('API running!'))
app.use('/api', routes)

const PORT:number = Number(process.env.PORT) || 5000

app.listen(PORT, () => console.log(`listening on port:${PORT} at:${new Date()}`))