import { getR2ImageUrl } from "@/lib/utils";
import type { WebsiteBanner } from "./type";

const VIDEO_EXTENSIONS = ["mp4", "webm", "ogg", "mov", "m4v"];
const PAGE_NAME_ALIASES: Record<string, string[]> = {
  home: ["home"],
  about: ["about"],
  blog: ["blog", "blogs"],
  concern: ["concern", "concerns"],
  contact: ["contact", "contactus"],
  lab: ["lab", "labs"],
  shop: ["shop"],
};

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

const normalizeValue = (value?: string): string | undefined => {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;

  return trimmed.toLowerCase().replace(/[^a-z0-9]+/g, "");
};

export const getBannerPageNameFromPath = (routePath: string): string => {
  const normalizedPath = normalizeRoutePath(routePath) ?? "/";

  if (normalizedPath === "/") return "home";

  const [firstSegment] = normalizedPath.slice(1).split("/");
  return normalizeValue(firstSegment) ?? "home";
};

export const bannerMatchesRoute = (
  banner: WebsiteBanner,
  routePath: string,
): boolean => {
  const currentPageName = getBannerPageNameFromPath(routePath);
  const bannerPageName = normalizeValue(banner.pageName);
  const candidatePageNames = PAGE_NAME_ALIASES[currentPageName] ?? [
    currentPageName,
  ];

  return Boolean(bannerPageName && candidatePageNames.includes(bannerPageName));
};

export const getBannersByRoute = (
  banners: WebsiteBanner[],
  routePath: string,
): WebsiteBanner[] => {
  return banners
    .filter((banner) => bannerMatchesRoute(banner, routePath))
    .sort((left, right) => {
      const leftOrder = left.order ?? Number.MAX_SAFE_INTEGER;
      const rightOrder = right.order ?? Number.MAX_SAFE_INTEGER;

      if (leftOrder !== rightOrder) return leftOrder - rightOrder;

      return left.createdAt.localeCompare(right.createdAt);
    });
};

const resolveBannerMediaKey = (banner: WebsiteBanner): string | undefined =>
  banner.mediaKey ?? banner.imageKey;

export const getBannerMediaUrl = (
  banner: WebsiteBanner,
): string | undefined => {
  const mediaKey = resolveBannerMediaKey(banner);
  if (!mediaKey) return undefined;

  return /^https?:\/\//i.test(mediaKey) ? mediaKey : getR2ImageUrl(mediaKey);
};

export const getBannerMediaType = (
  banner: WebsiteBanner,
): "image" | "video" => {
  const mediaKey = resolveBannerMediaKey(banner) ?? "";
  const extension = mediaKey.split(/[?#]/)[0].split(".").pop()?.toLowerCase();

  return extension && VIDEO_EXTENSIONS.includes(extension) ? "video" : "image";
};

export const getBannerMediaItem = (banner: WebsiteBanner) => {
  const src = getBannerMediaUrl(banner);
  if (!src) return undefined;

  return {
    type: getBannerMediaType(banner),
    src,
    alt: banner.title || banner.pageName || "Banner media",
  } as const;
};

export const getBannerMediaItems = (banners: WebsiteBanner[]) =>
  banners
    .map(getBannerMediaItem)
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
