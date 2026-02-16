/**
 * Central product data and types for the site.
 * Used by CoreProductsSection, FeaturedProductHero, and cart/order flows.
 */

export interface Product {
  id: number;
  name: string;
  price: string;
  rating: number;
  images: string | string[];
  description?: string;
}

export interface FeaturedProduct {
  brand?: string;
  name: string;
  price: number;
  currency?: string;
  images: string[];
  description?: string;
  rating?: number;
}

const productImages = {
  p1: "/images/products/product1.jpg",
  p2: "/images/products/product2.jpg",
  p3: "/images/products/product3.jpg",
  p4: "/images/products/product4.jpg",
} as const;

/** All products for grid/card sections (CoreProductsSection). */
export const allProducts: Product[] = [
  {
    id: 1,
    name: "Glow Getter Brightening & Hydrating Serum",
    price: "From ₩925 DCU FR",
    rating: 5,
    images: [productImages.p1, productImages.p2, productImages.p3, productImages.p4],
    description:
      "A powerful serum that brightens your complexion while providing deep hydration for a radiant, glowing skin.",
  },
  {
    id: 2,
    name: "Glow Getter Brightening & Hydrating Serum",
    price: "From ₩925 DCU FR",
    rating: 5,
    images: productImages.p2,
    description:
      "Transform your skin with this lightweight serum that delivers visible brightness and lasting moisture.",
  },
  {
    id: 3,
    name: "Radiance Boost Vitamin C Serum",
    price: "From ₩850 DCU FR",
    rating: 5,
    images: productImages.p1,
    description:
      "Unlock your skin's natural radiance with this potent Vitamin C serum that fights dullness and evens skin tone.",
  },
];

/** Core products (ids 1 & 2) for “Our Core Products” sections. */
export const coreProducts: Product[] = allProducts.filter((p) => p.id === 1 || p.id === 2);

/** Best seller (id 3) for shop page. */
export const bestSellers: Product[] = allProducts.filter((p) => p.id === 3);

/** Second best seller set (id 2) for shop page. */
export const bestSellers2: Product[] = allProducts.filter((p) => p.id === 2);

/** Featured hero product: Glow Contour Lifting Peptide Mist. */
export const featuredProductMist: FeaturedProduct = {
  brand: "BYOU BEAUTY",
  name: "Glow Contour Lifting Peptide Mist",
  price: 63.0,
  currency: "MYR",
  images: [productImages.p1, productImages.p2, productImages.p3, productImages.p4],
  description:
    "A revolutionary peptide mist that lifts, contours, and enhances your natural glow with advanced skincare technology. Perfect for daily use to achieve a radiant, youthful complexion.",
  rating: 5,
};

/** Featured hero product: Radiance Boost Vitamin C Serum. */
export const featuredProductVitaminC: FeaturedProduct = {
  brand: "BYOU BEAUTY",
  name: "Radiance Boost Vitamin C Serum",
  price: 58.0,
  currency: "MYR",
  images: [productImages.p1, productImages.p2, productImages.p3, productImages.p4],
  description:
    "Unlock your skin's natural radiance with this potent Vitamin C serum. Fights dullness, evens skin tone, and provides antioxidant protection for a brighter, more even complexion.",
  rating: 5,
};

/** Get a product by id. */
export function getProductById(id: number): Product | undefined {
  return allProducts.find((p) => p.id === id);
}
