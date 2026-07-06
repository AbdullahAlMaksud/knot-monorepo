import type { Context, Next } from "hono";
import { auth } from "../lib/auth.js";
import { fail } from "../lib/response.js";
import type { AppEnv } from "../types/index.js";
import type { statement } from "../lib/permissions.js";

type Statement = typeof statement;
/** e.g. { score: ["delete-any"] } - typed against the statement defined in lib/permissions.ts */
type PermissionRequest = Partial<{ [K in keyof Statement]: Statement[K][number][] }>;

/** Blocks the request unless there is a signed-in user. Use before requirePermission. */
export async function requireAuth(c: Context<AppEnv>, next: Next) {
  const user = c.get("user");
  if (!user) return fail(c, "Authentication required", 401);
  if ((user as { banned?: boolean }).banned) return fail(c, "This account has been banned", 403);
  await next();
}

/**
 * Checks the signed-in user's role against the permission map from lib/permissions.ts.
 * Always run `requireAuth` first (or use `protectedRoute` below) so `user` is guaranteed.
 */
export function requirePermission(permissions: PermissionRequest) {
  return async (c: Context<AppEnv>, next: Next) => {
    const user = c.get("user");
    if (!user) return fail(c, "Authentication required", 401);

    const result = await auth.api.userHasPermission({
      body: { userId: user.id, permissions: permissions as Record<string, string[]> },
    });

    if (!result.success) {
      return fail(c, "You do not have permission to perform this action", 403);
    }
    await next();
  };
}

/** Convenience combinator: requireAuth + requirePermission in one middleware slot. */
export function protectedRoute(permissions: PermissionRequest) {
  return async (c: Context<AppEnv>, next: Next) => {
    const user = c.get("user");
    if (!user) return fail(c, "Authentication required", 401);
    if ((user as { banned?: boolean }).banned) return fail(c, "This account has been banned", 403);

    const result = await auth.api.userHasPermission({
      body: { userId: user.id, permissions: permissions as Record<string, string[]> },
    });
    if (!result.success) {
      return fail(c, "You do not have permission to perform this action", 403);
    }
    await next();
  };
}
