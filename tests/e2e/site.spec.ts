import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readdir, readFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
test("catalog discovery, filters, empty recovery, preview and notification", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Build with AI.",
  );
  await page
    .getByRole("link", { name: "Explore the library", exact: true })
    .click();
  await page
    .getByLabel("Search resources")
    .fill("Complete Application Anatomy");
  await page.getByRole("button", { name: "Search library" }).click();
  await expect(page.locator(".product-card")).toHaveCount(2);
  await expect(page).toHaveURL(/q=Complete/);
  await page
    .getByRole("heading", {
      name: "The Complete Application Anatomy",
      exact: true,
    })
    .getByRole("link")
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "The Complete Application Anatomy",
  );
  await page.getByRole("button", { name: "Explore the outline" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page
    .getByLabel("Email address")
    .fill("browser-" + randomUUID().slice(0, 8) + "@example.test");
  await page.getByRole("button", { name: "Notify me when it’s ready" }).click();
  await expect(
    page.getByRole("status").filter({ hasText: "Request saved" }),
  ).toBeVisible();
  await page.goto("/catalog?q=definitely-no-matching-resource-xyz");
  await expect(
    page.getByRole("heading", { name: "No matching resources" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.locator(".product-card")).toHaveCount(12);
});
test("responsive navigation, themes, keyboard focus and accessibility", async ({
  page,
}) => {
  for (const width of [320, 375, 768, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    if (width === 375) {
      await page.getByRole("button", { name: "Menu", exact: true }).click();
      await expect(
        page.getByRole("navigation", { name: "Mobile navigation" }),
      ).toBeVisible();
      await page
        .getByRole("navigation", { name: "Mobile navigation" })
        .getByRole("link", { name: "Agent skills" })
        .click();
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        "Agent skills",
      );
    }
  }
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
  const violations = (
    await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze()
  ).violations;
  expect(violations).toEqual([]);
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});
test("real email-link sign-in, account preferences and sign-out", async ({
  page,
}) => {
  const email = "browser-auth-" + randomUUID().slice(0, 8) + "@example.test";
  await page.goto("/account/sign-in");
  await page.getByLabel("Email address").fill(email);
  await page.getByRole("button", { name: "Send sign-in link" }).click();
  await expect(page.locator("p[role=status]")).toContainText(
    "Check your email",
  );
  const names = await readdir(".data/mail");
  let link = "";
  for (const name of names) {
    const m = JSON.parse(await readFile(".data/mail/" + name, "utf8"));
    if (m.to === email) {
      link = m.text.match(/http[^\s]+/)?.[0] || "";
      break;
    }
  }
  expect(link).not.toBe("");
  await page.goto(link);
  await page.getByRole("button", { name: "Continue to my account" }).click();
  await expect(page).toHaveURL("/account");
  await page
    .getByRole("navigation", { name: "Account navigation" })
    .getByRole("link", { name: "Profile", exact: true })
    .click();
  await page.getByLabel("Display name").fill("Browser verification");
  await page.getByRole("button", { name: "Save preferences" }).click();
  await expect(page.locator("p[role=status]")).toContainText("Changes saved");
  await page.reload();
  await expect(page.getByLabel("Display name")).toHaveValue(
    "Browser verification",
  );
  await page.goto("/account/sign-out");
  await page.getByRole("button", { name: "Confirm sign out" }).click();
  await page.goto("/account/library");
  await expect(page).toHaveURL(/sign-in/);
});
test("public routes, all 83 product routes and private denial render", async ({
  page,
  request,
}) => {
  const routes = [
    "/catalog",
    "/library",
    "/skills",
    "/templates",
    "/atlases",
    "/labs",
    "/blueprints",
    "/bundles",
    "/free",
    "/about",
    "/methodology",
    "/roadmap",
    "/updates",
    "/blog",
    "/faq",
    "/contact",
    "/affiliates",
    "/licensing",
    "/support",
    "/search",
    "/newsletter",
    "/privacy",
    "/terms",
    "/terms-of-sale",
    "/refund-policy",
    "/cookies",
    "/imprint",
    "/accessibility",
    "/checkout/complete",
    "/checkout/cancelled",
    "/account/sign-in",
  ];
  for (const route of routes) {
    const r = await request.get(route);
    expect(r.status(), route).toBe(200);
    expect(await r.text(), route).toContain("<h1");
  }
  const response = await request.get("/api/catalog?limit=100");
  const data = await response.json();
  const paths: Record<string, string> = {
    PDF_GUIDE: "library",
    AGENT_SKILL: "skills",
    VISUAL_ATLAS: "atlases",
    TEMPLATE: "templates",
    LAB: "labs",
    PRODUCT_BLUEPRINT: "blueprints",
    BUNDLE: "bundles",
    FREE_RESOURCE: "free",
  };
  for (const p of data.items.filter((p: any) => !p.sku.startsWith("TEST-"))) {
    const r = await request.get("/" + paths[p.type] + "/" + p.slug);
    expect(r.status(), p.sku).toBe(200);
  }
  await page.goto("/does-not-exist");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "This page isn’t here.",
  );
  await page.goto("/admin");
  await expect(page).toHaveURL(/sign-in/);
});

test("administrator creates and revises a product and publishes safe editorial content", async ({
  page,
  context,
}) => {
  const { default: pg } = await import("pg");
  const { randomBytes, createHash } = await import("node:crypto");
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const id = randomUUID().slice(0, 8),
    sku = "TEST-UI-" + id.toUpperCase(),
    token = randomBytes(32).toString("hex");
  const email = "ui-admin-" + id + "@example.test";
  const user = await pool.query(
    "INSERT INTO users(email,role) VALUES($1,'admin') RETURNING id",
    [email],
  );
  await pool.query(
    "INSERT INTO sessions(hash,user_id,expires_at) VALUES($1,$2,now()+interval '1 hour')",
    [createHash("sha256").update(token).digest("hex"), user.rows[0].id],
  );
  await context.addCookies([
    {
      name: "ae_session",
      value: token,
      url: process.env.APP_BASE_URL || "http://localhost:3000",
      httpOnly: true,
      sameSite: "Lax",
    },
  ]);
  try {
    await page.goto("/admin/products");
    await page
      .getByRole("link", { name: "Create product", exact: true })
      .click();
    await page.getByLabel("SKU", { exact: true }).fill(sku);
    await page
      .getByLabel("title", { exact: true })
      .fill("Browser synthetic product");
    await page
      .getByLabel("slug", { exact: true })
      .fill("browser-synthetic-" + id);
    await page
      .getByLabel("description", { exact: true })
      .fill(
        "Synthetic browser product for validating the actual admin editor.",
      );
    await page
      .getByRole("button", { name: "Save product", exact: true })
      .click();
    await expect(page).toHaveURL("/admin/products/" + sku);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Browser synthetic product",
    );
    await page
      .getByLabel("title", { exact: true })
      .fill("Browser revised product");
    await page
      .getByRole("button", { name: "Save product", exact: true })
      .click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Browser revised product",
    );
    await page.reload();
    await expect(page.getByLabel("title", { exact: true })).toHaveValue(
      "Browser revised product",
    );
    const row = (
      await pool.query(
        "SELECT revision,status,purchasable FROM products WHERE sku=$1",
        [sku],
      )
    ).rows[0];
    expect(row).toEqual({ revision: 2, status: "PLANNED", purchasable: false });
    await page.goto("/admin/content");
    await page
      .getByRole("button", { name: "Create content", exact: true })
      .click();
    await page
      .getByLabel("title", { exact: true })
      .fill("Browser evidence article " + id);
    await page
      .getByLabel("slug", { exact: true })
      .fill("browser-evidence-" + id);
    await page
      .getByLabel("summary", { exact: true })
      .fill(
        "Synthetic editorial content created through the actual browser form.",
      );
    await page
      .getByLabel("Body (plain text with ## section headings)", { exact: true })
      .fill(
        "## Test evidence\nThis synthetic article verifies safe content rendering.\n<script>window.pwned=true</script>",
      );
    await page.getByLabel("Publish this content", { exact: true }).check();
    await page
      .getByRole("button", { name: "Save content", exact: true })
      .click();
    await expect(
      page.getByRole("heading", { name: "Create content", exact: true }),
    ).not.toBeVisible();
    await page.goto("/blog/browser-evidence-" + id);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Browser evidence article " + id,
    );
    expect(
      await page.evaluate(() => Reflect.get(window, "pwned")),
    ).toBeUndefined();
    for (const section of [
      "products",
      "categories",
      "collections",
      "bundles",
      "assets",
      "orders",
      "customers",
      "entitlements",
      "downloads",
      "refunds",
      "leads",
      "newsletter",
      "content",
      "articles",
      "pages",
      "seo",
      "legal",
      "consent",
      "support",
      "affiliates",
      "settings",
      "audit-log",
      "webhooks",
      "integrations",
      "health",
      "release-gates",
    ]) {
      const response = await page.request.get("/admin/" + section);
      expect(response.status(), section).toBe(200);
      const html = await response.text();
      expect(html, section).not.toContain("Could not load this resource.");
    }
    await page.goto("/admin/release-gates");
    await expect(
      page.getByText("BLOCKED", { exact: true }).first(),
    ).toBeVisible();
    const violations = (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations;
    expect(violations).toEqual([]);
  } finally {
    await pool.query(
      "UPDATE products SET visible=false,purchasable=false WHERE sku=$1",
      [sku],
    );
    await pool.query("UPDATE content SET published=false WHERE slug=$1", [
      "browser-evidence-" + id,
    ]);
    await pool.end();
  }
});

