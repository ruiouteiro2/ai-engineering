import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2026-10-01",
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
    server: { watch: { usePolling: true, interval: 1000 } },
  },
  typescript: { strict: true },
  runtimeConfig: {
    public: {
      siteUrl: process.env.APP_BASE_URL || "http://localhost:3000",
      brandName: process.env.BRAND_NAME || "AI Engineering Mastery System",
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      title: "AI Engineering Mastery System",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [
        {
          rel: "icon",
          href: "/brand/favicon-concept.svg",
          type: "image/svg+xml",
        },
      ],
    },
  },
  routeRules: {
    "/account/**": {
      headers: { "cache-control": "no-store", "x-robots-tag": "noindex" },
    },
    "/admin/**": {
      headers: { "cache-control": "no-store", "x-robots-tag": "noindex" },
    },
    "/checkout/**": {
      headers: { "cache-control": "no-store", "x-robots-tag": "noindex" },
    },
  },
  nitro: { preset: "node-server" },
});
