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
    name: "Vitamin C 10% Face Serum",
    price: "From ৳ 1599",
    rating: 5,
    images: [
      productImages.p1,
      productImages.p2,
      productImages.p3,
      productImages.p4,
    ],
    description:
      "For Brightening & Healthy Glowing Skin. Reduce Dullness, Spots & Loss of Elasticity",
  },
  {
    id: 2,
    name: "Niacinamide 10% Face Serum",
    price: "From ৳ 1299",
    rating: 5,
    images: [
      productImages.p3,
      productImages.p4,
      productImages.p1,
      productImages.p2,
    ],
    description:
      "A balanced daily serum formulated with  Niacinamide (Vitamin B3) and Zinc. Niacinamide improves the barrier & evens our skin tone by reducing the  excess oil of the skin. Zinc helps control excess oil, calm inflammation, and support clearer skin while enhancing the balancing effects of Niacinamide.",
  },
  {
    id: 3,
    name: "Retinol 0.15% Face Serum",
    price: "From ৳ 1599",
    rating: 5,
    images: productImages.p3,
    description:
      "A moderate-strength retinol serum that targets general signs of skin aging. This water-free serum keeps Retinol stable & also nourishes skin.",
  },
  {
    id: 4,
    name: "Salicylic Acid 2% Face Serum",
    price: "From ৳ 1599",
    rating: 5,
    images: productImages.p4,
    description:
      "A gentle face serum that wards off acne, blackheads, whiteheads and keeps your oils in check for that flawless matt skin. Also allow your skin to heal. ",
  },
];

/** Core products (ids 1 & 2) for “Our Core Products” sections. */
export const coreProducts: Product[] = allProducts.filter(
  (p) => p.id === 1 || p.id === 2,
);

/** Best seller (id 3) for shop page. */
export const bestSellers: Product[] = allProducts.filter(
  (p) => p.id === 1 || p.id === 2,
);

/** Second best seller set (id 2) for shop page. */
export const bestSellers2: Product[] = allProducts.filter(
  (p) => p.id === 3 || p.id === 4,
);

/** Info feature shown on product pages. */
export interface InfoFeature {
  title: string;
  description: string;
}

/** Featured hero product: Glow Contour Lifting Peptide Mist. */
export const featuredProductMist: FeaturedProduct = {
  brand: "Just Be YOU",
  name: "Vitamin C 10% Face Serum",
  price: 1599,
  currency: "BDT",
  images: [
    productImages.p1,
    productImages.p2,
    productImages.p3,
    productImages.p4,
  ],
  description:
    "An advances glow-boosting daily serum enriched with Vitamin C & N-acetylglucosamine (NAG) that brightens and tones sun damaged and dull skin with dark spots.",
  rating: 5,
};

/** Featured hero product: Radiance Boost Vitamin C Serum. */
export const featuredProductVitaminC: FeaturedProduct = {
  brand: "Just Be YOU",
  name: "Niacinamide 10% Face Serum",
  price: 1499,
  currency: "BDT",
  images: [
    productImages.p1,
    productImages.p2,
    productImages.p3,
    productImages.p4,
  ],
  description:
    "A balanced daily serum formulated with  Niacinamide (Vitamin B3) and Zinc. Niacinamide improves the barrier & evens our skin tone by reducing the  excess oil of the skin. Zinc helps control excess oil, calm inflammation, and support clearer skin while enhancing the balancing effects of Niacinamide.",
  rating: 5,
};

/** Featured hero product: Retinol 0.15% Face Serum. */
export const featuredProductRetinol: FeaturedProduct = {
  brand: "Just Be YOU",
  name: "Retinol 0.15% Face Serum",
  price: 1599,
  currency: "BDT",
  images: [
    productImages.p3,
    productImages.p4,
    productImages.p1,
    productImages.p2,
  ],
  description:
    "A moderate-strength retinol serum that targets general signs of skin aging. This water-free serum keeps Retinol stable & also nourishes skin.",
  rating: 5,
};

/** Featured hero product: Salicylic Acid 2% Face Serum. */
export const featuredProductSalicylicAcid: FeaturedProduct = {
  brand: "Just Be YOU",
  name: "Salicylic Acid 2% Face Serum",
  price: 1599,
  currency: "BDT",
  images: [
    productImages.p4,
    productImages.p3,
    productImages.p1,
    productImages.p2,
  ],
  description:
    "A gentle face serum that wards off acne, blackheads, whiteheads and keeps your oils in check for that flawless matt skin. Also allow your skin to heal.",
  rating: 5,
};

