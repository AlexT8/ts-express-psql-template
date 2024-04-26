import express, { Express } from "express";
import compression from "compression";
import bodyParser from "body-parser";
import { AppDataSource } from "./db";
import routes from './routes'
import dotenv from 'dotenv'
import cors from 'cors'

import { exceptionHandler } from "./exceptions/HttpException";
import { validateEnvironment } from "./config";
import { DataBaseLog, ServerLog } from "./utils/Logs";

dotenv.config() //Init .env constants

const app:Express = express();

validateEnvironment()

AppDataSource.initialize() // Init DB connection
.then(() => DataBaseLog("Data Source has been initialized!"))
.catch((err:any) => DataBaseLog("Error during Data Source initialization:", err))

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

app.listen(PORT, () => ServerLog(`listening on port:${PORT} at:${new Date()}`))