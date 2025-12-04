"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import Layout from "@/components/Layout";
import AuthHero from "@/components/auth/AuthHero";
import { ArrowLeft } from "lucide-react";

type ForgotPasswordFormData = {
  email: string;
};

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>();

  const onSubmit = (data: ForgotPasswordFormData) => {
    console.log(data);
    alert("Password reset link would be sent to your email");
  };

  return (
    <Layout>
      <div className="min-h-screen py-16 sm:py-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AuthHero />
            <div className="max-w-md mx-auto w-full">
              <Link
                href="/auth/signin"
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-6 transition"
              >
                <ArrowLeft size={16} />
                Back to Sign In
              </Link>

              <h1 className="text-2xl font-light mb-2 text-right">
                FORGOT PASSWORD?
              </h1>
              <p className="text-sm text-gray-600 mb-8 text-right">
                Enter your email and we'll send you a reset link
              </p>

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
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition font-medium"
                >
                  Send Reset Link
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Remember your password?{" "}
                  <Link
                    href="/auth/signin"
                    className="text-black font-medium hover:underline"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
