"use client";

import {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
  UseFormHandleSubmit,
} from "react-hook-form";

type PasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type PasswordChangeFormProps = {
  register: UseFormRegister<PasswordFormData>;
  errors: FieldErrors<PasswordFormData>;
  watch: UseFormWatch<PasswordFormData>;
  handleSubmit: UseFormHandleSubmit<PasswordFormData>;
  onSubmit: (data: PasswordFormData) => void;
};

export default function PasswordChangeForm({
  register,
  errors,
  watch,
  handleSubmit,
  onSubmit,
}: PasswordChangeFormProps) {
  const newPassword = watch("newPassword");

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Change Password</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              {...register("currentPassword", {
                required: "Current password is required",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              placeholder="••••••••••••••"
            />
            {errors.currentPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.currentPassword.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              placeholder="••••••••••••••"
            />
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.newPassword.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              placeholder="••••••••••••••"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition font-medium"
        >
          Change Password
        </button>
      </form>

      <button className="mt-6 text-red-600 border border-red-600 px-6 py-2 rounded-full hover:bg-red-50 transition font-medium">
        Log Out
      </button>
    </div>
  );
}
