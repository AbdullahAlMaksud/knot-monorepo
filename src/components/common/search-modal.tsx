"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, Loader2 } from "lucide-react";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { useSearchProducts } from "@/screens/product/services/query";
import { useGetPublishedBlogs } from "@/screens/blog/services/query";
import { useCart } from "@/lib/cart/cart-context";
import CurrencyAmount from "@/components/ui/currency-amount";
import {
  getDefaultProductVariant,
  getVariantPricing,
  getVariantId,
  getProductImages,
} from "@/screens/product/services/utils";
import { getR2ImageUrl } from "@/lib/utils";
import type { ApiProduct } from "@/screens/product/services/type";
import type { Blog } from "@/screens/blog/services/type";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const suggestions = [
  { label: "Face Serum", value: "serum" },
  { label: "Skincare", value: "skincare" },
  { label: "Hair Care", value: "hair" },
  { label: "Makeup", value: "makeup" },
  { label: "Wellness", value: "wellness" },
];

function getFirstImage(blog: Blog): string | undefined {
  const item = blog.contents?.find((c) => c.type === "IMAGE");
  if (!item) return undefined;
  const content = typeof item.content === "string" ? item.content : "";
  if (content && content.startsWith("http")) return content;
  if (item.contentKey) return getR2ImageUrl(item.contentKey);
  return undefined;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { addItem } = useCart();
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [animateState, setAnimateState] = useState(isOpen ? "open" : "closed");

  useBodyScrollLock(isOpen);

  // Sync open state with animation states
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      const timer = setTimeout(() => {
        setAnimateState("open");
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setAnimateState("closing");
      const timer = setTimeout(() => {
        setShouldRender(false);
        setAnimateState("closed");
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Debounce query input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery("");
      setDebouncedQuery("");
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const showResults = debouncedQuery.trim().length > 0;

  // API query calls
  const { data: productData, isLoading: productsLoading } = useSearchProducts(
    debouncedQuery,
    5,
    showResults,
  );

  const { data: blogResponse, isLoading: blogsLoading } = useGetPublishedBlogs(
    1,
    debouncedQuery,
    5,
    undefined,
    showResults,
  );

  const products = productData?.data ?? [];
  const blogs = blogResponse?.data ?? [];

  if (!shouldRender) return null;

  const handleAddToCart = (product: ApiProduct, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultVariant = getDefaultProductVariant(product);
    const pricing = getVariantPricing(defaultVariant);
    const variantId = getVariantId(defaultVariant);
    const inStock =
      typeof defaultVariant?.quantity === "number"
        ? defaultVariant.quantity > 0
        : Boolean(defaultVariant);
    const images = getProductImages(product);

    if (!variantId || !inStock) return;

    addItem({
      id: product._id,
      variantId,
      name: product.name,
      price: pricing.discountedPrice,
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
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]">
      {/* Backdrop */}
      <div
        data-lenis-prevent
        className={`fixed inset-0 bg-stone-900/40 backdrop-blur-md transition-opacity duration-200 ease-out ${
          animateState === "open" ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        data-lenis-prevent
        className={`relative w-full max-w-4xl mx-4 bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-stone-100 max-h-[80vh] transition-all duration-200 ease-out ${
          animateState === "open"
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-4"
        }`}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Search Input Area */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-stone-100 bg-stone-50/50">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products & articles..."
            className="w-full text-lg outline-none bg-transparent placeholder-stone-400 text-stone-850"
          />
          {(productsLoading || blogsLoading) && (
            <Loader2 className="w-5 h-5 text-stone-400 animate-spin shrink-0" />
          )}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="p-1 rounded-full hover:bg-stone-200/50 text-stone-400 hover:text-stone-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 text-stone-400 hover:text-stone-700 font-medium text-sm border-l border-stone-200 pl-4 hover:opacity-80 transition-opacity"
          >
            Close
          </button>
        </div>

        {/* Scrollable Content */}
        <div
          data-lenis-prevent
          className="flex-1 overflow-y-auto p-6 md:p-8 no-scrollbar bg-white"
        >
          {!showResults ? (
            // Suggestions State
            <div className="py-2">
              <h3 className="text-xs uppercase tracking-widest text-stone-400 font-semibold mb-4">
                Popular Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.value}
                    onClick={() => setSearchQuery(suggestion.label)}
                    className="px-4 py-2 text-sm text-stone-700 bg-stone-50 rounded-full border border-stone-200/60 hover:bg-black hover:text-white hover:border-black transition-all duration-200 font-medium"
                  >
                    {suggestion.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            // Results Columns
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Products Section */}
              <div>
                <h3 className="text-xs uppercase tracking-widest text-stone-400 font-semibold mb-5 pb-2 border-b border-stone-100">
                  Products ({products.length})
                </h3>

                {productsLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="flex gap-4 items-center">
                        <div className="w-16 h-16 bg-stone-100 rounded-xl animate-pulse" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-stone-100 rounded animate-pulse w-3/4" />
                          <div className="h-3 bg-stone-100 rounded animate-pulse w-1/4" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : products.length === 0 ? (
                  <p className="text-sm text-stone-400 py-4">
                    No products found
                  </p>
                ) : (
                  <div className="space-y-4">
                    {products.map((product) => {
                      const images = getProductImages(product);
                      const defaultVariant = getDefaultProductVariant(product);
                      const pricing = getVariantPricing(defaultVariant);
                      const isOutOfStock =
                        typeof defaultVariant?.quantity === "number"
                          ? defaultVariant.quantity <= 0
                          : !defaultVariant;

                      return (
                        <div
                          key={product._id}
                          className="group flex gap-4 items-center p-2 rounded-2xl hover:bg-stone-50 transition-colors"
                        >
                          <Link
                            href={`/product/${product._id}`}
                            onClick={onClose}
                            className="w-16 h-16 shrink-0 bg-stone-50 rounded-xl overflow-hidden relative border border-stone-100"
                          >
                            {images[0] ? (
                              <Image
                                src={images[0]}
                                alt={product.name}
                                fill
                                sizes="64px"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            ) : (
                              <div className="absolute inset-0 bg-stone-100" />
                            )}
                          </Link>

                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/product/${product._id}`}
                              onClick={onClose}
                              className="block"
                            >
                              <h4 className="text-sm font-semibold text-stone-800 hover:text-stone-600 transition-colors truncate">
                                {product.name}
                              </h4>
                            </Link>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm font-medium text-stone-900">
                                <CurrencyAmount
                                  amount={pricing.discountedPrice}
                                  currency={pricing.currency}
                                />
                              </span>
                              {pricing.hasDiscount && (
                                <span className="text-xs text-stone-400 line-through">
                                  <CurrencyAmount
                                    amount={pricing.originalPrice}
                                    currency={pricing.currency}
                                  />
                                </span>
                              )}
                            </div>
                          </div>

                          {!isOutOfStock && (
                            <button
                              onClick={(e) => handleAddToCart(product, e)}
                              className="px-3 py-1.5 text-xs font-semibold text-black bg-stone-100 hover:bg-black hover:text-white rounded-full transition-all duration-200 shrink-0 shadow-sm"
                            >
                              + Add
                            </button>
                          )}
                        </div>
                      );
                    })}
                    <div className="pt-2">
                      <Link
                        href={`/shop?search=${encodeURIComponent(debouncedQuery)}`}
                        onClick={onClose}
                        className="text-xs font-semibold text-stone-600 hover:text-black flex items-center gap-1.5 transition-colors pl-2"
                      >
                        View all products
                        <span>&rarr;</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Blogs Section */}
              <div>
                <h3 className="text-xs uppercase tracking-widest text-stone-400 font-semibold mb-5 pb-2 border-b border-stone-100">
                  Articles ({blogs.length})
                </h3>

                {blogsLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="flex gap-4 items-center">
                        <div className="w-16 h-16 bg-stone-100 rounded-xl animate-pulse" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-stone-100 rounded animate-pulse w-2/3" />
                          <div className="h-3 bg-stone-100 rounded animate-pulse w-1/3" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : blogs.length === 0 ? (
                  <p className="text-sm text-stone-400 py-4">
                    No articles found
                  </p>
                ) : (
                  <div className="space-y-4">
                    {blogs.map((blog) => {
                      const image = getFirstImage(blog);

                      return (
                        <Link
                          key={blog._id}
                          href={`/blog/${blog.slug}`}
                          onClick={onClose}
                          className="group flex gap-4 items-center p-2 rounded-2xl hover:bg-stone-50 transition-colors"
                        >
                          <div className="w-16 h-16 shrink-0 bg-stone-50 rounded-xl overflow-hidden relative border border-stone-100">
                            {image ? (
                              <Image
                                src={image}
                                alt={blog.title}
                                fill
                                sizes="64px"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            ) : (
                              <div className="absolute inset-0 bg-stone-100" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold block mb-1">
                              {blog.category}
                            </span>
                            <h4 className="text-sm font-semibold text-stone-850 group-hover:text-stone-600 transition-colors line-clamp-2 leading-snug">
                              {blog.title}
                            </h4>
                          </div>
                        </Link>
                      );
                    })}
                    <div className="pt-2">
                      <Link
                        href={`/blog?search=${encodeURIComponent(debouncedQuery)}`}
                        onClick={onClose}
                        className="text-xs font-semibold text-stone-600 hover:text-black flex items-center gap-1.5 transition-colors pl-2"
                      >
                        View all articles
                        <span>&rarr;</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
