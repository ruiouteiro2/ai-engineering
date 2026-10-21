<script setup lang="ts">
usePageSeo(
  "Sign in",
  "Access your AI Engineering library with a secure email link.",
);
const email = ref(""),
  busy = ref(false),
  message = ref(""),
  failed = ref(false);
async function submit() {
  busy.value = true;
  failed.value = false;
  try {
    await apiRequest("/api/auth/magic-link/request", {
      method: "POST",
      body: { email: email.value },
    });
    message.value =
      "Check your email for a sign-in link. It expires in 15 minutes.";
  } catch (e: any) {
    failed.value = true;
    message.value =
      e.data?.statusMessage || "Could not request a link. Please try again.";
  } finally {
    busy.value = false;
  }
}
</script>
<template>
  <div class="container section">
    <div class="panel stack" style="max-width: 500px; margin: auto">
      <span class="eyebrow">Your engineering library</span>
      <h1 style="font-size: 2.4rem">Welcome back.</h1>
      <p>
        Use your checkout email. We’ll send a secure sign-in link—no password to
        remember.
      </p>
      <form class="stack" @submit.prevent="submit">
        <label class="field"
          ><span>Email address</span
          ><input
            v-model="email"
            type="email"
            autocomplete="email"
            required
            maxlength="254"
            placeholder="you@example.com" /></label
        ><button class="button" :disabled="busy">
          {{ busy ? "Requesting…" : "Send sign-in link" }}
        </button>
        <p role="status" :class="failed ? 'error' : 'success'">{{ message }}</p>
      </form>
      <p class="small">
        Signing in does not subscribe you to marketing.
        <NuxtLink class="text-link" to="/privacy">Privacy information</NuxtLink>
      </p>
    </div>
  </div>
</template>
