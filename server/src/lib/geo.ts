import geoip from "geoip-lite";
import type { Context } from "hono";

/**
 * Best-effort client IP extraction. Trusts common reverse-proxy headers
 * (set X-Forwarded-For at your load balancer/Nginx/Cloudflare) and falls
 * back to the raw socket address.
 */
export function getClientIp(c: Context): string {
  const headers = c.req.raw.headers;
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    // X-Forwarded-For can be a comma separated list; first entry is the client.
    return forwarded.split(",")[0].trim();
  }
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const cfIp = headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  const info = c.env?.incoming?.socket?.remoteAddress;
  return info || "0.0.0.0";
}

export interface GeoInfo {
  country: string | null;
  region: string | null;
  city: string | null;
  timezone: string | null;
}

/** Local, offline lookup - no third-party API calls, no rate limits. */
export function lookupGeo(ip: string): GeoInfo {
  if (!ip || ip === "0.0.0.0" || ip === "::1" || ip === "127.0.0.1") {
    return { country: null, region: null, city: null, timezone: null };
  }
  const result = geoip.lookup(ip);
  if (!result) return { country: null, region: null, city: null, timezone: null };
  return {
    country: result.country ?? null,
    region: result.region ?? null,
    city: result.city ?? null,
    timezone: result.timezone ?? null,
  };
}
