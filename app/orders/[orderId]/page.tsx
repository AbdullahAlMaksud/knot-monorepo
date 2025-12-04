"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import OrderHeader from "@/components/orders/OrderHeader";
import OrderItemsList from "@/components/orders/OrderItemsList";
import ShippingAddressCard from "@/components/orders/ShippingAddressCard";
import SupportSection from "@/components/orders/SupportSection";

const orderItems = [
  {
    id: 1,
    name: "Hydrating Essence",
    quantity: 1,
    price: 48.0,
    image: "/images/products/product1.jpg",
  },
  {
    id: 2,
    name: "Nourishing Cream",
    quantity: 1,
    price: 48.0,
    image: "/images/products/product2.jpg",
  },
];

export default function OrderTrackingPage() {
  const [activeTab, setActiveTab] = useState<"summary" | "shipping">("summary");
  const [showReviewForm, setShowReviewForm] = useState(false);

  return (
    <Layout>
      <div className="py-12 sm:py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <OrderHeader />

          {/* Tab Navigation with Write a Review button */}
          {!showReviewForm && (
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab("summary")}
                  className={`px-6 py-2 rounded-full cursor-pointer font-medium transition ${
                    activeTab === "summary"
                      ? "bg-black text-white"
                      : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  Summary
                </button>
                <button
                  onClick={() => setActiveTab("shipping")}
                  className={`px-6 py-2 rounded-full cursor-pointer font-medium transition ${
                    activeTab === "shipping"
                      ? "bg-black text-white"
                      : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  Shipping
                </button>
              </div>
              <button
                onClick={() => setShowReviewForm(true)}
                className="px-6 py-2 rounded-full cursor-pointer font-medium transition bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
              >
                Write a Review
              </button>
            </div>
          )}

          {/* Review Form */}
          {showReviewForm && (
            <OrderItemsList
              orderItems={orderItems}
              showReviewForm={showReviewForm}
              setShowReviewForm={setShowReviewForm}
            />
          )}

          {/* Tab Content */}
          {!showReviewForm && activeTab === "summary" && (
            <>
              <OrderItemsList
                orderItems={orderItems}
                showReviewForm={false}
                setShowReviewForm={setShowReviewForm}
              />
              <SupportSection />
            </>
          )}

          {!showReviewForm && activeTab === "shipping" && (
            <>
              <ShippingAddressCard />
              <SupportSection />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
