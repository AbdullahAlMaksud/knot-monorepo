"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  orderId: string;
  date: string;
  status: string;
  totals: { total: number };
  items: OrderItem[];
}

export default function OrderHistorySection() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/orders?mine=1", { credentials: "include" })
      .then((res) => {
        if (res.status === 401) {
          setUnauthorized(true);
          return [];
        }
        if (!res.ok) throw new Error("Failed to load orders");
        return res.json();
      })
      .then((data) => {
        if (!cancelled && Array.isArray(data)) {
          setOrders(
            data.map((o: { date: string; orderId: string; status: string; totals: { total: number }; items: OrderItem[] }) => ({
              orderId: o.orderId,
              date: o.date ? new Date(o.date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "—",
              status: o.status ?? "pending",
              totals: o.totals ?? { total: 0 },
              items: o.items ?? [],
            }))
          );
        }
      })
      .catch(() => {
        if (!cancelled) setOrders([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Order History</h2>
        <p className="text-gray-600">Loading orders…</p>
      </div>
    );
  }

  if (unauthorized) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Order History</h2>
        <p className="text-gray-600 mb-4">Sign in to view your orders.</p>
        <Link
          href="/auth/signin"
          className="inline-block bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition"
        >
          Sign in
        </Link>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Order History</h2>
        <p className="text-gray-600">You haven’t placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Order History</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="border border-gray-200 rounded-lg p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">Order {order.orderId}</h3>
                <p className="text-sm text-gray-500">{order.date}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold capitalize">{order.status}</p>
                <p className="text-gray-600">
                  ${(order.totals?.total ?? 0).toFixed(2)}
                </p>
              </div>
            </div>

            <div className="space-y-2 py-4 border-t border-gray-100">
              {order.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="text-gray-600">
                    ${(item.price ?? 0).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href={`/orders/${order.orderId}`}
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
