import Image from "next/image";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import CurrencyAmount from "@/components/ui/currency-amount";

type CartItem = {
  id: number | string;
  name: string;
  quantity: number;
  price: number;
  image: string;
};

type OrderSummaryProps = {
  cartItems: CartItem[];
  discountAmount: number;
  shippingFee: number;
  deliveryLabel: string;
  estimatedDelivery: string;
  canConfirmOrder: boolean;
  onConfirmOrder: () => void;
  submitting?: boolean;
  submitError?: string | null;
};

export default function OrderSummary({
  cartItems,
  discountAmount,
  shippingFee,
  deliveryLabel,
  estimatedDelivery,
  canConfirmOrder,
  onConfirmOrder,
  submitting = false,
  submitError = null,
}: OrderSummaryProps) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const total = subtotal - discountAmount + shippingFee;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden shrink-0 relative">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grow">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <div className="font-semibold">
              <CurrencyAmount amount={item.price} />
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">
            <CurrencyAmount amount={subtotal} />
          </span>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Discount</span>
            <span>
              <CurrencyAmount amount={-discountAmount} />
            </span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <div className="text-right">
            <p className="font-medium">
              <CurrencyAmount amount={shippingFee} />
            </p>
            <p className="text-xs text-gray-500">
              {deliveryLabel} • {estimatedDelivery}
            </p>
          </div>
        </div>
        <div className="flex justify-between text-lg font-bold pt-2 border-t">
          <span>Total</span>
          <span>
            <CurrencyAmount amount={total} />
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
}
