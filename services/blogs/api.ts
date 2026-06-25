import apiClient from "@/lib/axios";
import type {
  Blog,
  BlogDetailResponse,
  BlogMeta,
  PaginatedBlogsResponse,
} from "./type";

const BLOGS_PER_PAGE = 10;

export interface BlogFilters {
  category?: string;
  tags?: string;
  isFeatured?: boolean;
  status?: string;
}

export const getPublishedBlogs = async (
  page = 1,
  limit = BLOGS_PER_PAGE,
  search?: string,
  filters?: BlogFilters,
): Promise<{ data: Blog[]; meta: BlogMeta }> => {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(limit));
  if (search && search.trim()) params.set("searchTerm", search.trim());
  if (filters?.category) params.set("category", filters.category);
  if (filters?.tags) params.set("tags", filters.tags);
  if (filters?.isFeatured !== undefined)
    params.set("isFeatured", String(filters.isFeatured));
  if (filters?.status) params.set("status", filters.status);

  const response = await apiClient.get<PaginatedBlogsResponse>(
    `/blogs/published?${params.toString()}`,
  );
  return {
    data: response.data.data ?? [],
    meta: response.data.meta,
  };
};

export const getBlogBySlug = async (slug: string): Promise<Blog> => {
  const response = await apiClient.get<BlogDetailResponse>(
    `/blogs/slug/${encodeURIComponent(slug)}`,
  );

  return response.data.data;
};

export const getBlogTags = async (): Promise<string[]> => {
  const response = await apiClient.get<{ data: string[] }>("/blogs/tags");
  return response.data.data;
};

