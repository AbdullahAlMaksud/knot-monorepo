import Layout from "@/components/Layout";
import ProductDetailsSection from "@/components/product/ProductDetailsSection";
import WhyChooseSection from "@/components/product/WhyChooseSection";
import BeforeAfterSection from "@/components/shared/BeforeAfterSection";
import FromUsToYouSection from "@/components/product/FromUsToYouSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import Info from "@/components/home/Info";
import CoreProductsSection from "@/components/shop/CoreProductsSection";

const coreProducts = [
  {
    id: 1,
    name: "Glow Getter Brightening & Hydrating Serum",
    price: "From ₩925 DCU FR",
    rating: 5,
    image: "/images/products/product1.jpg",
  },
];

export default function ProductDetailPage() {
  return (
    <Layout>
      <div className="pt-32">
        <ProductDetailsSection />
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
