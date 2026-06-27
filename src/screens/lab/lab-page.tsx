"use client";

import Layout from "@/components/common/layout";
import HeroCarousel from "@/components/shared/hero-carousel";
import Info from "@/screens/home/components/info";
import OurJourneySection from "@/screens/home/components/our-journey-section";
import CoreProductsSection from "@/screens/shop/components/core-products-section";
import ConcernsSection from "@/screens/home/components/concerns-section";
import BeforeAfterSection from "@/components/shared/before-after-section";
import TestimonialsSection from "@/components/shared/testimonials-section";
import Innovation from "@/screens/lab/components/innovation";
import Journey from "@/screens/lab/components/journey";
import Team2 from "@/screens/home/components/team-2";
import { useGetPublishedProducts } from "@/screens/product/services/query";

const LabPage = () => {
  const { data: products = [] } = useGetPublishedProducts();

  return (
    <Layout>
      <HeroCarousel />
      <Innovation />
      <Team2 />
      <Info />
      <Journey />
      <OurJourneySection />
      {products.length > 0 && (
        <CoreProductsSection
          subtitle="MADE JUST FOR YOU"
          title="Our Core Products"
          products={products}
        />
      )}
      <ConcernsSection />
      <BeforeAfterSection />
      <TestimonialsSection />
    </Layout>
  );
};
export default LabPage;
