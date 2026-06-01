"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient, signInWithGoogle } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import OAuthSignInOptions from "@/components/auth/OAuthSignInOptions";

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isGooglePending, setIsGooglePending] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>();
  const password = watch("password");

  const onSubmit = async (data: SignUpFormData) => {
    setSubmitError(null);
    const { error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      callbackURL: "/account",
    });
    if (error) {
      setSubmitError(error.message ?? "Sign up failed");
      return;
    }
    router.push("/account");
    router.refresh();
  };

  const handleGoogleSignIn = async () => {
    setSubmitError(null);
    setIsGooglePending(true);
    const { error } = await signInWithGoogle();
    if (error) {
      setSubmitError(error.message ?? "Google sign in failed");
      setIsGooglePending(false);
    }
  };

  return (
    <div className="max-w-md mx-auto w-full">
      <h1 className="text-2xl font-light mb-8 text-right">NEW HERE? JOIN US</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
            placeholder="Your name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

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
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
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

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
            placeholder="••••••••"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {submitError && <p className="text-sm text-red-600">{submitError}</p>}
        <div className="flex items-center justify-between">
          <Link
            href="/auth/signin"
            className="border-2 border-black text-black px-8 py-3 rounded-full hover:bg-black hover:text-white transition font-medium"
          >
            Sign in
          </Link>
          <Button type="submit" className="rounded-full">
            Sign up
          </Button>
        </div>
      </form>

      <OAuthSignInOptions
        onGoogleSignIn={handleGoogleSignIn}
        isGooglePending={isGooglePending}
        enabled={false}
      />

      <div className="mt-6 text-center space-y-2">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="text-black font-medium hover:underline"
          >
            Sign in here
          </Link>
        </p>
        <div>
          <Link
            href="/auth/forgot-password"
            className="text-sm text-gray-600 hover:text-black transition"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
}
