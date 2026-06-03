export type ProductDiscountType = "FLAT" | "PERCENTAGE" | string;

export type ProductVariantDiscount = {
  type?: ProductDiscountType;
  value?: number | string;
  amount?: number | string;
  maxValue?: number | string;
  maxAmount?: number | string;
  maxDiscountValue?: number | string;
  maxDiscountAmount?: number | string;
};

export interface ProductVariant {
  _id: string;
  sku?: string;
  size: string;
  inStock?: boolean;
  quantity?: number;
  price: number;
  isDefault: boolean;
  isDiscounted: boolean;
  discountType?: ProductDiscountType | ProductVariantDiscount;
  discountValue?: number | string;
  discountAmount?: number | string;
  discountMaxValue?: number | string;
  maxDiscountValue?: number | string;
  maxDiscountAmount?: number | string;
  currency?: string;
  discount?: ProductVariantDiscount;
}

export interface ProductSectionItem {
  text: string;
  icon?: string;
}

export interface ProductSection {
  _id: string;
  type: "TEXT" | "BULLETS" | string;
  title: string;
  content?: string;
  imageKey?: string;
  imageAlignment?: "LEFT" | "RIGHT" | string;
  items?: ProductSectionItem[];
}

export interface ApiProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  variants?: ProductVariant[];
  sizeVariants?: ProductVariant[];
  sections?: ProductSection[];
  displayImageKey?: string;
  relatedImagesKeys?: string[];
  rating: number;
  isPublished: boolean;
  isFeatured: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface ProductsListResponse {
  data: ApiProduct[];
  meta: ProductsMeta;
  message: string;
}

export interface ProductDetailResponse {
  data: ApiProduct;
  meta: null;
  message: string;
}
