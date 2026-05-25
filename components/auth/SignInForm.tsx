"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient, signInWithGoogle } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import OAuthSignInOptions from "@/components/auth/OAuthSignInOptions";

type SignInFormData = {
  email: string;
  password: string;
};

export default function SignInForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isGooglePending, setIsGooglePending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const onSubmit = async (data: SignInFormData) => {
    setSubmitError(null);
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: "/account",
    });
    if (error) {
      setSubmitError(error.message ?? "Sign in failed");
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
      <h1 className="text-2xl font-light mb-8 text-right">
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

        {submitError && <p className="text-sm text-red-600">{submitError}</p>}
        <div className="flex items-center justify-between">
          <Button type="submit" className="rounded-full">
            Sign in
          </Button>
          <Link
            href="/auth/signup"
            className="border-2 border-black text-black px-8 py-3 rounded-full hover:bg-black hover:text-white transition font-medium"
          >
            Sign up
          </Link>
        </div>
      </form>

      <OAuthSignInOptions
        onGoogleSignIn={handleGoogleSignIn}
        isGooglePending={isGooglePending}
        enabled={false}
      />

      <div className="mt-6 text-center">
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
