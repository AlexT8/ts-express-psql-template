import dotenv from 'dotenv'
import Joi from 'joi'
import { HttpException } from '../exceptions/HttpException'
dotenv.config()

const { env } = process

export const environment = {
  urls: {
    app:env.APP_URL 
  },
  database: {
    db: env.POSTGRES_DB,
    username: env.POSTGRES_USERNAME,
    password: env.POSTGRES_PASS,
    port: env.POSTGRES_PORT,
    host: env.POSTGRES_HOST
  }
}

export const schema = Joi.object({
  urls: {
    app: Joi.string().required()
  },
  database: {
    db: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    port: Joi.string().required(),
    host: Joi.string().required()
  }
})


export const validateEnvironment = async () => {
  try {
    await schema.validateAsync(environment)
  } catch (error: any) {
    if(error?.details?.length > 0) throw new HttpException(400, 'Invalid .env variables', error)
  }
}
