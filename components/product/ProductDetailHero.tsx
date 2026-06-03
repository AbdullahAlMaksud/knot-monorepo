"use client";

import Image from "next/image";
import { Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { useMemo, useState } from "react";
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
import { useRouter } from "next/navigation";

type ProductDetailHeroProps = {
  product: ApiProduct;
};

export default function ProductDetailHero({ product }: ProductDetailHeroProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const images = useMemo(() => getProductImages(product), [product]);
  const variants = useMemo(() => getProductVariants(product), [product]);
  const defaultVariant = getDefaultProductVariant(product);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState(
    defaultVariant?._id,
  );
  const [quantity, setQuantity] = useState(1);
  const selectedVariant =
    variants.find((variant) => variant._id === selectedVariantId) ??
    defaultVariant;
  const currentImage = images[selectedImage] ?? images[0] ?? "";
  const pricing = getVariantPricing(selectedVariant, defaultVariant?.price ?? 0);
  const price = pricing.discountedPrice;
  const maxQuantity = selectedVariant?.quantity;
  const inStock = typeof maxQuantity === "number" ? maxQuantity > 0 : true;
  const canAddToCart = Boolean(selectedVariant?._id) && inStock;
  const rating = Math.max(0, Math.min(5, Math.round(product.rating ?? 0)));

  const addProductToCart = () => {
    if (!selectedVariant || !canAddToCart) return;

    addItem({
      id: product._id,
      variantId: selectedVariant._id,
      name: product.name,
      price,
      image: currentImage,
      quantity,
    });
  };

  const buyNow = () => {
    if (!selectedVariant || !canAddToCart) return;

    setStoredBuyNowItem({
      id: product._id,
      variantId: selectedVariant._id,
      name: product.name,
      price,
      image: currentImage,
      quantity,
    });
    router.push("/checkout?mode=buy-now");
  };

  return (
    <section className="bg-white pt-10 pb-12">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[1.08fr_1fr] lg:px-8">
        <div className="grid grid-cols-[72px_1fr] gap-3 sm:grid-cols-[88px_1fr]">
          <div className="flex flex-col gap-3">
            {images.map((image, index) => (
              <Button
                key={image}
                type="button"
                variant="ghost"
                onClick={() => setSelectedImage(index)}
                className={`relative h-20 w-full overflow-hidden rounded-sm border p-0 sm:h-24 ${
                  selectedImage === index
                    ? "border-black"
                    : "border-transparent opacity-80"
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  sizes="88px"
                  className="object-cover"
                />
              </Button>
            ))}
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-sm bg-stone-100 sm:min-h-[470px]">
            {currentImage ? (
              <Image
                src={currentImage}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 1024px) 560px, 80vw"
                className="object-cover"
              />
            ) : null}
          </div>
        </div>

        <div className="flex flex-col justify-center lg:pl-4">
          <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-gray-500">
            BYOU BEAUTY
          </p>
          <div className="mb-12 flex items-start justify-between gap-5">
            <h1 className="max-w-md text-3xl font-semibold leading-none tracking-tight sm:text-4xl">
              {product.name}
            </h1>
            <div className="mt-1 flex shrink-0 gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`size-3 ${
                    star <= rating ? "fill-black text-black" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mb-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold">
            <span>Price:</span>
            <CurrencyAmount
              amount={pricing.discountedPrice}
              currency={pricing.currency}
            />
            {pricing.hasDiscount && (
              <CurrencyAmount
                amount={pricing.originalPrice}
                currency={pricing.currency}
                className="text-gray-400 line-through"
              />
            )}
          </div>

          {variants.length > 0 && (
            <div className="mb-5 flex flex-wrap gap-2">
              {variants.map((variant) => {
                const isSelected = variant._id === selectedVariant?._id;
                const isAvailable =
                  typeof variant.quantity === "number"
                    ? variant.quantity > 0
                    : true;

                return (
                  <Button
                    key={variant._id}
                    type="button"
                    variant="outline"
                    disabled={!isAvailable}
                    onClick={() => {
                      setSelectedVariantId(variant._id);
                      setQuantity(1);
                    }}
                    className={`h-8 rounded-full px-4 text-xs ${
                      isSelected ? "bg-black text-white" : "bg-white"
                    }`}
                  >
                    {variant.size}
                  </Button>
                );
              })}
            </div>
          )}

          <div className="mb-5 flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              className="size-8 rounded-full border-black"
            >
              <Minus className="size-3" />
            </Button>
            <span className="flex size-8 items-center justify-center rounded-full border border-black text-xs">
              {quantity}
            </span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={
                !inStock ||
                (typeof maxQuantity === "number" && quantity >= maxQuantity)
              }
              onClick={() => setQuantity((value) => value + 1)}
              className="size-8 rounded-full border-black"
            >
              <Plus className="size-3" />
            </Button>
          </div>

          <div className="max-w-lg space-y-3">
            <Button
              type="button"
              disabled={!canAddToCart}
              onClick={addProductToCart}
              className="h-10 w-full rounded-full bg-black text-xs text-white hover:bg-black/80"
            >
              Add to cart
              <ShoppingBag className="ml-2 size-3" />
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={!canAddToCart}
              onClick={buyNow}
              className="h-10 w-full rounded-full border-black text-xs"
            >
              Buy Now
              <ShoppingBag className="ml-2 size-3" />
            </Button>
          </div>

          {!inStock && (
            <p className="mt-3 text-xs font-medium text-red-600">
              Selected size is out of stock.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
