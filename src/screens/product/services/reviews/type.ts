export interface ReviewProduct {
  _id: string;
  name: string;
  slug: string;
  displayImageKey?: string;
  rating?: number;
}

export interface Reviewer {
  _id: string;
  name: string;
  email: string;
  image?: string;
}

export interface ProductReview {
  _id: string;
  productId: ReviewProduct | string;
  reviewerId: string;
  description: string;
  mediaKeys?: string[];
  rating: number;
  isShowInProductDetails: boolean;
  isShowInLanding: boolean;
  createdAt: string;
  updatedAt: string;
  reviewer?: Reviewer;
}

export interface CreateReviewPayload {
  productId: string;
  rating: number;
  description: string;
  mediaKeys?: string[];
}

export interface UpdateReviewPayload {
  rating?: number;
  description?: string;
  mediaKeys?: string[];
}

export interface ReviewsMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface ReviewListResponse {
  success: boolean;
  message: string;
  code: number;
  meta: ReviewsMeta | null;
  data: ProductReview[];
}

export interface ReviewDetailResponse {
  success: boolean;
  message: string;
  code: number;
  meta: null;
  data: ProductReview;
}
