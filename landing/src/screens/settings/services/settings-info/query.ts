"use client";

import { useQuery } from "@tanstack/react-query";
import { getWebsiteSettingsInfoData } from "@/screens/settings/services/settings-info/api";
import { settingsInfoQueryKeys } from "@/screens/settings/services/settings-info/query-key";

export const useGetWebsiteSettingsInfo = () =>
  useQuery({
    queryKey: settingsInfoQueryKeys.detail,
    queryFn: getWebsiteSettingsInfoData,
  });
