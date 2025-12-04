import Link from "next/link";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  status: "Shipped" | "Delivered";
  total: number;
  items: OrderItem[];
}

const orders: Order[] = [
  {
    id: "ORD-12345",
    date: "May 15, 2023",
    status: "Shipped",
    total: 152.97,
    items: [
      { name: "Hydrating Essence", quantity: 1, price: 48.0 },
      { name: "Nourishing Cream", quantity: 2, price: 104.0 },
    ],
  },
  {
    id: "ORD-12345",
    date: "May 15, 2023",
    status: "Delivered",
    total: 152.97,
    items: [
      { name: "Hydrating Essence", quantity: 1, price: 48.0 },
      { name: "Nourishing Cream", quantity: 2, price: 104.0 },
    ],
  },
  {
    id: "ORD-12345",
    date: "May 15, 2023",
    status: "Delivered",
    total: 152.97,
    items: [
      { name: "Hydrating Essence", quantity: 1, price: 48.0 },
      { name: "Nourishing Cream", quantity: 2, price: 104.0 },
    ],
  },
  {
    id: "ORD-12345",
    date: "May 15, 2023",
    status: "Shipped",
    total: 152.97,
    items: [
      { name: "Hydrating Essence", quantity: 1, price: 48.0 },
      { name: "Nourishing Cream", quantity: 2, price: 104.0 },
    ],
  },
  {
    id: "ORD-12345",
    date: "May 15, 2023",
    status: "Shipped",
    total: 152.97,
    items: [
      { name: "Hydrating Essence", quantity: 1, price: 48.0 },
      { name: "Nourishing Cream", quantity: 2, price: 104.0 },
    ],
  },
  {
    id: "ORD-12345",
    date: "May 15, 2023",
    status: "Delivered",
    total: 152.97,
    items: [
      { name: "Hydrating Essence", quantity: 1, price: 48.0 },
      { name: "Nourishing Cream", quantity: 2, price: 104.0 },
    ],
  },
];

export default function OrderHistorySection() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Order History</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-6 space-y-4"
          >
            {/* Order Header */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">Order {order.id}</h3>
                <p className="text-sm text-gray-500">{order.date}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{order.status}</p>
                <p className="text-gray-600">${order.total.toFixed(2)}</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-2 py-4 border-t border-gray-100">
              {order.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="text-gray-600">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* View Order Details Button */}
            <Link
              href={`/orders/${order.id}`}
              className="block w-full text-center py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              View Order Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
