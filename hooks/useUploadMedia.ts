"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import apiClient from "@/lib/axios";

export interface UploadMediaResponse {
  success: boolean;
  message: string;
  code: number;
  meta: null;
  data: string[];
}

export interface UseUploadMediaOptions {
  folder?: string;
  onSuccess?: (keys: string[]) => void;
  onError?: (error: Error) => void;
}

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB

export const useUploadMedia = (options?: UseUploadMediaOptions) => {
  const folder = options?.folder || "products";

  return useMutation<string[], Error, File | File[] | FileList>({
    mutationFn: async (input) => {
      let files: File[] = [];

      if (input instanceof File) {
        files = [input];
      } else if (input instanceof FileList) {
        files = Array.from(input);
      } else if (Array.isArray(input)) {
        files = input;
      }

      if (files.length === 0) {
        throw new Error("No files selected for upload");
      }

      // Validations
      for (const file of files) {
        const isImage = file.type.startsWith("image/");
        const isVideo = file.type.startsWith("video/");

        if (!isImage && !isVideo) {
          throw new Error(`Unsupported file type: ${file.name}. Only images and videos are allowed.`);
        }

        if (isImage && file.size > MAX_IMAGE_SIZE) {
          throw new Error(`Image size exceeds 10MB limit: ${file.name}`);
        }

        if (isVideo && file.size > MAX_VIDEO_SIZE) {
          throw new Error(`Video size exceeds 50MB limit: ${file.name}`);
        }
      }

      const formData = new FormData();
      if (files.length === 1) {
        formData.append("file", files[0]);
      } else {
        files.forEach((file) => {
          formData.append("files", file);
        });
      }

      const response = await apiClient.post<UploadMediaResponse>(
        `/media/upload?folder=${encodeURIComponent(folder)}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart-formdata",
          },
        },
      );

      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || "Failed to upload files");
      }

      return response.data.data;
    },
    onSuccess: (keys) => {
      toast.success("Media uploaded successfully!");
      if (options?.onSuccess) {
        options.onSuccess(keys);
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to upload media");
      if (options?.onError) {
        options.onError(error);
      }
    },
  });
};
