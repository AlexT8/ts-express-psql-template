import { DataSource, DataSourceOptions } from "typeorm"
import dotenv from 'dotenv'
dotenv.config();

export const conObject:DataSourceOptions = {
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_DB,
    synchronize:true,
    entities:[/*Base, Transaction, User, BankAccount, ResetPassword, Account*/],
}

export const AppDataSource = new DataSource(conObject)