export const productReviewsQueryKeys = {
  all: ["product-reviews"] as const,
  landing: (rating?: number) => ["product-reviews", "landing", { rating }] as const,
  product: (productId: string, rating?: number) =>
    ["product-reviews", "product", productId, { rating }] as const,
  my: (rating?: number) => ["product-reviews", "my", { rating }] as const,
  detail: (id: string) => ["product-reviews", "detail", id] as const,
};
