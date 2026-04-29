import "dotenv/config";
import * as joi from "joi";

interface EnvConfig {
  APP_PORT: number;
  DATABASE_URL: string;
}

const envsSchema = joi
  .object({
    APP_PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
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
};
