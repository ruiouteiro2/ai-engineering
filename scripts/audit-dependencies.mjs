import { spawnSync } from "node:child_process";
import { writeFileSync, existsSync } from "node:fs";
const result = spawnSync("npm", ["audit", "--json"], { encoding: "utf8" });
let report;
try {
  report = JSON.parse(result.stdout);
} catch {
  throw new Error("Dependency audit did not return a report");
}
writeFileSync("dependency-audit.json", JSON.stringify(report, null, 2));
if (report.error) throw new Error("Dependency advisory service unavailable");
const exceptions = new Map([
  ["https://github.com/advisories/GHSA-vfj7-8cjw-p6xm", "braces"],
  ["https://github.com/advisories/GHSA-86w9-cpqp-85rv", "node-forge"],
]);
const findings = Object.values(report.vulnerabilities || {}).flatMap((v) =>
  v.via.filter(
    (x) => typeof x === "object" && ["high", "critical"].includes(x.severity),
  ),
);
let failed = false;
for (const finding of findings) {
  const name = exceptions.get(finding.url);
  const excepted =
    name &&
    new Date() < new Date("2026-11-21T00:00:00Z") &&
    !existsSync(".output/server/node_modules/" + name);
  console.log(
    JSON.stringify({
      advisory: finding.url,
      severity: finding.severity,
      status: excepted
        ? "KNOWN_BUILD_TOOL_ONLY_REVIEW_DUE_2026-11-21"
        : "BLOCKED",
    }),
  );
  if (!excepted) failed = true;
}
if (!existsSync(".output/server/index.mjs"))
  throw new Error("Build before auditing runtime reachability");
if (failed) process.exitCode = 1;
