"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Upload, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Order } from "@/lib/orders/types";
import CurrencyAmount from "@/components/ui/currency-amount";

type OrderItemsListProps = {
  orderItems: Order["items"];
  showReviewForm: boolean;
  setShowReviewForm: (show: boolean) => void;
  totalAmount: number;
  discountAmount: number;
  shippingFee: number;
  finalAmount: number;
};

const OrderItemsList = ({
  orderItems,
  showReviewForm,
  setShowReviewForm,
  totalAmount,
  discountAmount,
  shippingFee,
  finalAmount,
}: OrderItemsListProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewBody, setReviewBody] = useState("");

  if (showReviewForm) {
    return (
      <div className="bg-white border rounded-lg p-6 mb-6">
        <Button
          variant="ghost"
          onClick={() => setShowReviewForm(false)}
          className="mb-6 text-gray-600 hover:text-black"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>

        <div className="mb-6">
          <h3 className="font-semibold mb-4">Order Items</h3>
          <div className="flex gap-6">
            {orderItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-16 h-16 shrink-0 bg-gray-100 rounded-lg overflow-hidden relative">
                  <Image
                    src={item.image || "/placeholder.png"}
                    alt={item.name || "Product image"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">
                    {item.name || "Unknown Product"}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity || 1}
                  </p>
                </div>
                <p className="font-semibold ml-auto">
                  <CurrencyAmount amount={item.subtotal || 0} />
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Review Body
            </label>
            <textarea
              value={reviewBody}
              onChange={(e) => setReviewBody(e.target.value)}
              className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Write your review here..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="focus:outline-none"
                >
                  <Star
                    size={32}
                    fill={star <= (hoveredRating || rating) ? "black" : "none"}
                    stroke={
                      star <= (hoveredRating || rating)
                        ? "black"
                        : "currentColor"
                    }
                    className="transition-colors"
                  />
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Image or Videos
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition">
              <Upload size={48} className="mx-auto mb-3 text-gray-400" />
              <p className="text-gray-600 mb-1">Drop your documents here</p>
              <p className="text-xs text-gray-500">
                Supports PDF, DOC, DOCX, TXT, and image files up to 10MB
              </p>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              variant="outline"
              onClick={() => setShowReviewForm(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button className="flex-1">Submit</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold mb-6">Order Items</h2>
      <div className="space-y-6 mb-6">
        {orderItems.map((item, idx) => (
          <div key={idx} className="flex gap-4">
            <div className="w-16 h-16 shrink-0 bg-gray-100 rounded-lg overflow-hidden relative">
              <Image
                src={item.image || "/placeholder.png"}
                alt={item.name || "Product image"}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">
                {item.name || "Unknown Product"}
              </h3>
              <p className="text-sm text-gray-600">
                Quantity: {item.quantity || 1}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold">
                <CurrencyAmount amount={item.subtotal || 0} />
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-6 space-y-3">
        <h3 className="font-semibold mb-4">Billing Information</h3>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span>
            <CurrencyAmount amount={totalAmount} />
          </span>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount</span>
            <span>
              <CurrencyAmount amount={-discountAmount} />
            </span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span>
            <CurrencyAmount amount={shippingFee} />
          </span>
        </div>
        <div className="flex justify-between text-lg font-bold border-t pt-3 mt-3">
          <span>Total</span>
          <span>
            <CurrencyAmount amount={finalAmount} />
          </span>
        </div>
      </div>
    </div>
  );
};
export default OrderItemsList;
