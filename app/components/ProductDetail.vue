<script setup lang="ts">
import { categories, contents, human, type Product } from "#shared/catalog";
const props = defineProps<{ slug: string; category: string }>();
const { data: p, error } = await useFetch<
  Product & {
    releases: {
      id: string;
      version: string;
      notes: string;
      compatibility: string;
    }[];
  }
>("/api/catalog/" + props.slug);
if (
  error.value ||
  !p.value ||
  categories.find((c) => c.type === p.value!.type)?.path !== props.category
)
  throw createError({ statusCode: 404, statusMessage: "Resource not found" });
usePageSeo(p.value.title, p.value.description, p.value.cover);
const outline = computed(() => contents(p.value!.data));
const preview = ref<HTMLDialogElement>(),
  busy = ref(false),
  message = ref("");
const { data: related } = await useFetch("/api/catalog", {
  query: { limit: 100 },
});
const relations = computed(
  () =>
    related.value?.items
      .filter((v) => (p.value?.data.related || []).includes(v.sku))
      .slice(0, 4) || [],
);
async function claim() {
  busy.value = true;
  try {
    await apiRequest("/api/free/claim", {
      method: "POST",
      body: { sku: p.value!.sku },
    });
    await navigateTo("/account/library");
  } catch (e: any) {
    if (e.statusCode === 401) await navigateTo("/account/sign-in");
    else message.value = e.data?.statusMessage || "Resource unavailable.";
  } finally {
    busy.value = false;
  }
}
async function checkout() {
  busy.value = true;
  try {
    const r = await apiRequest("/api/checkout/create", {
      method: "POST",
      body: { sku: p.value!.sku },
    });
    await navigateTo(r.url, { external: true });
  } catch (e: any) {
    message.value =
      e.data?.statusMessage || "Checkout could not start. Please try again.";
  } finally {
    busy.value = false;
  }
}
</script>
<template>
  <div v-if="p" class="container">
    <nav class="breadcrumbs" aria-label="Breadcrumb" style="padding-top: 30px">
      <NuxtLink to="/">Home</NuxtLink><span>/</span
      ><NuxtLink :to="'/' + category">{{
        categories.find((c) => c.path === category)?.label
      }}</NuxtLink
      ><span>/</span><span>{{ p.sku }}</span>
    </nav>
    <section class="detail">
      <div class="detail-art small-stack">
        <img
          :src="p.cover"
          :alt="p.title + ' — concept cover'"
          width="600"
          height="800"
        />
        <p class="small" style="text-align: center">
          Concept artwork · {{ human(p.status) }}
        </p>
        <button class="button secondary" @click="preview?.showModal()">
          Explore the outline
        </button>
      </div>
      <div class="detail-main">
        <div class="row">
          <span class="eyebrow">{{ p.sku }} / {{ human(p.tier) }}</span
          ><span class="badge planned">{{ human(p.status) }}</span>
        </div>
        <h1>{{ p.title }}</h1>
        <p class="lead">{{ p.description }}</p>
        <dl class="facts">
          <div>
            <dt>
              {{ p.status === "PUBLISHED" ? "Format" : "Planned format" }}
            </dt>
            <dd>{{ (p.data.formats || []).join(", ") }}</dd>
          </div>
          <div>
            <dt>Release</dt>
            <dd>
              {{
                p.status === "PUBLISHED"
                  ? "Published"
                  : "In preparation; no release date"
              }}
            </dd>
          </div>
          <div>
            <dt>License</dt>
            <dd>
              {{
                p.license === "TO_DEFINE" ? "Terms pending review" : p.license
              }}
            </dd>
          </div>
          <div>
            <dt>Compatibility</dt>
            <dd>{{ p.releases[0]?.compatibility || "Not yet verified" }}</dd>
          </div>
        </dl>
        <div
          v-if="p.status === 'PUBLISHED' && p.priceCents === 0"
          class="stack"
        >
          <button class="button" :disabled="busy" @click="claim">
            Add free resource to my library
          </button>
          <p class="small">
            Sign in to verify your email and securely access the files.
          </p>
          <p role="status">{{ message }}</p>
        </div>
        <template v-else-if="p.purchasable"
          ><p v-if="p.priceCents !== null">
            {{
              new Intl.NumberFormat("en", {
                style: "currency",
                currency: p.currency,
              }).format(p.priceCents / 100)
            }}
            · Final tax shown at provider checkout
          </p>
          <NuxtLink to="/terms-of-sale" class="text-link small"
            >Review sales and license terms</NuxtLink
          ><button class="button" :disabled="busy" @click="checkout">
            {{ busy ? "Opening checkout…" : "Continue to secure checkout" }}
          </button>
          <p class="error" role="status">{{ message }}</p></template
        >
        <div v-else class="notice">
          This resource is being prepared. The outline below is proposed
          content, not a claim that files are available.
        </div>
        <NotifyForm
          v-if="!p.purchasable && p.status !== 'PUBLISHED'"
          :sku="p.sku"
        />
      </div>
    </section>
    <section class="section two-columns">
      <div class="stack">
        <span class="eyebrow">{{
          p.status === "PUBLISHED" ? "Contents" : "Proposed contents"
        }}</span>
        <h2>Inside this resource</h2>
        <div v-if="outline.length" class="outline">
          <details v-for="(chapter, i) in outline" :key="i">
            <summary>
              <span class="mono small accent"
                >{{ String(i + 1).padStart(2, "0") }} / </span
              >{{ chapter.title }}
            </summary>
            <div>
              <ul v-if="chapter.topics.length">
                <li v-for="topic in chapter.topics" :key="topic">
                  {{ topic }}
                </li>
              </ul>
              <p v-else class="small">
                {{
                  p.status === "PUBLISHED"
                    ? "See the downloadable files for the complete section."
                    : "This section is part of the planned scope. The authored material is not available yet."
                }}
              </p>
            </div>
          </details>
        </div>
        <p v-else>
          {{
            p.status === "PUBLISHED"
              ? "See the license and published versions for included files and update rights."
              : "Exact inclusions and version rights will be published after editorial and licensing review. This edition cannot be purchased yet."
          }}
        </p>
      </div>
      <aside class="stack" style="align-content: start">
        <div class="panel stack">
          <h3>Before you start</h3>
          <p>
            {{
              p.data.inputs ||
              "Bring an application idea or a repository you are authorized to examine. The proposed material combines explanation, worked examples and evidence-based exercises."
            }}
          </p>
          <template v-if="p.type === 'AGENT_SKILL'"
            ><h3>
              {{ p.status === "PUBLISHED" ? "Outputs" : "Planned outputs" }}
            </h3>
            <p>{{ p.data.outputs }}</p>
            <h3>Permissions & evaluation</h3>
            <p>{{ p.data.verification }}</p>
            <p v-if="p.status !== 'PUBLISHED'" class="small">
              Installation package, manifest and platform compatibility are
              unverified. No executable skill is supplied yet.
            </p></template
          >
        </div>
        <div class="small-stack">
          <h3>Versions, support & updates</h3>
          <p v-if="!p.releases.length">
            No versions have been released. Update eligibility and support terms
            will be disclosed before purchase.
          </p>
          <div v-for="r in p.releases" :key="r.id">
            <strong>{{ r.version }}</strong>
            <p>{{ r.notes }}</p>
          </div>
          <NuxtLink class="text-link" to="/licensing"
            >Read licensing information →</NuxtLink
          ><NuxtLink class="text-link" to="/support">Visit support →</NuxtLink>
        </div>
      </aside>
    </section>
    <section v-if="relations.length" class="section">
      <div class="section-heading">
        <span class="eyebrow">Connect the ideas</span>
        <h2>Continue your path.</h2>
      </div>
      <div class="product-grid">
        <ProductCard v-for="r in relations" :key="r.sku" :product="r" />
      </div>
    </section>
    <dialog ref="preview">
      <div class="spread">
        <span class="eyebrow">Illustrative curriculum preview</span
        ><button
          class="icon-button"
          aria-label="Close preview"
          @click="preview?.close()"
        >
          Close
        </button>
      </div>
      <h2 style="margin-top: 24px">{{ p.title }}</h2>
      <p style="margin-block: 20px">
        This is an outline preview. No paid pages or completed files are
        represented.
      </p>
      <ol>
        <li v-for="(item, i) in outline" :key="i">{{ item.title }}</li>
      </ol>
      <p v-if="!outline.length">
        The edition’s exact contents are under review.
      </p>
    </dialog>
  </div>
</template>
