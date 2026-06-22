"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/lib/cart/CartContext";
import { Button } from "@/components/ui/button";
import CurrencyAmount from "@/components/ui/currency-amount";
import type { ApiProduct } from "@/services/products/type";
import {
  getDefaultProductVariant,
  getProductImages,
  getVariantId,
  getVariantPricing,
} from "@/services/products/utils";

interface CoreProductsSectionProps {
  subtitle?: string;
  title: string;
  products: ApiProduct[];
}

export default function CoreProductsSection({
  subtitle = "MADE JUST FOR YOU",
  title,
  products,
}: CoreProductsSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState<
    Record<string, number>
  >({});
  const { addItem } = useCart();

  const getCurrentIndex = (productId: string): number => {
    return currentImageIndex[productId] || 0;
  };

  const goToPrevious = (
    productId: string,
    totalImages: number,
    e: React.MouseEvent,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => ({
      ...prev,
      [productId]: ((prev[productId] || 0) - 1 + totalImages) % totalImages,
    }));
  };

  const goToNext = (
    productId: string,
    totalImages: number,
    e: React.MouseEvent,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => ({
      ...prev,
      [productId]: ((prev[productId] || 0) + 1) % totalImages,
    }));
  };

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          {subtitle && <p className="text-gray-600 text-sm mb-2">{subtitle}</p>}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light">
            {title}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {products.map((product) => {
            const images = getProductImages(product);
            const currentIndex = getCurrentIndex(product._id);
            const hasMultipleImages = images.length > 1;
            const defaultVariant = getDefaultProductVariant(product);
            const pricing = getVariantPricing(defaultVariant);
            const price = pricing.discountedPrice;
            const variantId = getVariantId(defaultVariant);
            const defaultVariantInStock =
              typeof defaultVariant?.quantity === "number"
                ? defaultVariant.quantity > 0
                : Boolean(defaultVariant);
            const rating = Math.max(
              0,
              Math.min(5, Math.round(product.rating ?? 0)),
            );

            return (
              <div
                key={product._id}
                className="group flex flex-col items-center border rounded-2xl border-gray-200 hover:shadow transition"
              >
                <Link href={`/product/${product._id}`} className="w-full">
                  <div className="relative w-full h-[400px] sm:h-[500px] bg-gray-200 rounded-lg overflow-hidden mb-4">
                    {images.length > 0 ? (
                      images.map((image, index) => (
                        <div
                          key={index}
                          className={`absolute inset-0 transition-opacity duration-500 ${
                            index === currentIndex ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          <Image
                            src={image}
                            alt={`${product.name} - Image ${index + 1}`}
                            fill
                            sizes="(min-width: 640px) 50vw, 100vw"
                            className="object-cover"
                          />
                        </div>
                      ))
                    ) : (
                      <div className="absolute inset-0 bg-gray-100" />
                    )}

                    {/* Navigation Arrows */}
                    {hasMultipleImages && (
                      <>
                        <Button
                          type="button"
                          variant="secondary"
                          size="icon"
                          onClick={(e) =>
                            goToPrevious(product._id, images.length, e)
                          }
                          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-black rounded-full"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <Button
                          type="button"
                          variant="secondary"
                          size="icon"
                          onClick={(e) =>
                            goToNext(product._id, images.length, e)
                          }
                          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-black rounded-full"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </Button>
                      </>
                    )}
                    {/* Dots Indicator */}
                    {hasMultipleImages && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                        {images.map((_, index) => (
                          <Button
                            key={index}
                            type="button"
                            variant="ghost"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setCurrentImageIndex((prev) => ({
                                ...prev,
                                [product._id]: index,
                              }));
                            }}
                            className={`h-2 min-w-0 p-0 rounded-full transition-all ${
                              index === currentIndex
                                ? "bg-white w-6"
                                : "bg-white/50 hover:bg-white/75"
                            }`}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </Link>

                <div className="px-6 pb-6 w-full flex flex-col items-center">
                  <Link href={`/product/${product._id}`}>
                    <h3 className="text-xl font-medium mb-2 group-hover:text-gray-600 transition text-center">
                      {product.name}
                    </h3>
                  </Link>
                  {product.description && (
                    <p className="text-sm text-gray-500 mb-2 text-center max-w-md line-clamp-2">
                      {product.description}
                    </p>
                  )}

                  <div className="mb-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-gray-600 font-medium">
                    <CurrencyAmount
                      amount={pricing.discountedPrice}
                      currency={pricing.currency}
                      prefix="From"
                    />
                    {pricing.hasDiscount && (
                      <CurrencyAmount
                        amount={pricing.originalPrice}
                        currency={pricing.currency}
                        className="text-sm text-gray-400 line-through"
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={
                          star <= rating
                            ? "fill-black text-black"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <Button
                    type="button"
                    className="w-full rounded-full"
                    disabled={!variantId || !defaultVariantInStock}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (!variantId || !defaultVariantInStock) {
                        return;
                      }

                      addItem({
                        id: product._id,
                        variantId,
                        name: product.name,
                        price,
                        image: images[0] ?? "",
                        quantity: 1,
                        originalPrice: pricing.originalPrice,
                        discountAmount: pricing.discountAmount,
                        currency: pricing.currency,
                        discountType: pricing.discountType,
                        discountValue:
                          typeof defaultVariant?.discountType === "object"
                            ? Number(defaultVariant.discountType.value)
                            : defaultVariant?.discountValue
                              ? Number(defaultVariant.discountValue)
                              : undefined,
                        maxDiscountValue:
                          typeof defaultVariant?.discountType === "object"
                            ? Number(
                                defaultVariant.discountType.maxValue ||
                                  defaultVariant.discountType.maxAmount,
                              )
                            : defaultVariant?.discountMaxValue
                              ? Number(defaultVariant.discountMaxValue)
                              : undefined,
                        isDiscounted: pricing.hasDiscount,
                      });
                    }}
                  >
                    Add to cart
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
