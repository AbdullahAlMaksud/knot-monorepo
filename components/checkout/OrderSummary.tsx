type CartItem = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
};

type OrderSummaryProps = {
  cartItems: CartItem[];
  onConfirmOrder: () => void;
};

export default function OrderSummary({
  cartItems,
  onConfirmOrder,
}: OrderSummaryProps) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 5.99;
  const total = subtotal + shipping;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0" />
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
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold pt-2 border-t">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onConfirmOrder}
        className="w-full mt-6 bg-black text-white py-3 rounded-full hover:bg-gray-800 transition font-medium"
      >
        Confirm Order
      </button>
    </div>
  );
}
