import Layout from "@/components/Layout";
import FeaturedProductHero from "@/components/shop/FeaturedProductHero";
import CoreProductsSection from "@/components/shop/CoreProductsSection";
import BeforeAfterSection from "@/components/shared/BeforeAfterSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import { getPublishedProducts } from "@/services/products/api";
import {
  getDefaultProductVariant,
  getProductImages,
  getProductVariants,
} from "@/services/products/utils";

export default async function ShopPage() {
  let products: import("@/services/products/type").ApiProduct[] = [];
  try {
    const result = await getPublishedProducts();
    products = result.data;
  } catch {
    // fall through with empty list
  }

  const featured = products.find((p) => p.isFeatured);

  const featuredDefaultVariant = getDefaultProductVariant(featured);

  const featuredHeroProduct = featured
    ? {
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
      }
    : undefined;

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
