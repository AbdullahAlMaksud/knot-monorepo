"use client";

import {
  UseFormRegister,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";

type ProfileFormData = {
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
};

export default function UserInfoForm({
  register,
  errors,
  handleSubmit,
  onSubmit,
}: UserInfoFormProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">User Information</h2>

      <div className="flex items-center mb-6">
        <div className="relative">
          <div className="w-20 h-20 bg-gray-300 rounded-full overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-500" />
          </div>
          <button className="absolute bottom-0 right-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs hover:bg-gray-800 transition">
            ✓
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full name
            </label>
            <input
              type="text"
              {...register("fullName", {
                required: "Full name is required",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.fullName.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last name
            </label>
            <input
              type="text"
              {...register("lastName", {
                required: "Last name is required",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
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
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="tel"
              {...register("phone", {
                required: "Phone is required",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition font-medium"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
