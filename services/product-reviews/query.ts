"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getLandingReviews,
  getProductReviews,
  getReviewById,
  getMyReviews,
  createReview,
  updateReview,
  deleteReview,
  type GetReviewParams,
} from "./api";
import { productReviewsQueryKeys } from "./querykey";
import type {
  ReviewListResponse,
  ReviewDetailResponse,
  CreateReviewPayload,
  UpdateReviewPayload,
} from "./type";

export const useGetLandingReviews = (rating?: number) =>
  useQuery<ReviewListResponse>({
    queryKey: productReviewsQueryKeys.landing(rating),
    queryFn: () => getLandingReviews({ rating }),
  });

export const useGetProductReviews = (productId: string, rating?: number) =>
  useQuery<ReviewListResponse>({
    queryKey: productReviewsQueryKeys.product(productId, rating),
    queryFn: () => getProductReviews(productId, { rating }),
    enabled: !!productId,
  });

export const useGetReviewById = (id: string) =>
  useQuery<ReviewDetailResponse>({
    queryKey: productReviewsQueryKeys.detail(id),
    queryFn: () => getReviewById(id),
    enabled: !!id,
  });

export const useGetMyReviews = (rating?: number) =>
  useQuery<ReviewListResponse>({
    queryKey: productReviewsQueryKeys.my(rating),
    queryFn: () => getMyReviews({ rating }),
  });

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  return useMutation<ReviewDetailResponse, Error, CreateReviewPayload>({
    mutationFn: createReview,
    onSuccess: (data) => {
      // Invalidate both my reviews and product reviews
      queryClient.invalidateQueries({ queryKey: productReviewsQueryKeys.all });
    },
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ReviewDetailResponse,
    Error,
    { id: string; payload: UpdateReviewPayload }
  >({
    mutationFn: ({ id, payload }) => updateReview(id, payload),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: productReviewsQueryKeys.all });
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  return useMutation<{ success: boolean; message: string }, Error, string>({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productReviewsQueryKeys.all });
    },
  });
};
