import { NextFunction, Request, Response } from "express";
import { ValidationError } from "express-validator";

export class HttpException extends Error {
    statusCode: number;
    message: string;
    data?: ValidationError[];
    constructor(statusCode: number, message: string, data?: ValidationError[]) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}

export const exceptionHandler = (error: HttpException, _req: Request, res: Response, _next: NextFunction) => {
    const status = error.statusCode || 500;
    const message = status === 500 ? "Ha ocurrido un error en el servidor." : error.message;
    const data = error.data || [];
    console.error(error);
    res.status(status).json({ message: message, errors: data });
}