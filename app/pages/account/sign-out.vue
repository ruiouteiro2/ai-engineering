<script setup lang="ts">
async function signout() {
  await apiRequest("/api/auth/sign-out", { method: "POST" });
  clearNuxtData();
  await navigateTo("/account/sign-in");
}
</script>
<template>
  <div class="container section stack">
    <h1>Sign out</h1>
    <p>End this session on this device.</p>
    <div><button class="button" @click="signout">Confirm sign out</button></div>
  </div>
</template>
