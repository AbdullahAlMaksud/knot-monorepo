import { apiFetch } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export type BlogContent = {
  order: number;
  type: "text" | "image" | "video";
  content: string;
  contentKey?: string;
};

export type Blog = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  status: string;
  isFeatured: boolean;
  contents: BlogContent[];
  createdAt: string;
  updatedAt: string;
};

export function useGetPublishedBlogs(category?: string) {
  const params = new URLSearchParams({ status: "Published" });
  if (category && category !== "All") params.set("category", category);

  return useQuery({
    queryKey: ["blogs", "published", category ?? "all"],
    queryFn: () => apiFetch<Blog[]>(`/blogs?${params.toString()}`),
    select: (res: { data: Blog[]; message: string }) => res.data ?? [],
  });
}
