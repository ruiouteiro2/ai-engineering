import { z } from "zod";
import { categories, tiers, statuses } from "../../shared/catalog";
export const productInput = z
  .object({
    title: z.string().trim().min(3).max(180),
    slug: z
      .string()
      .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/)
      .max(180),
    type: z.enum(categories.map((c) => c.type) as [string, ...string[]]),
    tier: z
      .string()
      .refine(
        (v) => [...tiers, "CROSS_LEVEL", "FREE", "BUNDLE"].includes(v),
        "Invalid tier",
      ),
    description: z.string().trim().min(20).max(3000),
    visible: z.boolean(),
    cover: z.string().regex(/^\/covers\/[A-Z0-9-]+\.svg$/),
    license: z.string().min(3).max(3000),
    priceCents: z.number().int().min(0).max(1000000).nullable(),
    currency: z.enum(["EUR", "USD", "GBP"]),
    variantId: z
      .string()
      .regex(/^[a-zA-Z0-9-]+$/)
      .max(100)
      .nullable(),
    status: z
      .enum(statuses)
      .refine((v) => v !== "PUBLISHED", "Use the publish action"),
    data: z
      .record(z.string(), z.unknown())
      .refine((v) => JSON.stringify(v).length < 50000, "Metadata too large")
      .refine(
        (v) =>
          ["formats", "related", "verifiedPlatforms"].every(
            (k) =>
              v[k] === undefined ||
              (Array.isArray(v[k]) && v[k].every((x) => typeof x === "string")),
          ),
        "Formats and relations must be arrays of strings",
      ),
  })
  .strict();
