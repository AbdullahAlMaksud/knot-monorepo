"use client";

import { ShoppingCart, ChevronLeft, ChevronRight, Star, ZoomIn, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";

interface FeaturedProductHeroProps {
  product?: {
    brand?: string;
    name?: string;
    price?: number;
    currency?: string;
    images?: string[];
    description?: string;
    rating?: number;
  };
  variant?: "dark" | "light";
}

export default function FeaturedProductHero({
  product,
  variant = "dark",
}: FeaturedProductHeroProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const featuredProduct = {
    brand: product?.brand || "BYOU BEAUTY",
    name: product?.name || "Glow Contour Lifting Peptide Mist",
    price: product?.price || 63.0,
    currency: product?.currency || "MYR",
    images:
      product?.images || [
        "/images/products/product1.jpg",
        "/images/products/product2.jpg",
        "/images/products/product3.jpg",
        "/images/products/product4.jpg",
      ],
    description:
      product?.description ||
      "A revolutionary peptide mist that lifts, contours, and enhances your natural glow with advanced skincare technology.",
    rating: product?.rating || 5,
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handlePreviousImage = () => {
    setSelectedImage((prev) =>
      prev === 0 ? featuredProduct.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImage((prev) =>
      prev === featuredProduct.images.length - 1 ? 0 : prev + 1
    );
  };

  const isDark = variant === "dark";
  const containerBg = isDark ? "bg-black" : "";
  const containerPadding = isDark ? "p-8 sm:p-10 lg:p-12" : "";
  const textColor = isDark ? "text-white" : "";
  const brandTextColor = isDark ? "text-gray-300" : "text-gray-600";
  const borderColor = isDark ? "border-white" : "border-black";
  const hoverBg = isDark ? "hover:bg-white hover:text-black" : "hover:bg-black hover:text-white";
  const buttonPrimary = isDark
    ? "bg-white text-black hover:bg-gray-200"
    : "bg-black text-white hover:bg-gray-200 hover:text-black";
  const buttonSecondary = isDark
    ? "border-2 border-white text-black hover:bg-white hover:text-black"
    : "border-2 border-black text-black hover:bg-black hover:text-white";
  const thumbnailRing = isDark ? "ring-white" : "ring-black";
  const dotColor = isDark ? "bg-white" : "bg-black";
  const dotColorInactive = isDark ? "bg-white/40" : "bg-black/40";
  const zoomBg = isDark ? "bg-black/50 hover:bg-black/70" : "bg-white/50 hover:bg-white/70";
  const zoomTextColor = isDark ? "text-white" : "text-black";
  const starFill = isDark ? "fill-white text-white" : "fill-black text-black";
  const starEmpty = isDark ? "text-gray-500" : "text-gray-400";
  const ratingText = isDark ? "text-gray-300" : "text-gray-600";
  const descriptionText = isDark ? "text-gray-300" : "text-gray-700";

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
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-[140px] h-[140px] rounded-2xl overflow-hidden transition-all shrink-0 ${
                      selectedImage === index
                        ? `ring-2 ${thumbnailRing}`
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Product view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Product Image */}
              <div className="relative flex-1">
                <div className="relative h-full w-full rounded-3xl overflow-hidden bg-gradient-to-br from-amber-100 to-stone-200">
                  <Image
                    src={featuredProduct.images[selectedImage]}
                    alt={featuredProduct.name}
                    fill
                    className="object-cover"
                    priority
                  />

                  {/* Navigation Arrows - Mobile Only */}
                  {isDark && (
                    <>
                      <button
                        onClick={handlePreviousImage}
                        className="lg:hidden absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-6 h-6 text-white" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="lg:hidden absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-6 h-6 text-white" />
                      </button>
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
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        selectedImage === index ? `${dotColor} w-8` : dotColorInactive
                      }`}
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
              <h1 className={`text-[42px] font-semibold max-w-[300px] mb-4 leading-tight ${textColor}`}>
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
                <p className={`${descriptionText} mb-6 leading-relaxed text-sm max-w-md`}>
                  {featuredProduct.description}
                </p>
              )}

              <p className="text-xl font-bold mb-8">
                Price: RM{featuredProduct.price.toFixed(2)}{" "}
                {featuredProduct.currency}
              </p>

              {/* Quantity Controls */}
              <div className="flex items-center gap-6 mb-8">
                <button
                  onClick={handleDecrease}
                  className={`w-14 h-14 rounded-full cursor-pointer border-2 ${borderColor} flex items-center justify-center ${hoverBg} transition`}
                  aria-label="Decrease quantity"
                >
                  <span className="text-2xl leading-none">−</span>
                </button>
                <span className={`text-3xl font-medium w-12 text-center ${textColor}`}>
                  {quantity}
                </span>
                <button
                  onClick={handleIncrease}
                  className={`w-14 h-14 rounded-full cursor-pointer border-2 ${borderColor} flex items-center justify-center ${hoverBg} transition`}
                  aria-label="Increase quantity"
                >
                  <span className="text-2xl leading-none">+</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <Button className={`w-full ${buttonPrimary} px-8 py-6 rounded-full font-medium transition flex items-center justify-center gap-2 text-lg`}>
                  Add to cart
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button variant="outline" className={`w-full ${buttonSecondary} px-8 py-6 rounded-full font-medium transition flex items-center justify-center gap-2 text-lg`}>
                  Bye Now
                  <ShoppingCart className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
