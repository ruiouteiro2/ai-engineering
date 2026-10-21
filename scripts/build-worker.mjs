import { build } from "esbuild";
await build({
  entryPoints: ["scripts/mail-worker.ts"],
  bundle: true,
  platform: "node",
  format: "esm",
  packages: "external",
  outfile: ".output/server/worker.mjs",
});
