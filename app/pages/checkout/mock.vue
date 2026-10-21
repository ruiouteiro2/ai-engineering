<script setup lang="ts">
const route = useRoute(),
  email = ref(""),
  message = ref(""),
  busy = ref(false);
async function pay() {
  busy.value = true;
  try {
    const r = await apiRequest("/api/checkout/mock", {
      method: "POST",
      body: { token: String(route.query.token || ""), email: email.value },
    });
    await navigateTo(r.url);
  } catch (e: any) {
    message.value = e.data?.statusMessage || "Test checkout failed.";
  } finally {
    busy.value = false;
  }
}
</script>
<template>
  <div class="container section measure stack">
    <span class="eyebrow">Local test provider · No money moves</span>
    <h1>Simulated checkout</h1>
    <p>
      This development adapter exercises the signed order and entitlement path.
      It is not a Lemon Squeezy transaction.
    </p>
    <form class="stack" @submit.prevent="pay">
      <label class="field"
        ><span>Test customer email</span
        ><input v-model="email" type="email" required /></label
      ><button class="button" :disabled="busy">Simulate test payment</button>
      <p class="error" role="status">{{ message }}</p>
    </form>
    <NuxtLink to="/checkout/cancelled" class="text-link">Cancel</NuxtLink>
  </div>
</template>
