import { and, eq, ilike, or } from "drizzle-orm";
import { db, schema as s } from "../utils/db";
import { productPath } from "../../shared/catalog";
export default defineEventHandler(async (event) => {
  const q = String(getQuery(event).q || "")
    .trim()
    .slice(0, 150);
  if (!q) return { products: [], articles: [] };
  const [p, a] = await Promise.all([
    db()
      .select({
        sku: s.products.sku,
        slug: s.products.slug,
        type: s.products.type,
        title: s.products.title,
        description: s.products.description,
      })
      .from(s.products)
      .where(
        and(
          eq(s.products.visible, true),
          or(
            ilike(s.products.title, `%${q}%`),
            ilike(s.products.description, `%${q}%`),
          ),
        ),
      )
      .limit(30),
    db()
      .select({
        slug: s.content.slug,
        kind: s.content.kind,
        title: s.content.title,
        summary: s.content.summary,
      })
      .from(s.content)
      .where(
        and(
          eq(s.content.published, true),
          or(ilike(s.content.title, `%${q}%`), ilike(s.content.body, `%${q}%`)),
        ),
      )
      .limit(20),
  ]);
  return {
    products: p.map((x) => ({ ...x, path: productPath(x) })),
    articles: a
      .filter((x) => ["article", "help", "guide"].includes(x.kind))
      .map((x) => ({
        ...x,
        path: `/${x.kind === "help" ? "support" : x.kind === "guide" ? "guides" : "blog"}/${x.slug}`,
      })),
  };
});
