import { eq, or } from "drizzle-orm";
import { requireUser } from "../../services/auth";
import { db, schema as s } from "../../utils/db";
export default defineEventHandler(async (event) => {
  const user = await requireUser(event);
  const [orders, requests, downloads, support, consents, leads] =
    await Promise.all([
      db()
        .select({
          id: s.orders.id,
          status: s.orders.status,
          total: s.orders.total,
          currency: s.orders.currency,
          snapshot: s.orders.snapshot,
          createdAt: s.orders.createdAt,
        })
        .from(s.orders)
        .where(eq(s.orders.email, user.email)),
      db()
        .select()
        .from(s.privacyRequests)
        .where(eq(s.privacyRequests.userId, user.id)),
      db().select().from(s.downloads).where(eq(s.downloads.userId, user.id)),
      db().select().from(s.support).where(eq(s.support.email, user.email)),
      db()
        .select({
          purpose: s.consents.purpose,
          accepted: s.consents.accepted,
          policyVersion: s.consents.policyVersion,
          createdAt: s.consents.createdAt,
        })
        .from(s.consents)
        .leftJoin(s.leads, eq(s.leads.id, s.consents.leadId))
        .where(
          or(eq(s.consents.userId, user.id), eq(s.leads.email, user.email)),
        ),
      db()
        .select({
          email: s.leads.email,
          marketing: s.leads.marketing,
          confirmed: s.leads.confirmed,
          createdAt: s.leads.createdAt,
        })
        .from(s.leads)
        .where(eq(s.leads.email, user.email)),
    ]);
  await db()
    .insert(s.audit)
    .values({ actorId: user.id, action: "privacy.export", entity: user.id });
  setHeader(
    event,
    "Content-Disposition",
    'attachment; filename="ai-engineering-account-export.json"',
  );
  return {
    generatedAt: new Date().toISOString(),
    profile: {
      email: user.email,
      name: user.name,
      preferences: user.preferences,
      createdAt: user.createdAt,
    },
    orders,
    privacyRequests: requests,
    downloads,
    support,
    consents,
    subscriptions: leads,
    note: "This export covers local account data. Ask support about external processors and retained records.",
  };
});
