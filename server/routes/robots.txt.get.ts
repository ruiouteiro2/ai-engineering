export default defineEventHandler((event) => {
  setHeader(event, "Content-Type", "text/plain");
  return `User-agent: *\nDisallow: /account\nDisallow: /admin\nDisallow: /checkout\nDisallow: /delivery\nDisallow: /api\nSitemap: ${process.env.APP_BASE_URL || "http://localhost:3000"}/sitemap.xml\n`;
});
