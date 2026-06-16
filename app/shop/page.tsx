"use client";

import { useMemo, useState } from "react";
import Layout from "@/components/Layout";
import FeaturedProductHero from "@/components/shop/FeaturedProductHero";
import CoreProductsSection from "@/components/shop/CoreProductsSection";
import BeforeAfterSection from "@/components/shared/BeforeAfterSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import { Button } from "@/components/ui/button";
import {
  useGetPublishedProducts,
  useGetPublishedProductsPaginated,
} from "@/services/products/query";
import {
  getDefaultProductVariant,
  getProductImages,
  getProductVariants,
} from "@/services/products/utils";

const PRODUCTS_PER_PAGE = 6;

export default function ShopPage() {
  const [page, setPage] = useState(1);

  const { data: allProducts = [] } = useGetPublishedProducts();
  const { data: paginatedResponse } = useGetPublishedProductsPaginated(
    page,
    PRODUCTS_PER_PAGE,
  );

  const pagedProducts = paginatedResponse?.data ?? [];
  const totalPages = paginatedResponse?.meta?.totalPage ?? 1;

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
      </div>
    </Layout>
  );
}
