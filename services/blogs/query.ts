"use client";

import { useQuery } from "@tanstack/react-query";
import { getPublishedBlogs } from "./api";
import { blogsQueryKeys } from "./querykey";

export const useGetPublishedBlogs = (
  category?: string,
  search?: string,
  tag?: string,
) =>
  useQuery({
    queryKey: blogsQueryKeys.published(
      category ?? "all",
      search ?? "",
      tag ?? "",
    ),
    queryFn: () => getPublishedBlogs(category, search, tag),
    select: (data) => data,
  });
