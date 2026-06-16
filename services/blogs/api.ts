import apiClient from "@/lib/axios";
import type {
  Blog,
  BlogDetailResponse,
  BlogMeta,
  PaginatedBlogsResponse,
} from "./type";

const BLOGS_PER_PAGE = 9;

export const getPublishedBlogs = async (
  page = 1,
  limit = BLOGS_PER_PAGE,
  search?: string,
): Promise<{ data: Blog[]; meta: BlogMeta }> => {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(limit));
  if (search && search.trim()) params.set("searchTerm", search.trim());

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
