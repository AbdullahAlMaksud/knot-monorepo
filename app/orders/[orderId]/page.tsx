"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import OrderHeader from "@/components/orders/OrderHeader";
import OrderItemsList from "@/components/orders/OrderItemsList";
import ShippingAddressCard from "@/components/orders/ShippingAddressCard";
import SupportSection from "@/components/orders/SupportSection";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { Order } from "@/lib/orders/types";

export default function OrderTrackingPage() {
  const params = useParams();
  const orderId = params?.orderId as string | undefined;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"summary" | "shipping">("summary");
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    const getOrderById = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`, { cache: "no-store" });
        if (res.status === 404) {
          setError("Order not found");
          setOrder(null);
          return;
        }
        const data = await res.json();
        setOrder(data.data || {});
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to load order");
        setOrder(null);
      } finally {
        setLoading(false);
      }
    }
    getOrderById()
  }, [orderId])
  
  const orderItems: Order["items"] = order?.items ?? [];
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
          <OrderHeader orderId={order._id} date={order.createdAt ? new Date(order.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "—"} status={order.status} />

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
              totalAmount={order.totalAmount}
              discountAmount={order.discountAmount}
              shippingFee={order.shippingFee}
              finalAmount={order.finalAmount}
            />
          )}

          {!showReviewForm && activeTab === "summary" && (
            <>
              <OrderItemsList
                orderItems={orderItems}
                showReviewForm={false}
                setShowReviewForm={setShowReviewForm}
                totalAmount={order.totalAmount}
                discountAmount={order.discountAmount}
                shippingFee={order.shippingFee}
                finalAmount={order.finalAmount}
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
