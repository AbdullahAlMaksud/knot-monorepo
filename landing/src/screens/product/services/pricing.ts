import { useMemo } from "react";
import type { ProductVariant, ProductVariantDiscount } from "@/screens/product/services/type";

export type VariantPricing = {
  originalPrice: number;
  discountedPrice: number;
  discountAmount: number;
  hasDiscount: boolean;
  discountType?: string;
  currency: string;
};

const DEFAULT_CURRENCY = "BDT";
const DISCOUNT_TYPE_KEYS = ["type", "name", "code"] as const;

const isDiscountConfig = (value: unknown): value is ProductVariantDiscount =>
  Boolean(value) && typeof value === "object";

const toDiscountType = (value: unknown): string | undefined => {
  if (typeof value === "string") {
    return value.trim().toUpperCase() || undefined;
  }

  if (!value || typeof value !== "object") {
    return undefined;
  }

  for (const key of DISCOUNT_TYPE_KEYS) {
    const nestedValue = (value as Partial<Record<typeof key, unknown>>)[key];

    if (typeof nestedValue === "string" && nestedValue.trim() !== "") {
      return nestedValue.trim().toUpperCase();
    }
  }

  return undefined;
};

const toAmount = (value: unknown): number | undefined => {
  const amount =
    typeof value === "string" && value.trim() !== "" ? Number(value) : value;

  if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) {
    return undefined;
  }

  return amount;
};

const roundCurrency = (amount: number): number => Math.round(amount);

export const getVariantPricing = (
  variant?: ProductVariant,
  fallbackPrice = 0,
): VariantPricing => {
  const originalPrice = Math.max(0, variant?.price ?? fallbackPrice);
  const rawDiscountType = variant?.discountType ?? variant?.discount?.type;
  const discountTypeConfig = isDiscountConfig(variant?.discountType)
    ? variant.discountType
    : undefined;
  const discountType = toDiscountType(rawDiscountType);
  const discountValue = toAmount(
    variant?.discountValue ??
      variant?.discountAmount ??
      discountTypeConfig?.value ??
      discountTypeConfig?.amount ??
      variant?.discount?.value ??
      variant?.discount?.amount,
  );
  const maxDiscountValue = toAmount(
    variant?.discountMaxValue ??
      variant?.maxDiscountValue ??
      variant?.maxDiscountAmount ??
      discountTypeConfig?.maxValue ??
      discountTypeConfig?.maxAmount ??
      discountTypeConfig?.maxDiscountValue ??
      discountTypeConfig?.maxDiscountAmount ??
      variant?.discount?.maxValue ??
      variant?.discount?.maxAmount ??
      variant?.discount?.maxDiscountValue ??
      variant?.discount?.maxDiscountAmount,
  );
  const canApplyDiscount =
    originalPrice > 0 &&
    Boolean(discountType) &&
    Boolean(discountValue) &&
    variant?.isDiscounted !== false;

  if (!canApplyDiscount || !discountType || !discountValue) {
    return {
      originalPrice,
      discountedPrice: originalPrice,
      discountAmount: 0,
      hasDiscount: false,
      discountType,
      currency: variant?.currency ?? DEFAULT_CURRENCY,
    };
  }

  let discountAmount = 0;

  if (discountType === "FLAT") {
    discountAmount = discountValue;
  }

  if (discountType === "PERCENTAGE" || discountType === "PERCENT") {
    discountAmount = (originalPrice * discountValue) / 100;

    if (maxDiscountValue) {
      discountAmount = Math.min(discountAmount, maxDiscountValue);
    }
  }

  discountAmount = roundCurrency(Math.min(discountAmount, originalPrice));

  return {
    originalPrice,
    discountedPrice: roundCurrency(originalPrice - discountAmount),
    discountAmount,
    hasDiscount: discountAmount > 0,
    discountType,
    currency: variant?.currency ?? DEFAULT_CURRENCY,
  };
};

export const useVariantPricing = (
  variant?: ProductVariant,
  fallbackPrice = 0,
): VariantPricing =>
  useMemo(() => getVariantPricing(variant, fallbackPrice), [
    fallbackPrice,
    variant,
  ]);
