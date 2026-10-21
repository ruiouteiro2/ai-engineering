<template>
  <div class="container account-shell">
    <nav class="side-nav" aria-label="Account navigation">
      <NuxtLink v-for="p in links" :key="p[0]" :to="p[0]">{{ p[1] }}</NuxtLink>
    </nav>
    <div><slot /></div>
  </div>
</template>
<script setup lang="ts">
const links = [
  ["/account", "Overview"],
  ["/account/library", "My library"],
  ["/account/orders", "Orders"],
  ["/account/downloads", "Downloads"],
  ["/account/licenses", "Licenses"],
  ["/account/profile", "Profile"],
  ["/account/security", "Security"],
  ["/account/preferences", "Preferences"],
  ["/account/privacy", "Privacy"],
  ["/account/sign-out", "Sign out"],
];
</script>
