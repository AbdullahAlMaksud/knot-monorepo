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
import Info from "@/components/home/Info";
import ErrorState from "@/components/ui/error";
import Skeleton from "@/components/ui/skeleton";

function ProductDetailSkeleton() {
  return (
    <Layout>
      <div className="pt-32">
        <section className="bg-white pt-10 pb-12">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[1.08fr_1fr] lg:px-8">
            <div className="grid grid-cols-[72px_1fr] gap-3 sm:grid-cols-[88px_1fr]">
              <div className="flex flex-col gap-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-20 w-full sm:h-24" />
                ))}
              </div>
              <Skeleton className="min-h-90 rounded-sm sm:min-h-117.5" />
            </div>
            <div className="flex flex-col justify-center space-y-5 lg:pl-4">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-11 w-3/4" />
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-20 w-full max-w-md" />
              <Skeleton className="h-12 w-56 rounded-full" />
              <Skeleton className="h-12 w-full max-w-sm rounded-full" />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

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
    return <ProductDetailSkeleton />;
  }

  if (isProductError || !apiProduct) {
    return (
      <Layout>
        <ErrorState message="The product you are looking for is unavailable." />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-32">
        <ProductDetailHero product={apiProduct} />
        <Info />
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
