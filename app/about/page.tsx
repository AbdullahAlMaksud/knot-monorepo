import Layout from "@/components/Layout";
import AboutJourneySection from "@/components/about/AboutJourneySection";
import AboutIngredientsSection from "@/components/about/AboutIngredientsSection";
import CTASection from "@/components/shared/CTASection";
import BeforeAfterSection from "@/components/shared/BeforeAfterSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import AboutHero from "@/components/about/AboutHero";

export default function AboutPage() {
  return (
    <Layout>
      <AboutHero />
      <AboutJourneySection />
      <AboutIngredientsSection />
      <BeforeAfterSection />
      <TestimonialsSection />
    </Layout>
  );
}
