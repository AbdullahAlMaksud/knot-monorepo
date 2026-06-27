export const bannerQueryKeys = {
  all: ["settings", "banner"] as const,
  route: (routePath: string) => ["settings", "banner", routePath] as const,
};
