"use client";

import React, { useState } from "react";
import { Star, Edit, Trash2, Loader2, Upload, X, Play } from "lucide-react";
import {
  useGetMyReviews,
  useUpdateReview,
  useDeleteReview,
} from "@/screens/product/services/reviews/query";
import { useUploadMedia } from "@/hooks/use-upload-media";
import { getR2ImageUrl } from "@/lib/utils";
import Image from "next/image";
import { toast } from "sonner";
import FullScreenMediaModal from "@/components/shared/full-screen-media-modal";
import type { ProductReview } from "@/screens/product/services/reviews/type";

const isVideoFile = (urlOrKey: string) => {
  return /\.(mp4|mov|webm|avi|mkv|3gp|ogv)$/i.test(urlOrKey);
};

const MyReviewsSection = () => {
  const { data: response, isLoading: isReviewsLoading } = useGetMyReviews();
  const reviews = response?.data || [];

  const [editingReview, setEditingReview] = useState<ProductReview | null>(null);
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<{ url: string; isVideo: boolean } | null>(null);

  // Form states for Editing
  const [editRating, setEditRating] = useState<number>(5);
  const [editDescription, setEditDescription] = useState("");
  const [editMediaKeys, setEditMediaKeys] = useState<string[]>([]);

  // Mutations
  const updateReviewMutation = useUpdateReview();
  const deleteReviewMutation = useDeleteReview();
  const uploadMediaMutation = useUploadMedia({
    onSuccess: (keys) => {
      setEditMediaKeys((prev) => [...prev, ...keys]);
    },
  });

  const handleOpenEditModal = (review: ProductReview) => {
    setEditingReview(review);
    setEditRating(review.rating);
    setEditDescription(review.description);
    setEditMediaKeys(review.mediaKeys || []);
  };

  const handleCloseEditModal = () => {
    setEditingReview(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);

      if (editMediaKeys.length + filesArray.length > 5) {
        toast.error("You can upload a maximum of 5 files per review.");
        return;
      }

      uploadMediaMutation.mutate(filesArray);
    }
  };

  const handleRemoveMedia = (indexToRemove: number) => {
    setEditMediaKeys((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingReview) return;
    if (!editDescription.trim()) {
      toast.error("Please enter a review description.");
      return;
    }

    updateReviewMutation.mutate(
      {
        id: editingReview._id,
        payload: {
          rating: editRating,
          description: editDescription,
          mediaKeys: editMediaKeys,
        },
      },
      {
        onSuccess: () => {
          toast.success("Review updated successfully! It will go live after admin approval.");
          handleCloseEditModal();
        },
      },
    );
  };

  const handleDeleteConfirm = () => {
    if (!deletingReviewId) return;

    deleteReviewMutation.mutate(deletingReviewId, {
      onSuccess: () => {
        toast.success("Review deleted successfully.");
        setDeletingReviewId(null);
      },
    });
  };

  return (
    <>
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-stone-900">Manage Your Reviews</h2>

        {isReviewsLoading ? (
          <div className="space-y-4">
            {[1, 2].map((n) => (
              <div key={n} className="h-32 bg-stone-100 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-16 bg-stone-50 border border-stone-150 rounded-3xl">
            <p className="text-stone-400 font-semibold text-sm">
              You haven&apos;t written any reviews yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => {
              const productObj = typeof review.productId === "object" ? review.productId : null;
              const hasAttachments = review.mediaKeys && review.mediaKeys.length > 0;
              const isApproved = review.isShowInProductDetails || review.isShowInLanding;

              return (
                <div
                  key={review._id}
                  className="bg-white border border-stone-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-4">
                    {/* Header: Product details & status */}
                    <div className="flex items-start justify-between gap-4">
                      {productObj && (
                        <div className="flex items-center gap-3">
                          <div className="relative size-12 shrink-0 rounded-xl overflow-hidden bg-stone-50 border border-stone-100">
                            {productObj.displayImageKey ? (
                              <Image
                                src={getR2ImageUrl(productObj.displayImageKey)}
                                alt={productObj.name}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="absolute inset-0 bg-stone-100" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-bold text-stone-850 text-sm line-clamp-1 leading-snug">
                              {productObj.name}
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
                      )}

                      {/* Status badge */}
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          isApproved
                            ? "bg-green-50 text-green-700 border border-green-100"
                            : "bg-amber-50 text-amber-700 border border-amber-100"
                        }`}
                      >
                        {isApproved ? "Published" : "Pending Approval"}
                      </span>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-0.5 text-yellow-500">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className="size-4"
                          fill={index < review.rating ? "currentColor" : "none"}
                          stroke="currentColor"
                        />
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-stone-600 text-sm font-medium leading-relaxed line-clamp-3 whitespace-pre-wrap">
                      {review.description}
                    </p>

                    {/* Attachments */}
                    {hasAttachments && (
                      <div className="flex gap-2 overflow-x-auto py-1">
                        {review.mediaKeys!.map((key, index) => {
                          const url = getR2ImageUrl(key);
                          const isVideo = isVideoFile(key);

                          return (
                            <div
                              key={index}
                              onClick={() => setSelectedMedia({ url, isVideo })}
                              className="relative size-12 shrink-0 rounded-lg overflow-hidden bg-stone-50 border border-stone-200 cursor-zoom-in hover:brightness-95 transition-all group"
                            >
                              {isVideo ? (
                                <div className="relative w-full h-full flex items-center justify-center bg-stone-950">
                                  <video src={url} className="w-full h-full object-cover pointer-events-none opacity-80" />
                                  <Play className="absolute size-3 text-white fill-white pointer-events-none" />
                                </div>
                              ) : (
                                <Image
                                  src={url}
                                  alt={`Attachment ${index + 1}`}
                                  fill
                                  sizes="48px"
                                  className="object-cover"
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-stone-50">
                    <button
                      onClick={() => handleOpenEditModal(review)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-stone-700 hover:text-black border border-stone-200 hover:border-stone-300 rounded-full transition-all bg-white"
                    >
                      <Edit className="size-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => setDeletingReviewId(review._id)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-red-600 hover:text-red-700 border border-red-100 hover:border-red-200 rounded-full transition-all bg-red-50/50 hover:bg-red-50"
                    >
                      <Trash2 className="size-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Edit Review Modal */}
      {editingReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-md" onClick={handleCloseEditModal} />
          <div
            data-lenis-prevent
            className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-stone-100 z-10 p-6 sm:p-8 max-h-[90vh] overflow-y-auto no-scrollbar"
          >
            <button
              onClick={handleCloseEditModal}
              className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 bg-stone-50 hover:bg-stone-100 rounded-full transition-all duration-200"
              aria-label="Close edit"
            >
              <X className="size-5" />
            </button>

            <form onSubmit={handleUpdateSubmit} className="space-y-6">
              <h3 className="text-lg font-bold text-stone-900">Edit Your Review</h3>

              {/* Rating selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Rating
                </label>
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: 5 }).map((_, index) => {
                    const starValue = index + 1;
                    const isFilled = starValue <= editRating;

                    return (
                      <button
                        type="button"
                        key={index}
                        onClick={() => setEditRating(starValue)}
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

              {/* Description */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Review Description
                </label>
                <textarea
                  rows={4}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full rounded-2xl border border-stone-200 p-4 text-sm font-medium focus:border-stone-400 focus:outline-none leading-relaxed transition-colors"
                />
              </div>

              {/* Media Uploader */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                  Media Files (Max 5)
                </label>

                {editMediaKeys.length > 0 && (
                  <div className="grid grid-cols-5 gap-2">
                    {editMediaKeys.map((key, index) => {
                      const url = getR2ImageUrl(key);
                      const isVideo = isVideoFile(key);

                      return (
                        <div
                          key={index}
                          className="relative aspect-square rounded-xl overflow-hidden bg-stone-50 border border-stone-200 group shrink-0"
                        >
                          {isVideo ? (
                            <div className="relative w-full h-full flex items-center justify-center bg-stone-950">
                              <video src={url} className="w-full h-full object-cover pointer-events-none opacity-85" />
                              <Play className="absolute size-3.5 text-white fill-white pointer-events-none" />
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
                            className="absolute top-1 right-1 p-1 bg-black/60 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Remove media"
                          >
                            <Trash2 className="size-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {editMediaKeys.length < 5 && (
                  <label className="flex flex-col items-center justify-center w-full h-24 border border-dashed border-stone-250 hover:border-stone-450 rounded-2xl cursor-pointer bg-stone-50/50 hover:bg-stone-50/80 transition-all">
                    <div className="flex flex-col items-center justify-center pt-3 pb-4 text-stone-400 text-center">
                      {uploadMediaMutation.isPending ? (
                        <>
                          <Loader2 className="size-5 animate-spin text-stone-500" />
                          <p className="text-xs font-semibold mt-1.5 text-stone-600">Uploading...</p>
                        </>
                      ) : (
                        <>
                          <Upload className="size-5 mb-0.5 text-stone-400" />
                          <p className="text-xs font-bold text-stone-600">Upload new media</p>
                          <p className="text-[10px] text-stone-400 font-semibold">
                            Image &le; 10MB, Video &le; 50MB
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

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCloseEditModal}
                  className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-full text-sm transition-all focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateReviewMutation.isPending || uploadMediaMutation.isPending}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-black hover:bg-stone-850 text-white font-bold rounded-full text-sm shadow-sm transition-all focus:outline-none"
                >
                  {updateReviewMutation.isPending && (
                    <Loader2 className="size-4 animate-spin text-white" />
                  )}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Alert Dialog */}
      {deletingReviewId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-md" onClick={() => setDeletingReviewId(null)} />
          <div className="relative bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border border-stone-100 z-10 p-6 text-center space-y-4">
            <h3 className="text-lg font-bold text-stone-900">Delete Review</h3>
            <p className="text-sm text-stone-500 font-medium">
              Are you sure you want to delete this review? This action cannot be undone.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeletingReviewId(null)}
                className="flex-1 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-755 font-bold rounded-full text-xs transition-all focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deleteReviewMutation.isPending}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full text-xs shadow-sm transition-all focus:outline-none"
              >
                {deleteReviewMutation.isPending && (
                  <Loader2 className="size-3.5 animate-spin text-white" />
                )}
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

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
};
export default MyReviewsSection;
