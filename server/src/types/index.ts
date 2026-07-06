import type { Session } from "../lib/auth.js";

/**
 * Variables attached to the Hono context by middleware, in order:
 * 1. session.middleware.ts -> session, user
 * 2. tracking.middleware.ts -> guestId, ip, geo
 */
export type AppVariables = {
  session: Session["session"] | null;
  user: Session["user"] | null;
  /** Stable anonymous identifier stored in a cookie for non-authenticated players. */
  guestId: string;
  ip: string;
  country: string | null;
};

export type AppEnv = {
  Variables: AppVariables;
};

/** Convenience: either an authenticated user id or a guest id, always present. */
export function actorId(vars: Pick<AppVariables, "user" | "guestId">): string {
  return vars.user?.id ?? vars.guestId;
}
