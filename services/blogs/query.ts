"use client";

import { useQuery } from "@tanstack/react-query";
import { getBlogBySlug, getPublishedBlogs } from "./api";
import { blogsQueryKeys } from "./querykey";

export const useGetPublishedBlogs = (
  category?: string,
  search?: string,
  tag?: string,
  enabled = true,
) =>
  useQuery({
    queryKey: blogsQueryKeys.published(
      category ?? "all",
      search ?? "",
      tag ?? "",
    ),
    queryFn: () => getPublishedBlogs(category, search, tag),
    enabled,
    select: (data) => data,
  });

export const useGetBlogBySlug = (slug: string) =>
  useQuery({
    queryKey: blogsQueryKeys.detail(slug),
    queryFn: () => getBlogBySlug(slug),
    enabled: !!slug,
  });
