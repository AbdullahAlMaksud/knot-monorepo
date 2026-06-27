import apiClient from "@/lib/axios";
import type { WebsiteBanner, WebsiteBannersResponse } from "./type";

export const getWebsiteBanners =
  async (): Promise<WebsiteBannersResponse> => {
    const response = await apiClient.get<WebsiteBannersResponse>(
      "/website-managements/banner",
    );

    return response.data;
  };

export const getWebsiteBannerList = async (): Promise<WebsiteBanner[]> => {
  const response = await getWebsiteBanners();
  return response.data ?? [];
};
