import { Package } from "lucide-react";

export default function OrderHistorySection() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Order History</h2>
      <div className="text-center py-12 text-gray-500">
        <Package size={48} className="mx-auto mb-4 opacity-50" />
        <p>No orders yet</p>
        <p className="text-sm mt-2">
          When you place orders, they will appear here
        </p>
      </div>
    </div>
  );
}
