import apiClient from "@/lib/axios";
import type {
  ApiProduct,
  ProductDetailResponse,
  ProductsListResponse,
} from "./type";

export const getPublishedProducts = async (): Promise<ProductsListResponse> => {
  const response = await apiClient.get<ProductsListResponse>(
    "/products/published",
  );
  return response.data;
};

export const getProductBySlug = async (
  slug: string,
): Promise<ApiProduct | undefined> => {
  const response = await apiClient.get<ProductsListResponse>(
    "/products/published",
  );
  return response.data.data.find((p) => p.slug === slug);
};

export const getProductById = async (id: string): Promise<ApiProduct> => {
  const response = await apiClient.get<ProductDetailResponse>(
    `/products/${id}`,
  );
  return response.data.data;
};
