<script setup lang="ts">
import { categories } from "#shared/catalog";
usePageSeo(
  "Build with AI. Engineer with confidence.",
  "A planned library of engineering handbooks, agent skills, templates and practical labs. Go from a convincing demo to evidence you can trust.",
);
const { data } = await useFetch("/api/catalog", { query: { limit: 100 } });
const featured = computed(() =>
  ["PDF03", "SK02", "PDF09", "T02"]
    .map((sku) => data.value?.items.find((p) => p.sku === sku))
    .filter(Boolean),
);
const { data: articles } = await useFetch("/api/articles");
</script>
<template>
  <div class="container">
    <section class="hero">
      <div class="hero-copy">
        <div class="eyebrow">The engineering behind the code</div>
        <h1>
          Build with AI.<br /><span>Engineer with<br />confidence.</span>
        </h1>
        <p class="lead">
          A convincing demo is a beginning. Learn to specify, build, test and
          operate the complete product—with written guides and tools that make
          the overlooked work visible.
        </p>
        <div class="row">
          <NuxtLink to="/catalog" class="button"
            >Explore the library <span aria-hidden="true">→</span></NuxtLink
          ><NuxtLink to="/methodology" class="button secondary"
            >See the method</NuxtLink
          >
        </div>
        <p class="small">
          <span class="status-dot" aria-hidden="true" /> Library in preparation
          · Browse the full planned curriculum
        </p>
      </div>
      <div class="hero-art">
        <span class="hero-top-label mono"
          >FIELD NOTES FOR BUILDING REAL SOFTWARE</span
        ><img
          class="hero-cover"
          src="/covers/PDF03.svg"
          alt="The Complete Application Anatomy — planned handbook concept cover"
          width="600"
          height="800"
          fetchpriority="high"
        /><img
          class="hero-cover back"
          src="/covers/SK02.svg"
          alt="Complete Product Architect — planned agent skill concept cover"
          width="600"
          height="800"
        /><span class="art-caption"
          >Concept artwork · Materials in preparation</span
        >
      </div>
    </section>
    <div class="process-line mono">
      <span
        v-for="(step, i) in [
          'UNDERSTAND',
          'SPECIFY',
          'BUILD',
          'BREAK',
          'VERIFY',
          'DEPLOY',
          'OPERATE',
        ]"
        :key="step"
        ><b>{{ String(i + 1).padStart(2, "0") }}</b> {{ step }}</span
      >
    </div>
    <section class="section">
      <div class="section-heading">
        <span class="eyebrow">A reference library, a working toolkit</span>
        <h2>Learn it. Apply it. Verify it.</h2>
        <p class="lead">
          Six connected formats. One purpose: better engineering decisions
          throughout the life of an application.
        </p>
      </div>
      <div class="category-grid">
        <NuxtLink
          v-for="(c, i) in categories.slice(0, 6)"
          :key="c.path"
          :to="'/' + c.path"
          class="category-card"
          ><div class="spread">
            <span class="category-number"
              >0{{ i + 1 }} / {{ c.singular.toUpperCase() }}</span
            ><span aria-hidden="true">↗</span>
          </div>
          <h3>{{ c.label }}</h3>
          <p>{{ c.description }}</p></NuxtLink
        >
      </div>
    </section>
    <section class="section">
      <div class="spread section-heading">
        <div class="small-stack">
          <span class="eyebrow">Inside the planned collection</span>
          <h2>A good place to start.</h2>
        </div>
        <NuxtLink class="text-link" to="/catalog"
          >View all 83 planned resources →</NuxtLink
        >
      </div>
      <div class="product-grid">
        <ProductCard v-for="p in featured" :key="p!.sku" :product="p" />
      </div>
    </section>
    <section class="section">
      <div class="section-heading">
        <span class="eyebrow">The product beyond the happy path</span>
        <h2>What did the demo leave out?</h2>
        <p class="lead">
          Use the Product Scope Register to examine the system around each
          feature. Explore a few of its 40 domains.
        </p>
      </div>
      <ScopeExplorer />
    </section>
    <section class="section two-columns">
      <div class="stack">
        <span class="eyebrow">Your first reality check</span>
        <h2>50 questions worth asking<br />before you ship.</h2>
        <p class="lead">
          The AI Software Reality Check is a planned free kit: an annotated
          guide, a checklist, an auditor skill and worked examples.
        </p>
        <p>
          No download is available yet. Get a release notification when the
          reviewed files are ready.
        </p>
        <NuxtLink to="/free" class="text-link"
          >See the proposed contents →</NuxtLink
        >
      </div>
      <div class="panel"><NotifyForm sku="FREE01" /></div>
    </section>
    <section class="section">
      <div class="spread section-heading">
        <div class="small-stack">
          <span class="eyebrow">Engineering journal</span>
          <h2>Think through the details.</h2>
        </div>
        <NuxtLink to="/blog" class="text-link">Read the journal →</NuxtLink>
      </div>
      <div class="two-columns">
        <NuxtLink
          v-for="article in articles?.slice(0, 2)"
          :key="article.slug"
          :to="'/blog/' + article.slug"
          class="panel stack"
          ><span class="eyebrow">Engineering notes</span>
          <h3>{{ article.title }}</h3>
          <p>{{ article.summary }}</p>
          <span class="text-link small">Read article →</span></NuxtLink
        >
      </div>
    </section>
    <section class="section">
      <div class="section-heading">
        <span class="eyebrow">Before you explore</span>
        <h2>A few straight answers.</h2>
      </div>
      <FaqList :limit="3" />
    </section>
  </div>
</template>
