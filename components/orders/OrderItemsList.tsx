type OrderItem = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
};

type OrderItemsListProps = {
  orderItems: OrderItem[];
};

export default function OrderItemsList({ orderItems }: OrderItemsListProps) {
  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 5.99;
  const total = subtotal + shipping;

  return (
    <div className="bg-white border rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-6">Order Items</h2>
      <div className="space-y-6">
        {orderItems.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="w-20 h-20 shrink-0 bg-gray-100 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
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

      <div className="border-t mt-6 pt-6 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-semibold">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold border-t pt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
