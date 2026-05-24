import Layout from "@/components/Layout";
import CoreProductsSection from "@/components/shop/CoreProductsSection";
import ProductSections from "@/components/product/ProductSections";
import ProductDetailHero from "@/components/product/ProductDetailHero";
import { getProductById, getPublishedProducts } from "@/services/products/api";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: productId } = await params;

  let apiProduct = undefined;
  try {
    apiProduct = await getProductById(productId);
  } catch {
    notFound();
  }

  if (!apiProduct) {
    notFound();
  }

  // Pass all published products (excluding current) to the "Core Products" section
  let coreApiProducts = undefined;
  try {
    const result = await getPublishedProducts();
    coreApiProducts = result.data.filter((p) => p._id !== productId);
  } catch {
    // fall through
  }

  return (
    <Layout>
      <div className="pt-32">
        <ProductDetailHero product={apiProduct} />
        <ProductSections product={apiProduct} sections={apiProduct.sections} />
        {coreApiProducts && coreApiProducts.length > 0 && (
          <CoreProductsSection
            subtitle="MADE JUST FOR YOU"
            title="Our Core Products"
            products={coreApiProducts}
          />
        )}
      </div>
    </Layout>
  );
}
