<script setup lang="ts">
defineProps<{ body: string }>();
// Plain structured text intentionally never interprets arbitrary CMS HTML.
</script>
<template>
  <div class="prose">
    <template v-for="(block, i) in body.split('\n\n')" :key="i"
      ><h2 v-if="block.startsWith('## ')">
        {{ block.split("\n")[0]?.slice(3) }}
      </h2>
      <p v-if="block.startsWith('## ')">
        {{ block.split("\n").slice(1).join("\n") }}
      </p>
      <p v-else>{{ block }}</p></template
    >
  </div>
</template>
