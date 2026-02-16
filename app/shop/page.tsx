import Layout from "@/components/Layout";
import FeaturedProductHero from "@/components/shop/FeaturedProductHero";
import CoreProductsSection from "@/components/shop/CoreProductsSection";
import BeforeAfterSection from "@/components/shared/BeforeAfterSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import {
  coreProducts,
  bestSellers,
  bestSellers2,
  featuredProductMist,
} from "@/data/products";

export default function ShopPage() {
  return (
    <Layout>
      <div className="pt-32">
        <CoreProductsSection
          subtitle="MADE JUST FOR YOU"
          title="Our Core Products"
          products={coreProducts}
        />
        <FeaturedProductHero product={featuredProductMist} />

        <CoreProductsSection
          subtitle="Made to Match Your Skin"
          title="Our Signature Serum"
          products={bestSellers}
        />
        <CoreProductsSection
          subtitle="Softness in Every Touch"
          title="The Cream Your Skin Deserves"
          products={bestSellers2}
        />
        <BeforeAfterSection />
        <TestimonialsSection />
      </div>
    </Layout>
  );
}
