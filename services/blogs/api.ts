import apiClient from "@/lib/axios";
import type { Blog, BlogDetailResponse } from "./type";

interface BlogsListResponse {
  data: Blog[];
  message: string;
}

export const getPublishedBlogs = async (
  category?: string,
  search?: string,
  tag?: string,
): Promise<Blog[]> => {
  const params = new URLSearchParams();
  if (category && category !== "All") params.set("category", category);
  if (search && search.trim()) params.set("title", search.trim());
  if (tag && tag.trim()) params.set("tag", tag.trim());

  const response = await apiClient.get<BlogsListResponse>(
    `/blogs?${params.toString()}`,
  );
  return response.data.data ?? [];
};

export const getBlogBySlug = async (slug: string): Promise<Blog> => {
  const response = await apiClient.get<BlogDetailResponse>(
    `/blogs/slug/${encodeURIComponent(slug)}`,
  );

  return response.data.data;
};
