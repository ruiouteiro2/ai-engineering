<script setup lang="ts">
import { categories, tiers, human } from "#shared/catalog";
const props = defineProps<{ category?: string }>();
const route = useRoute(),
  router = useRouter();
const category = computed(() =>
  categories.find((c) => c.path === props.category),
);
const filters = reactive({
  q: String(route.query.q || ""),
  type: category.value?.type || String(route.query.type || ""),
  tier: String(route.query.tier || ""),
  status: String(route.query.status || ""),
  format: String(route.query.format || ""),
  price: String(route.query.price || ""),
  compatibility: String(route.query.compatibility || ""),
  sort: String(route.query.sort || "title"),
});
const view = ref(String(route.query.view || "grid"));
const query = computed(() => ({
  ...filters,
  page: Number(route.query.page || 1),
  limit: 12,
}));
const { data, status, error, refresh } = await useFetch("/api/catalog", {
  query,
});
const title = category.value?.label || "Explore the library";
usePageSeo(
  title,
  category.value?.description ||
    "Browse all planned engineering resources. Filter by format, learning stage and subject.",
);
async function apply() {
  await router.push({
    path: route.path,
    query: Object.fromEntries(
      Object.entries({ ...filters, page: "1", view: view.value }).filter(
        ([, v]) => v,
      ),
    ),
  });
  await refresh();
}
watch(
  () => route.query,
  () => {
    for (const key of [
      "q",
      "tier",
      "status",
      "format",
      "price",
      "compatibility",
      "sort",
    ] as const)
      filters[key] = String(
        route.query[key] || (key === "sort" ? "title" : ""),
      );
    filters.type = category.value?.type || String(route.query.type || "");
  },
);
function page(n: number) {
  router.push({
    query: { ...route.query, ...filters, page: String(n), view: view.value },
  });
}
function reset() {
  Object.assign(filters, {
    q: "",
    type: category.value?.type || "",
    tier: "",
    status: "",
    format: "",
    price: "",
    compatibility: "",
    sort: "title",
  });
  apply();
}
</script>
<template>
  <div class="container">
    <header class="page-heading">
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <NuxtLink to="/">Home</NuxtLink><span>/</span><span>{{ title }}</span>
      </nav>
      <span class="eyebrow">The planned collection</span>
      <h1>{{ title }}</h1>
      <p class="lead">
        {{
          category?.description ||
          "Engineering references and practical tools, from the first requirement to the last recovery drill."
        }}
      </p>
      <p class="small">
        All launch resources are in preparation. Covers and outlines describe
        planned material.
      </p>
    </header>
    <div class="catalog-layout">
      <form class="filters" role="search" @submit.prevent="apply">
        <label class="field search-field"
          ><span>Search resources</span
          ><input
            v-model="filters.q"
            type="search"
            placeholder="Try authentication…"
            maxlength="150" /></label
        ><label v-if="!category" class="field"
          ><span>Resource type</span
          ><select v-model="filters.type" @change="apply">
            <option value="">All types</option>
            <option v-for="c in categories" :key="c.type" :value="c.type">
              {{ c.label }}
            </option>
          </select></label
        ><label class="field"
          ><span>Learning stage</span
          ><select v-model="filters.tier" @change="apply">
            <option value="">All stages</option>
            <option
              v-for="tier in [...tiers, 'CROSS_LEVEL', 'FREE', 'BUNDLE']"
              :key="tier"
              :value="tier"
            >
              {{ human(tier) }}
            </option>
          </select></label
        ><label class="field"
          ><span>File format</span
          ><select v-model="filters.format" @change="apply">
            <option value="">All formats</option>
            <option
              v-for="format in ['PDF', 'PPTX', 'Markdown', 'XLSX', 'ZIP']"
              :key="format"
            >
              {{ format }}
            </option>
          </select></label
        ><label class="field"
          ><span>Availability</span
          ><select v-model="filters.status" @change="apply">
            <option value="">All statuses</option>
            <option value="PLANNED">Planned</option>
            <option value="IN_PRODUCTION">In production</option>
            <option value="PUBLISHED">Available</option>
          </select></label
        ><label class="field"
          ><span>Price availability</span
          ><select v-model="filters.price" @change="apply">
            <option value="">Any price status</option>
            <option value="unpriced">Not released or priced</option>
            <option value="free">Available free resources</option>
            <option value="paid">Available paid resources</option>
          </select></label
        >
        <label class="field"
          ><span>Verified agent compatibility</span
          ><select v-model="filters.compatibility" @change="apply">
            <option value="">Any compatibility status</option>
            <option value="unverified">Not verified</option>
            <option value="codex">Verified Codex</option>
            <option value="claude-code">Verified Claude Code</option>
            <option value="universal">Verified across supported agents</option>
          </select></label
        >
        <button class="button" type="submit">Search library</button
        ><button class="button secondary" type="button" @click="reset">
          Reset filters
        </button>
        <p class="small muted">
          Compatibility is unverified until a skill package has been tested.
          Prices appear only after approval.
        </p>
      </form>
      <div>
        <div class="toolbar">
          <p class="small" role="status">
            {{ data?.total ?? 0 }} resources{{
              category ? " in " + title.toLowerCase() : ""
            }}
          </p>
          <div class="row">
            <label class="sr-only" for="catalog-sort">Sort resources</label
            ><select
              id="catalog-sort"
              v-model="filters.sort"
              style="width: auto"
              @change="apply"
            >
              <option value="title">Title A–Z</option>
              <option value="title-desc">Title Z–A</option>
              <option value="tier">Learning stage</option></select
            ><button
              class="icon-button"
              :aria-label="
                view === 'grid' ? 'Switch to list view' : 'Switch to grid view'
              "
              @click="
                view = view === 'grid' ? 'list' : 'grid';
                apply();
              "
            >
              {{ view === "grid" ? "List" : "Grid" }}
            </button>
          </div>
        </div>
        <div v-if="error" class="empty" role="alert">
          <h2>Library temporarily unavailable</h2>
          <p>Try loading the catalog again.</p>
          <button class="button" @click="refresh()">Retry</button>
        </div>
        <div
          v-else-if="status === 'pending' && !data"
          class="product-grid"
          aria-label="Loading resources"
        >
          <div v-for="n in 6" :key="n" class="skeleton" />
        </div>
        <div v-else-if="!data?.items.length" class="empty">
          <h2>No matching resources</h2>
          <p>Try a broader term or clear a filter.</p>
          <button class="button secondary" @click="reset">Clear filters</button>
        </div>
        <div
          v-else
          class="product-grid"
          :class="{ list: view === 'list' }"
          :aria-busy="status === 'pending'"
        >
          <ProductCard v-for="p in data.items" :key="p.sku" :product="p" />
        </div>
        <nav
          v-if="data && data.total > 12"
          class="pagination"
          aria-label="Catalog pages"
        >
          <button
            class="button secondary"
            :disabled="data.page <= 1"
            @click="page(data.page - 1)"
          >
            Previous</button
          ><span class="small"
            >{{ data.page }} / {{ Math.ceil(data.total / 12) }}</span
          ><button
            class="button secondary"
            :disabled="data.page * 12 >= data.total"
            @click="page(data.page + 1)"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>
