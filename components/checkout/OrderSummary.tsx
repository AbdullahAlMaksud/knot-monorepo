import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DISCOUNT_AMOUNT, SHIPPING_FEE } from "@/lib/orders/types";

type CartItem = {
  id: number | string;
  name: string;
  quantity: number;
  price: number;
  image: string;
};

type OrderSummaryProps = {
  cartItems: CartItem[];
  onConfirmOrder: () => void;
  submitting?: boolean;
  submitError?: string | null;
};

export default function OrderSummary({
  cartItems,
  onConfirmOrder,
  submitting = false,
  submitError = null,
}: OrderSummaryProps) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = SHIPPING_FEE;
  const total = (subtotal - DISCOUNT_AMOUNT) + shipping;

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
            <div className="font-semibold">${item.price}</div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Discount</span>
          <span>${DISCOUNT_AMOUNT.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold pt-2 border-t">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {submitError && (
        <p className="text-sm text-red-600 mt-2">{submitError}</p>
      )}
      <Button
        type="button"
        onClick={onConfirmOrder}
        disabled={submitting || cartItems.length === 0}
        className="w-full mt-6 rounded-full"
      >
        {submitting ? "Placing order…" : "Confirm Order"}
      </Button>
    </div>
  );
}
