import Layout from "@/components/Layout";
import HeroSection from "@/components/home/HeroSection";
import OurStorySection from "@/components/home/OurStorySection";
import OurJourneySection from "@/components/home/OurJourneySection";
import BeforeAfterSection from "@/components/shared/BeforeAfterSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import CoreProductsSection from "@/components/shop/CoreProductsSection";
import ConcernsSection from "@/components/home/ConcernsSection";
import FeaturedProductHero from "@/components/shop/FeaturedProductHero";
import Team from "@/components/home/Team";
import Info from "@/components/home/Info";
import LoadingLogo from "@/components/LoadingLogo";

export default function Home() {
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

  return (
    <>
      <LoadingLogo />
      <Layout>
        <HeroSection />
        <CoreProductsSection
          subtitle="MADE JUST FOR YOU"
          title="Our Core Products"
          products={coreProducts}
        />
        <Info />
        <OurStorySection />
        <OurJourneySection />
        <ConcernsSection />
        <FeaturedProductHero />
        <Team />
        <FeaturedProductHero />
        <BeforeAfterSection />
        <TestimonialsSection />
      </Layout>
    </>
  );
}
