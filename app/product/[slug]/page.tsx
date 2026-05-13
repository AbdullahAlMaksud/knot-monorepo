import Layout from "@/components/Layout";
import FeaturedProductHero from "@/components/shop/FeaturedProductHero";
import WhyChooseSection from "@/components/product/WhyChooseSection";
import BeforeAfterSection from "@/components/shared/BeforeAfterSection";
import FromUsToYouSection from "@/components/product/FromUsToYouSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import Info from "@/components/home/Info";
import CoreProductsSection from "@/components/shop/CoreProductsSection";
import {
  getProductDetailBySlug,
  getProductInfoFeaturesBySlug,
} from "@/data/products";
import { getPublishedProducts } from "@/services/products/api";
import { getR2ImageUrl } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const detail = getProductDetailBySlug(slug);
  const infoFeatures = getProductInfoFeaturesBySlug(slug);

  if (!detail) {
    notFound();
  }

  let apiProduct = undefined;
  try {
    const result = await getPublishedProducts();
    apiProduct = result.data.find((p) => p.slug === slug);
  } catch {
    // fall through — show page with static fallback
  }

  const defaultVariant =
    apiProduct?.variants.find((v) => v.isDefault) ?? apiProduct?.variants[0];

  const heroProduct = apiProduct
    ? {
        brand: "Just Be YOU",
        name: apiProduct.name,
        price: defaultVariant?.price ?? 0,
        images: [
          getR2ImageUrl(apiProduct.displayImageKey),
          ...apiProduct.relatedImagesKeys.map(getR2ImageUrl),
        ],
        description: apiProduct.description,
        rating: apiProduct.rating || 5,
        slug: apiProduct.slug,
        _id: apiProduct._id,
        variantId: defaultVariant?._id,
      }
    : undefined;

  // Pass all published products (excluding current) to the "Core Products" section
  let coreApiProducts = undefined;
  try {
    if (!apiProduct) {
      const result = await getPublishedProducts();
      coreApiProducts = result.data;
    } else {
      const result = await getPublishedProducts();
      coreApiProducts = result.data.filter((p) => p.slug !== slug);
    }
  } catch {
    // fall through
  }

  return (
    <Layout>
      <div className="pt-32">
        <FeaturedProductHero variant="light" product={heroProduct} />
        <Info features={infoFeatures} />
        <WhyChooseSection detail={detail} />
        <BeforeAfterSection />
        <FromUsToYouSection />
        {coreApiProducts && coreApiProducts.length > 0 && (
          <CoreProductsSection
            subtitle="MADE JUST FOR YOU"
            title="Our Core Products"
            products={coreApiProducts}
          />
        )}
        <TestimonialsSection />
      </div>
    </Layout>
  );
}
