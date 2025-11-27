"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";

type SignInFormData = {
  email: string;
  password: string;
};

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const onSubmit = (data: SignInFormData) => {
    console.log(data);
    alert("Sign in functionality would be implemented here");
  };

  return (
    <div className="max-w-md mx-auto w-full">
      <h1 className="text-3xl sm:text-4xl font-light mb-8 text-center">
        WELCOME BACK, SIGN IN
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition font-medium"
          >
            Sign in
          </button>
          <Link
            href="/auth/signup"
            className="border-2 border-black text-black px-8 py-3 rounded-full hover:bg-black hover:text-white transition font-medium"
          >
            Sign up
          </Link>
        </div>
      </form>

      <div className="mt-8 text-center">
        <Link
          href="/auth/forgot-password"
          className="text-sm text-gray-600 hover:text-black transition"
        >
          Forgot your password?
        </Link>
      </div>
    </div>
  );
}
