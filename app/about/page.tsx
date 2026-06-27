import Layout from "@/components/Layout";
import HeroCarousel from "@/components/shared/HeroCarousel";
import AboutJourneySection from "@/components/about/AboutJourneySection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import SectionIntroCta from "@/components/common/SectionIntroCta";

export default function AboutPage() {
  return (
    <Layout>
      <HeroCarousel />
      <AboutJourneySection />
      {/* <AboutIngredientsSection /> */}
      <section className="py-16 sm:py-24 bg-white">
        <SectionIntroCta
          title="Be the Best Version of You"
          description="B'You products are formulated with gentle, skin-friendly ingredients suitable even for sensitive skin. Free from unnecessary additives, our science-backed formulas focus on safety, effectiveness, and compatibility with Bangladeshi skin and climate. We help improve skin clarity, balance, and overall health-so you can feel confident and be the best version of you."
          strongText="B'You - Just Be You."
          buttonLabel="Shop Now"
          buttonHref="/shop"
        />
      </section>
      <TestimonialsSection />
    </Layout>
  );
}
