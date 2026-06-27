"use client";

import Layout from "@/components/Layout";
import HeroCarousel from "@/components/shared/HeroCarousel";
import Info from "@/components/home/Info";
import OurJourneySection from "@/components/home/OurJourneySection";
import CoreProductsSection from "@/components/shop/CoreProductsSection";
import ConcernsSection from "@/components/home/ConcernsSection";
import BeforeAfterSection from "@/components/shared/BeforeAfterSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import Innovation from "@/components/lab/Innovation";
import Journey from "@/components/lab/Journey";
import Team2 from "@/components/home/Team2";
import { useGetPublishedProducts } from "@/services/products/query";

export default function LabPage() {
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
}
