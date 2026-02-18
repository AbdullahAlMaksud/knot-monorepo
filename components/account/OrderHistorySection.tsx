"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuthUser } from "@/hooks/useAuthUser";
import { Order } from "@/lib/orders/types";

export default function OrderHistorySection() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  const { userId } = useAuthUser();


  useEffect(() => {
    const getAllOrdersByCustomerId = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/customer/${userId}`, { cache: "no-store" });
        if (res.status === 401) {
          setUnauthorized(true);
          return;
        }
        if (!res.ok) throw new Error("Failed to load orders");
        const data = await res.json();
        setOrders(data.data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }
    getAllOrdersByCustomerId();
  }, [userId]);
  
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
        {orders?.map((order) => (
          <div
            key={order._id}
            className="border border-gray-200 rounded-lg p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">Order {order._id}</h3>
                <p className="text-sm text-gray-500">{order.createdAt ? new Date(order.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "2-digit" }) : "—"} </p>
              </div>
              <div className="text-right">
                <p className="font-semibold capitalize">{order.status}</p>
                <p className="text-gray-600">
                  ${(order.finalAmount ?? 0).toFixed(2)}
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
                    ${(item.unitPrice ?? 0).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href={`/orders/${order._id}`}
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
