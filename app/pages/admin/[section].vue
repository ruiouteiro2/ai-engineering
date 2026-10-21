<script setup lang="ts">
definePageMeta({ middleware: "admin" });
const route = useRoute(),
  section = String(route.params.section),
  title = section.replaceAll("-", " ").replace(/^./, (c) => c.toUpperCase());
const {
  data: rows,
  error,
  refresh,
} = await useFetch<any[]>("/api/admin/" + section);
const reconcile = reactive({ providerId: "", checkoutId: "" });
async function reconcileOrder() {
  try {
    await apiRequest("/api/admin/reconcile", {
      method: "POST",
      body: reconcile,
    });
    message.value = "Provider order reconciled.";
    await refresh();
  } catch (e: any) {
    message.value = e.data?.statusMessage || "Reconciliation failed.";
  }
}
const site = reactive({
  brandName: "AI Engineering Mastery System",
  brandShortName: "AI Engineering",
  contactEmail: "",
  operatorName: "",
  operatorCountry: "",
});
if (section === "settings" && rows.value?.[0]?.value)
  Object.assign(site, rows.value[0].value);
async function saveSettings() {
  try {
    await apiRequest("/api/admin/settings", { method: "POST", body: site });
    message.value = "Site settings saved.";
    await refresh();
  } catch (e: any) {
    message.value = e.data?.statusMessage || "Could not save settings.";
  }
}
const editing = ref<any>(null),
  creating = ref(false),
  message = ref(""),
  bundle = reactive({ bundleSku: "", items: "" }),
  notes = ref("");
