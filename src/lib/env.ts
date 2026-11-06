import {z} from "zod";
export const env=z.object({DATABASE_URL:z.string().url().optional(),NODE_ENV:z.enum(["development","test","production"]).default("development")}).parse({DATABASE_URL:process.env.DATABASE_URL,NODE_ENV:process.env.NODE_ENV});
