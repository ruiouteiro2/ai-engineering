<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="small-stack">
          <NuxtLink to="/" class="wordmark"
            >AI Engineering<br />Mastery System</NuxtLink
          >
          <p class="small measure">Build with AI. Engineer with confidence.</p>
          <p class="small">
            An independent library in preparation.<br />Written learning.
            Practical tools. Verifiable work.
          </p>
        </div>
        <div v-for="group in groups" :key="group.title" class="footer-links">
          <h3>{{ group.title }}</h3>
          <NuxtLink v-for="link in group.links" :key="link[0]" :to="link[0]">{{
            link[1]
          }}</NuxtLink>
        </div>
      </div>
      <div class="footer-bottom spread">
        <span
          >© {{ new Date().getFullYear() }} AI Engineering Mastery System ·
          Independent educational project</span
        ><NuxtLink to="/cookies">Privacy choices</NuxtLink>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
const groups = [
  {
    title: "The library",
    links: [
      ["/library", "Handbooks"],
      ["/atlases", "Visual atlases"],
      ["/skills", "Agent skills"],
      ["/templates", "Templates"],
      ["/labs", "Labs"],
      ["/blueprints", "Blueprints"],
      ["/bundles", "Editions"],
    ],
  },
  {
    title: "Explore",
    links: [
      ["/about", "About the project"],
      ["/methodology", "Methodology"],
      ["/roadmap", "Roadmap"],
      ["/updates", "Updates"],
      ["/free", "Free reality check"],
      ["/newsletter", "Newsletter"],
      ["/affiliates", "Affiliates"],
    ],
  },
  {
    title: "Help & policies",
    links: [
      ["/support", "Support"],
      ["/contact", "Contact"],
      ["/faq", "FAQ"],
      ["/licensing", "Licensing"],
      ["/privacy", "Privacy"],
      ["/terms", "Terms"],
      ["/terms-of-sale", "Sales terms"],
      ["/refund-policy", "Refund information"],
      ["/cookies", "Cookies"],
      ["/imprint", "Operator details"],
      ["/accessibility", "Accessibility"],
    ],
  },
];
</script>
