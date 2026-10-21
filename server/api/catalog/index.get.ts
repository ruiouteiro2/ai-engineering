import { eq, and, ilike, or, asc, desc, sql } from "drizzle-orm";
import { z } from "zod";
import { db, schema } from "../../utils/db";
export default defineEventHandler(async (event) => {
  const parsed = z
    .object({
      q: z.string().max(150).default(""),
      type: z.string().max(40).default(""),
      tier: z.string().max(40).default(""),
      status: z.string().max(30).default(""),
      format: z.string().max(30).default(""),
      price: z.enum(["", "unpriced", "free", "paid"]).default(""),
      compatibility: z
        .enum(["", "unverified", "codex", "claude-code", "universal"])
        .default(""),
      sort: z.enum(["title", "title-desc", "tier"]).default("title"),
      page: z.coerce.number().int().min(1).max(1000).default(1),
      limit: z.coerce.number().int().min(1).max(100).default(12),
    })
    .safeParse(getQuery(event));
  if (!parsed.success)
    throw createError({
      statusCode: 422,
      statusMessage: "Invalid catalog filters",
    });
  const q = parsed.data,
    p = schema.products;
  const where = and(
    eq(p.visible, true),
    q.type ? eq(p.type, q.type) : undefined,
    q.tier ? eq(p.tier, q.tier) : undefined,
    q.status ? eq(p.status, q.status) : undefined,
    q.price === "unpriced"
      ? sql`(${p.priceCents} IS NULL OR ${p.status} <> 'PUBLISHED')`
      : q.price === "free"
        ? and(eq(p.priceCents, 0), eq(p.status, "PUBLISHED"))
        : q.price === "paid"
          ? and(sql`${p.priceCents} > 0`, eq(p.status, "PUBLISHED"))
          : undefined,
    q.compatibility === "unverified"
      ? sql`coalesce(${p.data}->'verifiedPlatforms','[]'::jsonb) = '[]'::jsonb`
      : q.compatibility
        ? and(
            eq(p.reviewed, true),
            eq(p.status, "PUBLISHED"),
            sql`${p.data}->'verifiedPlatforms' ? ${q.compatibility}`,
          )
        : undefined,
    q.format ? sql`${p.data}->'formats' ? ${q.format}` : undefined,
    q.q
      ? or(
          ilike(p.title, `%${q.q}%`),
          ilike(p.description, `%${q.q}%`),
          ilike(p.sku, `%${q.q}%`),
        )
      : undefined,
  );
  const [items, count] = await Promise.all([
    db()
      .select({
        sku: p.sku,
        slug: p.slug,
        title: p.title,
        type: p.type,
        tier: p.tier,
        description: p.description,
        status: p.status,
        cover: p.cover,
        data: p.data,
        purchasable: p.purchasable,
        priceCents: p.priceCents,
        currency: p.currency,
      })
      .from(p)
      .where(where)
      .orderBy(
        q.sort === "title-desc"
          ? desc(p.title)
          : q.sort === "tier"
            ? asc(p.tier)
            : asc(p.title),
      )
      .limit(q.limit)
      .offset((q.page - 1) * q.limit),
    db()
      .select({ n: sql<number>`count(*)::int` })
      .from(p)
      .where(where),
  ]);
  return { items, total: count[0]!.n, page: q.page, limit: q.limit };
});
