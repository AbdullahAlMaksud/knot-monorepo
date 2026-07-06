import type { Context, Next } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { nanoid } from "nanoid";
import { getClientIp, lookupGeo } from "../lib/geo.js";
import { env } from "../config/env.js";
import type { AppEnv } from "../types/index.js";

const GUEST_COOKIE = "gid";
const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * Guarantees every visitor (logged in or not) has a stable id we can use to
 * attribute scores and analytics to. Cheap and DB-free - actual
 * session/route-visit persistence happens through the /tracking/* endpoints
 * (modules/tracking), called explicitly by the client on load/route-change/unload.
 */
export async function trackingMiddleware(c: Context<AppEnv>, next: Next) {
  let guestId = getCookie(c, GUEST_COOKIE);
  if (!guestId) {
    guestId = `guest_${nanoid(16)}`;
    setCookie(c, GUEST_COOKIE, guestId, {
      httpOnly: true,
      sameSite: "Lax",
      secure: env.NODE_ENV === "production",
      maxAge: ONE_YEAR,
      path: "/",
    });
  }

  const ip = getClientIp(c);
  const geo = lookupGeo(ip);

  c.set("guestId", guestId);
  c.set("ip", ip);
  c.set("country", geo.country);

  await next();
}
