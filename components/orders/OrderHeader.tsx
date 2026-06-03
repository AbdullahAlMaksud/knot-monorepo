import Link from "next/link";
import { ArrowLeft } from "lucide-react";

function statusClass(status: string): string {
  switch (status.toLowerCase()) {
    case "delivered":
      return "bg-green-100 text-green-800";
    case "shipped":
      return "bg-blue-100 text-blue-800";
    case "paid":
      return "bg-amber-100 text-amber-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

type OrderHeaderProps = {
  orderId: string;
  date: string;
  status: string;
};

export default function OrderHeader({ orderId, date, status }: OrderHeaderProps) {
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
              Order {orderId}
            </h1>
            <p className="text-sm text-gray-600">Placed on {date}</p>
          </div>
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-md self-start capitalize ${statusClass(status)}`}
          >
            <span className="text-sm font-semibold">{status}</span>
          </div>
        </div>
      </div>
    </>
  );
}
