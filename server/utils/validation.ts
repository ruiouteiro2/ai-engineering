import { readRawBody, createError, type H3Event } from "h3";
import type { ZodType } from "zod";
export async function body<T>(event: H3Event, schema: ZodType<T>): Promise<T> {
  const raw = await readRawBody(event, false);
  if (!raw || raw.length > 128 * 1024)
    throw createError({
      statusCode: 413,
      statusMessage: "Request body too large or missing",
    });
  let value: unknown;
  try {
    value = JSON.parse(raw.toString("utf8"));
  } catch {
    throw createError({ statusCode: 400, statusMessage: "Invalid JSON body" });
  }
  const parsed = schema.safeParse(value);
  if (!parsed.success)
    throw createError({
      statusCode: 422,
      statusMessage: "Check the form fields",
      data: {
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      },
    });
  return parsed.data;
}
