import Link from "next/link";
import { Star } from "lucide-react";

export default function MoreProductsSection() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-gray-600 text-sm mb-2">MORE JUST FOR YOU</p>
          <h2 className="text-3xl sm:text-4xl font-light">Our Core Products</h2>
        </div>
        <div className="flex justify-center">
          <Link href="/product/2" className="group max-w-md">
            <div className="relative h-[400px] sm:h-[500px] bg-gray-200 rounded-lg overflow-hidden mb-4">
              <div className="w-full h-full bg-gradient-to-br from-amber-200 to-amber-400 group-hover:scale-105 transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-medium mb-2 text-center group-hover:text-gray-600 transition">
              Glow Getter Brightening & Hydrating Serum
            </h3>
            <p className="text-gray-600 mb-2 text-center">From ₩925 DCU FR</p>
            <div className="flex items-center justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={16} fill="black" />
              ))}
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
