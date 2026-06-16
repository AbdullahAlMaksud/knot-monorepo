"use client";

import { useQuery } from "@tanstack/react-query";
import { getBlogBySlug, getPublishedBlogs } from "./api";
import { blogsQueryKeys } from "./querykey";

export const useGetPublishedBlogs = (
  page = 1,
  search?: string,
  limit = 9,
  enabled = true,
) =>
  useQuery({
    queryKey: blogsQueryKeys.published(page, search ?? "", limit),
    queryFn: () => getPublishedBlogs(page, limit, search),
    enabled,
  });

export const useGetBlogBySlug = (slug: string) =>
  useQuery({
    queryKey: blogsQueryKeys.detail(slug),
    queryFn: () => getBlogBySlug(slug),
    enabled: !!slug,
  });
