import Layout from "@/components/Layout";
import FeaturedProductHero from "@/components/shop/FeaturedProductHero";
import CoreProductsSection from "@/components/shop/CoreProductsSection";
import BeforeAfterSection from "@/components/shared/BeforeAfterSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import { getPublishedProducts } from "@/services/products/api";
import { getR2ImageUrl } from "@/lib/utils";

export default async function ShopPage() {
  let products: import("@/services/products/type").ApiProduct[] = [];
  try {
    const result = await getPublishedProducts();
    products = result.data;
  } catch {
    // fall through with empty list
  }

  const featured = products.find((p) => p.isFeatured);

  const featuredDefaultVariant =
    featured?.variants.find((v) => v.isDefault) ?? featured?.variants[0];

  const featuredHeroProduct = featured
    ? {
        _id: featured._id,
        variantId: featuredDefaultVariant?._id,
        slug: featured.slug,
        brand: "Just Be YOU",
        name: featured.name,
        price: featuredDefaultVariant?.price ?? 0,
        images: [
          getR2ImageUrl(featured.displayImageKey),
          ...featured.relatedImagesKeys.map(getR2ImageUrl),
        ],
        description: featured.description,
        rating: featured.rating || 5,
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
