"use client";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: string;
  rating: number;
  image: string;
}

interface CoreProductsSectionProps {
  subtitle?: string;
  title: string;
  products: Product[];
}

export default function CoreProductsSection({
  subtitle = "MADE JUST FOR YOU",
  title,
  products,
}: CoreProductsSectionProps) {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          {subtitle && <p className="text-gray-600 text-sm mb-2">{subtitle}</p>}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light">
            {title}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group flex flex-col items-center border rounded-2xl border-gray-200 hover:shadow transition"
            >
              <div className="relative w-full h-[400px] sm:h-[500px] bg-gray-200 rounded-lg overflow-hidden mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Add to Cart Overlay */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    className="bg-white/90 cursor-pointer backdrop-blur-sm text-black px-8 py-3 rounded-full font-medium hover:bg-white transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                    onClick={(e) => {
                      e.preventDefault();
                      // Add to cart logic here
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
              <div className="px-6 pb-6 w-full flex flex-col items-center">
                <h3 className="text-xl font-medium mb-2 group-hover:text-gray-600 transition">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-2">{product.price}</p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={16} fill="black" />
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
