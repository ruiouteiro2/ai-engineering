<script setup lang="ts">
const { data: user } = await useFetch("/api/me");
const groups = [
  {
    title: "Publishing",
    roles: ["admin", "editor"],
    links: [
      "products",
      "categories",
      "collections",
      "bundles",
      "assets",
      "content",
      "articles",
      "pages",
      "seo",
    ],
  },
  {
    title: "Operations",
    roles: ["admin", "support"],
    links: ["orders", "customers", "refunds", "support"],
  },
  {
    title: "Governance",
    roles: ["admin"],
    links: [
      "entitlements",
      "downloads",
      "leads",
      "newsletter",
      "consent",
      "privacy",
      "legal",
      "affiliates",
      "settings",
      "audit-log",
      "webhooks",
      "integrations",
      "health",
      "release-gates",
    ],
  },
];
</script>
<template>
  <div class="container account-shell">
    <nav class="side-nav" aria-label="Administration navigation">
      <NuxtLink to="/admin">Overview</NuxtLink
      ><template v-for="g in groups" :key="g.title"
        ><template v-if="user && g.roles.includes(user.role)"
          ><span class="eyebrow" style="padding: 16px 14px 4px">{{
            g.title
          }}</span
          ><NuxtLink
            v-for="link in g.links"
            :key="link"
            :to="'/admin/' + link"
            >{{
              link.replaceAll("-", " ").replace(/^./, (c) => c.toUpperCase())
            }}</NuxtLink
          ></template
        ></template
      ><NuxtLink to="/account">Customer account ↗</NuxtLink>
    </nav>
    <div><slot /></div>
  </div>
</template>
