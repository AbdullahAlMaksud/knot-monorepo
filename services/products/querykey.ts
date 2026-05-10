export const productsQueryKeys = {
  all: ["products", "published"] as const,
  detail: (slug: string) => ["products", "published", slug] as const,
};
