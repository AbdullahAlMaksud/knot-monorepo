import Layout from "@/components/Layout";
import ConcernHero from "@/components/concern/ConcernHero";
import Ingredients from "@/components/concern/Ingredients";
import Routine from "@/components/concern/Routine";
import Understanding from "@/components/concern/Understanding";
import BeforeAfterSection from "@/components/shared/BeforeAfterSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import CoreProductsSection from "@/components/shop/CoreProductsSection";

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

const page = () => {
  return (
    <Layout>
      <ConcernHero />
      <Understanding />
      <CoreProductsSection
        subtitle="Targeted Solutions"
        title="Products Designed for Your Needs"
        products={coreProducts}
      />
      <Ingredients />
      <Routine />
      <BeforeAfterSection />
      <TestimonialsSection />
    </Layout>
  );
};

export default page;
