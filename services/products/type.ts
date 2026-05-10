export interface ProductVariant {
  _id: string;
  size: string;
  inStock: boolean;
  price: number;
  isDefault: boolean;
  isDiscounted: boolean;
}

export interface ApiProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  variants: ProductVariant[];
  displayImageKey: string;
  relatedImagesKeys: string[];
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
