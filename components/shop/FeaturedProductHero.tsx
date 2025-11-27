"use client";

import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function FeaturedProductHero() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const featuredProduct = {
    brand: "BYOU BEAUTY",
    name: "Glow Contour Lifting Peptide Mist",
    price: 63.0,
    currency: "MYR",
    images: [
      "/images/products/product1.jpg",
      "/images/products/product2.jpg",
      "/images/products/product3.jpg",
      "/images/products/product4.jpg",
    ],
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-black rounded-3xl p-8 sm:p-10 lg:p-12">
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
                        ? "ring-2 ring-white"
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
                  {/* Zoom icon */}
                  <button className="absolute bottom-4 right-4 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="11" cy="11" r="8" strokeWidth="2" />
                      <path
                        d="M21 21l-4.35-4.35"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>

                {/* Mobile Thumbnail Dots */}
                <div className="flex lg:hidden justify-center gap-2 mt-4">
                  {featuredProduct.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        selectedImage === index ? "bg-white w-8" : "bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Product Details */}
            <div className="text-white">
              <p className="text-sm tracking-[0.2em] text-gray-300 mb-3">
                {featuredProduct.brand}
              </p>
              <h1 className="text-[42px] font-semibold max-w-[300px] mb-8 leading-tight">
                {featuredProduct.name}
              </h1>

              <p className="text-xl font-bold mb-8">
                Price: RM{featuredProduct.price.toFixed(2)}{" "}
                {featuredProduct.currency}
              </p>

              {/* Quantity Controls */}
              <div className="flex items-center gap-6 mb-8">
                <button
                  onClick={handleDecrease}
                  className="w-14 h-14 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition"
                  aria-label="Decrease quantity"
                >
                  <span className="text-2xl leading-none">−</span>
                </button>
                <span className="text-3xl font-medium w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrease}
                  className="w-14 h-14 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition"
                  aria-label="Increase quantity"
                >
                  <span className="text-2xl leading-none">+</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button className="w-full bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-200 transition flex items-center justify-center gap-2 text-lg">
                  Add to cart
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
                <button className="w-full border-2 border-white text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-black transition flex items-center justify-center gap-2 text-lg">
                  Bye Now
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
