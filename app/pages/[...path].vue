<script setup lang="ts">
import { categories, tiers, human } from "#shared/catalog";
import { infoPages } from "#shared/pages";
import seed from "~~/catalog-seed.json";
const route = useRoute();
const parts = (
  Array.isArray(route.params.path)
    ? route.params.path
    : String(route.params.path || "").split("/")
).filter(Boolean);
const section = parts[0] || "",
  slug = parts[1];
const category = categories.find((c) => c.path === section);
const { data: cmsPage } = await useFetch<{
  title: string;
  summary: string;
  body: string;
  draft?: boolean;
  eyebrow: string;
} | null>("/api/pages/" + section, {
  immediate: !category && !slug,
});
const info = cmsPage.value || infoPages[section];
const special = [
  "catalog",
  "methodology",
  "roadmap",
  "updates",
  "free",
  "blog",
  "guides",
  "support",
  "faq",
  "contact",
  "search",
  "newsletter",
  "cookies",
];
if (
  parts.length > 2 ||
  (!category && !info && !special.includes(section)) ||
  (info && slug)
)
  throw createError({ statusCode: 404, statusMessage: "Page not found" });
if (slug && !category && !["blog", "guides", "support"].includes(section))
  throw createError({ statusCode: 404, statusMessage: "Page not found" });
const { data: releases } = await useFetch("/api/updates", {
  immediate: section === "updates",
});
const { data: freeProducts } = await useFetch("/api/catalog", {
  query: { type: "FREE_RESOURCE", limit: 100 },
  immediate: section === "free" && !slug,
});
const readyFree = computed(() =>
  freeProducts.value?.items.find(
    (p) => p.status === "PUBLISHED" && p.priceCents === 0,
  ),
);
const search = ref(String(route.query.q || ""));
const contentKind =
  section === "support" ? "help" : section === "guides" ? "guide" : "article";
const editorial = ["blog", "guides", "support"].includes(section);
const { data: articles } = await useFetch("/api/articles", {
  query: { kind: contentKind },
  immediate: editorial && !slug,
});
const { data: article, error: articleError } = await useFetch<{
  title: string;
  summary: string;
  body: string;
  kind: string;
}>("/api/articles/" + slug, { immediate: editorial && !!slug });
if (
  editorial &&
  slug &&
  (articleError.value || !article.value || article.value.kind !== contentKind)
)
  throw createError({ statusCode: 404, statusMessage: "Article not found" });
const articlePage = computed(() => Math.max(1, Number(route.query.page) || 1));
const filteredArticles = computed(
  () =>
    articles.value?.filter((a) =>
      (a.title + " " + a.summary)
        .toLowerCase()
        .includes(search.value.toLowerCase()),
    ) || [],
);
const pageArticles = computed(() =>
  filteredArticles.value.slice(
    (articlePage.value - 1) * 6,
    articlePage.value * 6,
  ),
);
watch(search, () => {
  if (editorial)
    navigateTo({ path: route.path, query: { q: search.value, page: "1" } });
});
const titles: Record<string, string> = {
  methodology: "From assumptions to evidence.",
  roadmap: "The library we’re building.",
  updates: "Release notes",
  free: "The AI Software Reality Check",
  blog: "Engineering journal",
  guides: "Public engineering guides",
  support: "How can we help?",
  faq: "Questions, answered.",
  contact: "Get in touch.",
  search: "Search the collection",
  newsletter: "Notes on better engineering.",
  cookies: "Your privacy choices",
};
if (!category && section !== "catalog")
  usePageSeo(
    article.value?.title || info?.title || titles[section] || section,
    article.value?.summary ||
      info?.summary ||
      "AI Engineering Mastery System — planned educational library and practical engineering resources.",
  );
if (info?.draft) useSeoMeta({ robots: "noindex,follow" });
const preference = useCookie<{ analytics: boolean; marketing: boolean }>(
  "privacy-preferences",
  {
    default: () => ({ analytics: false, marketing: false }),
    sameSite: "lax",
    maxAge: 31536000,
  },
);
const cookieResult = ref(""),
  prefBusy = ref(false),
  newsletterResult = ref("");
