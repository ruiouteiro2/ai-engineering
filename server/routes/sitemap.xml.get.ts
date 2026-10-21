import { eq } from "drizzle-orm";
import { db, schema } from "../utils/db";
import { categories, productPath } from "../../shared/catalog";
export default defineEventHandler(async (event) => {
  const base = process.env.APP_BASE_URL || "http://localhost:3000";
  const [products, articles] = await Promise.all([
    db()
      .select()
      .from(schema.products)
      .where(eq(schema.products.visible, true)),
    db()
      .select()
      .from(schema.content)
      .where(eq(schema.content.published, true)),
  ]);
  const routes = [
    "/",
    "/catalog",
    "/about",
    "/methodology",
    "/roadmap",
    "/updates",
    "/free",
    "/blog",
    "/faq",
    "/contact",
    "/support",
    ...categories.map((c) => "/" + c.path),
    ...products.map(productPath),
    ...articles
      .filter((a) => ["article", "help", "guide"].includes(a.kind))
      .map(
        (a) =>
          `/${a.kind === "help" ? "support" : a.kind === "guide" ? "guides" : "blog"}/${a.slug}`,
      ),
  ];
  const escape = (v: string) =>
    v
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll('"', "&quot;");
  setHeader(event, "Content-Type", "application/xml");
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[...new Set(routes)].map((p) => `<url><loc>${escape(new URL(p, base).href)}</loc></url>`).join("")}</urlset>`;
});
