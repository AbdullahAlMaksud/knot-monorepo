"use client";

import { useMemo, useState } from "react";
import Layout from "@/components/common/layout";
import FeaturedProductHero from "@/screens/shop/components/featured-product-hero";
import CoreProductsSection from "@/screens/shop/components/core-products-section";
import BeforeAfterSection from "@/components/shared/before-after-section";
import TestimonialsSection from "@/components/shared/testimonials-section";
import { Button } from "@/components/ui/button";
import {
  useGetPublishedProducts,
  useGetPublishedProductsPaginated,
} from "@/screens/product/services/query";
import {
  getDefaultProductVariant,
  getProductImages,
  getProductVariants,
} from "@/screens/product/services/utils";
import Skeleton from "@/components/ui/skeleton";
import ErrorState from "@/components/ui/error";

const PRODUCTS_PER_PAGE = 10;

const ShopPage = () => {
  const [page, setPage] = useState(1);

  const {
    data: allProducts = [],
    isLoading: isAllLoading,
    isError: isAllError,
    refetch: refetchAll,
  } = useGetPublishedProducts();

  const {
    data: paginatedResponse,
    isLoading: isPaginatedLoading,
    isError: isPaginatedError,
    refetch: refetchPaginated,
  } = useGetPublishedProductsPaginated(page, PRODUCTS_PER_PAGE);

  const pagedProducts = paginatedResponse?.data ?? [];
  const totalPages = paginatedResponse?.meta?.totalPage ?? 1;

  const isLoading = isAllLoading || isPaginatedLoading;
  const isError = isAllError || isPaginatedError;

  const handleRetry = () => {
    refetchAll();
    refetchPaginated();
  };

  const featuredHeroProduct = useMemo(() => {
    const featured = allProducts.find((p) => p.isFeatured);
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
  }, [allProducts]);

  return (
    <Layout>
      <div className="pt-32">
        {isLoading ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="mb-12">
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-10 w-64" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex flex-col items-center border rounded-2xl border-gray-200 p-6 space-y-4"
                >
                  <Skeleton className="w-full h-[400px] sm:h-[500px] rounded-lg" />
                  <Skeleton className="h-6 w-3/4 animate-pulse" />
                  <Skeleton className="h-4 w-1/2 animate-pulse" />
                  <Skeleton className="h-6 w-24 animate-pulse" />
                  <Skeleton className="h-10 w-full rounded-full animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        ) : isError ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <ErrorState
              message="Failed to load products. Please check your connection and try again."
              onRetry={handleRetry}
            />
          </div>
        ) : (
          <>
            {pagedProducts.length > 0 && (
              <>
                <CoreProductsSection
                  subtitle="MADE JUST FOR YOU"
                  title="Our Core Products"
                  products={pagedProducts}
                />
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 pb-12">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNum) => (
                        <Button
                          key={pageNum}
                          type="button"
                          variant={pageNum === page ? "default" : "outline"}
                          size="sm"
                          className="rounded-full w-9 h-9 p-0"
                          onClick={() => setPage(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      ),
                    )}
                    {page < totalPages && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="rounded-full px-4"
                        onClick={() => setPage((p) => p + 1)}
                      >
                        Next
                      </Button>
                    )}
                  </div>
                )}
              </>
            )}
            {featuredHeroProduct && (
              <FeaturedProductHero product={featuredHeroProduct} />
            )}
            <BeforeAfterSection />
            <TestimonialsSection />
          </>
        )}
      </div>
    </Layout>
  );
};
export default ShopPage;
