"use client";

import { useParams } from "next/navigation";
import Layout from "@/components/common/layout";
import ConcernHero from "@/screens/concern/components/concern-hero";
import Ingredients from "@/screens/concern/components/ingredients";
import Routine from "@/screens/concern/components/routine";
import Understanding from "@/screens/concern/components/understanding";
import BeforeAfterSection from "@/components/shared/before-after-section";
import TestimonialsSection from "@/components/shared/testimonials-section";
import CoreProductsSection from "@/screens/shop/components/core-products-section";
import { getConcernBySlug } from "@/data/concerns";
import { useGetPublishedProducts } from "@/screens/product/services/query";

const ConcernDetailPage = () => {
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
};
export default ConcernDetailPage;
