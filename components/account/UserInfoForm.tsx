"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  UseFormRegister,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Camera, Loader2, User } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export type ProfileFormData = {
  fullName: string;
  lastName: string;
  email: string;
  phone: string;
};

type UserInfoFormProps = {
  register: UseFormRegister<ProfileFormData>;
  errors: FieldErrors<ProfileFormData>;
  handleSubmit: UseFormHandleSubmit<ProfileFormData>;
  onSubmit: (data: ProfileFormData) => void;
  userImage?: string | null;
};

export default function UserInfoForm({
  register,
  errors,
  handleSubmit,
  onSubmit,
  userImage,
}: UserInfoFormProps) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be less than 2MB");
      return;
    }

    // Validate type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      setIsUploading(true);
      try {
        const base64 = reader.result as string;
        const res = await authClient.updateUser({
          image: base64,
        });
        if (res?.error) {
          toast.error(res.error.message ?? "Failed to update profile picture");
        } else {
          toast.success("Profile picture updated successfully!");
          router.refresh();
        }
      } catch (err: any) {
        toast.error(err.message ?? "An error occurred");
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="bg-white">
      <h2 className="text-xl font-semibold mb-6">User Information</h2>

      {/* Avatar */}
      <div className="flex items-center mb-6">
        <div className="relative group">
          <button
            type="button"
            disabled={isUploading}
            onClick={triggerFileInput}
            className="relative w-20 h-20 bg-gray-300 rounded-full overflow-hidden block focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 cursor-pointer transition"
          >
            {userImage ? (
              <Image
                src={userImage}
                alt="Profile"
                fill
                className="object-cover group-hover:opacity-80 transition"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:opacity-80 transition">
                <User className="w-10 h-10" />
              </div>
            )}

            {/* Hover overlay with Camera Icon */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200">
              <Camera className="w-5 h-5 text-white" />
            </div>

            {/* Uploading Spinner */}
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              </div>
            )}
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          <button
            type="button"
            disabled={isUploading}
            onClick={triggerFileInput}
            className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-black text-white hover:bg-gray-800 flex items-center justify-center border border-white shadow-xs transition"
            aria-label="Change photo"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Row 1: Full name + Last name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("fullName", { required: "Full name is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last name
            </label>
            <input
              type="text"
              {...register("lastName")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Row 2: Email + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="tel"
              placeholder="+880 1XXX-XXXXXX"
              {...register("phone", {
                validate: (value) => {
                  if (!value) return true;
                  const pattern = /^\+?[0-9\s\-().]{7,20}$/;
                  return pattern.test(value) || "Invalid phone number";
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <Button type="submit" className="rounded-full">
          Update Profile
        </Button>
      </form>
    </div>
  );
}