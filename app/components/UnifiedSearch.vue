<script setup lang="ts">
const route = useRoute(),
  router = useRouter(),
  q = ref(String(route.query.q || ""));
const { data, status, refresh } = await useFetch("/api/search", {
  query: computed(() => ({ q: String(route.query.q || "") })),
});
async function search() {
  await router.push({ query: { q: q.value } });
  await refresh();
}
</script>
<template>
  <div class="stack">
    <form class="row" role="search" @submit.prevent="search">
      <label class="field" style="flex: 1"
        ><span>Search products and public articles</span
        ><input
          v-model="q"
          type="search"
          maxlength="150"
          placeholder="Try engineering or webhook" /></label
      ><button class="button">Search</button>
    </form>
    <p role="status">
      {{
        status === "pending"
          ? "Searching…"
          : `${(data?.products.length || 0) + (data?.articles.length || 0)} results`
      }}
    </p>
    <section v-if="data?.products.length" class="stack">
      <h2>Planned resources</h2>
      <NuxtLink
        v-for="p in data.products"
        :key="p.sku"
        :to="p.path"
        class="panel small-stack"
        ><h3>{{ p.title }}</h3>
        <p>{{ p.description }}</p></NuxtLink
      >
    </section>
    <section v-if="data?.articles.length" class="stack">
      <h2>Public articles & help</h2>
      <NuxtLink
        v-for="a in data.articles"
        :key="a.slug"
        :to="a.path"
        class="panel small-stack"
        ><h3>{{ a.title }}</h3>
        <p>{{ a.summary }}</p></NuxtLink
      >
    </section>
    <p v-if="route.query.q && !data?.products.length && !data?.articles.length">
      No results. Try a shorter term or
      <NuxtLink to="/catalog" class="text-link">browse the collection</NuxtLink
      >.
    </p>
  </div>
</template>
