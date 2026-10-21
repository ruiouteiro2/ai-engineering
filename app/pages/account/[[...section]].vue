<script setup lang="ts">
definePageMeta({ middleware: "auth" });
const route = useRoute(),
  section = String(route.path.split("/")[2] || "overview");
if (
  ![
    "overview",
    "library",
    "orders",
    "downloads",
    "licenses",
    "profile",
    "security",
    "preferences",
    "privacy",
  ].includes(section)
)
  throw createError({ statusCode: 404, statusMessage: "Page not found" });
const { data: user } = await useFetch("/api/me");
const endpoint = ["library", "licenses"].includes(section)
  ? "library"
  : section === "orders"
    ? "orders"
    : section === "downloads"
      ? "downloads"
      : section === "privacy"
        ? "privacy"
        : section === "security"
          ? "sessions"
          : "orders";
const { data: records, refresh } = await useFetch<any[]>("/api/me/" + endpoint);
const name = ref(user.value?.name || ""),
  updates = ref(Boolean((user.value?.preferences as any)?.updates)),
  message = ref(""),
  busy = ref(false);
const title =
  section === "overview"
    ? "Your workspace"
    : section === "library"
      ? "My library"
      : section.charAt(0).toUpperCase() + section.slice(1);
usePageSeo(title, "Manage your account, purchases and library access.");
async function save() {
  busy.value = true;
  try {
    await apiRequest("/api/me/profile", {
      method: "PATCH",
      body: { name: name.value, preferences: { updates: updates.value } },
    });
    message.value = "Changes saved.";
  } catch (e: any) {
    message.value = e.data?.statusMessage || "Could not save changes.";
  } finally {
    busy.value = false;
  }
}
async function privacy(type: string) {
  busy.value = true;
  try {
    await apiRequest("/api/me/privacy", { method: "POST", body: { type } });
    message.value = "Request saved for operator review.";
    await refresh();
  } catch (e: any) {
    message.value = e.data?.statusMessage || "Could not save request.";
  } finally {
    busy.value = false;
  }
}
async function revoke() {
  await apiRequest("/api/me/sessions", { method: "DELETE" });
  clearNuxtData();
  await navigateTo("/account/sign-in");
}
async function download(id: string) {
  try {
    const r = await apiRequest("/api/download/" + id, { method: "POST" });
    await navigateTo(r.url, { external: true });
  } catch (e: any) {
    message.value = e.data?.statusMessage || "Download unavailable.";
  }
}
const orderId = route.path.split("/")[3];
const rows = computed(() =>
  orderId ? records.value?.filter((r) => r.id === orderId) : records.value,
);
</script>
<template>
  <AccountShell
    ><div class="stack">
      <div class="spread">
        <h1 style="font-size: 2.5rem">{{ title }}</h1>
        <NuxtLink
          v-if="user && user.role !== 'customer'"
          to="/admin"
          class="button secondary"
          >Administration</NuxtLink
        >
      </div>
      <p>{{ user?.email }}</p>
      <template v-if="section === 'overview'"
        ><div class="panel stack">
          <h2>Everything you own, in one place.</h2>
          <p>
            Verified purchases and available versions appear in your library.
            Planned resources are not downloads.
          </p>
          <NuxtLink to="/account/library" class="text-link"
            >Open my library →</NuxtLink
          >
        </div></template
      >
      <form
        v-else-if="section === 'profile' || section === 'preferences'"
        class="stack measure"
        @submit.prevent="save"
      >
        <label v-if="section === 'profile'" class="field"
          ><span>Display name</span><input v-model="name" maxlength="100"
        /></label>
        <p v-if="section === 'profile'" class="small">
          Email changes require verified support handling to preserve purchase
          ownership.
        </p>
        <label class="check"
          ><input v-model="updates" type="checkbox" /><span
            >Receive service updates for products I own.</span
          ></label
        ><NuxtLink to="/newsletter" class="text-link"
          >Manage newsletter subscription separately →</NuxtLink
        ><button class="button" :disabled="busy">Save preferences</button>
      </form>
      <template v-else-if="section === 'security'"
        ><p>
          Sign-in uses a single-use email link. Revoke all sessions if you no
          longer recognize your active devices.
        </p>
        <p>{{ records?.length || 0 }} active session(s).</p>
        <button class="button secondary" @click="revoke">
          Sign out all sessions
        </button></template
      ><template v-else-if="section === 'privacy'"
        ><p>
          Requests are tied to your verified account. Deletion needs operator
          review for financial retention and any external processors. A request
          does not immediately delete your account.
        </p>
        <div class="row">
          <a class="button secondary" href="/api/me/export"
            >Download account data</a
          ><button
            class="button secondary"
            :disabled="busy"
            @click="privacy('EXPORT')"
          >
            Request extended export</button
          ><button
            class="button secondary"
            :disabled="busy"
            @click="privacy('DELETE')"
          >
            Request account deletion
          </button>
        </div>
        <div v-for="r in records" :key="r.id" class="notice">
          {{ r.type }} · {{ r.status }} ·
          {{ new Date(r.createdAt).toLocaleDateString("en") }}
        </div></template
      ><template v-else-if="rows?.length"
        ><div v-for="r in rows" :key="r.id || r.fileId" class="panel stack">
          <template v-if="section === 'orders'"
            ><div class="spread">
              <h3>{{ r.snapshot.title || "Order" }}</h3>
              <span class="badge"
                >{{ r.status }} {{ r.testMode ? "· Test" : "" }}</span
              >
            </div>
            <p>
              {{
                new Intl.NumberFormat("en", {
                  style: "currency",
                  currency: r.currency,
                }).format(r.total / 100)
              }}
              · {{ new Date(r.createdAt).toLocaleDateString("en") }}
            </p>
            <NuxtLink :to="'/account/orders/' + r.id" class="text-link"
              >Order reference: {{ r.id }}</NuxtLink
            >
            <p class="small">
              Your payment provider sends the official receipt by email. For
              invoice or order questions, include this order reference in your
              support request.
            </p>
            <a
              v-if="r.receiptAvailable"
              class="text-link"
              :href="'/api/me/orders/' + r.id + '/receipt'"
              >View provider receipt →</a
            >
            <NuxtLink to="/contact" class="text-link"
              >Get order help →</NuxtLink
            ></template
          ><template v-else-if="section === 'downloads'"
            ><h3>{{ r.name }}</h3>
            <p>
              Link requested {{ new Date(r.createdAt).toLocaleString("en") }}
            </p>
            <button class="button" @click="download(r.fileId)">
              Request fresh download
            </button></template
          ><template v-else
            ><h3>{{ r.title }}</h3>
            <p>{{ r.name }} · {{ r.version }} · {{ r.size }} bytes</p>
            <p v-if="section === 'licenses'">
              {{ r.license.license || "See order license snapshot" }}
            </p>
            <button v-else class="button" @click="download(r.fileId)">
              Download {{ r.name }}
            </button></template
          >
        </div></template
      >
      <div v-else class="empty">
        <h2>{{ orderId ? "Order not found" : "Nothing here yet" }}</h2>
        <p>
          {{
            orderId
              ? "This order is not available to your account."
              : "Your verified purchases and activity will appear here."
          }}
        </p>
        <NuxtLink to="/catalog" class="button secondary"
          >Explore the library</NuxtLink
        >
      </div>
      <p role="status">{{ message }}</p>
    </div></AccountShell
  >
</template>
