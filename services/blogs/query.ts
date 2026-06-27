"use client";

import { useQuery } from "@tanstack/react-query";
import { getBlogBySlug, getBlogTags, getPublishedBlogs, type BlogFilters } from "./api";
import { blogsQueryKeys } from "./querykey";

export const useGetPublishedBlogs = (
  page = 1,
  search?: string,
  limit = 10,
  filters?: BlogFilters,
  enabled = true,
) =>
  useQuery({
    queryKey: blogsQueryKeys.published(
      page,
      search ?? "",
      limit,
      filters?.category,
      filters?.tags,
    ),
    queryFn: () => getPublishedBlogs(page, limit, search, filters),
    enabled,
  });

export const useGetBlogBySlug = (slug: string) =>
  useQuery({
    queryKey: blogsQueryKeys.detail(slug),
    queryFn: () => getBlogBySlug(slug),
    enabled: !!slug,
  });

export const useGetBlogTags = () =>
  useQuery({
    queryKey: blogsQueryKeys.tags(),
    queryFn: getBlogTags,
  });

