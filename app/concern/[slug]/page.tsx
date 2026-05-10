import Layout from "@/components/Layout";
import ConcernHero from "@/components/concern/ConcernHero";
import Ingredients from "@/components/concern/Ingredients";
import Routine from "@/components/concern/Routine";
import Understanding from "@/components/concern/Understanding";
import BeforeAfterSection from "@/components/shared/BeforeAfterSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import CoreProductsSection from "@/components/shop/CoreProductsSection";
import { concerns, getConcernBySlug } from "@/data/concerns";
import { getPublishedProducts } from "@/services/products/api";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return concerns.map((concern) => ({ slug: concern.slug }));
}

export default async function ConcernDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const concern = getConcernBySlug(slug);

  if (!concern) {
    notFound();
  }

  let products: import("@/services/products/type").ApiProduct[] = [];
  try {
    const result = await getPublishedProducts();
    products = result.data;
  } catch {
    // fall through with empty list
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
