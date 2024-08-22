import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
    DATABASE_URL: z.string(),
    PRIVATE_KEY: z.coerce.string(),
    PORT: z.coerce.number().default(3333),
    EMAIL: z.string(),
    EMAIL_PASSWORD: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    console.error('Invalid Environment Variables', _env.error.format());

    throw new Error('Invalid Environment Variables');
}

export const env = _env.data;