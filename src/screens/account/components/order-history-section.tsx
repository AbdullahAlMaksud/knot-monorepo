"use client";

import Link from "next/link";
import { useAuthSession } from "@/lib/auth-client";
import { useGetOrdersByCustomerId } from "@/screens/orders/services/query";
import ErrorState from "@/components/ui/error";
import CurrencyAmount from "@/components/ui/currency-amount";
import Skeleton from "@/components/ui/skeleton";

function OrderHistorySkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <Skeleton className="mb-6 h-7 w-44" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="space-y-4 rounded-lg border border-gray-200 p-6"
          >
            <div className="flex justify-between gap-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-28" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <div className="space-y-2 border-t border-gray-100 py-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <Skeleton className="h-11 w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}

const OrderHistorySection = () => {
  const { data: session, isPending: isSessionPending } = useAuthSession();
  const customerId = session?.user?.id ?? "";

  const {
    data: userOrdersData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetOrdersByCustomerId(customerId);

  if (isSessionPending || isLoading) {
    return <OrderHistorySkeleton />;
  }
  if (isError)
    return (
      <ErrorState fullPage={true} message={error?.message} onRetry={refetch} />
    );

  if (!customerId) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Order History</h2>
        <p className="text-gray-600">Please sign in to view your orders.</p>
      </div>
    );
  }

  if (!userOrdersData || userOrdersData.length === 0) {
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
        {userOrdersData?.map((order) => (
          <div
            key={order._id}
            className="border border-gray-200 rounded-lg p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">Order {order._id}</h3>
                <p className="text-sm text-gray-500">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                      })
                    : "—"}{" "}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold capitalize">{order.status}</p>
                <p className="text-gray-600">
                  <CurrencyAmount amount={order.finalAmount ?? 0} />
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
                    <CurrencyAmount amount={item.unitPrice ?? 0} />
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
};
export default OrderHistorySection;
