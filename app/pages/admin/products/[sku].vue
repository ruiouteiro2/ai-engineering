<script setup lang="ts">
import { categories, tiers, statuses } from "#shared/catalog";
definePageMeta({ middleware: "admin" });
const sku = String(useRoute().params.sku),
  isNew = sku === "new";
const { data: p, refresh } = await useFetch<any>("/api/admin/products/" + sku, {
  immediate: !isNew,
});
const form = reactive({
  sku: p.value?.sku || "",
  title: p.value?.title || "",
  slug: p.value?.slug || "",
  type: p.value?.type || "PDF_GUIDE",
  tier: p.value?.tier || "FOUNDATION",
  description: p.value?.description || "",
  visible: p.value?.visible ?? false,
  cover: p.value?.cover || "/covers/PDF01.svg",
  license: p.value?.license || "TO_DEFINE",
  priceCents: p.value?.priceCents ?? null,
  currency: p.value?.currency || "EUR",
  variantId: p.value?.variantId || "",
  status:
    p.value?.status === "PUBLISHED"
      ? "IN_REVIEW"
      : p.value?.status || "PLANNED",
});
const metadata = ref(JSON.stringify(p.value?.data || {}, null, 2)),
  message = ref(""),
  busy = ref(false),
  reviewNote = ref(""),
  version = reactive({ version: "", notes: "", compatibility: "Not verified" }),
  versionId = ref(""),
  upload = ref<HTMLInputElement>(),
  reviewed = ref(false);
