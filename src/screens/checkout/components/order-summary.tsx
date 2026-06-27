import Image from "next/image";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import CurrencyAmount from "@/components/ui/currency-amount";

import type { CartItem } from "@/lib/cart/types";

type OrderSummaryProps = {
  cartItems: CartItem[];
  productDiscountTotal: number;
  couponDiscountAmount: number;
  shippingFee: number;
  deliveryLabel: string;
  estimatedDelivery: string;
  canConfirmOrder: boolean;
  onConfirmOrder: () => void;
  submitting?: boolean;
  submitError?: string | null;
  currency?: string;

  // Coupon props
  couponCodeInput: string;
  onCouponCodeChange: (code: string) => void;
  onApplyCoupon: () => void;
  isApplyingCoupon: boolean;
  appliedCoupon: any;
  onRemoveCoupon: () => void;
  couponError: string | null;
};

const OrderSummary = ({
  cartItems,
  productDiscountTotal,
  couponDiscountAmount,
  shippingFee,
  deliveryLabel,
  estimatedDelivery,
  canConfirmOrder,
  onConfirmOrder,
  submitting = false,
  submitError = null,
  currency,
  couponCodeInput,
  onCouponCodeChange,
  onApplyCoupon,
  isApplyingCoupon,
  appliedCoupon,
  onRemoveCoupon,
  couponError,
}: OrderSummaryProps) => {
  const originalSubtotal = cartItems.reduce(
    (sum, item) => sum + (item.originalPrice ?? item.price) * item.quantity,
    0,
  );
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const total = Math.max(0, subtotal - couponDiscountAmount) + shippingFee;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <div
            key={`${item.id}-${item.variantId ?? "default"}`}
            className="flex gap-4 animate-fadeIn"
          >
            <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden shrink-0 relative">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grow">
              <h3 className="font-medium text-sm text-stone-900 leading-snug">{item.name}</h3>
              <p className="text-xs text-gray-500 mt-1">Quantity: {item.quantity}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1.5 justify-end">
                <div className="font-semibold text-sm">
                  <CurrencyAmount amount={item.price} currency={currency} />
                </div>
                {item.isDiscounted && item.originalPrice && item.originalPrice > item.price && (
                  <span className="inline-flex items-center bg-red-50 text-red-700 px-1 py-0.2 rounded text-[9px] font-bold">
                    {item.discountType === "PERCENTAGE" || item.discountType === "PERCENT"
                      ? `-${Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%`
                      : `-${item.originalPrice - item.price}${currency === "BDT" ? "৳" : currency || ""}`}
                  </span>
                )}
              </div>
              {item.isDiscounted && item.originalPrice && item.originalPrice > item.price && (
                <div className="text-xs text-gray-400 line-through mt-0.5">
                  <CurrencyAmount amount={item.originalPrice} currency={currency} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Coupon Application Section */}
      <div className="border-t border-b py-4 my-6 space-y-2">
        <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold block">
          Coupon Discount
        </label>
        {appliedCoupon ? (
          <div className="flex items-center justify-between bg-stone-50 border border-stone-250/60 rounded-full px-4 py-2 text-xs">
            <span className="font-semibold text-stone-800">
              {appliedCoupon.code} ({appliedCoupon.discountType === "PERCENTAGE" || appliedCoupon.discountType === "PERCENT" ? `${appliedCoupon.percentageDiscountValue ?? appliedCoupon.discountValue}%` : "Flat"} Off)
            </span>
            <button
              type="button"
              onClick={onRemoveCoupon}
              className="text-stone-400 hover:text-red-500 text-xs font-semibold uppercase tracking-wider transition-colors ml-2"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCodeInput}
              onChange={(e) => onCouponCodeChange(e.target.value)}
              placeholder="Enter coupon code"
              className="grow px-4 py-2 border rounded-full text-xs outline-none focus:border-stone-500 bg-stone-50/50"
            />
            <Button
              type="button"
              onClick={onApplyCoupon}
              disabled={isApplyingCoupon}
              className="rounded-full px-5 text-xs font-semibold bg-black text-white hover:bg-black/80 h-9 shrink-0"
            >
              {isApplyingCoupon ? "Applying..." : "Apply"}
            </Button>
          </div>
        )}
        {couponError && (
          <p className="text-xs text-red-600 font-medium">{couponError}</p>
        )}
      </div>

      <div className="space-y-2">
        {productDiscountTotal > 0 ? (
          <>
            <div className="flex justify-between text-sm">
              <span className="text-gray-650">Subtotal (Original)</span>
              <span className="font-medium">
                <CurrencyAmount amount={originalSubtotal} currency={currency} />
              </span>
            </div>
            <div className="flex justify-between text-sm text-green-600">
              <span>Product Discount</span>
              <span>
                <CurrencyAmount amount={-productDiscountTotal} currency={currency} />
              </span>
            </div>
          </>
        ) : (
          <div className="flex justify-between text-sm">
            <span className="text-gray-650">Subtotal</span>
            <span className="font-medium">
              <CurrencyAmount amount={subtotal} currency={currency} />
            </span>
          </div>
        )}
        {couponDiscountAmount > 0 && (
          <div className="flex justify-between text-sm text-green-650 font-medium">
            <span>Coupon Discount</span>
            <span>
              <CurrencyAmount amount={-couponDiscountAmount} currency={currency} />
            </span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-gray-650">Shipping</span>
          <div className="text-right">
            <p className="font-medium">
              <CurrencyAmount amount={shippingFee} currency={currency} />
            </p>
            <p className="text-[10px] text-gray-500">
              {deliveryLabel} • {estimatedDelivery}
            </p>
          </div>
        </div>
        <div className="flex justify-between text-lg font-bold pt-2 border-t">
          <span>Total</span>
          <span>
            <CurrencyAmount amount={total} currency={currency} />
          </span>
        </div>
      </div>

      {submitError && (
        <p className="text-sm text-red-600 mt-2">{submitError}</p>
      )}

      {submitting || cartItems.length === 0 || canConfirmOrder ? (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-amber-950">
          <div className="flex flex-col items-start gap-3">
            <div className="mt-0.5 rounded-full bg-amber-100 p-2 text-amber-700">
              <AlertTriangle className="size-4" />
            </div>
            <div>
              <p className="text-sm font-semibold">
                Check your information carefully
              </p>
              <p className="mt-1 text-sm leading-6 text-amber-900/80">
                Before confirming, please review your information carefully.
                Once the order is placed, these details cannot be changed from
                here.
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <Button
        type="button"
        onClick={onConfirmOrder}
        disabled={submitting || cartItems.length === 0 || !canConfirmOrder}
        className="w-full mt-6 rounded-full"
      >
        {submitting ? "Placing order..." : "Confirm Order"}
      </Button>
    </div>
  );
};
export default OrderSummary;
