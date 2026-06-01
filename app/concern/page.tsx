"use client";

import Layout from "@/components/Layout";
import ConcernsSection from "@/components/home/ConcernsSection";
import BeforeAfterSection from "@/components/shared/BeforeAfterSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import CoreProductsSection from "@/components/shop/CoreProductsSection";
import { useGetPublishedProducts } from "@/services/products/query";

export default function Page() {
  const { data: products = [] } = useGetPublishedProducts();

  return (
    <Layout>
      <section className="pt-32 pb-16 sm:pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm tracking-[0.2em] uppercase text-gray-600 mb-4">
              Skin Concern Library
            </p>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-[0.08em] mb-6">
              Explore Solutions by Concern
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Browse each concern to understand what may be causing it and
              discover routines built to support calmer, clearer,
              healthier-looking skin.
            </p>
          </div>
        </div>
      </section>
      <ConcernsSection />
      {products.length > 0 && (
        <CoreProductsSection
          subtitle="Targeted Solutions"
          title="Products Designed for Your Needs"
          products={products}
        />
      )}
      <BeforeAfterSection />
      <TestimonialsSection />
    </Layout>
  );
}
