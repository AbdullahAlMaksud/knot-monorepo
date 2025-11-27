import Layout from "@/components/Layout";
import FeaturedProductHero from "@/components/shop/FeaturedProductHero";
import CoreProductsSection from "@/components/shop/CoreProductsSection";
import SignatureSerumSection from "@/components/shop/SignatureSerumSection";
import TheCreamSection from "@/components/shop/TheCreamSection";
import CTASection from "@/components/shared/CTASection";
import BeforeAfterSection from "@/components/shared/BeforeAfterSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";

export default function ShopPage() {
  const coreProducts = [
    {
      id: 1,
      name: "Glow Getter Brightening & Hydrating Serum",
      price: "From ₩925 DCU FR",
      rating: 5,
      image: "/images/products/product1.jpg",
    },
    {
      id: 2,
      name: "Glow Getter Brightening & Hydrating Serum",
      price: "From ₩925 DCU FR",
      rating: 5,
      image: "/images/products/product2.jpg",
    },
  ];

  const bestSellers = [
    {
      id: 3,
      name: "Radiance Boost Vitamin C Serum",
      price: "From ₩850 DCU FR",
      rating: 5,
      image: "/images/products/product1.jpg",
    },
  ];

  const bestSellers2 = [
    {
      id: 2,
      name: "Glow Getter Brightening & Hydrating Serum",
      price: "From ₩925 DCU FR",
      rating: 5,
      image: "/images/products/product2.jpg",
    },
  ];

  return (
    <Layout>
      <div className="pt-32">
        <FeaturedProductHero />
        <CoreProductsSection
          subtitle="MADE JUST FOR YOU"
          title="Our Core Products"
          products={coreProducts}
        />
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
        {/* <SignatureSerumSection />
        <TheCreamSection />
        <CTASection /> */}
        <BeforeAfterSection />
        <TestimonialsSection />
      </div>
    </Layout>
  );
}
