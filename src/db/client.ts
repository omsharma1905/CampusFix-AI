import "server-only";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
const url=process.env.DATABASE_URL;
if(!url) throw new Error("DATABASE_URL is required before using the database client.");
const client=postgres(url,{prepare:false});
export const db=drizzle({client});
