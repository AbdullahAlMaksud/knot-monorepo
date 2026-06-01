export const blogsQueryKeys = {
  published: (category: string, search: string, tag: string) =>
    ["blogs", "published", category, search, tag] as const,
  detail: (slug: string) => ["blogs", "published", slug] as const,
};
