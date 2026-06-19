"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductById, getPublishedProducts, getProductBySlug } from "./api";
import { productsQueryKeys } from "./querykey";
import type { ApiProduct, ProductsListResponse } from "./type";

export const useGetPublishedProducts = () =>
  useQuery<ProductsListResponse, Error, ApiProduct[]>({
    queryKey: productsQueryKeys.all,
    queryFn: () => getPublishedProducts(),
    select: (res) => res.data,
  });

export const useGetPublishedProductsPaginated = (page: number, limit: number) =>
  useQuery<ProductsListResponse>({
    queryKey: productsQueryKeys.paginated(page, limit),
    queryFn: () => getPublishedProducts({ page, limit }),
    placeholderData: (prev) => prev,
  });

export const useGetProductBySlug = (slug: string) =>
  useQuery<ApiProduct | undefined>({
    queryKey: productsQueryKeys.detail(slug),
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug,
  });

export const useGetProductById = (id: string) =>
  useQuery<ApiProduct>({
    queryKey: productsQueryKeys.detail(id),
    queryFn: () => getProductById(id),
    enabled: !!id,
  });

export const useSearchProducts = (searchTerm: string, limit = 5, enabled = true) =>
  useQuery({
    queryKey: productsQueryKeys.search(searchTerm, limit),
    queryFn: () => getPublishedProducts({ searchTerm, limit }),
    enabled: enabled && !!searchTerm,
  });
