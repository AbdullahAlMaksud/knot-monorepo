"use client";

import Link from "next/link";
import Layout from "@/components/Layout";
import { Check } from "lucide-react";

export default function OrderConfirmedPage() {
  return (
    <Layout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 mt-20">
        <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mb-8">
          <Check className="w-10 h-10 text-white stroke-3" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2">
          Your order has been{" "}
          <span className="text-green-500">Confirmed!</span>
        </h1>
        <p className="text-gray-700 text-center mb-10 max-w-md">
          Please check your email for a payment confirmation & invoice.
        </p>
        <Link
          href="/shop"
          className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </Layout>
  );
}
