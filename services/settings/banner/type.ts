export interface WebsiteBanner {
  _id: string;
  imageKey: string;
  link?: string;
  pageName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WebsiteBannerMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface WebsiteBannersResponse {
  success: boolean;
  message: string;
  code: number;
  meta: WebsiteBannerMeta;
  data: WebsiteBanner[];
}
