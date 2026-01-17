import Layout from "@/components/Layout";
import FeaturedProductHero from "@/components/shop/FeaturedProductHero";
import CoreProductsSection from "@/components/shop/CoreProductsSection";
import BeforeAfterSection from "@/components/shared/BeforeAfterSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";

export default function ShopPage() {
  const coreProducts = [
    {
      id: 1,
      name: "Glow Getter Brightening & Hydrating Serum",
      price: "From ₩925 DCU FR",
      rating: 5,
      images: "/images/products/product1.jpg",
      description: "Experience the perfect blend of brightening and hydration in one powerful serum for your daily skincare routine.",
    },
    {
      id: 2,
      name: "Glow Getter Brightening & Hydrating Serum",
      price: "From ₩925 DCU FR",
      rating: 5,
      images: "/images/products/product2.jpg",
      description: "Achieve a luminous complexion with this multi-tasking serum that works day and night.",
    },
  ];

  const bestSellers = [
    {
      id: 3,
      name: "Radiance Boost Vitamin C Serum",
      price: "From ₩850 DCU FR",
      rating: 5,
      images: "/images/products/product1.jpg",
      description: "Unlock your skin's natural radiance with this potent Vitamin C serum that fights dullness and evens skin tone.",
    },
  ];

  const bestSellers2 = [
    {
      id: 2,
      name: "Glow Getter Brightening & Hydrating Serum",
      price: "From ₩925 DCU FR",
      rating: 5,
      images: "/images/products/product2.jpg",
      description: "Indulge your skin with this luxurious serum that delivers intense hydration and a healthy, glowing finish.",
    },
  ];

  return (
    <Layout>
      <div className="pt-32">
        <CoreProductsSection
          subtitle="MADE JUST FOR YOU"
          title="Our Core Products"
          products={coreProducts}
        />
        <FeaturedProductHero
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
