<script setup lang="ts">
const message = ref("Confirm this sign-in request to open your account."),
  busy = ref(false),
  raw = ref("");
onMounted(() => {
  raw.value = new URLSearchParams(location.hash.slice(1)).get("token") || "";
  history.replaceState(null, "", location.pathname);
});
async function verify() {
  busy.value = true;
  try {
    await apiRequest("/api/auth/magic-link/consume", {
      method: "POST",
      body: { token: raw.value },
    });
    await navigateTo("/account");
  } catch (e: any) {
    message.value = e.data?.statusMessage || "Could not verify your link.";
  } finally {
    busy.value = false;
  }
}
</script>
<template>
  <div class="container section stack measure">
    <h1>Confirm sign-in</h1>
    <p role="status">{{ message }}</p>
    <button class="button" :disabled="busy || !raw" @click="verify">
      {{ busy ? "Verifying…" : "Continue to my account" }}</button
    ><NuxtLink to="/account/sign-in" class="text-link"
      >Request a new link</NuxtLink
    >
  </div>
</template>
