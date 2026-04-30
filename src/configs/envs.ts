import "dotenv/config";
import * as joi from "joi";

interface EnvConfig {
  APP_PORT: number;
  DATABASE_URL: string;
  DEFAULT_PAGE_SIZE: number;
  DEFAULT_LIMIT_PAGE: number;
}

const envsSchema = joi
  .object({
    APP_PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    DEFAULT_PAGE_SIZE: joi.number().required(),
    DEFAULT_LIMIT_PAGE: joi.number().required(),
  })
  .unknown(true); // Permite otras variables de entorno que no estén definidas en el esquema

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config: EnvConfig = value;

export const envs = {
  APP_PORT: config.APP_PORT,
  DATABASE_URL: config.DATABASE_URL,
  DEFAULT_PAGE_SIZE: config.DEFAULT_PAGE_SIZE,
  DEFAULT_LIMIT_PAGE: config.DEFAULT_LIMIT_PAGE,
};
