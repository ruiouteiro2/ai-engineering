/** Browser mutations use same-origin cookies and server-side validation. */
export async function apiRequest<T = any>(
  path: string,
  options: { method?: string; body?: unknown } = {},
): Promise<T> {
  const multipart = options.body instanceof FormData;
  const response = await fetch(path, {
    method: options.method || "GET",
    headers:
      options.body && !multipart
        ? { "Content-Type": "application/json" }
        : undefined,
    body: options.body
      ? multipart
        ? (options.body as FormData)
        : JSON.stringify(options.body)
      : undefined,
    credentials: "same-origin",
  });
  const data = await response.json();
  if (!response.ok)
    throw Object.assign(new Error(data.statusMessage || "Request failed"), {
      data,
      statusCode: response.status,
    });
  return data as T;
}
