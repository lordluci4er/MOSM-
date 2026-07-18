import dotenv from 'dotenv';
import { cleanEnv, port, str } from 'envalid';

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ['development', 'production', 'test'],
    default: 'development',
  }),

  PORT: port({
    default: 5000,
  }),

  MONGO_URI: str(),

  JWT_ACCESS_SECRET: str(),
  JWT_ACCESS_EXPIRES: str(),

  JWT_REFRESH_SECRET: str(),
  JWT_REFRESH_EXPIRES: str(),

  FIREBASE_PROJECT_ID: str(),
  FIREBASE_CLIENT_EMAIL: str(),
  FIREBASE_PRIVATE_KEY: str(),

  CORS_ORIGIN: str(),
});