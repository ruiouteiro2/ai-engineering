import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { randomBytes } from "node:crypto";
if (existsSync(".env")) {
  console.log("Existing .env preserved.");
  process.exit(0);
}
const password = randomBytes(24).toString("hex");
let content = readFileSync(".env.example", "utf8")
  .replace("replace_locally", password)
  .replace(
    "SESSION_SECRET=",
    "SESSION_SECRET=" + randomBytes(32).toString("hex"),
  )
  .replace(
    "LEMONSQUEEZY_WEBHOOK_SECRET=",
    "LEMONSQUEEZY_WEBHOOK_SECRET=" + randomBytes(32).toString("hex"),
  );
content += "\nPOSTGRES_PASSWORD=" + password + "\n";
writeFileSync(".env", content, { mode: 0o600 });
mkdirSync(".data", { recursive: true, mode: 0o700 });
console.log("Local configuration created. Secrets were not printed.");
