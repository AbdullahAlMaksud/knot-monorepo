"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Layout from "@/components/Layout";
import OrderHeader from "@/components/orders/OrderHeader";
import OrderItemsList from "@/components/orders/OrderItemsList";
import ShippingAddressCard from "@/components/orders/ShippingAddressCard";
import SupportSection from "@/components/orders/SupportSection";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type OrderData = {
  orderId: string;
  items: { name: string; image: string; price: number; quantity: number }[];
  shipping: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    apartment: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  totals: { subtotal: number; shipping: number; total: number };
  status: string;
  date: string;
};

export default function OrderTrackingPage() {
  const params = useParams();
  const orderId = params?.orderId as string | undefined;
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"summary" | "shipping">("summary");
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    if (!orderId) return;
    let cancelled = false;
    fetch(`/api/orders/${encodeURIComponent(orderId)}`)
      .then((res) => {
        if (!res.ok) throw new Error(res.status === 404 ? "Order not found" : "Failed to load order");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          setOrder({
            ...data,
            date: data.date ? new Date(data.date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "—",
          });
        }
      })
      .catch((e) => {
        if (!cancelled) setError(e.message ?? "Failed to load order");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [orderId]);

  const orderItems = order?.items?.map((item, i) => ({ ...item, id: i })) ?? [];
  const effectiveLoading = !!orderId && loading;
  const effectiveError = !orderId ? "Missing order ID" : error;

  if (effectiveLoading) {
    return (
      <Layout>
        <div className="py-12 sm:py-16 lg:py-24 max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-600">Loading order…</p>
        </div>
      </Layout>
    );
  }
  if (effectiveError || !order) {
    return (
      <Layout>
        <div className="py-12 sm:py-16 lg:py-24 max-w-4xl mx-auto px-4 text-center">
          <p className="text-red-600 mb-4">{effectiveError ?? "Order not found"}</p>
          <Link href="/account" className="text-black underline">Back to Account</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-12 sm:py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <OrderHeader orderId={order.orderId} date={order.date} status={order.status} />

          {!showReviewForm && (
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-4">
                <Button
                  type="button"
                  onClick={() => setActiveTab("summary")}
                  variant={activeTab === "summary" ? "default" : "outline"}
                  className="rounded-full"
                >
                  Summary
                </Button>
                <Button
                  type="button"
                  onClick={() => setActiveTab("shipping")}
                  variant={activeTab === "shipping" ? "default" : "outline"}
                  className="rounded-full"
                >
                  Shipping
                </Button>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowReviewForm(true)}
                className="rounded-full"
              >
                Write a Review
              </Button>
            </div>
          )}

          {showReviewForm && (
            <OrderItemsList
              orderItems={orderItems}
              showReviewForm={showReviewForm}
              setShowReviewForm={setShowReviewForm}
            />
          )}

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
              <ShippingAddressCard shipping={order.shipping} />
              <SupportSection />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
