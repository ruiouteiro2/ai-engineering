import { createError, type H3Event } from "h3";
/** h3 1.x caches raw bodies under this symbol; enforce a cap before it buffers. */
export async function boundedBody(event: H3Event, limit: number) {
  const req = event.node.req as typeof event.node.req & {
    [key: symbol]: unknown;
  };
  const symbol = Symbol.for("h3RawBody");
  if (req[symbol] || event._requestBody || event.web?.request) return;
  const body = new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    let size = 0,
      failed = false;
    req.on("data", (chunk: Buffer) => {
      size += chunk.length;
      if (size > limit) {
        if (!failed) {
          failed = true;
          chunks.length = 0;
          reject(
            createError({
              statusCode: 413,
              statusMessage: "Request too large",
            }),
          );
        }
      } else if (!failed) chunks.push(chunk);
    });
    req.on("end", () => {
      if (!failed) resolve(Buffer.concat(chunks));
    });
    req.on("error", reject);
  });
  req[symbol] = body;
  await body;
}