/** Map product id to its FeaturedProduct hero data. */
export const featuredProducts: Record<number, FeaturedProduct> = {
  1: featuredProductMist,
  2: featuredProductVitaminC,
  3: featuredProductRetinol,
  4: featuredProductSalicylicAcid,
};

/** Get FeaturedProduct by product id. */
export function getFeaturedProductById(
  id: number,
): FeaturedProduct | undefined {
  return featuredProducts[id];
}

/** Map product id to Info features shown on product pages. */
export const productInfoFeatures: Record<number, InfoFeature[]> = {
  1: [
    {
      title: "Dermatologist Certified",
      description: "Safe and effective to use",
    },
    {
      title: "For All Skin Types",
      description: "Gentle formulation suitable for all skin",
    },
    {
      title: "Premium Quality Ingredients",
      description: "Formulated with high quality active ingredients",
    },
    {
      title: "Formulated by Experts",
      description: "Formulation developed by global formulation experts",
    },
    {
      title: "Climate Adapted Performance",
      description: "Compatible in heat and humid weather",
    },
  ],
  2: [
    {
      title: "Dermatologist Certified",
      description: "Safe and effective to use",
    },
    {
      title: "For Oily & Acne-Prone Skin",
      description: "Targeted formulation for oil control",
    },
    {
      title: "Premium Quality Ingredients",
      description: "Formulated with high quality active ingredients",
    },
    {
      title: "Formulated by Experts",
      description: "Formulation developed by global formulation experts",
    },
    {
      title: "Climate Adapted Performance",
      description: "Compatible in heat and humid weather",
    },
  ],
};

/** Get Info features by product id. */
export function getProductInfoFeaturesById(
  id: number,
): InfoFeature[] | undefined {
  return productInfoFeatures[id];
}

/** Detail data for product pages (WhyChooseSection). */
export interface ProductDetailIdealFor {
  label: string;
  value: string;
}

export interface ProductDetailIngredient {
  name: string;
  benefit: string;
}

export interface ProductDetailHowToStep {
  title: string;
  description: string;
}

export interface ProductDetail {
  whyChoose: {
    description: string;
    idealFor: ProductDetailIdealFor[];
    benefits: string[];
  };
  howToUse: {
    description: string;
    steps: ProductDetailHowToStep[];
  };
  ingredients: {
    description: string;
    items: ProductDetailIngredient[];
  };
}

