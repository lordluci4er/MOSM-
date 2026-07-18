import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("5000"),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  FIREBASE_PROJECT_ID: z.string().optional(),
});

const env = envSchema.parse(process.env);

export default env;