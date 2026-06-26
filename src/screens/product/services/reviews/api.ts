import apiClient from "@/lib/axios";
import type {
  ReviewListResponse,
  ReviewDetailResponse,
  CreateReviewPayload,
  UpdateReviewPayload,
} from "@/screens/product/services/reviews/type";

export interface GetReviewParams {
  rating?: number;
  page?: number;
  limit?: number;
}

export const getLandingReviews = async (
  params?: GetReviewParams,
): Promise<ReviewListResponse> => {
  const response = await apiClient.get<ReviewListResponse>(
    "/product-reviews/landing",
    { params },
  );
  return response.data;
};

export const getReviewById = async (id: string): Promise<ReviewDetailResponse> => {
  const response = await apiClient.get<ReviewDetailResponse>(
    `/product-reviews/${id}`,
  );
  return response.data;
};

export const getProductReviews = async (
  productId: string,
  params?: GetReviewParams,
): Promise<ReviewListResponse> => {
  const response = await apiClient.get<ReviewListResponse>(
    `/product-reviews/product/${productId}`,
    { params },
  );
  return response.data;
};

export const getMyReviews = async (
  params?: GetReviewParams,
): Promise<ReviewListResponse> => {
  const response = await apiClient.get<ReviewListResponse>(
    "/product-reviews/my",
    { params },
  );
  return response.data;
};

export const createReview = async (
  payload: CreateReviewPayload,
): Promise<ReviewDetailResponse> => {
  const response = await apiClient.post<ReviewDetailResponse>(
    "/product-reviews",
    payload,
  );
  return response.data;
};

export const updateReview = async (
  id: string,
  payload: UpdateReviewPayload,
): Promise<ReviewDetailResponse> => {
  const response = await apiClient.patch<ReviewDetailResponse>(
    `/product-reviews/${id}`,
    payload,
  );
  return response.data;
};

export const deleteReview = async (id: string): Promise<{ success: boolean; message: string }> => {
  const response = await apiClient.delete<{ success: boolean; message: string }>(
    `/product-reviews/${id}`,
  );
  return response.data;
};
