import { getR2ImageUrl } from "@/lib/utils";
import type { ApiProduct, ProductVariant } from "./type";
export { getVariantPricing, useVariantPricing } from "./pricing";

export const getProductVariants = (
  product?: ApiProduct,
): ProductVariant[] => product?.variants ?? product?.sizeVariants ?? [];

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

export const getProductSectionImage = (imageKey?: string): string | undefined =>
  imageKey ? getR2ImageUrl(imageKey) : undefined;
