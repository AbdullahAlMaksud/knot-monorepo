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
        Back to Account
      </Link>

      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              Order ORD-12345
            </h1>
            <p className="text-sm text-gray-600">Placed on May 15, 2023</p>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-md self-start">
            <span className="text-sm font-semibold">Delivered</span>
          </div>
        </div>
      </div>
    </>
  );
}
