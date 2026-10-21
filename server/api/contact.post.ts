import { z } from "zod";
import { db, schema } from "../utils/db";
import { body } from "../utils/validation";
export default defineEventHandler(async (event) => {
  const input = await body(
    event,
    z
      .object({
        email: z
          .email()
          .max(254)
          .transform((v) => v.toLowerCase()),
        topic: z.enum([
          "General question",
          "Product question",
          "Order or download",
          "Privacy request",
          "Accessibility",
        ]),
        message: z.string().trim().min(20).max(5000),
        website: z.string().max(200).default(""),
      })
      .strict(),
  );
  if (input.website) return { ok: true, id: "received" };
  const [ticket] = await db()
    .insert(schema.support)
    .values({ email: input.email, topic: input.topic, message: input.message })
    .returning({ id: schema.support.id });
  return { ok: true, id: ticket!.id };
});
