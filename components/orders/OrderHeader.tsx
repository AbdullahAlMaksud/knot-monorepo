import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function OrderHeader() {
  return (
    <>
      <Link
        href="/account"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-8 transition"
      >
        <ArrowLeft size={16} />
        Back to My Account
      </Link>

      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              Order Details
            </h1>
            <p className="text-gray-600">Order #123456789</p>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full self-start">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            <span className="text-sm font-semibold">Shipped</span>
          </div>
        </div>
        <p className="text-sm text-gray-600">Order placed on May 10, 2025</p>
      </div>
    </>
  );
}
