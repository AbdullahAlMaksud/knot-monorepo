"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/lib/cart/CartContext";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/products";

interface CoreProductsSectionProps {
  subtitle?: string;
  title: string;
  products: Product[];
}

function parsePrice(price: string): number {
  const n = parseFloat(price.replace(/[^\d.]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : 48;
}

export default function CoreProductsSection({
  subtitle = "MADE JUST FOR YOU",
  title,
  products,
}: CoreProductsSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState<
    Record<number, number>
  >({});
  const { addItem } = useCart();

  const getProductImages = (product: Product): string[] => {
    // Normalize to array: if it's a string, convert to array; if already array, use it
    return Array.isArray(product.images) ? product.images : [product.images];
  };

  const getCurrentIndex = (productId: number): number => {
    return currentImageIndex[productId] || 0;
  };

  const goToPrevious = (
    productId: number,
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
    productId: number,
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
            const currentIndex = getCurrentIndex(product.id);
            const hasMultipleImages = images.length > 1;

            return (
              <div
                key={product.id}
                className="group flex flex-col items-center border rounded-2xl border-gray-200 hover:shadow transition"
              >
                <Link href={`/product/${product.id}`} className="w-full">
                  <div className="relative w-full h-[400px] sm:h-[500px] bg-gray-200 rounded-lg overflow-hidden mb-4">
                    {images.map((image, index) => (
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
                          className="object-cover"
                        />
                      </div>
                    ))}

                    {/* Navigation Arrows */}
                    {hasMultipleImages && (
                      <>
                        <Button
                          type="button"
                          variant="secondary"
                          size="icon"
                          onClick={(e) =>
                            goToPrevious(product.id, images.length, e)
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
                            goToNext(product.id, images.length, e)
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
                                [product.id]: index,
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
                  <Link href={`/product/${product.id}`}>
                    <h3 className="text-xl font-medium mb-2 group-hover:text-gray-600 transition text-center">
                      {product.name}
                    </h3>
                  </Link>
                  {product.description && (
                    <p className="text-sm text-gray-500 mb-2 text-center max-w-md line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  <p className="text-gray-600 mb-2 font-medium">
                    {product.price}
                  </p>

                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={16} fill="black" />
                    ))}
                  </div>
                  <Button
                    type="button"
                    className="w-full rounded-full"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const images = getProductImages(product);
                      addItem({
                        id: product.id,
                        name: product.name,
                        price: parsePrice(product.price),
                        image:
                          typeof product.images === "string"
                            ? product.images
                            : (product.images[0] ?? ""),
                        quantity: 1,
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
