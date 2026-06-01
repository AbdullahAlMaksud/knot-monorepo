"use client";

import { useMemo } from "react";
import Layout from "@/components/Layout";
import FeaturedProductHero from "@/components/shop/FeaturedProductHero";
import CoreProductsSection from "@/components/shop/CoreProductsSection";
import BeforeAfterSection from "@/components/shared/BeforeAfterSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import { useGetPublishedProducts } from "@/services/products/query";
import {
  getDefaultProductVariant,
  getProductImages,
  getProductVariants,
} from "@/services/products/utils";

export default function ShopPage() {
  const { data: products = [] } = useGetPublishedProducts();

  const featuredHeroProduct = useMemo(() => {
    const featured = products.find((p) => p.isFeatured);
    if (!featured) return undefined;

    const featuredDefaultVariant = getDefaultProductVariant(featured);

    return {
      _id: featured._id,
      variantId: featuredDefaultVariant?._id,
      variants: getProductVariants(featured),
      slug: featured.slug,
      brand: "Just Be YOU",
      name: featured.name,
      price: featuredDefaultVariant?.price ?? 0,
      images: getProductImages(featured),
      description: featured.description,
      rating: featured.rating ?? 0,
    };
  }, [products]);

  return (
    <Layout>
      <div className="pt-32">
        {products.length > 0 && (
          <CoreProductsSection
            subtitle="MADE JUST FOR YOU"
            title="Our Core Products"
            products={products}
          />
        )}
        {featuredHeroProduct && (
          <FeaturedProductHero product={featuredHeroProduct} />
        )}
        <BeforeAfterSection />
        <TestimonialsSection />
      </div>
    </Layout>
  );
}
