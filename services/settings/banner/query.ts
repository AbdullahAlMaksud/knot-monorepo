"use client";

import { useQuery } from "@tanstack/react-query";
import { getWebsiteBannerList } from "./api";
import { bannerQueryKeys } from "./querykey";
import { getBannersByRoute } from "./utils";

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
