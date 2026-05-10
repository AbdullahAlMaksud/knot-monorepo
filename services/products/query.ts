"use client";

import { useQuery } from "@tanstack/react-query";
import { getPublishedProducts, getProductBySlug } from "./api";
import { productsQueryKeys } from "./querykey";

export const useGetPublishedProducts = () =>
  useQuery({
    queryKey: productsQueryKeys.all,
    queryFn: getPublishedProducts,
    select: (res) => res.data,
  });

export const useGetProductBySlug = (slug: string) =>
  useQuery({
    queryKey: productsQueryKeys.detail(slug),
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug,
  });
