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
  featuredProductMist,
  featuredProductVitaminC,
  type FeaturedProduct,
} from "@/data/products";
import { getPublishedProducts } from "@/services/products/api";
import { getR2ImageUrl } from "@/lib/utils";
import type { ApiProduct } from "@/services/products/type";

export default async function Home() {
  const heroMedia = [
    { type: "image" as const, src: "/images/home/hero-bg.jpg" },
    { type: "image" as const, src: "/images/about/about-bg.jpg" },
  ];

  let products: ApiProduct[] = [];
  try {
    const result = await getPublishedProducts();
    products = result.data;
  } catch {
    // fall through with empty list
  }

  const buildHeroProduct = (
    apiProduct: ApiProduct | undefined,
    fallback: FeaturedProduct,
  ) => {
    if (!apiProduct) return fallback;
    const defaultVariant =
      apiProduct.variants.find((v) => v.isDefault) ?? apiProduct.variants[0];
    return {
      _id: apiProduct._id,
      variantId: defaultVariant?._id,
      slug: apiProduct.slug,
      brand: "Just Be YOU",
      name: apiProduct.name,
      price: defaultVariant?.price ?? fallback.price,
      currency: "BDT",
      images: [
        getR2ImageUrl(apiProduct.displayImageKey),
        ...apiProduct.relatedImagesKeys.map(getR2ImageUrl),
      ],
      description: apiProduct.description || fallback.description,
      rating: apiProduct.rating || fallback.rating || 5,
    };
  };

  const heroMist = buildHeroProduct(
    products.find((p) => p.slug === "vitamin-c-10-face-serum"),
    featuredProductMist,
  );
  const heroNiacinamide = buildHeroProduct(
    products.find((p) => p.slug === "niacinamide-10-face-serum"),
    featuredProductVitaminC,
  );

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
        {products.length > 0 && (
          <CoreProductsSection
            subtitle="MADE JUST FOR YOU"
            title="Our Core Products"
            products={products}
          />
        )}
        <Info />
        <OurStorySection />
        <OurJourneySection />
        <ConcernsSection />
        <FeaturedProductHero product={heroMist} />
        <Team2 />
        <FeaturedProductHero product={heroNiacinamide} />
        <BeforeAfterSection />
        <TestimonialsSection />
      </Layout>
    </>
  );
}
