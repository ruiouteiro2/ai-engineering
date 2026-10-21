import pg from "pg";
const email = process.argv[2]?.trim().toLowerCase();
if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
  throw Error("Usage: npm run admin:create -- operator@example.com");
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
await pool.query(
  "INSERT INTO users(email,role) VALUES($1,'admin') ON CONFLICT(email) DO UPDATE SET role='admin'",
  [email],
);
await pool.end();
console.log(
  "Administrator provisioned; sign in using the email link. No password or token was printed.",
);
