export const blogsQueryKeys = {
  published: (page: number, search: string, limit: number) =>
    ["blogs", "published", page, search, limit] as const,
  detail: (slug: string) => ["blogs", "published", slug] as const,
};