const contentMode = ["content", "articles", "pages", "seo", "legal"].includes(
  section,
);
const columns = computed(() =>
  rows.value?.[0]
    ? Object.keys(rows.value[0])
        .filter(
          (k) =>
            ![
              "data",
              "snapshot",
              "body",
              "preferences",
              "key",
              "detail",
            ].includes(k),
        )
        .slice(0, 7)
    : [],
);
function show(value: any) {
  return value === null
    ? "—"
    : typeof value === "object"
      ? JSON.stringify(value)
      : String(value);
}
async function saved() {
  editing.value = null;
  creating.value = false;
  await refresh();
}
async function status(id: string, status: string) {
  try {
    await apiRequest("/api/admin/records", {
      method: "PATCH",
      body: { kind: section, id, status, notes: notes.value },
    });
    await refresh();
  } catch (e: any) {
    message.value = e.data?.statusMessage || "Could not update record.";
  }
}
async function saveBundle() {
  try {
    await apiRequest("/api/admin/bundles", {
      method: "POST",
      body: {
        bundleSku: bundle.bundleSku,
        items: bundle.items
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean),
      },
    });
    message.value = "Bundle inclusions saved.";
    await refresh();
  } catch (e: any) {
    message.value = e.data?.statusMessage || "Could not save bundle.";
  }
}
usePageSeo("Admin · " + title, "Manage " + title.toLowerCase());
</script>
<template>
  <AdminShell
    ><div class="stack">
      <div class="spread">
        <h1 style="font-size: 2.5rem">{{ title }}</h1>
        <NuxtLink
          v-if="section === 'products'"
          to="/admin/products/new"
          class="button"
          >Create product</NuxtLink
        ><button
          v-if="contentMode"
          class="button"
          @click="
            creating = !creating;
            editing = null;
          "
        >
          {{ creating ? "Close editor" : "Create content" }}
        </button>
      </div>
      <div v-if="error" class="notice error" role="alert">
        {{
          error.statusCode === 403
            ? "Your role cannot access this resource."
            : "Could not load this resource."
        }}
        <button class="icon-button" @click="refresh()">Retry</button>
      </div>
      <form
        v-if="section === 'settings'"
        class="panel stack"
        @submit.prevent="saveSettings"
      >
        <h2>Site identity</h2>
        <p>
          Enter only verified operator details. Production approval flags and
          secrets are configured in the deployment environment.
        </p>
        <label
          v-for="key in [
            'brandName',
            'brandShortName',
            'contactEmail',
            'operatorName',
            'operatorCountry',
          ] as const"
          :key="key"
          class="field"
          ><span>{{ key }}</span
          ><input
            v-model="site[key]"
            :type="key === 'contactEmail' ? 'email' : 'text'"
            maxlength="200" /></label
        ><button class="button">Save site settings</button>
      </form>
      <AdminContentEditor
        v-if="creating || editing"
        :key="editing?.id || 'new'"
        :record="editing"
        @saved="saved"
      />
      <form
        v-if="section === 'webhooks'"
        class="panel stack"
        @submit.prevent="reconcileOrder"
      >
        <h3>Reconcile a provider order</h3>
        <p>
          Fetches current state from the configured Lemon Squeezy test account.
          It cannot mark an unpaid order as paid.
        </p>
        <label class="field"
          ><span>Provider order ID</span
          ><input
            v-model="reconcile.providerId"
            pattern="[0-9]+"
            required /></label
        ><label class="field"
          ><span>Internal checkout UUID</span
          ><input v-model="reconcile.checkoutId" required /></label
        ><button class="button">Verify provider and reconcile</button>
      </form>
      <form
        v-if="section === 'bundles'"
        class="panel stack"
        @submit.prevent="saveBundle"
      >
        <h3>Set exact bundle inclusions</h3>
        <label class="field"
          ><span>Unpublished bundle SKU</span
          ><input v-model="bundle.bundleSku" required /></label
        ><label class="field"
          ><span>Included product SKUs, separated by commas</span
          ><input v-model="bundle.items" required /></label
        ><button class="button">Save inclusions</button>
      </form>
      <label v-if="section === 'support' || section === 'privacy'" class="field"
        ><span>Resolution note</span
        ><textarea v-model="notes" maxlength="1000" />
      </label>
      <div v-if="rows?.length" class="table-wrap">
        <table>
          <thead>
            <tr>
              <th v-for="col in columns" :key="col">{{ col }}</th>
              <th
                v-if="
                  section === 'products' ||
                  contentMode ||
                  ['support', 'privacy'].includes(section)
                "
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in rows" :key="row.id || row.sku || i">
              <td
                v-for="col in columns"
                :key="col"
                style="max-width: 300px; overflow-wrap: anywhere"
              >
                {{ show(row[col]) }}
              </td>
              <td v-if="section === 'products'">
                <NuxtLink class="text-link" :to="'/admin/products/' + row.sku"
                  >Edit</NuxtLink
                >
              </td>
              <td v-else-if="contentMode">
                <button
                  class="icon-button"
                  @click="
                    editing = row;
                    creating = false;
                  "
                >
                  Edit
                </button>
              </td>
              <td v-else-if="['support', 'privacy'].includes(section)">
                <select
                  :value="row.status"
                  aria-label="Request status"
                  @change="
                    status(row.id, ($event.target as HTMLSelectElement).value)
                  "
                >
                  <option
                    v-for="s in ['OPEN', 'IN_REVIEW', 'COMPLETE', 'REJECTED']"
                    :key="s"
                  >
                    {{ s }}
                  </option>
                </select>
                <p v-if="row.message" class="small">{{ row.message }}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else-if="!error" class="empty">
        <h2>No records yet</h2>
        <p>
          Records appear here when the corresponding workflow has been used.
        </p>
      </div>
      <p v-if="section === 'assets'" class="small">
        Upload and review assets inside the associated product editor. Storage
        keys are kept private.
      </p>
      <p
        v-if="section === 'categories' || section === 'collections'"
        class="small"
      >
        Classification follows the supplied curriculum. Product category and
        tier are editable in the product editor.
      </p>
      <p role="status">{{ message }}</p>
    </div></AdminShell
  >
</template>
