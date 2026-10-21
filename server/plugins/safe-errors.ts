import { randomUUID } from "node:crypto";
import type { H3Error } from "h3";
/** Nitro 2.13/Hookable invokes synchronous error hooks before its default logger. */
export default defineNitroPlugin((app) => {
  app.hooks.hook("error", (error, { event }) => {
    const e = error as H3Error;
    if (!e.unhandled && !e.fatal) return;
    let cause: unknown = error,
      code = "";
    for (let i = 0; i < 4 && cause && typeof cause === "object"; i++) {
      const value = cause as { code?: unknown; cause?: unknown };
      if (typeof value.code === "string" && /^\d{5}$/.test(value.code))
        code = value.code;
      cause = value.cause;
    }
    const statusCode = code === "23505" ? 409 : 500;
    const statusMessage =
      statusCode === 409
        ? "A record with this identifier already exists"
        : "Service temporarily unavailable. Please try again.";
    const requestId = randomUUID();
    // Never pass SQL parameters, request URLs/tokens, headers, bodies or error causes to a logger.
    console.error(
      JSON.stringify({
        event: "request.failure",
        requestId,
        method: event?.method,
        statusCode,
        code: code || "internal",
      }),
    );
    e.message = statusMessage;
    e.statusMessage = statusMessage;
    e.statusCode = statusCode;
    e.stack = undefined;
    e.cause = undefined;
    e.data = undefined;
    e.unhandled = false;
    e.fatal = false;
    if (event && !event.node.res.headersSent)
      setHeader(event, "X-Request-ID", requestId);
  });
});
