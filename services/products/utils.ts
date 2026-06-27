import { getR2ImageUrl } from "@/lib/utils";
import type { ApiProduct, ProductVariant } from "./type";
export { getVariantPricing, useVariantPricing } from "./pricing";

const normalizeVariant = (variant: ProductVariant): ProductVariant => {
  const resolvedId = variant._id ?? variant.id;
  const hasPriceOnVariant =
    typeof variant.price === "number" && variant.price > 0;

  if (hasPriceOnVariant && resolvedId === variant._id) return variant;

  const defaultPrice =
    variant.prices?.find((p) => p.isDefault) ?? variant.prices?.[0];

  return {
    ...variant,
    _id: resolvedId,
    price: hasPriceOnVariant ? variant.price : (defaultPrice?.price ?? 0),
    discountType: variant.discountType ?? defaultPrice?.discountType,
    currency: variant.currency ?? defaultPrice?.currencyId?.code,
  };
};

export const getVariantId = (variant?: ProductVariant): string | undefined =>
  variant?._id ?? variant?.id;

export const getProductVariants = (product?: ApiProduct): ProductVariant[] =>
  (product?.variants ?? product?.sizeVariants ?? []).map(normalizeVariant);

export const getDefaultProductVariant = (
  product?: ApiProduct,
): ProductVariant | undefined => {
  const variants = getProductVariants(product);
  return variants.find((variant) => variant.isDefault) ?? variants[0];
};

export const getProductImages = (product: ApiProduct): string[] => {
  const imageKeys = [
    product.displayImageKey,
    ...(product.relatedImagesKeys ?? []),
  ].filter((key): key is string => Boolean(key));

  return imageKeys.map(getR2ImageUrl);
};

export const getProductSectionImage = (
  imageKey?: string,
): string | undefined => (imageKey ? getR2ImageUrl(imageKey) : undefined);
