export function usePageSeo(title: string, description: string, image?: string) {
  const route = useRoute(),
    config = useRuntimeConfig();
  const base = String(config.public.siteUrl);
  useSeoMeta({
    title: `${title} · AI Engineering`,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage: image
      ? new URL(image, base).href
      : new URL("/brand/logo-concept.svg", base).href,
    twitterCard: "summary_large_image",
  });
  useHead({
    link: [{ rel: "canonical", href: new URL(route.path, base).href }],
  });
}
