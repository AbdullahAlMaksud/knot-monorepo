"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductById, getPublishedProducts, getProductBySlug } from "./api";
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

export const useGetProductById = (id: string) =>
  useQuery({
    queryKey: productsQueryKeys.detail(id),
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
