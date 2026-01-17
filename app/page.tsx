import Layout from "@/components/Layout";
import HeroCarousel from "@/components/shared/HeroCarousel";
import OurStorySection from "@/components/home/OurStorySection";
import OurJourneySection from "@/components/home/OurJourneySection";
import BeforeAfterSection from "@/components/shared/BeforeAfterSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import CoreProductsSection from "@/components/shop/CoreProductsSection";
import ConcernsSection from "@/components/home/ConcernsSection";
import FeaturedProductHero from "@/components/shop/FeaturedProductHero";
import Team2 from "@/components/home/Team2";
import Info from "@/components/home/Info";
import LoadingLogo from "@/components/LoadingLogo";

export default function Home() {
  const coreProducts = [
    {
      id: 1,
      name: "Glow Getter Brightening & Hydrating Serum",
      price: "From ₩925 DCU FR",
      rating: 5,
      images: ["/images/products/product1.jpg", "/images/products/product2.jpg", "/images/products/product3.jpg", "/images/products/product4.jpg"],
      description: "A powerful serum that brightens your complexion while providing deep hydration for a radiant, glowing skin.",
    },
    {
      id: 2,
      name: "Glow Getter Brightening & Hydrating Serum",
      price: "From ₩925 DCU FR",
      rating: 5,
      images: "/images/products/product2.jpg",
      description: "Transform your skin with this lightweight serum that delivers visible brightness and lasting moisture.",
    },
  ];

  const heroMedia = [
    { type: "image" as const, src: "/images/home/hero-bg.jpg" },
    { type: "image" as const, src: "/images/about/about-bg.jpg" },
  ];

  return (
    <>
      <LoadingLogo />
      <Layout>
        <HeroCarousel
          mediaItems={heroMedia}
          title={
            <>
              Unveil Your Natural
              <br />
              Glow
            </>
          }
          description={
            <>
              Byou brings you simple, pure, and effective beauty
              <br />
              essentials designed to highlight your true self.{" "}
            </>
          }
          buttonText="Choose Your Glow"
          buttonLink="/shop"
        />
        <CoreProductsSection
          subtitle="MADE JUST FOR YOU"
          title="Our Core Products"
          products={coreProducts}
        />
        <Info />
        <OurStorySection />
        <OurJourneySection />
        <ConcernsSection />
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
        <Team2 />
        <FeaturedProductHero
          product={{
            brand: "BYOU BEAUTY",
            name: "Radiance Boost Vitamin C Serum",
            price: 58.0,
            currency: "MYR",
            images: [
              "/images/products/product1.jpg",
              "/images/products/product2.jpg",
              "/images/products/product3.jpg",
              "/images/products/product4.jpg",
            ],
            description:
              "Unlock your skin's natural radiance with this potent Vitamin C serum. Fights dullness, evens skin tone, and provides antioxidant protection for a brighter, more even complexion.",
            rating: 5,
          }}
        />
        <BeforeAfterSection />
        <TestimonialsSection />
      </Layout>
    </>
  );
}
