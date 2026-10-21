import { sql, eq } from "drizzle-orm";
import { db, schema as s } from "../server/utils/db";
import { sendMail } from "../server/services/mail";
// Bounded batch. SKIP LOCKED isolates workers; stale claims are recoverable after five minutes.
let sent = 0,
  failed = 0;
for (let n = 0; n < 50; n++) {
  const job = await db().transaction(async (tx) => {
    const result = await tx.execute(
      sql`SELECT id FROM email_jobs WHERE attempts < 5 AND available_at <= now() AND status IN ('PENDING','SENDING') ORDER BY created_at FOR UPDATE SKIP LOCKED LIMIT 1`,
    );
    const id = result.rows[0]?.id as string | undefined;
    if (!id) return null;
    const [claimed] = await tx
      .update(s.emailJobs)
      .set({
        status: "SENDING",
        attempts: sql`${s.emailJobs.attempts}+1`,
        availableAt: new Date(Date.now() + 300000),
      })
      .where(eq(s.emailJobs.id, id))
      .returning();
    return claimed;
  });
  if (!job) break;
  try {
    await sendMail(job.recipient, job.subject, job.message);
    await db()
      .update(s.emailJobs)
      .set({ status: "SENT" })
      .where(eq(s.emailJobs.id, job.id));
    sent++;
  } catch {
    await db()
      .update(s.emailJobs)
      .set({ status: job.attempts >= 5 ? "FAILED" : "PENDING" })
      .where(eq(s.emailJobs.id, job.id));
    failed++;
  }
}
console.log(JSON.stringify({ sent, failed }));
await db().$client.end();
