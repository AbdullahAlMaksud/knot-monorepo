"use client";

import { useMemo } from "react";
import Layout from "@/components/common/layout";
import HeroCarousel from "@/components/shared/hero-carousel";
import OurStorySection from "@/screens/home/components/our-story-section";
import OurJourneySection from "@/screens/home/components/our-journey-section";
import BeforeAfterSection from "@/components/shared/before-after-section";
import TestimonialsSection from "@/components/shared/testimonials-section";
import CoreProductsSection from "@/screens/shop/components/core-products-section";
import ConcernsSection from "@/screens/home/components/concerns-section";
import FeaturedProductHero from "@/screens/shop/components/featured-product-hero";
import Team2 from "@/screens/home/components/team-2";
import Info from "@/screens/home/components/info";
import LoadingLogo from "@/components/common/loading-logo";
import type { ApiProduct } from "@/screens/product/services/type";
import { useGetPublishedProducts } from "@/screens/product/services/query";
import {
  getDefaultProductVariant,
  getProductImages,
  getProductVariants,
} from "@/screens/product/services/utils";

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

const Home = () => {
  const { data: products = [] } = useGetPublishedProducts();
  const featuredProducts = useMemo(
    () => products.filter((product) => product.isFeatured),
    [products],
  );
  const homeFeaturedProducts = useMemo(
    () => featuredProducts.slice(0, 4),
    [featuredProducts],
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
        <HeroCarousel />
        {homeFeaturedProducts.length > 0 && (
          <CoreProductsSection
            subtitle="MADE JUST FOR YOU"
            title="Our Core Products"
            products={homeFeaturedProducts}
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
};
export default Home;