export const productDetails: Record<number, ProductDetail> = {
  1: {
    whyChoose: {
      description:
        "Choose B'You Vitamin C 10% Serum for effective brightening and spot reduction, backed by science and dermatologist certified. Specially formulated for Bangladeshi skin and climate \u2014 so your skin gets results without compromise.",
      idealFor: [
        { label: "Skin type", value: "All skin types" },
        {
          label: "Concerns",
          value:
            "Increase Brightening, Reduce Dullness, Spots & Loss of Elasticity",
        },
        { label: "Suitable for", value: "16+ years of age" },
        { label: "Pregnancy/Lactation", value: "Safe" },
      ],
      benefits: [
        "Brightens skin and boosts natural glow",
        "Helps reduce dark spots, dullness and uneven tone",
        "Targets sun damage and improves overall skin clarity",
        "Boosts collagen synthesis to support firmer, smoother-looking skin and reduce wrinkles",
        "Soothes skin with Centella extract",
        "Dermatologist Certified and suitable for Bangladeshi climate",
      ],
    },
    howToUse: {
      description:
        "Cleanse your face, apply a few drops of serum, and gently pat until absorbed. Follow with moisturizer twice daily for a healthy, glowing complexion.",
      steps: [
        {
          title: "Cleanse",
          description: "Wash your face thoroughly to remove dirt and oil.",
        },
        {
          title: "Apply Drops",
          description: "Take 2-3 drops of serum on your fingertips.",
        },
        {
          title: "Spread Evenly",
          description: "Smooth it gently over your face and neck.",
        },
        {
          title: "Pat & Absorb",
          description: "Pat lightly so the serum absorbs into your skin.",
        },
        {
          title: "Follow Routine",
          description: "Use before moisturizer, AM & PM. Everyday",
        },
      ],
    },
    ingredients: {
      description:
        "Our serum is formulated with carefully selected, potent ingredients that work in harmony to deliver visible results. Each component is chosen for its proven efficacy and gentle nature on all skin types.",
      items: [
        {
          name: "Hero Ingredient: Vitamin C (3-O- Ethyl Ascorbic Acid)",
          benefit:
            "Proven antioxidant that visibly brightens dull skin and fades dark spots",
        },
        {
          name: "N-Acetyl Glucosamine",
          benefit:
            "Not only lightens skin tone, it also promotes synthesis of Hyaluronic Acid to improve skin hydration",
        },
        {
          name: "Gluconolactone (PHA)",
          benefit:
            "They not just exfoliate gently but also functions as humectants. Also provide protection against UV radiations",
        },
      ],
    },
  },
  2: {
    whyChoose: {
      description:
        "Choose B'You Niacinamide 10% Serum to control excess sebum, minimize pores, and improve overall skin balance. Dermatologist certified and formulated for Bangladeshi skin and climate for effective daily care.",
      idealFor: [
        {
          label: "Concerns",
          value: "Acne Marks, Acne Prone & Oily Skin",
        },
        { label: "Suitable for", value: "16+ years of age" },
        { label: "Pregnancy/Lactation", value: "Safe" },
      ],
      benefits: [
        "Helps regulate sebum production to control excess oil and reduce acne",
        "Enhances radiance and helps even out skin tone by reducing blemishes",
        "Minimizes the appearance of pores while reducing excess shine for smoother-looking skin",
        "Helps calm irritated skin and supports barrier repair",
        "Improves uneven tone and skin texture",
        "Dermatologist certified and suitable for Bangladeshi climate",
      ],
    },
    howToUse: {
      description:
        "Cleanse your face, apply a few drops of serum, and gently pat until absorbed. Follow with a moisturizer and use twice daily for clear, balanced skin.",
      steps: [
        {
          title: "Cleanse",
          description: "Wash your face thoroughly to remove dirt and oil.",
        },
        {
          title: "Apply Drops",
          description: "Take 2-3 drops of serum on your fingertips.",
        },
        {
          title: "Spread Evenly",
          description: "Smooth it gently over your face and neck.",
        },
        {
          title: "Pat & Absorb",
          description: "Pat lightly so the serum absorbs into your skin.",
        },
        {
          title: "Follow Routine",
          description: "Use before moisturizer, AM & PM. Everyday",
        },
      ],
    },
    ingredients: {
      description:
        "Our serum is formulated with carefully selected, effective ingredients that work together to control oil, refine pores, and strengthen the skin barrier. Each component is chosen for its proven results while remaining gentle and suitable for all skin types.",
      items: [
        {
          name: "Hero Ingredient: Niacinamide",
          benefit:
            "A form of vitamin B3, Niacinamide is a superstar ingredient that repairs skin, reduces occurrence of acne, and fades blemishes. This formula uses Niacinamide in a high concentration of 10%",
        },
        {
          name: "Zinc",
          benefit:
            "It regulates sebum production and has anti-bacterial properties as well, making it highly suitable for oily / acne-prone skin",
        },
        {
          name: "N-Acetyl Glucosamine",
          benefit:
            "Not only lightens skin tone, it also promotes synthesis of Hyaluronic Acid to improve skin hydration",
        },
      ],
    },
  },

  3: {
    whyChoose: {
      description:
        "Choose B’You Retinol 0.15% Serum to visibly reduce fine lines and wrinkles , improve skin texture while supporting skin barrier repair. Dermatologist certified and formulated for Bangladeshi skin and climate for effective nighttime care.",
      idealFor: [
        {
          label: "Skin type",
          value: "Dry/Normal, Sensitive, Oily, Combination, Acne-Prone",
        },
        {
          label: "Concerns",
          value: "Fine Lines, Wrinkles & Loss of Elasticity",
        },
        { label: "Suitable for", value: "18+ years of age" },
      ],
      benefits: [
        "Reduces the appearance of fine lines and wrinkles for smoother-looking skin",
        "Improves skin texture and promotes a more even skin tone",
        "Supports collagen production for firmer, youthful-looking skin",
        "Enhances skin renewal for a brighter and more refined complexion",
        "Helps strengthen the skin barrier with continued use",
        "Dermatologist certified and suitable for Bangladeshi climate",
      ],
    },
    howToUse: {
      description:
        "Cleanse your face, apply a few drops after your water-based serums. Follow with moisturizer and use of sunscreen is highly recommended while using this serum",
      steps: [
        {
          title: "Cleanse",
          description: "Wash your face thoroughly to remove dirt and oil.",
        },
        {
          title: "Apply Drops",
          description: "Take 2-3 drops of serum on your fingertips.",
        },
        {
          title: "Spread Evenly",
          description: "Smooth it gently over your face and neck.",
        },
        {
          title: "Pat & Absorb",
          description: "Pat lightly so the serum absorbs into your skin.",
        },
        {
          title: "Follow Routine",
          description:
            "Use before moisturizer, PM. Start with every alternate day and after 2 weeks of usage, use it everyday.",
        },
      ],
    },
    ingredients: {
      description:
        "Our serum is formulated with a high-performance blend designed to support skin renewal, improve visible signs of aging, and refine overall skin texture. Each ingredient is selected to enhance cell regeneration while maintaining barrier comfort and balance.",
      items: [
        {
          name: "Hero Ingredient: Retinol",
          benefit:
            "A potent Vitamin A derivative that promotes faster skin cell turnover and supports natural repair processes. It helps smooth fine lines, improve uneven texture, and reduce visible signs of photoaging for healthier-looking skin.",
        },
        {
          name: "Bakuchiol Oil",
          benefit:
            "A plant-derived active known for supporting similar skin-renewal pathways as retinol. It helps improve firmness and smoothness while contributing to better skin tolerance and reduced irritation.",
        },
        {
          name: "Ceramide Complex",
          benefit:
            "A skin-identical lipid blend that strengthens the skin barrier, improves hydration retention, and helps protect against dryness that may occur with active treatments.",
        },
        {
          name: "Vitamin E",
          benefit:
            "A powerful antioxidant that helps protect the skin from environmental damage while supporting skin repair. It works synergistically with retinol to enhance skin barrier function, improve hydration, and reduce potential irritation, leaving the skin smoother and more resilient.",
        },
      ],
    },
  },
  4: {
    whyChoose: {
      description:
        "Choose B'You Salicylic Acid 2% Serum as solution for acne-prone skin to control excess oil and reduce blackheads & whiteheads. Dermatologist certified and specially formulated for Bangladeshi skin and climate to deliver clear, balanced results every day.",
      idealFor: [
        { label: "Skin type", value: "Combination / Oily Skin" },
        {
          label: "Concerns",
          value: "Acne Prone, Oily Skin, Blackheads & Whiteheads",
        },
        { label: "Suitable for", value: "18+ years of age" },
      ],
      benefits: [
        "Helps unclog pores to reduce acne and prevent future breakouts",
        "Controls excess oil and reduces shine for a balanced look",
        "Minimizes blackheads and whiteheads for clearer skin",
        "Gently exfoliates to improve skin texture and smoothness",
        "Helps calm acne-related redness and irritation",
        "Dermatologist certified and suitable for Bangladeshi climate",
      ],
    },
    howToUse: {
      description:
        "Cleanse your face, apply a few drops of serum, and gently pat until absorbed. Follow with a moisturizer for clear, balanced skin.",
      steps: [
        {
          title: "Cleanse",
          description: "Wash your face thoroughly to remove dirt and oil.",
        },
        {
          title: "Apply Drops",
          description: "Take 2-3 drops of serum on your fingertips.",
        },
        {
          title: "Spread Evenly",
          description: "Smooth it gently over your face and neck.",
        },
        {
          title: "Pat & Absorb",
          description: "Pat lightly so the serum absorbs into your skin.",
        },
        {
          title: "Follow Routine",
          description:
            "Use before moisturizer, PM. Start with every alternate day and after 2 weeks of usage, use it everyday.",
        },
      ],
    },
    ingredients: {
      description:
        "Our serum is formulated to deeply cleanse pores, reduce excess oil, and target acne-related concerns. It works by exfoliating inside the pores while supporting a clearer and more balanced complexion.",
      items: [
        {
          name: "Hero Ingredient: Salicylic Acid",
          benefit:
            "A beta hydroxy acid (BHA) that penetrates deep into pores to dissolve excess sebum and dead skin buildup. It helps reduce blackheads, whiteheads, and congestion while improving overall skin clarity and smoothness.",
        },
        {
          name: "Oligopeptide-10",
          benefit:
            "A bioactive peptide that helps support the skin's defense against acne-causing bacteria, working in synergy with exfoliating actives for clearer skin.",
        },
        {
          name: "Zinc PCA",
          benefit:
            "Helps regulate excess sebum production and supports antibacterial action, reducing shine and minimizing acne formation while maintaining skin balance.",
        },
        {
          name: "EGCG (Green Tea Extract)",
          benefit:
            "A powerful antioxidant that helps reduce redness and inflammation while soothing stressed, acne-prone skin.",
        },
      ],
    },
  },
};

/** Get detail data for a product by id. */
export function getProductDetailById(id: number): ProductDetail | undefined {
  return productDetails[id];
}

/** Get a product by id. */
export function getProductById(id: number): Product | undefined {
  return allProducts.find((p) => p.id === id);
}
