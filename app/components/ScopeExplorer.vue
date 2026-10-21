<script setup lang="ts">
import seed from "~~/catalog-seed.json";
const active = ref(0);
const groups = [
  {
    name: "Experience",
    ids: [2, 5, 10, 11, 12],
    intro: "What happens before, during and after the main action?",
  },
  {
    name: "Identity & data",
    ids: [6, 7, 8, 19, 25],
    intro: "Who can act, which data can they reach, and what survives?",
  },
  {
    name: "Commerce",
    ids: [16, 21, 22, 24, 26],
    intro: "A successful payment starts a longer operational workflow.",
  },
  {
    name: "Production",
    ids: [27, 28, 31, 33, 34],
    intro: "How will you know it works, and recover when it doesn’t?",
  },
];
const selected = computed(() => groups[active.value]!);
</script>
<template>
  <div class="anatomy">
    <nav aria-label="Explore application scope">
      <button
        v-for="(g, i) in groups"
        :key="g.name"
        :aria-pressed="active === i"
        @click="active = i"
      >
        {{ g.name }} <span aria-hidden="true">↗</span>
      </button>
    </nav>
    <div class="anatomy-content" aria-live="polite">
      <h3>{{ selected.intro }}</h3>
      <div>
        <div v-for="id in selected.ids" :key="id" class="scope-row">
          <code>{{ seed.scopeDomains[id - 1]!.id }}</code>
          <div>
            <strong>{{ seed.scopeDomains[id - 1]!.name }}</strong>
            <p class="small">{{ seed.scopeDomains[id - 1]!.coverage }}</p>
          </div>
        </div>
      </div>
      <NuxtLink to="/methodology" class="text-link small"
        >Explore all 40 scope domains →</NuxtLink
      >
    </div>
  </div>
</template>
