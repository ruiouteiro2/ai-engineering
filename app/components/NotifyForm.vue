<script setup lang="ts">
const t = useCopy();
const props = defineProps<{ sku?: string; newsletter?: boolean }>();
const email = ref(""),
  marketing = ref(false),
  website = ref(""),
  busy = ref(false),
  message = ref(""),
  failed = ref(false);
async function submit() {
  busy.value = true;
  message.value = "";
  failed.value = false;
  try {
    await apiRequest("/api/leads", {
      method: "POST",
      body: {
        email: email.value,
        sku: props.sku,
        marketing: props.newsletter ? true : marketing.value,
        website: website.value,
      },
    });
    message.value = t("form.saved");
    email.value = "";
  } catch (e: any) {
    message.value = e.data?.statusMessage || t("form.failed");
    failed.value = true;
  } finally {
    busy.value = false;
  }
}
</script>
<template>
  <form class="small-stack" @submit.prevent="submit">
    <label class="field"
      ><span>{{ t("form.email") }}</span
      ><input
        v-model="email"
        type="email"
        autocomplete="email"
        required
        maxlength="254"
        placeholder="you@example.com"
    /></label>
    <div class="honeypot" aria-hidden="true">
      <label
        >Website<input v-model="website" tabindex="-1" autocomplete="off"
      /></label>
    </div>
    <label v-if="!newsletter" class="check"
      ><input v-model="marketing" type="checkbox" /><span
        >Also send me the engineering newsletter. Optional; unsubscribe at any
        time.</span
      ></label
    >
    <p v-else class="small">
      By subscribing, you request the engineering newsletter. Confirm by email;
      unsubscribe at any time.
    </p>
    <button class="button" :disabled="busy">
      {{
        busy
          ? t("form.saving")
          : newsletter
            ? t("form.subscribe")
            : t("form.notify")
      }}
      <span aria-hidden="true">→</span>
    </button>
    <p class="small">
      {{ newsletter ? "Newsletter preferences" : "Release notification" }}
      stored for this request.
      <NuxtLink class="text-link" to="/privacy">Privacy information</NuxtLink>
    </p>
    <p class="form-result" :class="failed ? 'error' : 'success'" role="status">
      {{ message }}
    </p>
  </form>
</template>