async function run(fn: () => Promise<unknown>) {
  busy.value = true;
  message.value = "";
  try {
    await fn();
    message.value = "Saved.";
    if (!isNew) await refresh();
  } catch (e: any) {
    message.value =
      e.data?.statusMessage || "Could not save. Check the fields and retry.";
  } finally {
    busy.value = false;
  }
}
async function save() {
  await run(async () => {
    const { sku: code, ...fields } = form;
    const data = JSON.parse(metadata.value);
    const result = await apiRequest<any>(
      isNew ? "/api/admin/products" : "/api/admin/products/" + sku,
      {
        method: isNew ? "POST" : "PATCH",
        body: {
          ...fields,
          variantId: fields.variantId || null,
          data,
          ...(isNew ? { sku: code } : { revision: p.value.revision }),
        },
      },
    );
    if (isNew) await navigateTo("/admin/products/" + result.sku);
  });
}
async function publish() {
  await run(() =>
    apiRequest("/api/admin/publish", {
      method: "POST",
      body: { sku, revision: p.value.revision, reviewed: reviewed.value },
    }),
  );
}
async function createVersion() {
  await run(() =>
    apiRequest("/api/admin/versions", {
      method: "POST",
      body: { sku, ...version },
    }),
  );
}
async function uploadFile() {
  await run(async () => {
    const f = upload.value?.files?.[0];
    if (!f) throw Error("Choose a file");
    const body = new FormData();
    body.append("versionId", versionId.value);
    body.append("file", f);
    await apiRequest("/api/admin/uploads", { method: "POST", body });
  });
}
async function reviewFile(f: any, status: string) {
  await run(() =>
    apiRequest("/api/admin/files/" + f.id, {
      method: "PATCH",
      body: { status, sha256: f.sha256, reviewNote: reviewNote.value },
    }),
  );
}
async function publishVersion(id: string, published: boolean) {
  await run(() =>
    apiRequest("/api/admin/versions/" + id, {
      method: "PATCH",
      body: { published },
    }),
  );
}
</script>
<template>
  <AdminShell
    ><div class="stack">
      <NuxtLink class="text-link small" to="/admin/products"
        >← Catalog</NuxtLink
      >
      <h1 style="font-size: 2.4rem">
        {{ isNew ? "Create product" : p?.title }}
      </h1>
      <p class="notice">
        Saving metadata returns the product to review and disables checkout.
        Publication checks run on the server.
      </p>
      <form class="stack" @submit.prevent="save">
        <label v-if="isNew" class="field"
          ><span>SKU</span
          ><input v-model="form.sku" pattern="[A-Z0-9-]+" required
        /></label>
        <div class="two-columns">
          <label
            v-for="k in [
              'title',
              'slug',
              'description',
              'cover',
              'license',
              'variantId',
            ] as const"
            :key="k"
            class="field"
            ><span>{{ k }}</span
            ><textarea
              v-if="k === 'description' || k === 'license'"
              v-model="form[k]"
              required /><input
              v-else
              v-model="form[k]"
              :required="k !== 'variantId'"
          /></label>
        </div>
        <div class="three-columns">
          <label class="field"
            ><span>Type</span
            ><select v-model="form.type">
              <option v-for="c in categories" :key="c.type" :value="c.type">
                {{ c.label }}
              </option>
            </select></label
          ><label class="field"
            ><span>Tier</span
            ><select v-model="form.tier">
              <option
                v-for="t in [...tiers, 'CROSS_LEVEL', 'FREE', 'BUNDLE']"
                :key="t"
              >
                {{ t }}
              </option>
            </select></label
          ><label class="field"
            ><span>Draft status</span
            ><select v-model="form.status">
              <option
                v-for="s in statuses.filter((s) => s !== 'PUBLISHED')"
                :key="s"
              >
                {{ s }}
              </option>
            </select></label
          ><label class="field"
            ><span>Price in cents (internal hypothesis until published)</span
            ><input
              v-model.number="form.priceCents"
              type="number"
              min="0"
              max="1000000" /></label
          ><label class="field"
            ><span>Currency</span
            ><select v-model="form.currency">
              <option>EUR</option>
              <option>USD</option>
              <option>GBP</option>
            </select></label
          >
        </div>
        <label class="check"
          ><input v-model="form.visible" type="checkbox" /><span
            >Visible in public catalog</span
          ></label
        ><label class="field"
          ><span>Outline, formats and relations (JSON)</span
          ><textarea
            v-model="metadata"
            style="min-height: 220px"
            required
          /></label
        ><button class="button" :disabled="busy">Save product</button>
      </form>
      <template v-if="!isNew"
        ><section class="panel stack">
          <h2>Versions & private assets</h2>
          <form class="stack" @submit.prevent="createVersion">
            <div class="two-columns">
              <label class="field"
                ><span>New version</span
                ><input
                  v-model="version.version"
                  placeholder="1.0.0"
                  pattern="\d+\.\d+\.\d+"
                  required /></label
              ><label class="field"
                ><span>Compatibility evidence</span
                ><input v-model="version.compatibility" required
              /></label>
            </div>
            <label class="field"
              ><span>Release notes</span
              ><textarea
                v-model="version.notes"
                minlength="10"
                required
              /></label
            ><button class="button secondary" :disabled="busy">
              Create version
            </button>
          </form>
          <form class="stack" @submit.prevent="uploadFile">
            <label class="field"
              ><span>Unpublished version</span
              ><select v-model="versionId" required>
                <option value="">Select version</option>
                <option
                  v-for="v in p?.versions.filter((v: any) => !v.published)"
                  :key="v.id"
                  :value="v.id"
                >
                  {{ v.version }}
                </option>
              </select></label
            ><label class="field"
              ><span>File (20 MB maximum)</span
              ><input
                ref="upload"
                type="file"
                accept=".pdf,.zip,.md,.txt,.csv,.json,.yaml,.yml,.pptx,.xlsx,.docx"
                required /></label
            ><button class="button secondary" :disabled="busy">
              Upload to quarantine
            </button>
          </form>
          <label class="field"
            ><span>Review evidence (required for approval or rejection)</span
            ><textarea
              v-model="reviewNote"
              minlength="20"
              placeholder="Record the authorized content review and malware inspection evidence. A file signature check is not a malware scan."
            />
          </label>
          <div v-for="f in p?.files" :key="f.id" class="notice small-stack">
            <strong>{{ f.name }} · {{ f.scanStatus }}</strong
            ><code style="overflow-wrap: anywhere">SHA-256 {{ f.sha256 }}</code>
            <div class="row">
              <button
                class="button secondary"
                :disabled="busy || reviewNote.length < 20"
                @click="reviewFile(f, 'APPROVED')"
              >
                Approve reviewed file</button
              ><button
                class="button secondary"
                :disabled="busy || reviewNote.length < 20"
                @click="reviewFile(f, 'REJECTED')"
              >
                Reject file
              </button>
            </div>
          </div>
          <div v-for="v in p?.versions" :key="v.id" class="spread">
            <span
              >{{ v.version }} · {{ v.published ? "Published" : "Draft" }}</span
            ><button
              class="button secondary"
              :disabled="busy"
              @click="publishVersion(v.id, !v.published)"
            >
              {{
                v.published ? "Unpublish version" : "Publish reviewed version"
              }}
            </button>
          </div>
        </section>
        <section class="panel stack">
          <h2>Publish this product</h2>
          <p>
            Requires real approved files, a published version, reviewed
            licensing, a price and provider mapping. Bundles require all listed
            components to be published.
          </p>
          <label class="check"
            ><input v-model="reviewed" type="checkbox" /><span
              >I reviewed the current metadata, contents, license and provider
              mapping.</span
            ></label
          ><button
            class="button"
            :disabled="busy || !reviewed"
            @click="publish"
          >
            Validate and publish
          </button>
        </section></template
      >
      <p role="status">{{ message }}</p>
    </div></AdminShell
  >
</template>
