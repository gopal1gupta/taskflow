import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(5000),

  NODE_ENV: z.enum([
    "development",
    "production",
    "test",
  ]),

  DB_HOST: z.string(),

  DB_PORT: z.coerce.number(),

  DB_NAME: z.string(),

  DB_USER: z.string(),

  DB_PASSWORD: z.string(),

  COGNITO_REGION: z.string(),

  COGNITO_USER_POOL_ID: z.string(),

  COGNITO_CLIENT_ID: z.string(),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error(result.error.format());
  process.exit(1);
}

export const env = result.data;