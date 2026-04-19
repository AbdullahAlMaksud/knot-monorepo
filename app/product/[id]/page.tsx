import Layout from "@/components/Layout";
import FeaturedProductHero from "@/components/shop/FeaturedProductHero";
import WhyChooseSection from "@/components/product/WhyChooseSection";
import BeforeAfterSection from "@/components/shared/BeforeAfterSection";
import FromUsToYouSection from "@/components/product/FromUsToYouSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import Info from "@/components/home/Info";
import CoreProductsSection from "@/components/shop/CoreProductsSection";
import {
  coreProducts,
  getProductDetailById,
  getFeaturedProductById,
  getProductInfoFeaturesById,
} from "@/data/products";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = Number(id);
  const detail = getProductDetailById(productId);
  const featuredProduct = getFeaturedProductById(productId);
  const infoFeatures = getProductInfoFeaturesById(productId);

  if (!detail || !featuredProduct) {
    notFound();
  }

  return (
    <Layout>
      <div className="pt-32">
        <FeaturedProductHero variant="light" product={featuredProduct} />
        <Info features={infoFeatures} />
        <WhyChooseSection detail={detail} />
        <BeforeAfterSection />
        <FromUsToYouSection />
        <CoreProductsSection
          subtitle="MADE JUST FOR YOU"
          title="Our Core Products"
          products={coreProducts}
        />
        <TestimonialsSection />
      </div>
    </Layout>
  );
}
