<script setup lang="ts">
import { faqs } from "#shared/faq";
defineProps<{ limit?: number; search?: string }>();
</script>
<template>
  <div>
    <details
      v-for="faq in faqs
        .filter(
          (f) =>
            !search ||
            (f.q + ' ' + f.a).toLowerCase().includes(search.toLowerCase()),
        )
        .slice(0, limit || faqs.length)"
      :key="faq.q"
    >
      <summary>{{ faq.q }}</summary>
      <p>{{ faq.a }}</p>
    </details>
  </div>
</template>
