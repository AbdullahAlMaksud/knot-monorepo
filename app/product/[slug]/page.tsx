"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import Layout from "@/components/Layout";
import CoreProductsSection from "@/components/shop/CoreProductsSection";
import ProductSections from "@/components/product/ProductSections";
import ProductDetailHero from "@/components/product/ProductDetailHero";
import {
  useGetProductById,
  useGetPublishedProducts,
} from "@/services/products/query";

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const productId = typeof params.slug === "string" ? params.slug : "";
  const {
    data: apiProduct,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useGetProductById(productId);
  const { data: publishedProducts = [] } = useGetPublishedProducts();
  const coreApiProducts = useMemo(
    () => publishedProducts.filter((product) => product._id !== productId),
    [productId, publishedProducts],
  );

  if (isProductLoading) {
    return (
      <Layout>
        <div className="px-4 py-40 text-center text-gray-600">
          Loading product...
        </div>
      </Layout>
    );
  }

  if (isProductError || !apiProduct) {
    return (
      <Layout>
        <div className="px-4 py-40 text-center">
          <h1 className="text-3xl font-semibold">Product not found</h1>
          <p className="mt-3 text-gray-600">
            The product you are looking for is unavailable.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-32">
        <ProductDetailHero product={apiProduct} />

        <ProductSections product={apiProduct} sections={apiProduct.sections} />
        {coreApiProducts.length > 0 && (
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
