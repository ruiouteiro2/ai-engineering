import { releaseGates } from "./release-gates";
import { createError } from "h3";
import { config } from "../utils/config";
export async function lemonRequest(
  path: string,
  options: { method?: string; body?: unknown } = {},
) {
  if (!process.env.LEMONSQUEEZY_API_KEY)
    throw createError({
      statusCode: 503,
      statusMessage: "Payment provider is not configured",
    });
  const response = await fetch("https://api.lemonsqueezy.com/v1/" + path, {
    method: options.method || "GET",
    headers: {
      Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    signal: AbortSignal.timeout(10000),
    redirect: "error",
  });
  if (!response.ok)
    throw createError({
      statusCode: 502,
      statusMessage: "Payment provider temporarily unavailable",
    });
  return response.json();
}
export async function createProviderCheckout(
  variantId: string,
  checkoutId: string,
  returnToken: string,
  priceCents: number,
  currency: string,
) {
  const c = config();
  if (c.payment === "mock") {
    if (!c.local)
      throw createError({
        statusCode: 503,
        statusMessage: "Mock payments are available only in local development",
      });
    return {
      id: "mock-" + checkoutId,
      url: `${c.baseUrl}/checkout/mock?token=${returnToken}`,
    };
  }
  if (c.payment !== "lemonsqueezy")
    throw createError({
      statusCode: 503,
      statusMessage: "Payment provider unavailable",
    });
  const liveMode = process.env.LEMONSQUEEZY_MODE === "live";
  if (liveMode && (!c.live || (await releaseGates()).some((g) => !g.passed)))
    throw createError({
      statusCode: 503,
      statusMessage: "Live selling is blocked by release prerequisites",
    });
  if (!liveMode && process.env.LEMONSQUEEZY_MODE !== "test")
    throw createError({
      statusCode: 503,
      statusMessage: "Select a valid payment environment",
    });
  if (
    !/^\d+$/.test(variantId) ||
    !/^\d+$/.test(process.env.LEMONSQUEEZY_STORE_ID || "")
  )
    throw createError({
      statusCode: 503,
      statusMessage: "Payment mapping requires review",
    });
  const [store, variant] = await Promise.all([
    lemonRequest("stores/" + process.env.LEMONSQUEEZY_STORE_ID),
    lemonRequest("variants/" + variantId),
  ]);
  if (
    store.data?.attributes?.currency !== currency ||
    variant.data?.attributes?.test_mode !== !liveMode ||
    variant.data?.attributes?.is_subscription !== false
  )
    throw createError({
      statusCode: 503,
      statusMessage:
        "Provider currency, environment or billing type does not match this resource",
    });
  const result = await lemonRequest("checkouts", {
    method: "POST",
    body: {
      data: {
        type: "checkouts",
        attributes: {
          test_mode: !liveMode,
          custom_price: priceCents,
          product_options: {
            enabled_variants: [Number(variantId)],
            redirect_url: `${c.baseUrl}/checkout/complete?token=${returnToken}`,
          },
          checkout_data: { custom: { checkout_id: checkoutId } },
          expires_at: new Date(Date.now() + 30 * 60_000).toISOString(),
        },
        relationships: {
          store: {
            data: { type: "stores", id: process.env.LEMONSQUEEZY_STORE_ID },
          },
          variant: { data: { type: "variants", id: variantId } },
        },
      },
    },
  });
  const url = new URL(result.data.attributes.url);
  if (url.protocol !== "https:" || !url.hostname.endsWith(".lemonsqueezy.com"))
    throw createError({
      statusCode: 502,
      statusMessage: "Invalid provider checkout destination",
    });
  return { id: String(result.data.id), url: url.href };
}
