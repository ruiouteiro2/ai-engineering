import { readFile } from "node:fs/promises";
import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { products, content } from "../db/schema";
import { slugify, contents } from "../shared/catalog";
import { editorialSeed } from "../content/editorial";
const seed = JSON.parse(await readFile("catalog-seed.json", "utf8"));
if (
  seed.products.length !== 83 ||
  seed.edgeCases.length !== 100 ||
  seed.scopeDomains.length !== 40
)
  throw Error("Invalid seed inventory");
const skus = new Set(seed.products.map((p: any) => p.sku));
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);
await db.transaction(async (tx) => {
  for (const p of seed.products) {
    if ((p.related || []).some((sku: string) => !skus.has(sku)))
      throw Error(`Unknown relation in ${p.sku}`);
    if (p.sku === "FREE01")
      p.contents[1] = "50-point checklist in five groups of ten";
    const formatMap: Record<string, string[]> = {
      PDF_GUIDE: ["PDF"],
      VISUAL_ATLAS: ["PPTX", "PDF"],
      AGENT_SKILL: ["Markdown", "ZIP"],
      TEMPLATE: ["Markdown", "XLSX"],
      LAB: ["ZIP", "Markdown"],
      PRODUCT_BLUEPRINT: ["PDF", "Markdown"],
      BUNDLE: ["Multiple formats"],
    };
    p.formats ||= formatMap[p.type] || ["PDF"];
    const desc =
      p.objective ||
      `A planned ${p.type.toLowerCase().replaceAll("_", " ")} covering ${
        contents(p)
          .slice(0, 3)
          .map((x) => x.title.toLowerCase())
          .join(", ") ||
        "a structured selection of learning materials and practical tools"
      }.`;
    await tx
      .insert(products)
      .values({
        sku: p.sku,
        slug: slugify(p.title),
        title: p.title,
        type: p.type,
        tier: p.tier,
        description: desc,
        status: "PLANNED",
        cover: p.coverAsset,
        data: p,
      })
      .onConflictDoNothing();
  }
  for (const p of editorialSeed)
    await tx.insert(content).values(p).onConflictDoNothing();
});
await pool.end();
console.log(
  "83 planned products seeded idempotently; editorial content seeded",
);
