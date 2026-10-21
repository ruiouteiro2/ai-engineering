import { processPayment } from "../../services/payments";
export default defineEventHandler(async (event) => {
  const raw = await readRawBody(event, false);
  if (!raw || raw.length > 128 * 1024)
    throw createError({
      statusCode: 413,
      statusMessage: "Invalid webhook body",
    });
  return processPayment(raw, getHeader(event, "x-signature") || "");
});
