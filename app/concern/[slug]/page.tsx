"use client";

import { useParams } from "next/navigation";
import Layout from "@/components/Layout";
import ConcernHero from "@/components/concern/ConcernHero";
import Ingredients from "@/components/concern/Ingredients";
import Routine from "@/components/concern/Routine";
import Understanding from "@/components/concern/Understanding";
import BeforeAfterSection from "@/components/shared/BeforeAfterSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import CoreProductsSection from "@/components/shop/CoreProductsSection";
import { getConcernBySlug } from "@/data/concerns";
import { useGetPublishedProducts } from "@/services/products/query";

export default function ConcernDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const concern = getConcernBySlug(slug);
  const { data: products = [] } = useGetPublishedProducts();

  if (!concern) {
    return (
      <Layout>
        <div className="px-4 py-40 text-center">
          <h1 className="text-3xl font-semibold">Concern not found</h1>
          <p className="mt-3 text-gray-600">
            The concern you are looking for is unavailable.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ConcernHero concern={concern} />
      <Understanding concern={concern} />
      {products.length > 0 && (
        <CoreProductsSection
          subtitle="Targeted Solutions"
          title="Products Designed for Your Needs"
          products={products}
        />
      )}
      <Ingredients concern={concern} />
      <Routine concern={concern} />
      <BeforeAfterSection />
      <TestimonialsSection />
    </Layout>
  );
}
