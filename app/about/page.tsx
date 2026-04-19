import Layout from "@/components/Layout";
import HeroCarousel from "@/components/shared/HeroCarousel";
import AboutJourneySection from "@/components/about/AboutJourneySection";
import AboutIngredientsSection from "@/components/about/AboutIngredientsSection";
import BeforeAfterSection from "@/components/shared/BeforeAfterSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import Link from "next/link";
import SectionIntroCta from "@/components/common/SectionIntroCta";

export default function AboutPage() {
  const heroMedia = [
    { type: "image" as const, src: "/images/about/about-bg.jpg" },
  ];

  return (
    <Layout>
      <HeroCarousel
        mediaItems={heroMedia}
        title="Our Story"
        description={
          <>
            B&apos;You is built on a simple belief: skincare should be personal,
            and place matters. Bangladesh&apos;s heat, humidity, pollution, and
            lifestyle demand formulations designed specifically for this
            environment—not products adapted from elsewhere. That&apos;s why we
            create premium, science-backed skincare developed exclusively for
            Bangladeshi skin. Each formula is carefully researched,
            dermatologist certified, and crafted to deliver safety, comfort, and
            visible results in real local conditions. Because true confidence
            begins with healthy skin.
          </>
        }
        buttonText="Shop Now"
        buttonLink="/shop"
      />
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
