"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Upload, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

type OrderItem = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
};

type OrderItemsListProps = {
  orderItems: OrderItem[];
  showReviewForm: boolean;
  setShowReviewForm: (show: boolean) => void;
};

export default function OrderItemsList({
  orderItems,
  showReviewForm,
  setShowReviewForm,
}: OrderItemsListProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewBody, setReviewBody] = useState("");

  const subtotal = 152.0;
  const discount = 35.99;
  const shipping = 5.99;
  const tax = 15.99;
  const total = 157.99;

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
            {orderItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="w-16 h-16 shrink-0 bg-gray-100 rounded-lg overflow-hidden relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="font-semibold ml-auto">${item.price}</p>
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
        {orderItems.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="w-16 h-16 shrink-0 bg-gray-100 rounded-lg overflow-hidden relative">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">{item.name}</h3>
              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-6 space-y-3">
        <h3 className="font-semibold mb-4">Billing Information</h3>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-green-600">
          <span>Discount (10%)</span>
          <span>-${discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">TAX</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold border-t pt-3 mt-3">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