test("search includes published articles and network failures offer recovery", async ({
  page,
}) => {
  await page.goto("/search?q=evidence");
  await expect(
    page.getByRole("heading", { name: "Public articles & help" }),
  ).toBeVisible();
  await page.route("**/api/leads", (route) =>
    route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({
        statusMessage:
          "Email is temporarily unavailable. Please try again later.",
      }),
    }),
  );
  await page.goto("/newsletter");
  await page.getByLabel("Email address").fill("failure-test@example.test");
  await page.getByRole("button", { name: "Subscribe to the journal" }).click();
  await expect(page.locator("p.form-result")).toContainText(
    "temporarily unavailable",
  );
});

test("guest checkout reaches verified account and downloads real private bytes", async ({
  page,
}) => {
  const { default: pg } = await import("pg");
  const { createHash } = await import("node:crypto");
  const { mkdir, writeFile } = await import("node:fs/promises");
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const id = randomUUID().slice(0, 8),
    sku = "TEST-BUY-" + id.toUpperCase(),
    slug = "browser-purchase-" + id,
    email = "browser-buyer-" + id + "@example.test",
    key = randomUUID(),
    bytes = Buffer.from(
      "# Synthetic browser delivery fixture\nNot a commercial resource.",
    );
  const owner = await pool.query(
    "INSERT INTO users(email,role) VALUES($1,'admin') RETURNING id",
    ["fixture-owner-" + id + "@example.test"],
  );
  await pool.query(
    "INSERT INTO products(sku,slug,title,type,tier,description,status,visible,purchasable,cover,license,price_cents,currency,variant_id,reviewed) VALUES($1,$2,'Synthetic Browser Purchase','PDF_GUIDE','BUILDER','Synthetic product for end-to-end browser checkout verification.','PUBLISHED',true,true,'/covers/PDF03.svg','Synthetic personal test license',2500,'EUR',$3,true)",
    [sku, slug, "browser-" + id],
  );
  const version = await pool.query(
    "INSERT INTO versions(sku,version,notes,compatibility,published) VALUES($1,'1.0.0','Synthetic release fixture','Plain UTF-8 text',true) RETURNING id",
    [sku],
  );
  await mkdir(".data/private", { recursive: true });
  await writeFile(".data/private/" + key, bytes, { mode: 0o600 });
  await pool.query(
    "INSERT INTO files(version_id,key,name,mime,size,sha256,scan_status,uploaded_by) VALUES($1,$2,'browser-fixture.md','text/plain',$3,$4,'APPROVED',$5)",
    [
      version.rows[0].id,
      key,
      bytes.length,
      createHash("sha256").update(bytes).digest("hex"),
      owner.rows[0].id,
    ],
  );
  try {
    await page.goto("/library/" + slug);
    await page
      .getByRole("button", { name: "Continue to secure checkout" })
      .click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Simulated checkout",
    );
    await page.getByLabel("Test customer email").fill(email);
    await page.getByRole("button", { name: "Simulate test payment" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Payment verified.",
    );
    await page.getByRole("link", { name: "Sign in to my library" }).click();
    await page.getByLabel("Email address").fill(email);
    await page.getByRole("button", { name: "Send sign-in link" }).click();
    await expect(page.locator("p[role=status]")).toContainText(
      "Check your email",
    );
    let link = "";
    for (const name of await readdir(".data/mail")) {
      const m = JSON.parse(await readFile(".data/mail/" + name, "utf8"));
      if (m.to === email && m.subject.includes("sign-in")) {
        link = m.text.match(/http[^\s]+/)[0];
        break;
      }
    }
    expect(link).not.toBe("");
    await page.goto(link);
    await page.getByRole("button", { name: "Continue to my account" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Your workspace",
    );
    await page.getByRole("link", { name: "Open my library" }).click();
    const downloadPromise = page.waitForEvent("download");
    await page
      .getByRole("button", { name: "Download browser-fixture.md" })
      .click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("browser-fixture.md");
    expect(await readFile((await download.path())!)).toEqual(bytes);
    await page.goto("/account/orders");
    await expect(
      page.getByRole("heading", { name: "Synthetic Browser Purchase" }),
    ).toBeVisible();
    const order = (
      await pool.query("SELECT status,snapshot FROM orders WHERE email=$1", [
        email,
      ])
    ).rows[0];
    expect(order.status).toBe("paid");
    expect(order.snapshot.skus).toEqual([sku]);
  } finally {
    await pool.query(
      "UPDATE products SET visible=false,purchasable=false WHERE sku=$1",
      [sku],
    );
    await pool.end();
  }
});
