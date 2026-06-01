"use client";

import { useMemo } from "react";
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
import type { ApiProduct } from "@/services/products/type";
import { useGetPublishedProducts } from "@/services/products/query";
import {
  getDefaultProductVariant,
  getProductImages,
  getProductVariants,
} from "@/services/products/utils";

const buildHeroProduct = (apiProduct: ApiProduct | undefined) => {
  if (!apiProduct) return undefined;
  const defaultVariant = getDefaultProductVariant(apiProduct);
  return {
    _id: apiProduct._id,
    variantId: defaultVariant?._id,
    variants: getProductVariants(apiProduct),
    slug: apiProduct.slug,
    brand: "Just Be YOU",
    name: apiProduct.name,
    price: defaultVariant?.price ?? 0,
    currency: "BDT",
    images: getProductImages(apiProduct),
    description: apiProduct.description,
    rating: apiProduct.rating ?? 0,
  };
};

export default function Home() {
  const heroMedia = [
    { type: "image" as const, src: "/images/home/hero-bg.jpg" },
    { type: "image" as const, src: "/images/about/about-bg.jpg" },
  ];
  const { data: products = [] } = useGetPublishedProducts();
  const featuredProducts = useMemo(
    () => products.filter((product) => product.isFeatured),
    [products],
  );
  const heroMist = useMemo(
    () => buildHeroProduct(featuredProducts[0] ?? products[0]),
    [featuredProducts, products],
  );
  const heroNiacinamide = useMemo(
    () => buildHeroProduct(featuredProducts[1] ?? products[1]),
    [featuredProducts, products],
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
        {heroMist && <FeaturedProductHero product={heroMist} />}
        <Team2 />
        {heroNiacinamide && <FeaturedProductHero product={heroNiacinamide} />}
        <BeforeAfterSection />
        <TestimonialsSection />
      </Layout>
    </>
  );
}
