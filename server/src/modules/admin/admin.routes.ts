import { Hono } from "hono";
import { z } from "zod";
import { auth } from "../../lib/auth.js";
import { getDB } from "../../lib/db.js";
import { ok, fail } from "../../lib/response.js";
import { requireAuth, requirePermission } from "../../middlewares/rbac.middleware.js";
import { ALL_ROLES } from "../../lib/permissions.js";
import type { AppEnv } from "../../types/index.js";

const adminRoutes = new Hono<AppEnv>();

// Every route below requires a signed-in user; specific permissions are
// layered on top per-route via requirePermission().
adminRoutes.use("/*", requireAuth);

/**
 * Hono's `c.req.param()` widens to `string | undefined` once a route has
 * multiple chained handlers (middleware + handler), even though `:id` is
 * always present at runtime for these routes. This narrows it back down
 * with a real runtime check instead of a blind non-null assertion.
 */
function requireIdParam(c: import("hono").Context<AppEnv>): string | null {
  const id = c.req.param("id");
  if (!id) return null;
  return id;
}

const listUsersQuery = z.object({
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

/** GET /api/admin/users - list/search all users. */
adminRoutes.get("/users", requirePermission({ user: ["list"] }), async (c) => {
  const query = listUsersQuery.parse(c.req.query());

  const result = await auth.api.listUsers({
    headers: c.req.raw.headers,
    query: {
      searchField: "email",
      searchOperator: "contains",
      searchValue: query.search,
      limit: query.limit,
      offset: (query.page - 1) * query.limit,
      sortBy: "createdAt",
      sortDirection: "desc",
    },
  });

  return ok(c, result);
});

const setRoleSchema = z.object({
  role: z.enum(ALL_ROLES),
});

/** POST /api/admin/users/:id/role - promote/demote a user. */
adminRoutes.post("/users/:id/role", requirePermission({ user: ["set-role"] }), async (c) => {
  const userId = requireIdParam(c);
  if (!userId) return fail(c, "Missing user id", 400);

  const { role } = setRoleSchema.parse(await c.req.json());
  const updated = await auth.api.setRole({
    headers: c.req.raw.headers,
    body: { userId, role },
  });
  return ok(c, updated);
});

const banSchema = z.object({
  reason: z.string().max(300).optional(),
  banExpiresIn: z.number().int().positive().optional(), // seconds
});

/** POST /api/admin/users/:id/ban */
adminRoutes.post("/users/:id/ban", requirePermission({ user: ["ban"] }), async (c) => {
  const userId = requireIdParam(c);
  if (!userId) return fail(c, "Missing user id", 400);

  const body = banSchema.parse(await c.req.json().catch(() => ({})));
  const result = await auth.api.banUser({
    headers: c.req.raw.headers,
    body: {
      userId,
      banReason: body.reason,
      banExpiresIn: body.banExpiresIn,
    },
  });
  return ok(c, result);
});

/** POST /api/admin/users/:id/unban */
adminRoutes.post("/users/:id/unban", requirePermission({ user: ["ban"] }), async (c) => {
  const userId = requireIdParam(c);
  if (!userId) return fail(c, "Missing user id", 400);

  const result = await auth.api.unbanUser({
    headers: c.req.raw.headers,
    body: { userId },
  });
  return ok(c, result);
});

/** DELETE /api/admin/users/:id - hard delete. */
adminRoutes.delete("/users/:id", requirePermission({ user: ["delete"] }), async (c) => {
  const userId = requireIdParam(c);
  if (!userId) return fail(c, "Missing user id", 400);

  const currentUser = c.get("user");
  if (currentUser?.id === userId) return fail(c, "You cannot delete your own account", 400);

  const result = await auth.api.removeUser({
    headers: c.req.raw.headers,
    body: { userId },
  });
  return ok(c, result);
});

/** GET /api/admin/overview - headline numbers for the dashboard home page. */
adminRoutes.get("/overview", requirePermission({ tracking: ["read-any"] }), async (c) => {
  const db = getDB();

  const [totalUsers, totalScores, totalSessions, games] = await Promise.all([
    db.collection("user").countDocuments({}),
    db.collection("scores").countDocuments({}),
    db.collection("visitor_sessions").countDocuments({}),
    db.collection("scores").distinct("game"),
  ]);

  return ok(c, { totalUsers, totalScores, totalSessions, totalGames: games.length, games });
});

export default adminRoutes;
