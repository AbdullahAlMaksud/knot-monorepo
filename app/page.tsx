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
import {
  coreProducts,
  featuredProductMist,
  featuredProductVitaminC,
} from "@/data/products";

export default function Home() {
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
        <FeaturedProductHero product={featuredProductMist} />
        <Team2 />
        <FeaturedProductHero product={featuredProductVitaminC} />
        <BeforeAfterSection />
        <TestimonialsSection />
      </Layout>
    </>
  );
}