async function saveChoices(accept: boolean) {
  prefBusy.value = true;
  try {
    await apiRequest("/api/consent", {
      method: "POST",
      body: { analytics: accept, marketing: accept },
    });
    preference.value = { analytics: accept, marketing: accept };
    cookieResult.value = accept
      ? "Preferences saved. Optional services remain inactive until configured."
      : "Optional tracking rejected. Essential functions remain available.";
  } catch {
    cookieResult.value =
      "Could not save preferences. Optional tracking remains off.";
  } finally {
    prefBusy.value = false;
  }
}
async function confirmNewsletter() {
  try {
    await apiRequest("/api/newsletter/preferences", {
      method: "POST",
      body: {
        token: String(route.query.token || ""),
        action: String(route.query.action || "confirm"),
        marketing: route.query.marketing === "1",
      },
    });
    newsletterResult.value =
      route.query.action === "unsubscribe"
        ? "You have been unsubscribed."
        : "Your preferences are confirmed.";
  } catch (e: any) {
    newsletterResult.value =
      e.data?.statusMessage || "Could not update preferences.";
  }
}
</script>
<template>
  <ProductDetail v-if="category && slug" :slug="slug" :category="section" />
  <CatalogBrowser
    v-else-if="section === 'catalog' || (category && section !== 'free')"
    :category="category?.path"
  />
  <ProductDetail
    v-else-if="section === 'free' && readyFree"
    :slug="readyFree.slug"
    category="free"
  />
  <div v-else class="container">
    <header class="page-heading">
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <NuxtLink to="/">Home</NuxtLink><span>/</span
        ><span>{{ article?.title || info?.eyebrow || titles[section] }}</span>
      </nav>
      <span class="eyebrow">{{
        info?.eyebrow || "AI Engineering Mastery System"
      }}</span>
      <h1>{{ article?.title || info?.title || titles[section] }}</h1>
      <p v-if="article?.summary || info?.summary" class="lead">
        {{ article?.summary || info?.summary }}
      </p>
    </header>
    <section class="section" style="padding-top: 12px">
      <template v-if="info"
        ><div class="stack measure">
          <p v-if="info.draft" class="notice">
            Draft · Review required before commercial launch
          </p>
          <PlainContent :body="info.body" /><NuxtLink
            to="/contact"
            class="text-link"
            >Contact the project →</NuxtLink
          >
        </div></template
      >
      <template v-else-if="article && slug"
        ><div class="two-columns">
          <PlainContent :body="article.body" />
          <aside class="small-stack" style="align-content: start">
            <h3>Keep exploring</h3>
            <NuxtLink to="/catalog" class="text-link"
              >Browse the planned library →</NuxtLink
            ><NuxtLink to="/guides/evidence-before-confidence" class="text-link"
              >Create an evidence register →</NuxtLink
            >
          </aside>
        </div></template
      >
      <template v-else-if="editorial"
        ><div class="stack">
          <p v-if="section === 'support'" class="lead">
            Sign in with your checkout email to view orders and downloads. Never
            share a sign-in link or payment card details with support.
          </p>
          <label class="field measure"
            ><span
              >Search
              {{ section === "support" ? "help articles" : "articles" }}</span
            ><input
              v-model="search"
              type="search"
              placeholder="Search by topic"
          /></label>
          <div class="two-columns">
            <NuxtLink
              v-for="a in pageArticles"
              :key="a.slug"
              :to="'/' + section + '/' + a.slug"
              class="panel stack"
              ><h2 style="font-size: 1.6rem">{{ a.title }}</h2>
              <p>{{ a.summary }}</p>
              <span class="text-link">Read →</span></NuxtLink
            >
          </div>
          <p v-if="!filteredArticles.length" role="status">
            No articles match this search. Try a shorter term.
          </p>
          <nav
            v-if="filteredArticles.length > 6"
            class="pagination"
            aria-label="Article pages"
          >
            <NuxtLink
              v-if="articlePage > 1"
              class="button secondary"
              :to="{
                path: route.path,
                query: { q: search, page: articlePage - 1 },
              }"
              >Previous</NuxtLink
            ><span
              >{{ articlePage }} /
              {{ Math.ceil(filteredArticles.length / 6) }}</span
            ><NuxtLink
              v-if="articlePage * 6 < filteredArticles.length"
              class="button secondary"
              :to="{
                path: route.path,
                query: { q: search, page: articlePage + 1 },
              }"
              >Next</NuxtLink
            >
          </nav>
          <div class="row">
            <NuxtLink v-if="section === 'support'" class="button" to="/contact"
              >Contact support</NuxtLink
            ><NuxtLink
              v-if="section === 'support'"
              class="button secondary"
              to="/account/orders"
              >Find my orders</NuxtLink
            >
          </div>
        </div></template
      >
      <template v-else-if="section === 'free'"
        ><div class="two-columns">
          <div class="stack">
            <p class="lead">
              50 things AI coding agents forget about your application. A
              planned free guide for examining what a successful demo leaves
              unanswered.
            </p>
            <img
              src="/covers/FREE01.svg"
              alt="AI Software Reality Check — planned free kit concept cover"
              width="600"
              height="800"
              style="max-width: 280px"
            />
            <h2>Proposed kit</h2>
            <ul>
              <li>20–30 page annotated guide</li>
              <li>50 checks in five groups of ten</li>
              <li>Project Auditor Lite skill</li>
              <li>An illustrative audit report</li>
              <li>Three worked failure cases</li>
            </ul>
            <p>
              No files are available yet. These are proposed contents, pending
              authoring and review.
            </p>
          </div>
          <div class="panel" style="align-self: start">
            <h3 style="margin-bottom: 22px">Get a release notification</h3>
            <NotifyForm sku="FREE01" />
          </div></div
      ></template>
      <template v-else-if="section === 'methodology'"
        ><div class="stack">
          <p class="lead">
            Understand → Specify → Build → Break → Verify → Deploy → Operate.
            Examine every feature across its actors, data, errors and lifecycle.
          </p>
          <ScopeExplorer />
          <h2>Six stages of practice</h2>
          <div class="three-columns">
            <NuxtLink
              v-for="(tier, i) in tiers"
              :key="tier"
              :to="'/catalog?tier=' + tier"
              class="panel small-stack"
              ><span class="eyebrow">Stage {{ i + 1 }}</span>
              <h3>{{ human(tier) }}</h3>
              <span class="text-link small"
                >Explore planned resources →</span
              ></NuxtLink
            >
          </div>
          <h2>The 40-domain scope register</h2>
          <div class="two-columns">
            <div v-for="d in seed.scopeDomains" :key="d.id" class="scope-row">
              <code>{{ d.id }}</code>
              <div>
                <strong>{{ d.name }}</strong>
                <p class="small">{{ d.coverage }}</p>
              </div>
            </div>
          </div>
          <div class="notice">
            Applicability and verification are separate. A domain can be
            applicable and still unverified. A page’s presence does not prove a
            complete workflow.
          </div>
        </div></template
      >
      <template v-else-if="section === 'roadmap'"
        ><div class="stack">
          <p class="lead">
            83 planned resources. No announced release dates. Product status
            will change as material is authored, reviewed and prepared for
            delivery.
          </p>
          <div class="three-columns">
            <NuxtLink
              v-for="c in categories"
              :key="c.path"
              :to="'/' + c.path"
              class="panel small-stack"
              ><span class="badge planned">Planned</span>
              <h2>
                {{ seed.products.filter((p) => p.type === c.type).length }}
              </h2>
              <h3>{{ c.label }}</h3>
              <p>{{ c.description }}</p></NuxtLink
            >
          </div>
          <h2>Failure case index</h2>
          <p>
            The 100 cases below are planned sections, not completed articles or
            separate checkout items.
          </p>
          <details
            v-for="categoryName in [
              ...new Set(seed.edgeCases.map((e) => e.category)),
            ]"
            :key="categoryName"
          >
            <summary>{{ categoryName }}</summary>
            <div>
              <p
                v-for="e in seed.edgeCases.filter(
                  (e) => e.category === categoryName,
                )"
                :key="e.id"
                class="scope-row"
              >
                <code>{{ e.id }}</code
                >{{ e.title }}
              </p>
            </div>
          </details>
        </div></template
      >
      <template v-else-if="section === 'updates'">
        <div v-if="releases?.length" class="stack">
          <article
            v-for="r in releases"
            :key="r.sku + r.version"
            class="panel stack"
          >
            <span class="eyebrow"
              >{{ r.version }} ·
              {{
                new Date(r.createdAt).toLocaleDateString("en-GB", {
                  timeZone: "UTC",
                })
              }}</span
            >
            <h2>{{ r.title }}</h2>
            <PlainContent :body="r.notes" />
            <p>{{ r.compatibility }}</p>
            <NuxtLink
              class="text-link"
              :to="
                '/' +
                categories.find((c) => c.type === r.type)?.path +
                '/' +
                r.slug
              "
              >View resource →</NuxtLink
            >
          </article>
        </div>
        <div v-else class="empty">
          <h2>No product releases yet</h2>
          <p>
            Published versions, compatibility notes and changelogs will appear
            here when reviewed files are released.
          </p>
          <NuxtLink to="/roadmap" class="button secondary"
            >View the roadmap</NuxtLink
          >
        </div></template
      >
      <template v-else-if="section === 'faq'"
        ><div class="stack measure">
          <label class="field"
            ><span>Search questions</span
            ><input v-model="search" type="search" /></label
          ><FaqList :search="search" /></div
      ></template>
      <template v-else-if="section === 'contact'"
        ><div class="two-columns">
          <div class="stack" style="align-content: start">
            <p class="lead">
              Ask about the collection, report an issue, or request help with
              your account.
            </p>
            <p>
              Include the resource or order reference when relevant. Support
              response times have not been established.
            </p>
            <NuxtLink to="/support" class="text-link"
              >Read the help articles →</NuxtLink
            >
          </div>
          <ContactForm /></div
      ></template>
      <template v-else-if="section === 'newsletter'"
        ><div class="two-columns">
          <div class="stack" style="align-content: start">
            <p class="lead">
              Occasional writing on product scope, agent workflows and
              evidence-driven software development.
            </p>
            <p>
              No promised schedule. Confirm your subscription by email and
              unsubscribe when you choose.
            </p>
          </div>
          <div class="panel">
            <template v-if="route.query.token"
              ><p class="small" style="margin-bottom: 20px">
                {{
                  route.query.action === "unsubscribe"
                    ? "Cancel newsletter and release notifications."
                    : "Confirm the preferences you requested."
                }}
              </p>
              <button class="button" @click="confirmNewsletter">
                {{
                  route.query.action === "unsubscribe"
                    ? "Unsubscribe"
                    : "Confirm preferences"
                }}
              </button>
              <p role="status">{{ newsletterResult }}</p></template
            ><NotifyForm v-else newsletter />
          </div></div
      ></template>
      <template v-else-if="section === 'cookies'"
        ><div class="stack measure">
          <p>
            Essential session cookies keep you signed in. Theme and privacy
            choices remember your preferences. No third-party analytics or
            advertising scripts are active.
          </p>
          <p>
            Optional analytics and marketing permissions currently remain
            {{ preference.analytics ? "accepted" : "off" }}. You can withdraw
            permission at any time.
          </p>
          <div class="row">
            <button
              class="button"
              :disabled="prefBusy"
              @click="saveChoices(false)"
            >
              Reject optional tracking</button
            ><button
              class="button secondary"
              :disabled="prefBusy"
              @click="saveChoices(true)"
            >
              Accept optional tracking
            </button>
          </div>
          <p role="status">{{ cookieResult }}</p>
          <NuxtLink to="/privacy" class="text-link"
            >Read privacy information →</NuxtLink
          >
        </div></template
      >
      <template v-else-if="section === 'search'"><UnifiedSearch /></template>
    </section>
  </div>
</template>
