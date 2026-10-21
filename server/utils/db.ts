import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "../../db/schema";
let instance: ReturnType<typeof drizzle<typeof schema>> | undefined;
export function db() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
  return (instance ??= drizzle(
    new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      max: 10,
      connectionTimeoutMillis: 5000,
    }),
    { schema },
  ));
}
export { schema };
