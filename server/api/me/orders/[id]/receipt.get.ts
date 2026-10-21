import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { requireUser } from "../../../../services/auth";
import { db, schema as s } from "../../../../utils/db";
import { lemonRequest } from "../../../../services/payment-provider";
export default defineEventHandler(async (event) => {
  const u = await requireUser(event);
  const id = z.uuid().safeParse(getRouterParam(event, "id"));
  if (!id.success)
    throw createError({ statusCode: 404, statusMessage: "Order not found" });
  const order = await db().query.orders.findFirst({
    where: and(eq(s.orders.id, id.data), eq(s.orders.email, u.email)),
  });
  if (!order)
    throw createError({ statusCode: 404, statusMessage: "Order not found" });
  if (
    process.env.PAYMENT_PROVIDER !== "lemonsqueezy" ||
    !/^\d+$/.test(order.providerId)
  )
    throw createError({
      statusCode: 409,
      statusMessage: "No provider receipt exists for this local or free order",
    });
  const remote = await lemonRequest("orders/" + order.providerId);
  let url: URL;
  try {
    url = new URL(remote.data.attributes.urls.receipt);
  } catch {
    throw createError({
      statusCode: 502,
      statusMessage: "Receipt is temporarily unavailable",
    });
  }
  if (url.protocol !== "https:" || !url.hostname.endsWith(".lemonsqueezy.com"))
    throw createError({
      statusCode: 502,
      statusMessage: "Receipt destination requires operator review",
    });
  return sendRedirect(event, url.href, 302);
});
