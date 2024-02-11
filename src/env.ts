import { z } from 'zod';

const envSchema = z.object({
  DB_HOST: z.string(),
  DB_POSTGRES: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_PORT: z.string(),
  DATABASE_URL: z.string().url().min(1),
  JWT_SECRET: z.string(),
  EMAIL_USER: z.string().email(),
  EMAIL_PASSWORD: z.string(),
});

export const env = envSchema.parse(process.env);
