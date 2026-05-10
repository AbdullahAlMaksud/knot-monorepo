import apiClient from "@/lib/axios";
import type { Blog } from "./type";

interface BlogsListResponse {
  data: Blog[];
  message: string;
}

export const getPublishedBlogs = async (
  category?: string,
  search?: string,
  tag?: string,
): Promise<Blog[]> => {
  const params = new URLSearchParams({ status: "Published" });
  if (category && category !== "All") params.set("category", category);
  if (search && search.trim()) params.set("title", search.trim());
  if (tag && tag.trim()) params.set("tag", tag.trim());

  const response = await apiClient.get<BlogsListResponse>(
    `/blogs?${params.toString()}`,
  );
  return response.data.data ?? [];
};
