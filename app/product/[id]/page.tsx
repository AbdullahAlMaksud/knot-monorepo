import Layout from "@/components/Layout";
import FeaturedProductHero from "@/components/shop/FeaturedProductHero";
import WhyChooseSection from "@/components/product/WhyChooseSection";
import BeforeAfterSection from "@/components/shared/BeforeAfterSection";
import FromUsToYouSection from "@/components/product/FromUsToYouSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import Info from "@/components/home/Info";
import CoreProductsSection from "@/components/shop/CoreProductsSection";
import { coreProducts, featuredProductMist } from "@/data/products";

export default function ProductDetailPage() {
  return (
    <Layout>
      <div className="pt-32">
        <FeaturedProductHero
          variant="light"
          product={featuredProductMist}
        />
        <Info />
        <WhyChooseSection />
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
