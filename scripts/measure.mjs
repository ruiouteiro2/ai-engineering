const base = process.env.APP_BASE_URL || "http://localhost:3000";
if (!["localhost", "127.0.0.1"].includes(new URL(base).hostname))
  throw new Error("This bounded benchmark is local-only");
for (const path of ["/api/catalog?limit=12", "/"]) {
  await fetch(base + path);
  const measurements = [];
  let failed = 0;
  for (let batch = 0; batch < 10; batch++)
    await Promise.all(
      Array.from({ length: 5 }, async () => {
        const start = performance.now();
        const r = await fetch(base + path);
        await r.arrayBuffer();
        if (!r.ok) failed++;
        measurements.push(performance.now() - start);
      }),
    );
  measurements.sort((a, b) => a - b);
  const result = {
    path,
    requests: 50,
    concurrency: 5,
    errors: failed,
    p50ms: Math.round(measurements[24]),
    p95ms: Math.round(measurements[47]),
    budgetP95ms: 1000,
  };
  console.log(JSON.stringify(result));
  if (failed || result.p95ms > 1000) process.exitCode = 1;
}
