import Link from "next/link";
import { Star } from "lucide-react";

export default function SupportSection() {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <Link
          href="/contact"
          className="flex-1 px-6 py-3 bg-white border-2 border-black text-center font-semibold hover:bg-gray-50 transition rounded-lg"
        >
          Contact Support
        </Link>
        <button className="flex-1 px-6 py-3 bg-black text-white font-semibold hover:bg-gray-800 transition rounded-lg flex items-center justify-center gap-2">
          <Star size={20} />
          Write a Review
        </button>
      </div>

      <div className="p-6 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Need Help?</h3>
        <p className="text-sm text-gray-600 mb-4">
          If you have any questions about your order or tracking information,
          please don't hesitate to contact our customer support team.
        </p>
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-semibold">Email:</span>{" "}
            <a
              href="mailto:support@byou.com"
              className="text-black hover:underline"
            >
              support@byou.com
            </a>
          </p>
          <p>
            <span className="font-semibold">Phone:</span>{" "}
            <a href="tel:+15551234567" className="text-black hover:underline">
              +1 (555) 123-4567
            </a>
          </p>
          <p>
            <span className="font-semibold">Hours:</span> Monday - Friday, 9:00
            AM - 6:00 PM EST
          </p>
        </div>
      </div>
    </>
  );
}
