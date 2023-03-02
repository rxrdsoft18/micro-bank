import * as Joi from 'joi';

export const configSchema = Joi.object({
  NODE_ENV: Joi.string(),
  PORT: Joi.number(),
  STAGE: Joi.string(),
  DATABASE_HOST: Joi.string(),
  DATABASE_PORT: Joi.number(),
  DATABASE_NAME: Joi.string(),
  DATABASE_USER: Joi.string(),
  DATABASE_PASSWORD: Joi.string(),
  DATABASE_LOGGING: Joi.boolean(),
  DATABASE_SYNC: Joi.boolean(),
  AWS_REGION: Joi.string(),
});
