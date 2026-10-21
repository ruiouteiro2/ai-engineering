import { describe, it, expect } from "vitest";
import { createHmac } from "node:crypto";
import seed from "../../catalog-seed.json";
import { contents, slugify, productPath } from "../../shared/catalog";
import { verifySignature } from "../../server/utils/crypto";
import { detectFile } from "../../server/services/storage";
import { existsSync } from "node:fs";
describe("Supplied catalog invariants", () => {
  it("keeps 83 unavailable items, unique slugs and real concept artwork", () => {
    expect(seed.products).toHaveLength(83);
    expect(new Set(seed.products.map((p) => slugify(p.title))).size).toBe(83);
    for (const p of seed.products) {
      expect(p.status).toBe("PLANNED");
      expect(p.purchasable).toBe(false);
      expect(p.priceCents).toBeNull();
      expect(existsSync("public" + p.coverAsset)).toBe(true);
      expect(contents(p).every((x) => typeof x.title === "string")).toBe(true);
    }
  });
  it("preserves the case and scope index", () => {
    expect(seed.edgeCases).toHaveLength(100);
    expect(seed.scopeDomains).toHaveLength(40);
    expect(
      productPath({ type: "AGENT_SKILL", slug: "complete-product-architect" }),
    ).toBe("/skills/complete-product-architect");
  });
});
describe("Payment boundary", () => {
  it("verifies exact raw bytes and rejects malformed or altered signatures", () => {
    const body = Buffer.from('{"paid":true}'),
      secret = "synthetic-test-only";
    const sig = createHmac("sha256", secret).update(body).digest("hex");
    expect(verifySignature(body, sig, secret)).toBe(true);
    expect(verifySignature(Buffer.from('{"paid":false}'), sig, secret)).toBe(
      false,
    );
    expect(verifySignature(body, "abc", secret)).toBe(false);
    expect(verifySignature(body, "z".repeat(64), secret)).toBe(false);
  });
});
describe("Upload inspection", () => {
  it("rejects disguised scripts and empty files", () => {
    expect(() =>
      detectFile("manual.pdf", Buffer.from("<script>alert(1)</script>")),
    ).toThrow();
    expect(() => detectFile("manual.md", Buffer.alloc(0))).toThrow();
    expect(() => detectFile("app.exe", Buffer.from("MZ executable"))).toThrow();
  });
  it("allows only supported signatures and valid text", () => {
    expect(detectFile("manual.pdf", Buffer.from("%PDF-1.7\nfixture"))).toBe(
      "application/pdf",
    );
    expect(detectFile("guide.md", Buffer.from("# Sample"))).toBe("text/plain");
  });
});
