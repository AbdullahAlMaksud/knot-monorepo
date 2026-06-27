"use client";

import { useQuery } from "@tanstack/react-query";
import { getWebsiteBannerList } from "@/screens/settings/services/banner/api";
import { bannerQueryKeys } from "@/screens/settings/services/banner/query-key";
import { getBannersByRoute } from "@/screens/settings/services/banner/utils";

export const useGetWebsiteBanners = () =>
  useQuery({
    queryKey: bannerQueryKeys.all,
    queryFn: getWebsiteBannerList,
  });

export const useGetWebsiteBannersByRoute = (routePath: string) =>
  useQuery({
    queryKey: bannerQueryKeys.route(routePath),
    queryFn: getWebsiteBannerList,
    enabled: Boolean(routePath),
    select: (banners) => getBannersByRoute(banners, routePath),
  });
