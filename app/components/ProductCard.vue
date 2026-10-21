<script setup lang="ts">
import { categories, productPath, human } from "#shared/catalog";
defineProps<{ product: any }>();
</script>
<template>
  <article class="product-card">
    <NuxtLink
      :to="productPath(product)"
      class="product-art"
      tabindex="-1"
      aria-hidden="true"
      ><img
        :src="product.cover"
        :alt="`${product.title} — concept cover`"
        width="600"
        height="800"
        loading="lazy"
    /></NuxtLink>
    <div class="product-info">
      <div class="spread product-meta">
        <span
          >{{ categories.find((c) => c.type === product.type)?.singular }} ·
          {{ human(product.tier) }}</span
        ><span class="status-dot" aria-hidden="true" />
      </div>
      <h3>
        <NuxtLink :to="productPath(product)">{{ product.title }}</NuxtLink>
      </h3>
      <p>{{ product.description }}</p>
      <span class="small muted"
        >{{
          product.status === "PUBLISHED" ? "Available" : human(product.status)
        }}
        <span aria-hidden="true">·</span>
        {{ (product.data.formats || []).join(" / ") }}</span
      >
    </div>
  </article>
</template>
