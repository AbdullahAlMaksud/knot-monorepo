"use client";

import { useQuery } from "@tanstack/react-query";
import { getWebsiteSettingsInfoData } from "./api";
import { settingsInfoQueryKeys } from "./querykey";

export const useGetWebsiteSettingsInfo = () =>
  useQuery({
    queryKey: settingsInfoQueryKeys.detail,
    queryFn: getWebsiteSettingsInfoData,
  });
