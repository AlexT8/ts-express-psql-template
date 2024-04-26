import { DataSource, DataSourceOptions } from "typeorm"
import { environment } from "./config";

export const conObject:DataSourceOptions = {
    type: "postgres",
    host: environment.database.host,
    port: Number(environment.database.port),
    username: environment.database.username,
    password: environment.database.password,
    database: environment.database.db,
    synchronize:true,
    entities:[/*Base, Transaction, User, BankAccount, ResetPassword, Account*/],
}

export const AppDataSource = new DataSource(conObject)