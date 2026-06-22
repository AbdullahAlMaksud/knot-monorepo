export const blogsQueryKeys = {
  published: (
    page: number,
    search: string,
    limit: number,
    category?: string,
    tags?: string,
  ) => ["blogs", "published", page, search, limit, category, tags] as const,
  detail: (slug: string) => ["blogs", "published", slug] as const,
};
