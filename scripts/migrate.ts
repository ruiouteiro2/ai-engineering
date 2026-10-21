import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import pg from "pg";
if (!process.env.DATABASE_URL) throw Error("DATABASE_URL required");
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
await migrate(drizzle(pool), { migrationsFolder: "./db/migrations" });
await pool.end();
console.log("Migrations applied");
