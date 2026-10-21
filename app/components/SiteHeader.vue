<script setup lang="ts">
const t = useCopy();
const menu = ref(false);
const { data: brand } = await useFetch("/api/settings/public");
const theme = useCookie<string>("theme", {
  default: () => "dark",
  sameSite: "lax",
  maxAge: 31536000,
});
useHead(() => ({ htmlAttrs: { "data-theme": theme.value } }));
watch(
  () => useRoute().path,
  () => (menu.value = false),
);
</script>
<template>
  <header class="header">
    <div class="container header-inner">
      <NuxtLink to="/" class="wordmark" aria-label="AI Engineering Mastery home"
        ><span class="brand-glyph" aria-hidden="true">&lt;/&gt;</span
        ><span
          >{{ brand?.brandShortName || "AI Engineering" }}<br /><span
            class="brand-sub"
            >MASTERY SYSTEM</span
          ></span
        ></NuxtLink
      >
      <nav class="desktop-nav" :aria-label="t('nav.main')">
        <NuxtLink to="/catalog">{{ t("nav.library") }}</NuxtLink
        ><NuxtLink to="/skills">{{ t("nav.skills") }}</NuxtLink
        ><NuxtLink to="/methodology">{{ t("nav.method") }}</NuxtLink
        ><NuxtLink to="/blog">{{ t("nav.journal") }}</NuxtLink>
      </nav>
      <NuxtLink to="/account" class="small header-account"
        >{{ t("nav.account") }} ↗</NuxtLink
      ><button
        class="icon-button"
        :aria-label="theme === 'dark' ? t('theme.light') : t('theme.dark')"
        @click="theme = theme === 'dark' ? 'light' : 'dark'"
      >
        {{ theme === "dark" ? "☼" : "☾" }}</button
      ><button
        class="icon-button mobile-menu"
        :aria-expanded="menu"
        aria-controls="mobile-navigation"
        @click="menu = !menu"
      >
        {{ t("nav.menu") }}
      </button>
    </div>
    <nav
      v-if="menu"
      id="mobile-navigation"
      class="mobile-nav"
      :aria-label="t('nav.mobile')"
    >
      <NuxtLink
        v-for="item in [
          ['/catalog', t('nav.library')],
          ['/skills', t('nav.skills')],
          ['/methodology', t('nav.method')],
          ['/blog', t('nav.journal')],
          ['/account', t('nav.account')],
        ]"
        :key="item[0]"
        :to="item[0]"
        >{{ item[1] }}</NuxtLink
      >
    </nav>
  </header>
</template>
