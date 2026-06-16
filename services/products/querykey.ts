export const productsQueryKeys = {
  all: ["products", "published"] as const,
  paginated: (page: number, limit: number) =>
    ["products", "published", "paginated", page, limit] as const,
  detail: (slug: string) => ["products", "published", slug] as const,
};
