<script setup lang="ts">
const offline = ref(false);
const update = () => {
  offline.value = !navigator.onLine;
};
onMounted(() => {
  update();
  window.addEventListener("online", update);
  window.addEventListener("offline", update);
});
onUnmounted(() => {
  window.removeEventListener("online", update);
  window.removeEventListener("offline", update);
});
</script>
<template>
  <a class="skip" href="#main">Skip to content</a>
  <div v-if="offline" class="offline" role="status">
    You’re offline. Reconnect before saving changes or submitting a form.
  </div>
  <SiteHeader />
  <main id="main" tabindex="-1"><slot /></main>
  <SiteFooter />
</template>
