"use client";

import { useEffect, useState } from "react";
import { X, Star, ExternalLink, Play } from "lucide-react";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useGetReviewById } from "@/services/product-reviews/query";
import { getR2ImageUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import FullScreenMediaModal from "./FullScreenMediaModal";
import Skeleton from "@/components/ui/skeleton";

interface ReviewDetailModalProps {
  reviewId: string;
  isOpen: boolean;
  onClose: () => void;
}

const isVideoFile = (urlOrKey: string) => {
  return /\.(mp4|mov|webm|avi|mkv|3gp|ogv)$/i.test(urlOrKey);
};

export default function ReviewDetailModal({
  reviewId,
  isOpen,
  onClose,
}: ReviewDetailModalProps) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [animateState, setAnimateState] = useState(isOpen ? "open" : "closed");
  const [selectedMedia, setSelectedMedia] = useState<{ url: string; isVideo: boolean } | null>(null);

  useBodyScrollLock(isOpen);

  const { data: response, isLoading, isError } = useGetReviewById(reviewId);
  const review = response?.data;

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !selectedMedia) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, selectedMedia]);

  if (!shouldRender) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-stone-900/40 backdrop-blur-md transition-opacity duration-350 ease-out ${
            animateState === "open" ? "opacity-100" : "opacity-0"
          }`}
          onClick={onClose}
        />

        {/* Modal Content */}
        <div
          className={`relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-stone-100 transition-all duration-350 ease-out z-10 max-h-[90vh] flex flex-col ${
            animateState === "open" ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
          }`}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 bg-stone-50 hover:bg-stone-100 rounded-full transition-all duration-200 z-20"
            aria-label="Close details"
          >
            <X className="size-5" />
          </button>

          <div
            data-lenis-prevent
            className="overflow-y-auto no-scrollbar flex-1 p-6 sm:p-8"
          >
            {isLoading ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Skeleton className="size-16 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </div>
                <Skeleton className="h-28 w-full rounded-2xl" />
                <div className="flex gap-3">
                  <Skeleton className="w-24 h-24 rounded-xl" />
                  <Skeleton className="w-24 h-24 rounded-xl" />
                </div>
              </div>
            ) : isError || !review ? (
              <div className="text-center py-10">
                <p className="text-stone-500 font-medium mb-4">
                  Failed to load review details.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-black text-white rounded-full font-semibold text-sm hover:bg-stone-800 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Reviewer Header */}
                <div className="flex items-center gap-4">
                  <div className="relative size-14 shrink-0 rounded-full overflow-hidden bg-stone-100 border border-stone-200">
                    {review.reviewer?.image ? (
                      <Image
                        src={
                          review.reviewer.image.startsWith("http")
                            ? review.reviewer.image
                            : getR2ImageUrl(review.reviewer.image)
                        }
                        alt={review.reviewer.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-stone-100 text-stone-500 text-lg font-bold">
                        {review.reviewer?.name?.charAt(0).toUpperCase() || "R"}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-stone-900 leading-tight">
                      {review.reviewer?.name || "Anonymous User"}
                    </h3>
                    <p className="text-xs text-stone-400 font-medium">
                      Reviewed on {new Date(review.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="size-5"
                      fill={index < review.rating ? "#eab308" : "none"}
                      stroke={index < review.rating ? "#eab308" : "#d6d3d1"}
                    />
                  ))}
                  <span className="ml-2 text-sm font-semibold text-stone-700">
                    {review.rating}.0 / 5.0
                  </span>
                </div>

                {/* Description */}
                <div className="bg-stone-50/50 border border-stone-100 rounded-2xl p-5 sm:p-6">
                  <p className="text-stone-700 text-base leading-relaxed whitespace-pre-line font-medium">
                    {review.description}
                  </p>
                </div>

                {/* Media Gallery */}
                {review.mediaKeys && review.mediaKeys.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                      Review Attachments
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {review.mediaKeys.map((key, index) => {
                        const url = getR2ImageUrl(key);
                        const isVideo = isVideoFile(key);

                        return (
                          <div
                            key={index}
                            onClick={() => setSelectedMedia({ url, isVideo })}
                            className="relative size-24 rounded-2xl overflow-hidden bg-stone-50 border border-stone-200/80 cursor-zoom-in hover:brightness-95 transition-all group shrink-0"
                          >
                            {isVideo ? (
                              <div className="relative w-full h-full flex items-center justify-center bg-stone-950">
                                <video
                                  src={url}
                                  className="w-full h-full object-cover pointer-events-none opacity-80"
                                />
                                <div className="absolute size-9 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:scale-105 transition-transform">
                                  <Play className="size-4 fill-white text-white ml-0.5" />
                                </div>
                              </div>
                            ) : (
                              <Image
                                src={url}
                                alt={`Attachment ${index + 1}`}
                                fill
                                sizes="96px"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Product Reference */}
                {typeof review.productId === "object" && (
                  <div className="pt-4 border-t border-stone-100">
                    <div className="flex items-center justify-between gap-4 p-4 bg-stone-50 rounded-2xl border border-stone-100">
                      <div className="flex items-center gap-3">
                        <div className="relative size-12 shrink-0 rounded-xl overflow-hidden bg-white border border-stone-100">
                          {review.productId.displayImageKey ? (
                            <Image
                              src={getR2ImageUrl(review.productId.displayImageKey)}
                              alt={review.productId.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-stone-150" />
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                            Purchased Product
                          </p>
                          <h4 className="text-sm font-bold text-stone-850 line-clamp-1">
                            {review.productId.name}
                          </h4>
                        </div>
                      </div>
                      <Link
                        href={`/product/${review.productId._id}`}
                        onClick={onClose}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-white text-stone-700 hover:text-black border border-stone-200 hover:border-stone-300 rounded-full shadow-sm transition-all"
                      >
                        View Product
                        <ExternalLink className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full-Screen Media Modal */}
      {selectedMedia && (
        <FullScreenMediaModal
          mediaUrl={selectedMedia.url}
          isVideo={selectedMedia.isVideo}
          isOpen={!!selectedMedia}
          onClose={() => setSelectedMedia(null)}
        />
      )}
    </>
  );
}
