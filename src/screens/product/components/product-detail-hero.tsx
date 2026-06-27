"use client";

import Image from "next/image";
import { Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import CurrencyAmount from "@/components/ui/currency-amount";
import { useCart } from "@/lib/cart/cart-context";
import { setStoredBuyNowItem } from "@/lib/checkout/buy-now";
import type { ApiProduct } from "@/screens/product/services/type";
import {
  getDefaultProductVariant,
  getProductImages,
  getProductVariants,
  getVariantPricing,
} from "@/screens/product/services/utils";
import { useRouter } from "next/navigation";

type ProductDetailHeroProps = {
  product: ApiProduct;
};

const ProductDetailHero = ({ product }: ProductDetailHeroProps) => {
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
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const selectedVariant =
    variants.find((variant) => variant._id === selectedVariantId) ??
    defaultVariant;
  const currentImage = images[selectedImage] ?? images[0] ?? "";
  const pricing = getVariantPricing(
    selectedVariant,
    defaultVariant?.price ?? 0,
  );
  const price = pricing.discountedPrice;
  const maxQuantity = selectedVariant?.quantity;
  const inStock = typeof maxQuantity === "number" ? maxQuantity > 0 : true;
  const canAddToCart = Boolean(selectedVariant?._id) && inStock;
  const rating = Math.max(0, Math.min(5, Math.round(product.rating ?? 0)));
  const productDescription = product.description
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const addProductToCart = () => {
    if (!selectedVariant || !canAddToCart) return;

    addItem({
      id: product._id,
      variantId: selectedVariant._id,
      name: product.name,
      price,
      image: currentImage,
      quantity,
      originalPrice: pricing.originalPrice,
      discountAmount: pricing.discountAmount,
      currency: pricing.currency,
      discountType: pricing.discountType,
      discountValue:
        typeof selectedVariant?.discountType === "object"
          ? Number(selectedVariant.discountType.value)
          : selectedVariant?.discountValue
            ? Number(selectedVariant.discountValue)
            : undefined,
      maxDiscountValue:
        typeof selectedVariant?.discountType === "object"
          ? Number(
              selectedVariant.discountType.maxValue ||
                selectedVariant.discountType.maxAmount,
            )
          : selectedVariant?.discountMaxValue
            ? Number(selectedVariant.discountMaxValue)
            : undefined,
      isDiscounted: pricing.hasDiscount,
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
      originalPrice: pricing.originalPrice,
      discountAmount: pricing.discountAmount,
      currency: pricing.currency,
      discountType: pricing.discountType,
      discountValue:
        typeof selectedVariant?.discountType === "object"
          ? Number(selectedVariant.discountType.value)
          : selectedVariant?.discountValue
            ? Number(selectedVariant.discountValue)
            : undefined,
      maxDiscountValue:
        typeof selectedVariant?.discountType === "object"
          ? Number(
              selectedVariant.discountType.maxValue ||
                selectedVariant.discountType.maxAmount,
            )
          : selectedVariant?.discountMaxValue
            ? Number(selectedVariant.discountMaxValue)
            : undefined,
      isDiscounted: pricing.hasDiscount,
    });
    router.push("/checkout?mode=buy-now");
  };

  return (
    <>
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
                <>
                  <CurrencyAmount
                    amount={pricing.originalPrice}
                    currency={pricing.currency}
                    className="text-gray-400 line-through"
                  />
                  <span className="inline-flex items-center bg-red-50 text-red-700 px-2 py-0.5 rounded text-xs font-bold">
                    {pricing.discountType === "PERCENTAGE" ||
                    pricing.discountType === "PERCENT"
                      ? `-${Math.round((pricing.discountAmount / pricing.originalPrice) * 100)}%`
                      : `-${pricing.discountAmount} ${pricing.currency === "BDT" ? "৳" : pricing.currency}`}
                  </span>
                </>
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

      {/* Sticky Bottom Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 w-full bg-white border-t border-stone-200 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] z-40 transition-transform duration-300 ease-in-out py-3 px-4 sm:px-6 lg:px-8 ${
          showStickyBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto max-w-6xl">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between gap-6 lg:gap-8">
            <div className="flex min-w-0 flex-1 items-center gap-4 lg:gap-5">
              {currentImage && (
                <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-xl bg-stone-100 border border-stone-200">
                  <Image
                    src={currentImage}
                    alt={product.name}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h3 className="max-w-md truncate text-xl font-semibold text-stone-900 lg:text-2xl">
                  {product.name}
                </h3>
                <p className="mt-1 line-clamp-2 max-w-xl text-sm leading-5 text-stone-600">
                  {productDescription}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-lg font-bold text-stone-950">
                    <CurrencyAmount
                      amount={price}
                      currency={pricing.currency}
                    />
                  </span>
                  {pricing.hasDiscount && (
                    <>
                      <span className="text-md text-stone-400 line-through">
                        <CurrencyAmount
                          amount={pricing.originalPrice}
                          currency={pricing.currency}
                        />
                      </span>
                      <span className="inline-flex items-center bg-red-50 text-red-700 px-1.5 py-0.5 rounded text-base font-bold">
                        {pricing.discountType === "PERCENTAGE" ||
                        pricing.discountType === "PERCENT"
                          ? `-${Math.round((pricing.discountAmount / pricing.originalPrice) * 100)}%`
                          : `-${pricing.discountAmount} ${pricing.currency === "BDT" ? "৳" : pricing.currency}`}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-6 lg:gap-8">
              {variants.length > 0 && (
                <div className="max-w-[18rem]">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">
                    Choose Variant
                  </p>
                  <div className="flex flex-wrap justify-end gap-2">
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
                            isSelected
                              ? "border-black bg-black text-white"
                              : "bg-white text-stone-900"
                          }`}
                        >
                          {variant.size}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex flex-col items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  disabled={!canAddToCart}
                  onClick={addProductToCart}
                  size="lg"
                  className="flex w-40 items-center gap-2 rounded-full px-6"
                >
                  Add to cart
                  <ShoppingBag className="size-4" />
                </Button>
                <Button
                  type="button"
                  variant="default"
                  disabled={!canAddToCart}
                  onClick={buyNow}
                  size="lg"
                  className="flex w-40 items-center gap-2 rounded-full px-6"
                >
                  Buy Now
                  <ShoppingBag className="size-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="flex flex-col gap-3 md:hidden">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 flex-1 items-start gap-3">
                {currentImage && (
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-sm bg-stone-100 border border-stone-200">
                    <Image
                      src={currentImage}
                      alt={product.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="text-xs font-semibold text-stone-900 truncate">
                    {product.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-stone-600">
                    {productDescription}
                  </p>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span className="text-xs font-bold text-stone-950">
                      <CurrencyAmount
                        amount={price}
                        currency={pricing.currency}
                      />
                    </span>
                    {pricing.hasDiscount && (
                      <span className="text-[10px] text-stone-400 line-through">
                        <CurrencyAmount
                          amount={pricing.originalPrice}
                          currency={pricing.currency}
                        />
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {!inStock && (
                <span className="shrink-0 text-[10px] font-semibold text-red-600">
                  Out of stock
                </span>
              )}
            </div>

            {variants.length > 0 && (
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-500">
                  Choose Variant
                </p>
                <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
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
                        className={`h-8 shrink-0 rounded-full px-3 text-[11px] ${
                          isSelected
                            ? "border-black bg-black text-white"
                            : "bg-white text-stone-900"
                        }`}
                      >
                        {variant.size}
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                disabled={!canAddToCart}
                onClick={addProductToCart}
                className="flex h-9 items-center justify-center gap-1.5 rounded-full bg-black text-xs text-white hover:bg-black/80"
              >
                Add to cart
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={!canAddToCart}
                onClick={buyNow}
                className="flex h-9 items-center justify-center gap-1.5 rounded-full border-black text-xs hover:bg-stone-50"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductDetailHero;
