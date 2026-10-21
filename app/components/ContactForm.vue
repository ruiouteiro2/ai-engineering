<script setup lang="ts">
const form = reactive({
    email: "",
    topic: "General question",
    message: "",
    website: "",
  }),
  busy = ref(false),
  result = ref(""),
  failed = ref(false);
async function submit() {
  busy.value = true;
  failed.value = false;
  try {
    const r = await apiRequest("/api/contact", { method: "POST", body: form });
    result.value = `Your request was saved. Reference: ${r.id}`;
    form.message = "";
  } catch (e: any) {
    failed.value = true;
    result.value =
      e.data?.statusMessage || "Could not save your request. Try again.";
  } finally {
    busy.value = false;
  }
}
</script>
<template>
  <form class="stack" @submit.prevent="submit">
    <label class="field"
      ><span>Email</span
      ><input
        v-model="form.email"
        type="email"
        autocomplete="email"
        maxlength="254"
        required /></label
    ><label class="field"
      ><span>Topic</span
      ><select v-model="form.topic">
        <option
          v-for="s in [
            'General question',
            'Product question',
            'Order or download',
            'Privacy request',
            'Accessibility',
          ]"
          :key="s"
        >
          {{ s }}
        </option>
      </select></label
    ><label class="field"
      ><span>Message</span
      ><textarea
        v-model="form.message"
        minlength="20"
        maxlength="5000"
        required
        placeholder="Tell us what happened and what you expected. Do not include passwords or payment details."
      /></label
    ><label class="honeypot" aria-hidden="true"
      >Website<input v-model="form.website" tabindex="-1"
    /></label>
    <p class="small">
      Your message and email are stored so an operator can respond. Response
      times are not yet established.
      <NuxtLink class="text-link" to="/privacy">Privacy information</NuxtLink>
    </p>
    <button class="button" :disabled="busy">
      {{ busy ? "Saving…" : "Send request" }}
    </button>
    <p role="status" :class="failed ? 'error' : 'success'">{{ result }}</p>
  </form>
</template>
