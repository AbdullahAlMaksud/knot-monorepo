import Layout from "@/components/Layout";
import HeroCarousel from "@/components/shared/HeroCarousel";
import AboutJourneySection from "@/components/about/AboutJourneySection";
import AboutIngredientsSection from "@/components/about/AboutIngredientsSection";
import BeforeAfterSection from "@/components/shared/BeforeAfterSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import Link from "next/link";

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
            Byou was born from a passion for simple, effective skincare and a
            commitment to creating products that bring out your natural glow
            with confidence.{" "}
          </>
        }
        buttonText="Shop Now"
        buttonLink="/shop"
      />
      <AboutJourneySection />
      {/* <AboutIngredientsSection /> */}
      <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <h2 className="text-3xl font-semibold mb-6">
          Simple, safe, and effective, glowing skin for everyone
        </h2>
        <p className="text-gray-600 max-w-4xl mx-auto mb-8">
          Our face mists and serums are made with a gentle, halal-friendly
          formula that works even for sensitive skin. With no unnecessary
          additives, Byou helps you achieve a natural, radiant glow and feel
          confident in your own skin, without the extra frills.
        </p>
        <Link
          href="/shop"
          className="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition"
        >
          Shop Now
        </Link>
      </div>

    
    </section>
      <TestimonialsSection />
    </Layout>
  );
}
