export const categories = [
  {
    path: "library",
    type: "PDF_GUIDE",
    label: "Handbooks",
    singular: "Handbook",
    description:
      "The reasoning behind the implementation. Twelve planned references, from discovery to engineering governance.",
  },
  {
    path: "atlases",
    type: "VISUAL_ATLAS",
    label: "Visual atlases",
    singular: "Visual atlas",
    description:
      "Architecture and workflows made visible. Editable diagrams, annotated examples and decision maps.",
  },
  {
    path: "skills",
    type: "AGENT_SKILL",
    label: "Agent skills",
    singular: "Agent skill",
    description:
      "Defined inputs, bounded permissions and verifiable outputs. Twelve planned skills for deliberate agent workflows.",
  },
  {
    path: "templates",
    type: "TEMPLATE",
    label: "Templates",
    singular: "Template",
    description:
      "Turn engineering decisions into durable records. Reusable specifications, registers and checklists.",
  },
  {
    path: "labs",
    type: "LAB",
    label: "Hands-on labs",
    singular: "Lab",
    description:
      "Work through deliberately incomplete systems. Reproduce failures, trace causes and defend your fixes.",
  },
  {
    path: "blueprints",
    type: "PRODUCT_BLUEPRINT",
    label: "Blueprints",
    singular: "Blueprint",
    description:
      "Product-specific scope for SaaS, commerce, marketplaces, AI products, communities and mobile applications.",
  },
  {
    path: "bundles",
    type: "BUNDLE",
    label: "Editions",
    singular: "Edition",
    description:
      "Planned learning paths across handbooks, tools and exercises. Exact commercial inclusions are still under review.",
  },
  {
    path: "free",
    type: "FREE_RESOURCE",
    label: "Free resource",
    singular: "Free resource",
    description:
      "A practical starting point for examining what your application still needs.",
  },
] as const;
export const tiers = [
  "FOUNDATION",
  "BUILDER",
  "PROFESSIONAL",
  "BUSINESS",
  "EXPERT",
  "ARCHITECT",
];
export const statuses = [
  "PLANNED",
  "IN_PRODUCTION",
  "IN_REVIEW",
  "READY",
  "PUBLISHED",
  "ARCHIVED",
] as const;
export interface Product {
  sku: string;
  slug: string;
  title: string;
  type: string;
  tier: string;
  description: string;
  status: string;
  visible: boolean;
  purchasable: boolean;
  cover: string;
  data: Record<string, any>;
  license: string;
  priceCents: number | null;
  currency: string;
  revision: number;
}
export function productPath(p: Pick<Product, "type" | "slug">) {
  return `/${categories.find((c) => c.type === p.type)?.path || "catalog"}/${p.slug}`;
}
export function human(value: string) {
  return value
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/^./, (c) => c.toUpperCase());
}
export function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
export function contents(
  data: Record<string, any>,
): { title: string; topics: string[] }[] {
  const list =
    data.chapters ||
    data.contents ||
    data.sections ||
    data.slides ||
    data.steps ||
    data.fields ||
    data.modules ||
    [];
  if (!Array.isArray(list)) return [];
  return list
    .filter((v) => typeof v === "string" || (v && typeof v === "object"))
    .map((v: any) =>
      typeof v === "string"
        ? { title: v, topics: [] }
        : {
            title: v.title || String(v),
            topics: Array.isArray(v.topics) ? v.topics.map(String) : [],
          },
    );
}
