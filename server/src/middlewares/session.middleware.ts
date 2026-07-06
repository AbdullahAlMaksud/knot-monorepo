import type { Context, Next } from "hono";
import { auth } from "../lib/auth.js";
import type { AppEnv } from "../types/index.js";

/**
 * Reads the better-auth session cookie (if any) and attaches
 * `session` / `user` to context. Does NOT reject unauthenticated
 * requests - that's the job of `requireAuth` in rbac.middleware.ts.
 * This lets public/guest-friendly routes still know "who" is asking.
 */
export async function sessionMiddleware(c: Context<AppEnv>, next: Next) {
  const result = await auth.api.getSession({ headers: c.req.raw.headers });

  c.set("session", result?.session ?? null);
  c.set("user", result?.user ?? null);

  await next();
}
