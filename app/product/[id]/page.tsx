import Layout from "@/components/Layout";
import FeaturedProductHero from "@/components/shop/FeaturedProductHero";
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
    images: "/images/products/product1.jpg",
    description: "Discover the secret to radiant skin with this expertly crafted serum that brightens and hydrates in one step.",
  },
];

export default function ProductDetailPage() {
  return (
    <Layout>
      <div className="pt-32">
        <FeaturedProductHero
          variant="light"
          product={{
            brand: "BYOU BEAUTY",
            name: "Glow Contour Lifting Peptide Mist",
            price: 63.0,
            currency: "MYR",
            images: [
              "/images/products/product1.jpg",
              "/images/products/product2.jpg",
              "/images/products/product3.jpg",
              "/images/products/product4.jpg",
            ],
            description:
              "A revolutionary peptide mist that lifts, contours, and enhances your natural glow with advanced skincare technology. Perfect for daily use to achieve a radiant, youthful complexion.",
            rating: 5,
          }}
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
