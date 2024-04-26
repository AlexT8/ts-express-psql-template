import express, { Express } from "express";
import compression from "compression";
import bodyParser from "body-parser";
import { AppDataSource } from "./db";
import routes from './routes'
import cors from 'cors'

import { exceptionHandler } from "./exceptions/HttpException";
import { environment, validateEnvironment } from "./config";
import { DataBaseLog, ServerLog } from "./utils/Logs";

const app:Express = express();

validateEnvironment()

AppDataSource.initialize() // Init DB connection
.then(() => DataBaseLog("Data Source has been initialized!"))
.catch((err:any) => DataBaseLog("Error during Data Source initialization:", err))

app.use(bodyParser.json()) // Parse every request with JSON
app.use(compression()) // Compress every HTTP request

const corsOptions = {
    credentials: true,
    origin: environment.urls.app
}

app.use(cors(corsOptions))
app.use(exceptionHandler) // Manage exceptions

app.get('/', (_req, res) => res.send('API running!'))
app.use('/api', routes)

const PORT:number = Number(environment.port) || 5000

app.listen(PORT, () => ServerLog(`listening on port:${PORT} at:${new Date()}`))