import { getR2ImageUrl } from "@/lib/utils";
import type { WebsiteBanner } from "./type";

const normalizeRoutePath = (value?: string): string | undefined => {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;

  let pathname = trimmed;
  if (/^https?:\/\//i.test(trimmed)) {
    try {
      pathname = new URL(trimmed).pathname;
    } catch {
      return undefined;
    }
  } else if (!trimmed.startsWith("/")) {
    return undefined;
  }

  pathname = pathname.split(/[?#]/)[0];
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;

  return path.replace(/\/+$/, "").toLowerCase() || "/";
};

export const bannerMatchesRoute = (
  banner: WebsiteBanner,
  routePath: string,
): boolean => {
  const currentRoute = normalizeRoutePath(routePath) ?? "/";
  const bannerRoute = normalizeRoutePath(banner.link);

  return bannerRoute === currentRoute;
};

export const getBannersByRoute = (
  banners: WebsiteBanner[],
  routePath: string,
): WebsiteBanner[] => {
  return banners.filter((banner) => bannerMatchesRoute(banner, routePath));
};

export const getBannerImageUrl = (imageKey: string): string =>
  getR2ImageUrl(imageKey);

export const getBannerMediaItem = (banner: WebsiteBanner) => ({
  type: "image" as const,
  src: getBannerImageUrl(banner.imageKey),
  alt: banner.pageName,
});

export const getBannerMediaItems = (banners: WebsiteBanner[]) =>
  banners
    .filter((banner) => Boolean(banner.imageKey))
    .map(getBannerMediaItem);
