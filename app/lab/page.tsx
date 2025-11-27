import Layout from "@/components/Layout";
import LabHero from "@/components/lab/LabHero";
import Info from "@/components/home/Info";
import Team from "@/components/home/Team";
import OurJourneySection from "@/components/home/OurJourneySection";
import CoreProductsSection from "@/components/shop/CoreProductsSection";
import ConcernsSection from "@/components/home/ConcernsSection";
import BeforeAfterSection from "@/components/shared/BeforeAfterSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import Innovation from "@/components/lab/Innovation";
import Journey from "@/components/lab/Journey";

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

export default function LabPage() {
  return (
    <Layout>
      <LabHero />
      <Innovation />
      <Team />
      <Info />
      <Journey />
      <OurJourneySection />
      <CoreProductsSection
        subtitle="MADE JUST FOR YOU"
        title="Our Core Products"
        products={coreProducts}
      />
      <ConcernsSection />
      <BeforeAfterSection />

      <TestimonialsSection />
    </Layout>
  );
}
