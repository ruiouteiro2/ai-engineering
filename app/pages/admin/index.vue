<script setup lang="ts">
definePageMeta({ middleware: "admin" });
const { data } = await useFetch("/api/admin/overview");
usePageSeo("Administration", "Catalog and commerce operations.");
</script>
<template>
  <AdminShell
    ><div class="stack">
      <span class="eyebrow">Operations console</span>
      <h1 style="font-size: 2.7rem">A clear view of the work.</h1>
      <p class="notice">
        Live selling is disabled. These are current database counts, including
        local test records.
      </p>
      <div class="three-columns">
        <div
          v-for="m in [
            ['Catalog records', data?.products],
            ['Orders', data?.orders],
            ['Open support', data?.openSupport],
          ]"
          :key="String(m[0])"
          class="panel small-stack"
        >
          <span class="small muted">{{ m[0] }}</span>
          <h2>{{ m[1] }}</h2>
        </div>
      </div>
      <div class="panel stack">
        <h2>Prepare a real release</h2>
        <p>
          Edit product metadata, upload a private version, review file
          integrity, publish the version, then clear the product publication
          checks.
        </p>
        <div class="row">
          <NuxtLink to="/admin/products" class="button">Manage catalog</NuxtLink
          ><NuxtLink to="/admin/release-gates" class="button secondary"
            >Review launch gates</NuxtLink
          >
        </div>
      </div>
    </div></AdminShell
  >
</template>
