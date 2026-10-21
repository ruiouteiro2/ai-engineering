<script setup lang="ts">
const route = useRoute();
const { data, refresh } = await useFetch("/api/checkout/resolve", {
  query: { token: String(route.query.token || "") },
});
let timer: ReturnType<typeof setInterval> | undefined;
onMounted(() => {
  let n = 0;
  timer = setInterval(() => {
    if (++n >= 12 || data.value?.status !== "pending") clearInterval(timer);
    else refresh();
  }, 5000);
});
onUnmounted(() => clearInterval(timer));
</script>
<template>
  <div class="container section stack measure">
    <span class="eyebrow">Checkout return</span>
    <h1>
      {{
        data?.status === "paid"
          ? "Payment verified."
          : "Processing your purchase."
      }}
    </h1>
    <p v-if="data?.status === 'paid'">
      The server received a verified payment event. Sign in with your checkout
      email to access your library.
    </p>
    <p v-else>
      Returning from checkout does not confirm payment. Access remains locked
      until the provider notification is verified. Current status:
      {{ data?.status || "pending" }}.
    </p>
    <div class="row">
      <button class="button secondary" @click="refresh()">Check status</button
      ><NuxtLink class="button" to="/account/sign-in"
        >Sign in to my library</NuxtLink
      ><NuxtLink to="/support" class="text-link">Get help</NuxtLink>
    </div>
  </div>
</template>
