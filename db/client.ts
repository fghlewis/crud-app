import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

// Open one connection to the database using the pooler URL
const client = postgres(process.env.DATABASE_URL!);

// Wrap the connection with Drizzle so we can write queries in TypeScript
export const db = drizzle(client, { schema });
