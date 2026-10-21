<script setup lang="ts">
defineProps<{ error: any }>();
</script>
<template>
  <NuxtLayout
    ><div class="container section stack">
      <span class="eyebrow">{{ error.statusCode || 500 }}</span>
      <h1>
        {{
          error.statusCode === 404
            ? "This page isn’t here."
            : "Something interrupted your request."
        }}
      </h1>
      <p>
        {{
          error.statusCode === 404
            ? "Try the library or return to the homepage."
            : "Please try again. If the problem continues, contact support."
        }}
      </p>
      <div class="row">
        <button class="button" @click="clearError({ redirect: '/' })">
          Return home</button
        ><a href="/support" class="button secondary">Get help</a>
      </div>
    </div></NuxtLayout
  >
</template>
