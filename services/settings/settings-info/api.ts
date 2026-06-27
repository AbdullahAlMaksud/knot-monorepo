import apiClient from "@/lib/axios";
import type {
  WebsiteSettingsInfo,
  WebsiteSettingsInfoResponse,
} from "./type";

export const getWebsiteSettingsInfo =
  async (): Promise<WebsiteSettingsInfoResponse> => {
    const response = await apiClient.get<WebsiteSettingsInfoResponse>(
      "/website-managements/settings",
    );

    return response.data;
  };

export const getWebsiteSettingsInfoData =
  async (): Promise<WebsiteSettingsInfo> => {
    const response = await getWebsiteSettingsInfo();
    return response.data;
  };
