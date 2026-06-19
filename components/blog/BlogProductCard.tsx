"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import CurrencyAmount from "@/components/ui/currency-amount";
import { useCart } from "@/lib/cart/CartContext";
import { setStoredBuyNowItem } from "@/lib/checkout/buy-now";
import type { ApiProduct } from "@/services/products/type";
import {
  getDefaultProductVariant,
  getProductImages,
  getProductVariants,
  getVariantPricing,
} from "@/services/products/utils";
import { cn } from "@/lib/utils";

interface BlogProductCardProps {
  product: ApiProduct;
}

export default function BlogProductCard({ product }: BlogProductCardProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const images = getProductImages(product);
  const variants = getProductVariants(product);
  const defaultVariant = getDefaultProductVariant(product);
  const [selectedVariantId, setSelectedVariantId] = useState(
    defaultVariant?._id,
  );

  const selectedVariant =
    variants.find((v) => v._id === selectedVariantId) ?? defaultVariant;
  const pricing = getVariantPricing(
    selectedVariant,
    defaultVariant?.price ?? 0,
  );
  const displayImage = images[0] ?? "";
  const inStock =
    typeof selectedVariant?.quantity === "number"
      ? selectedVariant.quantity > 0
      : true;

  const handleAddToCart = () => {
    if (!selectedVariant?._id || !inStock) return;
    addItem({
      id: product._id,
      variantId: selectedVariant._id,
      name: product.name,
      price: pricing.discountedPrice,
      image: displayImage,
      quantity: 1,
      originalPrice: pricing.originalPrice,
      discountAmount: pricing.discountAmount,
      currency: pricing.currency,
      discountType: pricing.discountType,
      discountValue: typeof selectedVariant?.discountType === "object" ? Number(selectedVariant.discountType.value) : (selectedVariant?.discountValue ? Number(selectedVariant.discountValue) : undefined),
      maxDiscountValue: typeof selectedVariant?.discountType === "object" ? Number(selectedVariant.discountType.maxValue || selectedVariant.discountType.maxAmount) : (selectedVariant?.discountMaxValue ? Number(selectedVariant.discountMaxValue) : undefined),
      isDiscounted: pricing.hasDiscount,
    });
  };

  const handleBuyNow = () => {
    if (!selectedVariant?._id || !inStock) return;
    setStoredBuyNowItem({
      id: product._id,
      variantId: selectedVariant._id,
      name: product.name,
      price: pricing.discountedPrice,
      image: displayImage,
      quantity: 1,
      originalPrice: pricing.originalPrice,
      discountAmount: pricing.discountAmount,
      currency: pricing.currency,
      discountType: pricing.discountType,
      discountValue: typeof selectedVariant?.discountType === "object" ? Number(selectedVariant.discountType.value) : (selectedVariant?.discountValue ? Number(selectedVariant.discountValue) : undefined),
      maxDiscountValue: typeof selectedVariant?.discountType === "object" ? Number(selectedVariant.discountType.maxValue || selectedVariant.discountType.maxAmount) : (selectedVariant?.discountMaxValue ? Number(selectedVariant.discountMaxValue) : undefined),
      isDiscounted: pricing.hasDiscount,
    });
    router.push("/checkout");
  };

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <Link
        href={`/product/${product.slug}`}
        className="relative h-56 block overflow-hidden bg-gray-50"
      >
        {displayImage ? (
          <Image
            src={displayImage}
            fill
            alt={product.name}
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-gray-200 to-gray-300" />
        )}
      </Link>

      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-medium text-gray-900 text-sm leading-snug hover:text-gray-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          {product.description && (
            <p className="mt-1 text-xs text-gray-500 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        {variants.length > 1 && (
          <div className="flex flex-wrap gap-1.5">
            {variants.map((variant) => (
              <button
                key={variant._id}
                type="button"
                onClick={() => setSelectedVariantId(variant._id)}
                className={cn(
                  "px-2.5 py-1 rounded-full text-xs border transition-colors",
                  selectedVariantId === variant._id
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-700 border-gray-300 hover:border-gray-500",
                )}
              >
                {variant.size ?? variant.sku}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2">
          {pricing.hasDiscount ? (
            <>
              <CurrencyAmount
                amount={pricing.discountedPrice}
                className="text-base font-semibold text-gray-900"
              />
              <CurrencyAmount
                amount={pricing.originalPrice}
                className="text-xs text-gray-400 line-through"
              />
            </>
          ) : (
            <CurrencyAmount
              amount={pricing.originalPrice}
              className="text-base font-semibold text-gray-900"
            />
          )}
        </div>

        <div className="flex flex-col gap-2 mt-auto">
          <Button
            onClick={handleBuyNow}
            disabled={!inStock}
            className="w-full h-9 text-sm rounded-full bg-black text-white hover:bg-gray-800"
          >
            {inStock ? "Buy Now" : "Out of Stock"}
          </Button>
          <Button
            variant="outline"
            onClick={handleAddToCart}
            disabled={!inStock}
            className="w-full h-9 text-sm rounded-full border-black/20 hover:bg-gray-50"
          >
            <ShoppingCart size={14} className="mr-1.5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
