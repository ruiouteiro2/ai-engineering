import { afterAll, beforeAll, describe, it, expect } from "vitest";
import { randomUUID, createHash, randomBytes, createHmac } from "node:crypto";
import pg from "pg";
import { readdir, readFile } from "node:fs/promises";
import { request as httpRequest } from "node:http";
const base = process.env.APP_BASE_URL || "http://localhost:3000";
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const testId = randomUUID().slice(0, 8),
  sku = "TEST-" + testId.toUpperCase(),
  email = `buyer-${testId}@example.test`,
  other = `other-${testId}@example.test`;
let adminCookie = "",
  buyerCookie = "",
  otherCookie = "",
  fileId = "",
  checkoutToken = "",
  checkoutId = "",
  providerId = "",
  versionId = "";
const sha = (s: string | Buffer) =>
  createHash("sha256").update(s).digest("hex");
async function api(
  path: string,
  method = "GET",
  body?: unknown,
  cookie?: string,
) {
  const headers: Record<string, string> = { origin: base };
  if (cookie) headers.cookie = cookie;
  if (body) headers["content-type"] = "application/json";
  return fetch(base + path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    redirect: "manual",
  });
}
async function session(email: string, role: string) {
  const token = randomBytes(32).toString("hex");
  const { rows } = await pool.query(
    "INSERT INTO users(email,role) VALUES($1,$2) RETURNING id",
    [email, role],
  );
  await pool.query(
    "INSERT INTO sessions(hash,user_id,expires_at) VALUES($1,$2,now()+interval '1 hour')",
    [sha(token), rows[0].id],
  );
  return "ae_session=" + token;
}
async function hook(status: string, updatedAt: string) {
  const raw = JSON.stringify({
    meta: {
      event_name: status === "refunded" ? "order_refunded" : "order_created",
      custom_data: { checkout_id: checkoutId },
    },
    data: {
      type: "orders",
      id: providerId,
      attributes: {
        store_id: "mock",
        user_email: email,
        status,
        total: 2500,
        currency: "EUR",
        test_mode: true,
        updated_at: updatedAt,
        first_order_item: { variant_id: "test-" + testId },
      },
    },
  });
  const sig = createHmac("sha256", process.env.LEMONSQUEEZY_WEBHOOK_SECRET!)
    .update(raw)
    .digest("hex");
  return fetch(base + "/api/webhooks/lemonsqueezy", {
    method: "POST",
    headers: { "content-type": "application/json", "x-signature": sig },
    body: raw,
  });
}
beforeAll(async () => {
  if (
    !["localhost", "127.0.0.1"].includes(new URL(base).hostname) ||
    process.env.PAYMENT_PROVIDER !== "mock"
  )
    throw Error("Tests require local mock configuration");
  adminCookie = await session(`admin-${testId}@example.test`, "admin");
  buyerCookie = await session(email, "customer");
  otherCookie = await session(other, "customer");
});
describe("Real HTTP and PostgreSQL workflows", () => {
  it("serves complete planned catalog and blocks unavailable checkout", async () => {
    const r = await api("/api/catalog?limit=100");
    const data = await r.json();
    expect(
      data.items.filter((p: any) => !p.sku.startsWith("TEST-")).length,
    ).toBe(83);
    expect((await (await api("/api/catalog?price=free")).json()).total).toBe(0);
    expect(
      (await (await api("/api/catalog?compatibility=codex")).json()).total,
    ).toBe(0);
    expect(data.items.find((p: any) => p.sku === "PDF03").purchasable).toBe(
      false,
    );
    expect(
      (await api("/api/checkout/create", "POST", { sku: "PDF03" })).status,
    ).toBe(409);
    expect(
      (await api("/api/checkout/create", "POST", { sku: "PDF03", price: 1 }))
        .status,
    ).toBe(422);
  });
  it("rejects anonymous and lower-role admin access, forged origin and forged webhook", async () => {
    expect((await api("/api/admin/products")).status).toBe(401);
    expect(
      (await api("/api/admin/products", "GET", undefined, buyerCookie)).status,
    ).toBe(403);
    expect(
      (
        await fetch(base + "/api/me/profile", {
          method: "PATCH",
          headers: {
            origin: "https://attacker.invalid",
            cookie: buyerCookie,
            "content-type": "application/json",
          },
          body: JSON.stringify({ name: "Changed" }),
        })
      ).status,
    ).toBe(403);
    expect(
      (
        await fetch(base + "/api/webhooks/lemonsqueezy", {
          method: "POST",
          body: "{}",
          headers: { "x-signature": "bad" },
        })
      ).status,
    ).toBe(401);
  });
  it("keeps private and draft policy routes out of the sitemap", async () => {
    const xml = await (await api("/sitemap.xml")).text();
    const paths = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(
      (match) => new URL(match[1]!).pathname,
    );
    expect(paths.some((path) => /^\/(admin|account)(\/|$)/.test(path))).toBe(
      false,
    );
    expect(paths).not.toContain("/privacy");
    expect(xml).toContain("/catalog");
    expect((await api("/account/sign-in")).headers.get("x-robots-tag")).toBe(
      "noindex",
    );
    expect(await (await api("/privacy")).text()).toContain("noindex,follow");
    expect(
      (
        await api(
          "/api/me/orders/not-an-order/receipt",
          "GET",
          undefined,
          buyerCookie,
        )
      ).status,
    ).toBe(404);
  });
  it("persists waitlist and support requests with authoritative readback", async () => {
    expect(
      (
        await api("/api/leads", "POST", {
          email: `lead-${testId}@example.test`,
          sku: "PDF03",
          marketing: false,
          website: "",
        })
      ).status,
    ).toBe(200);
    const { rows } = await pool.query(
      "SELECT marketing,confirmed FROM leads WHERE email=$1",
      [`lead-${testId}@example.test`],
    );
    expect(rows[0]).toEqual({ marketing: false, confirmed: false });
    const r = await api("/api/contact", "POST", {
      email,
      topic: "Product question",
      message: "Synthetic integration test support request.",
      website: "",
    });
    expect(r.status).toBe(200);
    const ticket = await r.json();
    expect(
      (
        await pool.query("SELECT id FROM support_requests WHERE id=$1", [
          ticket.id,
        ])
      ).rowCount,
    ).toBe(1);
  });
  it("consumes a magic link once, even under concurrent requests", async () => {
    const raw = randomBytes(32).toString("hex");
    await pool.query(
      "INSERT INTO magic_links(hash,email,expires_at) VALUES($1,$2,now()+interval '15 minutes')",
      [sha(raw), other],
    );
    const responses = await Promise.all([
      api("/api/auth/magic-link/consume", "POST", { token: raw }),
      api("/api/auth/magic-link/consume", "POST", { token: raw }),
    ]);
    expect(responses.map((r) => r.status).sort()).toEqual([200, 410]);
    const cookie = responses
      .find((r) => r.status === 200)!
      .headers.get("set-cookie");
    expect(cookie).toContain("HttpOnly");
    expect(cookie).toContain("SameSite=Lax");
  });
  it("creates a synthetic product and refuses publication without real approved assets", async () => {
    const r = await api(
      "/api/admin/products",
      "POST",
      {
        sku,
        title: "Synthetic Commerce Fixture " + testId,
        slug: "synthetic-commerce-" + testId,
        type: "PDF_GUIDE",
        tier: "BUILDER",
        description:
          "Synthetic test document for validating payment and delivery boundaries.",
        visible: true,
        cover: "/covers/PDF03.svg",
        license: "Synthetic fixture personal license. Test only.",
        priceCents: 2500,
        currency: "EUR",
        variantId: "test-" + testId,
        status: "IN_REVIEW",
        data: { formats: ["Markdown"] },
      },
      adminCookie,
    );
    expect(r.status).toBe(200);
    expect(
      (
        await api(
          "/api/admin/publish",
          "POST",
          { sku, revision: 1, reviewed: true },
          adminCookie,
        )
      ).status,
    ).toBe(409);
  });
  it("returns a safe conflict for duplicate administrative records", async () => {
    const original = await (
      await api("/api/admin/products/" + sku, "GET", undefined, adminCookie)
    ).json();
    const {
      title,
      slug,
      type,
      tier,
      description,
      visible,
      cover,
      license,
      priceCents,
      currency,
      variantId,
      status,
      data,
    } = original;
    const r = await api(
      "/api/admin/products",
      "POST",
      {
        sku,
        title,
        slug,
        type,
        tier,
        description: description + " PRIVATE_SENTINEL",
        visible,
        cover,
        license,
        priceCents,
        currency,
        variantId,
        status,
        data,
      },
      adminCookie,
    );
    expect(r.status).toBe(409);
    const response = await r.text();
    expect(response).not.toContain("PRIVATE_SENTINEL");
    expect(response).not.toContain("insert into");
  });
  it("quarantines upload, verifies hash, publishes version and product with audit", async () => {
    let r = await api(
      "/api/admin/versions",
      "POST",
      {
        sku,
        version: "1.0.0",
        notes: "Synthetic fixture initial release.",
        compatibility: "Plain UTF-8 text",
      },
      adminCookie,
    );
    expect(r.status).toBe(200);
    versionId = (await r.json()).id;
    const form = new FormData();
    form.append("versionId", versionId);
    form.append(
      "file",
      new Blob(["# Synthetic purchased fixture\nTest only."]),
      "fixture.md",
    );
    r = await fetch(base + "/api/admin/uploads", {
      method: "POST",
      headers: { origin: base, cookie: adminCookie },
      body: form,
    });
    expect(r.status).toBe(200);
    const f = await r.json();
    fileId = f.id;
    expect(f.scanStatus).toBe("QUARANTINED");
    expect(
      (
        await api(
          "/api/admin/versions/" + versionId,
          "PATCH",
          { published: true },
          adminCookie,
        )
      ).status,
    ).toBe(409);
    const { rows } = await pool.query("SELECT sha256 FROM files WHERE id=$1", [
      fileId,
    ]);
    expect(
      (
        await api(
          "/api/admin/files/" + fileId,
          "PATCH",
          {
            status: "APPROVED",
            sha256: rows[0].sha256,
            reviewNote:
              "Locally authored inert text fixture inspected for this test.",
          },
          adminCookie,
        )
      ).status,
    ).toBe(200);
    expect(
      (
        await api(
          "/api/admin/versions/" + versionId,
          "PATCH",
          { published: true },
          adminCookie,
        )
      ).status,
    ).toBe(200);
    expect(
      (
        await api(
          "/api/admin/publish",
          "POST",
          { sku, revision: 1, reviewed: true },
          adminCookie,
        )
      ).status,
    ).toBe(200);
    expect(
      (await pool.query("SELECT id FROM audit_events WHERE entity=$1", [sku]))
        .rowCount,
    ).toBeGreaterThan(1);
  });
  it("creates only a server-priced checkout and leaves redirect pending", async () => {
    const r = await api("/api/checkout/create", "POST", { sku });
    expect(r.status).toBe(200);
    checkoutToken = new URL((await r.json()).url).searchParams.get("token")!;
    const { rows } = await pool.query(
      "SELECT id FROM checkouts WHERE token_hash=$1",
      [sha(checkoutToken)],
    );
    checkoutId = rows[0].id;
    providerId = "mock-" + checkoutId;
    expect(
      (await (await api("/api/checkout/resolve?token=" + checkoutToken)).json())
        .status,
    ).toBe("pending");
  });
  it("handles duplicate signed notifications atomically and grants only exact SKU", async () => {
    const time = new Date().toISOString();
    const responses = await Promise.all([
      hook("paid", time),
      hook("paid", time),
      hook("paid", time),
    ]);
    expect(responses.map((r) => r.status)).toEqual([200, 200, 200]);
    expect(
      (
        await pool.query("SELECT id FROM orders WHERE provider_id=$1", [
          providerId,
        ])
      ).rowCount,
    ).toBe(1);
    expect(
      (
        await pool.query(
          "SELECT e.id FROM entitlements e JOIN orders o ON e.order_id=o.id WHERE o.provider_id=$1",
          [providerId],
        )
      ).rowCount,
    ).toBe(1);
    const r = await api("/api/me/library", "GET", undefined, buyerCookie);
    expect((await r.json()).some((f: any) => f.fileId === fileId)).toBe(true);
    expect(
      (await api("/api/me/library", "GET", undefined, otherCookie)).status,
    ).toBe(200);
    expect(
      (
        await (
          await api("/api/me/library", "GET", undefined, otherCookie)
        ).json()
      ).some((f: any) => f.fileId === fileId),
    ).toBe(false);
  });
  it("exposes a newly approved version to an existing buyer", async () => {
    const r = await api(
      "/api/admin/versions",
      "POST",
      {
        sku,
        version: "1.1.0",
        notes: "Updated synthetic fixture evidence.",
        compatibility: "Plain text",
      },
      adminCookie,
    );
    expect(r.status).toBe(200);
    const v = await r.json();
    const form = new FormData();
    form.append("versionId", v.id);
    form.append("file", new Blob(["Updated synthetic fixture"]), "updated.md");
    const uploaded = await fetch(base + "/api/admin/uploads", {
      method: "POST",
      headers: { origin: base, cookie: adminCookie },
      body: form,
    });
    expect(uploaded.status).toBe(200);
    const f = await uploaded.json();
    const { rows } = await pool.query("SELECT sha256 FROM files WHERE id=$1", [
      f.id,
    ]);
    expect(
      (
        await api(
          "/api/admin/files/" + f.id,
          "PATCH",
          {
            status: "APPROVED",
            sha256: rows[0].sha256,
            reviewNote: "Inert synthetic text reviewed locally.",
          },
          adminCookie,
        )
      ).status,
    ).toBe(200);
    expect(
      (
        await api(
          "/api/admin/versions/" + v.id,
          "PATCH",
          { published: true },
          adminCookie,
        )
      ).status,
    ).toBe(200);
    const library = await (
      await api("/api/me/library", "GET", undefined, buyerCookie)
    ).json();
    expect(library.some((f: any) => f.version === "1.1.0")).toBe(true);
    expect(
      (await (await api("/api/updates")).json()).some(
        (r: any) => r.sku === sku && r.version === "1.1.0",
      ),
    ).toBe(true);
    expect((await api("/private/" + f.id)).status).toBe(404);
  });
  it("snapshots exact bundle inclusions and grants a free resource only once", async () => {
    const bundleSku = sku + "-B";
    const r = await api(
      "/api/admin/products",
      "POST",
      {
        sku: bundleSku,
        title: "Synthetic exact bundle",
        slug: "synthetic-bundle-" + testId,
        type: "BUNDLE",
        tier: "BUNDLE",
        description: "Synthetic exact bundle for entitlement verification.",
        visible: true,
        cover: "/covers/PDF03.svg",
        license: "Synthetic personal test license",
        priceCents: 0,
        currency: "EUR",
        variantId: null,
        status: "IN_REVIEW",
        data: {},
      },
      adminCookie,
    );
    expect(r.status).toBe(200);
    expect(
      (
        await api(
          "/api/admin/bundles",
          "POST",
          { bundleSku, items: [sku] },
          adminCookie,
        )
      ).status,
    ).toBe(200);
    expect(
      (
        await api(
          "/api/admin/publish",
          "POST",
          { sku: bundleSku, revision: 1, reviewed: true },
          adminCookie,
        )
      ).status,
    ).toBe(200);
    expect(
      (await api("/api/free/claim", "POST", { sku: bundleSku })).status,
    ).toBe(401);
    const results = await Promise.all([
      api("/api/free/claim", "POST", { sku: bundleSku }, otherCookie),
      api("/api/free/claim", "POST", { sku: bundleSku }, otherCookie),
    ]);
    expect(results.map((r) => r.status)).toEqual([200, 200]);
    const { rows } = await pool.query(
      "SELECT e.sku FROM entitlements e JOIN orders o ON o.id=e.order_id WHERE o.email=$1",
      [other],
    );
    expect(rows).toEqual([{ sku }]);
    expect(
      (
        await api(
          "/api/admin/bundles",
          "POST",
          { bundleSku, items: ["PDF03"] },
          adminCookie,
        )
      ).status,
    ).toBe(409);
    await pool.query(
      "UPDATE entitlements SET active=false WHERE order_id IN (SELECT id FROM orders WHERE email=$1)",
      [other],
    );
    await pool.query(
      "UPDATE products SET visible=false,purchasable=false WHERE sku=$1",
      [bundleSku],
    );
  });
  it("persists explicit newsletter confirmation and unsubscribe", async () => {
    const target = "newsletter-" + testId + "@example.test";
    expect(
      (
        await api("/api/leads", "POST", {
          email: target,
          marketing: true,
          website: "",
        })
      ).status,
    ).toBe(200);
    let token = "";
    for (const name of await readdir(".data/mail")) {
      const mail = JSON.parse(await readFile(".data/mail/" + name, "utf8"));
      if (mail.to === target) {
        token = mail.text.match(/token=([a-f0-9]{64})/)[1];
        break;
      }
    }
    expect(token).toHaveLength(64);
    expect(
      (
        await api("/api/newsletter/preferences", "POST", {
          token,
          action: "confirm",
          marketing: true,
        })
      ).status,
    ).toBe(200);
    expect(
      (
        await pool.query(
          "SELECT marketing,confirmed FROM leads WHERE email=$1",
          [target],
        )
      ).rows[0],
    ).toEqual({ marketing: true, confirmed: true });
    expect(
      (
        await api("/api/newsletter/preferences", "POST", {
          token,
          action: "unsubscribe",
        })
      ).status,
    ).toBe(200);
    expect(
      (
        await pool.query(
          "SELECT marketing,confirmed FROM leads WHERE email=$1",
          [target],
        )
      ).rows[0],
    ).toEqual({ marketing: false, confirmed: false });
  });
  it("rejects oversized chunked bodies before JSON parsing", async () => {
    const status = await new Promise<number>((resolve, reject) => {
      const req = httpRequest(
        base + "/api/contact",
        {
          method: "POST",
          headers: {
            origin: base,
            "content-type": "application/json",
            "transfer-encoding": "chunked",
          },
        },
        (res) => {
          resolve(res.statusCode!);
          res.resume();
        },
      );
      req.on("error", reject);
      req.write('{"message":"');
      req.write("x".repeat(140000));
      req.end('"}');
    });
    expect(status).toBe(413);
  });
  it("queues one transactional email and blocks editor policy bypass", async () => {
    expect(
      (
        await pool.query("SELECT id FROM email_jobs WHERE recipient=$1", [
          email,
        ])
      ).rowCount,
    ).toBe(1);
    const editor = await session(
      "editor-" + testId + "@example.test",
      "editor",
    );
    expect(
      (
        await api(
          "/api/admin/content",
          "POST",
          {
            slug: "privacy",
            kind: "page",
            title: "Policy bypass",
            summary: "Must be rejected by server role checks.",
            body: "Synthetic attempt to bypass policy editing role checks.",
            published: true,
          },
          editor,
        )
      ).status,
    ).toBe(403);
    expect((await api("/api/admin/settings", "POST", {}, editor)).status).toBe(
      403,
    );
    const gates = await (
      await api("/api/admin/release-gates", "GET", undefined, adminCookie)
    ).json();
    expect(gates.some((g: any) => !g.passed)).toBe(true);
  });
  it("protects files across users, expires links and rechecks revocation", async () => {
    expect((await api("/api/download/" + fileId, "POST")).status).toBe(401);
    expect(
      (await api("/api/download/" + fileId, "POST", undefined, otherCookie))
        .status,
    ).toBe(404);
    const r = await api(
      "/api/download/" + fileId,
      "POST",
      undefined,
      buyerCookie,
    );
    expect(r.status).toBe(200);
    const { url } = await r.json();
    const bytes = await api(url, "GET", undefined, buyerCookie);
    expect(bytes.status).toBe(200);
    expect(await bytes.text()).toContain("Synthetic purchased fixture");
    expect((await api(url, "GET", undefined, otherCookie)).status).toBe(410);
    await pool.query(
      "UPDATE download_tokens SET expires_at=now()-interval '1 second' WHERE hash=$1",
      [sha(url.split("/").pop())],
    );
    expect((await api(url, "GET", undefined, buyerCookie)).status).toBe(410);
    expect(
      (await hook("refunded", new Date(Date.now() + 1000).toISOString()))
        .status,
    ).toBe(200);
    expect(
      (await api("/api/download/" + fileId, "POST", undefined, buyerCookie))
        .status,
    ).toBe(404);
    await hook("paid", new Date(Date.now() - 10000).toISOString());
    expect(
      (
        await pool.query("SELECT status FROM orders WHERE provider_id=$1", [
          providerId,
        ])
      ).rows[0].status,
    ).toBe("refunded");
    await pool.query(
      "UPDATE products SET visible=false,purchasable=false WHERE sku=$1",
      [sku],
    );
  });
});

afterAll(async () => {
  await pool.query(
    "UPDATE products SET visible=false,purchasable=false WHERE sku=$1",
    [sku],
  );
  await pool.query(
    "UPDATE products SET visible=false,purchasable=false WHERE sku=$1",
    [sku + "-B"],
  );
  await pool.end();
});
