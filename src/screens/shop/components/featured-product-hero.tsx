"use client";

import {
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Star,
  ArrowRight,
  Plus,
  Minus,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import CurrencyAmount from "@/components/ui/currency-amount";
import { useCart } from "@/lib/cart/cart-context";
import { setStoredBuyNowItem } from "@/lib/checkout/buy-now";
import type { ProductVariant } from "@/screens/product/services/type";
import { getVariantPricing } from "@/screens/product/services/utils";

interface FeaturedProductHeroProps {
  product: {
    _id?: string;
    variantId?: string;
    slug?: string;
    brand?: string;
    name?: string;
    price?: number;
    currency?: string;
    images?: string[];
    description?: string;
    rating?: number;
    variants?: ProductVariant[];
  };
  variant?: "dark" | "light";
}

const FeaturedProductHero = ({
  product,
  variant = "dark",
}: FeaturedProductHeroProps) => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState(product.variantId);
  const { addItem } = useCart();
  const variants = useMemo(() => product.variants ?? [], [product.variants]);
  const effectiveSelectedVariantId =
    selectedVariantId ?? product.variantId ?? variants[0]?._id;
  const selectedVariant =
    variants.find((item) => item._id === effectiveSelectedVariantId) ??
    variants[0];
  const selectedVariantPricing = getVariantPricing(
    selectedVariant,
    product.price ?? 0,
  );

  const featuredProduct = {
    brand: product.brand || "BYOU BEAUTY",
    name: product.name || "",
    price: selectedVariantPricing.discountedPrice,
    originalPrice: selectedVariantPricing.originalPrice,
    hasDiscount: selectedVariantPricing.hasDiscount,
    currency: selectedVariant?.currency ?? product.currency ?? "BDT",
    images: product.images ?? [],
    description: product.description,
    rating: Math.max(0, Math.min(5, Math.round(product.rating ?? 0))),
  };
  const currentImage = featuredProduct.images[selectedImage];

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (
      typeof selectedVariant?.quantity === "number" &&
      quantity >= selectedVariant.quantity
    ) {
      return;
    }
    setQuantity(quantity + 1);
  };

  const handlePreviousImage = () => {
    if (featuredProduct.images.length === 0) return;

    setSelectedImage((prev) =>
      prev === 0 ? featuredProduct.images.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    if (featuredProduct.images.length === 0) return;

    setSelectedImage((prev) =>
      prev === featuredProduct.images.length - 1 ? 0 : prev + 1,
    );
  };

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    addItem({
      id: product._id || featuredProduct.name,
      variantId: selectedVariant._id,
      name: featuredProduct.name,
      price: featuredProduct.price,
      image: currentImage ?? featuredProduct.images[0] ?? "",
      quantity,
    });
  };

  const handleBuyNow = () => {
    if (!selectedVariant) return;

    setStoredBuyNowItem({
      id: product._id || featuredProduct.name,
      variantId: selectedVariant._id,
      name: featuredProduct.name,
      price: featuredProduct.price,
      image: currentImage ?? featuredProduct.images[0] ?? "",
      quantity,
    });

    router.push("/checkout?mode=buy-now");
  };

  const isDark = variant === "dark";
  const containerBg = isDark ? "bg-black" : "";
  const containerPadding = isDark ? "p-8 sm:p-10 lg:p-12" : "";
  const textColor = isDark ? "text-white" : "";
  const brandTextColor = isDark ? "text-gray-300" : "text-gray-600";
  const borderColor = isDark ? "border-white" : "border-black";
  const hoverBg = isDark
    ? "hover:bg-white hover:text-black"
    : "hover:bg-black hover:text-white";
  const buttonPrimary = isDark
    ? "bg-white text-black hover:bg-gray-200"
    : "bg-black text-white hover:bg-gray-200 hover:text-black";
  const buttonSecondary = isDark
    ? "border-2 border-white text-black hover:bg-white hover:text-black"
    : "border-2 border-black text-black hover:bg-black hover:text-white";
  const thumbnailRing = isDark ? "ring-white" : "ring-black";
  const dotColor = isDark ? "bg-white" : "bg-black";
  const dotColorInactive = isDark ? "bg-white/40" : "bg-black/40";
  const starFill = isDark ? "fill-white text-white" : "fill-black text-black";
  const starEmpty = isDark ? "text-gray-500" : "text-gray-400";
  const ratingText = isDark ? "text-gray-300" : "text-gray-600";
  const descriptionText = isDark ? "text-gray-300" : "text-gray-700";
  const selectedVariantInStock =
    typeof selectedVariant?.quantity === "number"
      ? selectedVariant.quantity > 0
      : true;
  const canAddToCart = Boolean(selectedVariant?._id);

  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${containerBg} rounded-3xl ${containerPadding}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Thumbnails + Main Image */}
            <div className="flex gap-4 h-[600px]">
              {/* Thumbnail Gallery */}
              <div className="hidden lg:flex flex-col gap-3">
                {featuredProduct.images.map((image, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant="ghost"
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-[140px] h-[140px] rounded-2xl overflow-hidden transition-all shrink-0 p-0 ${
                      selectedImage === index
                        ? `ring-2 ${thumbnailRing}`
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Product view ${index + 1}`}
                      fill
                      sizes="140px"
                      className="object-cover"
                    />
                  </Button>
                ))}
              </div>

              {/* Main Product Image */}
              <div className="relative flex-1">
                <div className="relative h-full w-full rounded-3xl overflow-hidden bg-linear-to-br from-amber-100 to-stone-200">
                  {currentImage ? (
                    <Image
                      src={currentImage}
                      alt={featuredProduct.name}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                      priority
                    />
                  ) : null}

                  {/* Navigation Arrows - Mobile Only */}
                  {isDark && (
                    <>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={handlePreviousImage}
                        className="lg:hidden absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full hover:bg-black/70 text-white"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={handleNextImage}
                        className="lg:hidden absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full hover:bg-black/70 text-white"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </Button>
                    </>
                  )}

                  {/* Zoom icon */}
                  {/* <button className={`absolute bottom-4 right-4 w-12 h-12 ${zoomBg} rounded-full flex items-center justify-center transition`}>
                    <ZoomIn className={`w-5 h-5 ${zoomTextColor}`} />
                  </button> */}
                </div>

                {/* Mobile Thumbnail Dots */}
                <div className="flex lg:hidden justify-center gap-2 mt-4">
                  {featuredProduct.images.map((_, index) => (
                    <Button
                      key={index}
                      type="button"
                      variant="ghost"
                      onClick={() => setSelectedImage(index)}
                      className={`h-2 min-w-0 p-0 rounded-full transition-all ${
                        selectedImage === index
                          ? `${dotColor} w-8`
                          : dotColorInactive
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Product Details */}
            <div className={textColor}>
              <p className={`text-sm tracking-[0.2em] ${brandTextColor} mb-3`}>
                {featuredProduct.brand}
              </p>
              <h1
                className={`text-[42px] font-semibold max-w-[300px] mb-4 leading-tight ${textColor}`}
              >
                {featuredProduct.name}
              </h1>

              {/* Review Stars */}
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    className={`${
                      star <= featuredProduct.rating ? starFill : starEmpty
                    }`}
                  />
                ))}
                <span className={`${ratingText} text-sm ml-2`}>
                  ({featuredProduct.rating}.0)
                </span>
              </div>

              {/* Description */}
              {featuredProduct.description && (
                <p
                  className={`${descriptionText} mb-6 leading-relaxed text-sm max-w-md`}
                >
                  {featuredProduct.description}
                </p>
              )}

              <p className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-xl font-bold">
                <span>Price:</span>
                <CurrencyAmount
                  amount={featuredProduct.price}
                  currency={featuredProduct.currency}
                />
                {featuredProduct.hasDiscount && (
                  <CurrencyAmount
                    amount={featuredProduct.originalPrice}
                    currency={featuredProduct.currency}
                    className={
                      isDark
                        ? "text-white/50 line-through"
                        : "text-gray-400 line-through"
                    }
                  />
                )}
              </p>

              {variants.length > 0 && (
                <div className="mb-8">
                  <p className={`text-sm font-medium mb-3 ${descriptionText}`}>
                    Size
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {variants.map((item) => {
                      const isSelected = item._id === selectedVariant?._id;
                      const isAvailable =
                        typeof item.quantity === "number"
                          ? item.quantity > 0
                          : true;

                      return (
                        <Button
                          key={item._id}
                          type="button"
                          variant="outline"
                          disabled={!isAvailable}
                          onClick={() => {
                            setSelectedVariantId(item._id);
                            setQuantity(1);
                          }}
                          className={`min-w-24 rounded-full border-2 ${
                            isSelected
                              ? `${borderColor} ${buttonPrimary}`
                              : `${borderColor} bg-transparent ${hoverBg}`
                          }`}
                        >
                          {item.size}
                        </Button>
                      );
                    })}
                  </div>
                  {selectedVariant && (
                    <p className={`mt-3 text-xs ${descriptionText}`}>
                      {selectedVariantInStock
                        ? `${selectedVariant.quantity ?? "In"} stock`
                        : "Out of stock"}
                    </p>
                  )}
                </div>
              )}

              {/* Quantity Controls */}
              <div className="flex items-center gap-6 mb-8">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleDecrease}
                  className={`w-14 h-14 rounded-full border-2 ${borderColor} ${hoverBg}`}
                  aria-label="Decrease quantity"
                >
                  <Minus className="text-black text-6xl font-bold" />
                </Button>
                <span
                  className={`text-3xl font-medium w-12 text-center ${textColor}`}
                >
                  {quantity}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleIncrease}
                  disabled={!selectedVariantInStock}
                  className={`w-14 h-14 rounded-full border-2 ${borderColor} ${hoverBg}`}
                  aria-label="Increase quantity"
                >
                  <Plus className="text-black text-6xl font-bold" />
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <Button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!canAddToCart || !selectedVariantInStock}
                  className={`w-full ${buttonPrimary} px-8 py-6 rounded-full font-medium transition flex items-center justify-center gap-2 text-lg`}
                >
                  Add to cart
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleBuyNow}
                  disabled={!canAddToCart || !selectedVariantInStock}
                  className={`w-full ${buttonSecondary} px-8 py-6 rounded-full font-medium transition flex items-center justify-center gap-2 text-lg`}
                >
                  Buy Now
                  <ShoppingCart className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default FeaturedProductHero;
