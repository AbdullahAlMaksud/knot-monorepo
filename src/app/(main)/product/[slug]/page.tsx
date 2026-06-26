import type { Metadata } from "next";
import ProductDetailPage from "@/screens/product/product-detail-page";
import { getProductById } from "@/screens/product/services/api";
import { getR2ImageUrl } from "@/lib/utils";
import { getDefaultProductVariant, getVariantPricing } from "@/screens/product/services/utils";

const SITE_URL = process.env.NEXT_PUBLIC_FRONTEND_URL ?? "https://landing-byou.vercel.app";
const SITE_NAME = "BYOU";
const FALLBACK_IMAGE = `${SITE_URL}/og-default.jpg`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const product = await getProductById(slug);

    const ogImage = product.displayImageKey
      ? getR2ImageUrl(product.displayImageKey)
      : product.relatedImagesKeys?.[0]
        ? getR2ImageUrl(product.relatedImagesKeys[0])
        : FALLBACK_IMAGE;

    const defaultVariant = getDefaultProductVariant(product);
    const pricing = defaultVariant ? getVariantPricing(defaultVariant) : null;

    const description = product.description
      ? product.description.length > 160
        ? `${product.description.slice(0, 157)}...`
        : product.description
      : `Shop ${product.name} — premium skincare by BYOU.`;

    const url = `${SITE_URL}/product/${slug}`;

    const other: Record<string, string> = {};
    if (pricing) {
      other["product:price:amount"] = String(pricing.discountedPrice);
      other["product:price:currency"] = pricing.currency ?? "BDT";
    }

    return {
      title: product.name,
      description,
      alternates: { canonical: url },
      openGraph: {
        type: "website",
        url,
        siteName: SITE_NAME,
        title: product.name,
        description,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: product.name,
          },
          ...(product.relatedImagesKeys?.slice(0, 3).map((key: string) => ({
            url: getR2ImageUrl(key),
            width: 1200,
            height: 630,
            alt: product.name,
          })) ?? []),
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: product.name,
        description,
        images: [ogImage],
      },
      other,
    };
  } catch {
    return {
      title: `Product | ${SITE_NAME}`,
      description: "Discover premium skincare products by BYOU.",
    };
  }
}

const Page = () => {
  return <ProductDetailPage />;
};

export default Page;
