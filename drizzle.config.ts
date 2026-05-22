import { defineConfig } from "drizzle-kit";

export default defineConfig({
  // Where our table definitions live
  schema: "./db/schema.ts",
  // Where drizzle-kit will write the generated SQL migration files
  out: "./db/migrations",
  // We're using PostgreSQL (Supabase runs Postgres)
  dialect: "postgresql",
  dbCredentials: {
    // The direct connection URL — used for migrations only
    url: process.env.DATABASE_URL_DIRECT!,
  },
});
