"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import OrderHeader from "@/components/orders/OrderHeader";
import OrderItemsList from "@/components/orders/OrderItemsList";
import ShippingAddressCard from "@/components/orders/ShippingAddressCard";
import SupportSection from "@/components/orders/SupportSection";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { Order } from "@/lib/orders/types";
import { useGetOrderById } from "@/hooks/useOrders";
import ErrorState from "@/components/ui/error";
import Loading from "@/components/ui/loading";

export default function OrderTrackingPage() {
  const params = useParams();
  const orderId = params?.orderId as string | undefined;
  const [activeTab, setActiveTab] = useState<"summary" | "shipping">("summary");
  const [showReviewForm, setShowReviewForm] = useState(false);

  const { data: orderDetails, isLoading, isError, error, refetch } = useGetOrderById(orderId as string);
  const orderItems: Order["items"] = orderDetails?.items ?? [];

  if (isLoading) return <Loading fullPage={true} text="Fetching orders..." />;
  if (isError) return <ErrorState fullPage={true} message={error.message} onRetry={refetch} />;

  return (
    <Layout>
      <div className="py-12 sm:py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <OrderHeader orderId={orderDetails?._id ?? "Unknown"} date={orderDetails?.createdAt ? new Date(orderDetails.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "—"} status={orderDetails?.status ?? "Unknown"} />

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
              totalAmount={orderDetails?.totalAmount ?? 0}
              discountAmount={orderDetails?.discountAmount ?? 0}
              shippingFee={orderDetails?.shippingFee ?? 0}
              finalAmount={orderDetails?.finalAmount ?? 0}
            />
          )}

          {!showReviewForm && activeTab === "summary" && (
            <>
              <OrderItemsList
                orderItems={orderItems}
                showReviewForm={false}
                setShowReviewForm={setShowReviewForm}
                totalAmount={orderDetails?.totalAmount ?? 0}
                discountAmount={orderDetails?.discountAmount ?? 0}
                shippingFee={orderDetails?.shippingFee ?? 0}
                finalAmount={orderDetails?.finalAmount ?? 0}
              />
              <SupportSection />
            </>
          )}

          {!showReviewForm && activeTab === "shipping" && (
            <>
              <ShippingAddressCard shipping={orderDetails?.shipping as Order["shipping"]} />
              <SupportSection />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
