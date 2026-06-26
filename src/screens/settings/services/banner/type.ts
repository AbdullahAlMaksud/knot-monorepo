export interface WebsiteBanner {
  _id: string;
  title?: string;
  description?: string;
  buttonText?: string;
  link?: string;
  pageName?: string;
  order?: number;
  mediaKey?: string;
  imageKey?: string;
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
