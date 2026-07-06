"use client";

import React, { useState, useEffect } from "react";
import { Star, Upload, Trash2, ShieldAlert, Loader2, Play, X, CheckCircle2 } from "lucide-react";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { useAuthUser } from "@/hooks/use-auth-user";
import {
  useGetProductReviews,
  useCreateReview,
} from "@/screens/product/services/reviews/query";
import { useUploadMedia } from "@/hooks/use-upload-media";
import { getR2ImageUrl } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart/cart-context";
import { setStoredBuyNowItem } from "@/lib/checkout/buy-now";
import {
  getDefaultProductVariant,
  getProductImages,
  getVariantPricing,
  getVariantId,
} from "@/screens/product/services/utils";
import { toast } from "sonner";
import FullScreenMediaModal from "@/components/shared/full-screen-media-modal";
import type { ApiProduct } from "@/screens/product/services/type";

interface ProductReviewsSectionProps {
  product: ApiProduct;
}

const isVideoFile = (urlOrKey: string) => {
  return /\.(mp4|mov|webm|avi|mkv|3gp|ogv)$/i.test(urlOrKey);
};

const ProductReviewsSection = ({ product }: ProductReviewsSectionProps) => {
  const router = useRouter();
  const { addItem } = useCart();
  const { user, userId } = useAuthUser();
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [mediaKeys, setMediaKeys] = useState<string[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<{ url: string; isVideo: boolean } | null>(null);
  const [isRestrictionModalOpen, setIsRestrictionModalOpen] = useState(false);
  const [isWriteReviewModalOpen, setIsWriteReviewModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isAlreadyReviewedModalOpen, setIsAlreadyReviewedModalOpen] = useState(false);

  // Fetch reviews list
  const { data: response, isLoading: isReviewsLoading } = useGetProductReviews(product._id);
  const reviews = response?.data || [];

  // Check if current user has already reviewed
  const hasReviewed = reviews.some(
    (r) =>
      r.reviewerId === userId ||
      (typeof r.reviewer === "object" && r.reviewer?._id === userId),
  );

  // Mutations
  const createReviewMutation = useCreateReview();
  const uploadMediaMutation = useUploadMedia({
    onSuccess: (keys) => {
      setMediaKeys((prev) => [...prev, ...keys]);
    },
  });

  useBodyScrollLock(isWriteReviewModalOpen || isSuccessModalOpen || isAlreadyReviewedModalOpen);

  const handleWriteReviewClick = () => {
    if (hasReviewed) {
      setIsAlreadyReviewedModalOpen(true);
    } else {
      setIsWriteReviewModalOpen(true);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsWriteReviewModalOpen(false);
        setIsSuccessModalOpen(false);
        setIsAlreadyReviewedModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleAddToCart = () => {
    const defaultVariant = getDefaultProductVariant(product);
    if (!defaultVariant) {
      toast.error("Product variant not available.");
      return;
    }
    const pricing = getVariantPricing(defaultVariant);
    const variantId = getVariantId(defaultVariant);
    const images = getProductImages(product);
    const maxQuantity = defaultVariant?.quantity;
    const inStock = typeof maxQuantity === "number" ? maxQuantity > 0 : true;

    if (!variantId || !inStock) {
      toast.error("This product is out of stock.");
      return;
    }

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
    toast.success("Product added to cart!");
    setIsRestrictionModalOpen(false);
  };

  const handleBuyNow = () => {
    const defaultVariant = getDefaultProductVariant(product);
    if (!defaultVariant) {
      toast.error("Product variant not available.");
      return;
    }
    const pricing = getVariantPricing(defaultVariant);
    const variantId = getVariantId(defaultVariant);
    const images = getProductImages(product);
    const maxQuantity = defaultVariant?.quantity;
    const inStock = typeof maxQuantity === "number" ? maxQuantity > 0 : true;

    if (!variantId || !inStock) {
      toast.error("This product is out of stock.");
      return;
    }

    setStoredBuyNowItem({
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
    setIsRestrictionModalOpen(false);
    router.push("/checkout?mode=buy-now");
  };



  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);

      // Check count limit
      if (mediaKeys.length + filesArray.length > 5) {
        toast.error("You can upload a maximum of 5 files per review.");
        return;
      }

      uploadMediaMutation.mutate(filesArray);
    }
  };

  const handleRemoveMedia = (indexToRemove: number) => {
    setMediaKeys((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();

    if (!description.trim()) {
      toast.error("Please enter a review description.");
      return;
    }

    createReviewMutation.mutate(
      {
        productId: product._id,
        rating,
        description,
        mediaKeys,
      },
      {
        onSuccess: () => {
          setIsWriteReviewModalOpen(false);
          setIsSuccessModalOpen(true);
          setDescription("");
          setRating(5);
          setMediaKeys([]);
        },
        onError: (err) => {
          if (err.message.includes("You can only review products you have purchased")) {
            setIsWriteReviewModalOpen(false);
            setIsRestrictionModalOpen(true);
          } else if (
            err.message.toLowerCase().includes("already submitted a review") ||
            err.message.toLowerCase().includes("already reviewed")
          ) {
            setIsWriteReviewModalOpen(false);
            setIsAlreadyReviewedModalOpen(true);
          } else {
            toast.error(err.message || "Failed to submit review");
          }
        },
      },
    );
  };

  return (
    <>
      <section className="bg-stone-50/30 border-t border-stone-100 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16 items-start">
            {/* Left: Summary & Submission Form */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
                  Customer Reviews
                </h2>
                <div className="flex items-center gap-2 mt-4">
                  <div className="flex items-center gap-0.5 text-yellow-500">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className="size-5"
                        fill={index < Math.round(product.rating || 0) ? "currentColor" : "none"}
                        stroke="currentColor"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-stone-700">
                    {product.rating ? `${product.rating.toFixed(1)} out of 5.0` : "No ratings yet"}
                  </span>
                </div>
                <p className="text-xs text-stone-400 font-medium mt-1">
                  Based on {reviews.length} review(s)
                </p>
              </div>

              {/* Review Form or Auth check */}
              <div className="bg-white border border-stone-100 rounded-3xl p-6 sm:p-8 shadow-sm">
                {!user ? (
                  <div className="text-center py-4 space-y-4">
                    <ShieldAlert className="size-10 mx-auto text-stone-400" />
                    <div>
                      <h4 className="font-bold text-stone-850">Want to write a review?</h4>
                      <p className="text-sm text-stone-500 mt-1 font-medium">
                        Only registered and logged-in customers can submit reviews.
                      </p>
                    </div>
                    <a
                      href="/signin"
                      className="inline-flex w-full items-center justify-center px-6 py-3 bg-black hover:bg-stone-800 text-white rounded-full font-bold text-sm shadow-sm transition-all"
                    >
                      Sign In to Review
                    </a>
                  </div>
                ) : (
                  <div className="text-center py-4 space-y-4">
                    <div className="size-10 rounded-full bg-stone-50 flex items-center justify-center mx-auto text-stone-600 border border-stone-100">
                      <Star className="size-5 text-yellow-500 fill-yellow-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-850">Share Your Experience</h4>
                      <p className="text-sm text-stone-500 mt-1 font-medium leading-relaxed">
                        Have you used this product? Share your thoughts and help others make a better choice.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleWriteReviewClick}
                      className="inline-flex w-full items-center justify-center px-6 py-3 bg-black hover:bg-stone-800 text-white rounded-full font-bold text-sm shadow-sm transition-all cursor-pointer"
                    >
                      Write a Review
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Reviews List */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-stone-900 border-b border-stone-100 pb-4">
                Latest Reviews ({reviews.length})
              </h3>

              {isReviewsLoading ? (
                <div className="space-y-6">
                  {[1, 2].map((n) => (
                    <div key={n} className="flex gap-4 items-start">
                      <div className="size-12 rounded-full bg-stone-100 animate-pulse shrink-0" />
                      <div className="flex-1 space-y-3">
                        <div className="h-4 bg-stone-100 rounded w-1/3 animate-pulse" />
                        <div className="h-4 bg-stone-100 rounded w-1/4 animate-pulse" />
                        <div className="h-16 bg-stone-100 rounded w-full animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-14 bg-white rounded-3xl border border-stone-100">
                  <p className="text-stone-400 font-semibold text-sm">
                    No reviews yet. Be the first to share your thoughts!
                  </p>
                </div>
              ) : (
                <div
                  data-lenis-prevent
                  className="space-y-6 max-h-[70vh] overflow-y-auto pr-2"
                >
                  {reviews.map((review) => (
                    <div
                      key={review._id}
                      className="bg-white border border-stone-100 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4"
                    >
                      {/* Top Header */}
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="relative size-10 rounded-full overflow-hidden bg-stone-50 shrink-0 border border-stone-100">
                            {review.reviewer?.image ? (
                              <Image
                                src={
                                  review.reviewer.image.startsWith("http")
                                    ? review.reviewer.image
                                    : getR2ImageUrl(review.reviewer.image)
                                }
                                alt={review.reviewer.name}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center bg-stone-100 text-stone-500 text-sm font-bold">
                                {review.reviewer?.name?.charAt(0).toUpperCase() || "R"}
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-bold text-stone-850 text-sm leading-tight">
                              {review.reviewer?.name || "Anonymous User"}
                            </h4>
                            <span className="text-[10px] text-stone-400 font-semibold mt-0.5 block">
                              {new Date(review.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        </div>

                        {/* Stars */}
                        <div className="flex items-center gap-0.5 text-yellow-500">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              className="size-3.5"
                              fill={index < review.rating ? "currentColor" : "none"}
                              stroke="currentColor"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-stone-600 text-sm leading-relaxed whitespace-pre-wrap font-medium">
                        {review.description}
                      </p>

                      {/* Media Thumbnails */}
                      {review.mediaKeys && review.mediaKeys.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {review.mediaKeys.map((key, index) => {
                            const url = getR2ImageUrl(key);
                            const isVideo = isVideoFile(key);

                            return (
                              <div
                                key={index}
                                onClick={() => setSelectedMedia({ url, isVideo })}
                                className="relative size-16 rounded-xl overflow-hidden bg-stone-50 border border-stone-200 cursor-zoom-in hover:brightness-95 transition-all group shrink-0"
                              >
                                {isVideo ? (
                                  <div className="relative w-full h-full flex items-center justify-center bg-stone-950">
                                    <video src={url} className="w-full h-full object-cover pointer-events-none opacity-80" />
                                    <div className="absolute size-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/20">
                                      <Play className="size-2.5 fill-white text-white ml-0.5" />
                                    </div>
                                  </div>
                                ) : (
                                  <Image
                                    src={url}
                                    alt={`Attachment ${index + 1}`}
                                    fill
                                    sizes="64px"
                                    className="object-cover"
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Full-Screen Media Modal */}
      {selectedMedia && (
        <FullScreenMediaModal
          mediaUrl={selectedMedia.url}
          isVideo={selectedMedia.isVideo}
          isOpen={!!selectedMedia}
          onClose={() => setSelectedMedia(null)}
        />
      )}

      {/* Purchase Restriction Warning Modal */}
      {isRestrictionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-md"
            onClick={() => setIsRestrictionModalOpen(false)}
          />
          <div className="relative bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-stone-100 z-10 p-6 sm:p-8 text-center space-y-6">
            <div className="size-14 rounded-full bg-red-50 flex items-center justify-center mx-auto text-red-600 border border-red-100">
              <ShieldAlert className="size-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-stone-900">Purchase Verification Required</h3>
              <p className="text-sm text-stone-500 font-medium leading-relaxed">
                You can only review products you have purchased and received from BYOU.
              </p>
            </div>

            {/* Cart & Checkout Direct Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3 bg-black hover:bg-stone-850 text-white font-bold rounded-full text-sm shadow-sm transition-all focus:outline-none cursor-pointer"
              >
                Add to Cart
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                className="flex-1 py-3 bg-white hover:bg-stone-50 text-black border border-black font-bold rounded-full text-sm shadow-sm transition-all focus:outline-none cursor-pointer"
              >
                Buy Now
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsRestrictionModalOpen(false)}
              className="text-stone-400 hover:text-stone-655 font-bold text-xs block mx-auto pt-2 hover:underline transition-all cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Write Review Modal */}
      {isWriteReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-md"
            onClick={() => setIsWriteReviewModalOpen(false)}
          />
          {/* Modal Content */}
          <div
            data-lenis-prevent
            className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-stone-100 z-10 p-6 sm:p-8 max-h-[90vh] overflow-y-auto no-scrollbar animate-in fade-in zoom-in duration-200"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsWriteReviewModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 bg-stone-50 hover:bg-stone-100 rounded-full transition-all duration-200"
              aria-label="Close review form"
            >
              <X className="size-5" />
            </button>

            <form onSubmit={handleSubmitReview} className="space-y-6">
              <h3 className="text-lg font-bold text-stone-900">Share your thoughts</h3>

              {/* Star selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Overall Rating
                </label>
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: 5 }).map((_, index) => {
                    const starValue = index + 1;
                    const isFilled = hoverRating !== null
                      ? starValue <= hoverRating
                      : starValue <= rating;

                    return (
                      <button
                        type="button"
                        key={index}
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHoverRating(starValue)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="focus:outline-none p-0.5 text-stone-300 hover:scale-110 transition-transform"
                      >
                        <Star
                          className="size-7"
                          fill={isFilled ? "#eab308" : "none"}
                          stroke={isFilled ? "#eab308" : "#d6d3d1"}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description Area */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Review Description
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write your comments here about quality, texture, scent..."
                  className="w-full rounded-2xl border border-stone-200 p-4 text-sm font-medium focus:border-stone-400 focus:outline-none placeholder-stone-400/80 leading-relaxed transition-colors"
                />
              </div>

              {/* Media uploader */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                  Add Photos or Videos (Max 5)
                </label>

                {/* Preview uploads */}
                {mediaKeys.length > 0 && (
                  <div className="grid grid-cols-5 gap-2.5">
                    {mediaKeys.map((key, index) => {
                      const url = getR2ImageUrl(key);
                      const isVideo = isVideoFile(key);

                      return (
                        <div
                          key={index}
                          className="relative aspect-square rounded-xl overflow-hidden bg-stone-50 border border-stone-200 group shrink-0"
                        >
                          {isVideo ? (
                            <div className="relative w-full h-full flex items-center justify-center bg-stone-950">
                              <video src={url} className="w-full h-full object-cover pointer-events-none opacity-80" />
                              <Play className="absolute size-4 text-white fill-white pointer-events-none" />
                            </div>
                          ) : (
                            <Image
                              src={url}
                              alt={`Upload ${index + 1}`}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveMedia(index)}
                            className="absolute top-1 right-1 p-1 bg-black/60 hover:bg-red-650 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Remove uploaded media"
                          >
                            <Trash2 className="size-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Dropzone container */}
                {mediaKeys.length < 5 && (
                  <label className="flex flex-col items-center justify-center w-full h-28 border border-dashed border-stone-250 hover:border-stone-450 rounded-2xl cursor-pointer bg-stone-50/50 hover:bg-stone-50/80 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-stone-450">
                      {uploadMediaMutation.isPending ? (
                        <>
                          <Loader2 className="size-6 animate-spin text-stone-500" />
                          <p className="text-xs font-semibold mt-2 text-stone-600">Uploading...</p>
                        </>
                      ) : (
                        <>
                          <Upload className="size-6 mb-1 text-stone-400" />
                          <p className="text-xs font-bold text-stone-600">Click to upload media</p>
                          <p className="text-[10px] text-stone-400 font-semibold mt-1">
                            Image up to 10MB, Video up to 50MB
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      multiple
                      onChange={handleFileChange}
                      disabled={uploadMediaMutation.isPending}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <button
                type="submit"
                disabled={createReviewMutation.isPending || uploadMediaMutation.isPending}
                className="w-full flex items-center justify-center gap-2 py-3 bg-black hover:bg-stone-850 disabled:bg-stone-200 text-white font-bold rounded-full text-sm shadow-sm transition-all focus:outline-none"
              >
                {createReviewMutation.isPending && (
                  <Loader2 className="size-4 animate-spin text-white" />
                )}
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-md"
            onClick={() => setIsSuccessModalOpen(false)}
          />
          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border border-stone-100 z-10 p-6 sm:p-8 text-center space-y-6 animate-in fade-in zoom-in duration-200">
            <div className="size-14 rounded-full bg-green-50 flex items-center justify-center mx-auto text-green-600 border border-green-100">
              <CheckCircle2 className="size-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-stone-900">Review Submitted</h3>
              <p className="text-sm text-stone-500 font-medium leading-relaxed">
                Your review has been submitted successfully! It will be visible once approved.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsSuccessModalOpen(false)}
              className="w-full py-3 bg-black hover:bg-stone-850 text-white font-bold rounded-full text-sm shadow-sm transition-all focus:outline-none cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Already Reviewed Modal */}
      {isAlreadyReviewedModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-md"
            onClick={() => setIsAlreadyReviewedModalOpen(false)}
          />
          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-stone-100 z-10 p-6 sm:p-8 text-center space-y-6 animate-in fade-in zoom-in duration-200">
            <div className="size-14 rounded-full bg-stone-50 flex items-center justify-center mx-auto text-stone-600 border border-stone-100">
              <Star className="size-8 text-yellow-500 fill-yellow-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-stone-900">Review Already Added</h3>
              <p className="text-sm text-stone-500 font-medium leading-relaxed">
                You have already reviewed this product. You can update or delete your reviews in the Profile page.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsAlreadyReviewedModalOpen(false)}
                className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-full text-sm transition-all focus:outline-none cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAlreadyReviewedModalOpen(false);
                  router.push("/account");
                }}
                className="flex-1 py-3 bg-black hover:bg-stone-850 text-white font-bold rounded-full text-sm shadow-sm transition-all focus:outline-none cursor-pointer"
              >
                Go to Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ProductReviewsSection;
