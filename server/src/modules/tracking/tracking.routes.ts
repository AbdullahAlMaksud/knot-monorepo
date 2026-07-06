import { Hono } from "hono";
import { z } from "zod";
import { ok } from "../../lib/response.js";
import { requirePermission, requireAuth } from "../../middlewares/rbac.middleware.js";
import { heartbeatSchema, routeVisitSchema } from "./tracking.types.js";
import * as trackingService from "./tracking.service.js";
import type { AppEnv } from "../../types/index.js";

const trackingRoutes = new Hono<AppEnv>();

/**
 * POST /api/tracking/heartbeat
 * Fire-and-forget beacon the client calls periodically (e.g. every 15s while
 * the tab is in the foreground) so we can track active time + current route
 * for every visitor, logged in or not.
 */
trackingRoutes.post("/heartbeat", async (c) => {
  const body = heartbeatSchema.parse(await c.req.json());
  const user = c.get("user");

  await trackingService.recordHeartbeat({
    sessionId: c.get("guestId"),
    userId: user?.id ?? null,
    ip: c.get("ip"),
    country: c.get("country"),
    userAgent: c.req.header("user-agent") ?? null,
    route: body.route,
    activeSeconds: body.activeSeconds,
  });

  return ok(c, { recorded: true });
});

/**
 * POST /api/tracking/route
 * Called on route change (or beforeunload) with how long the visitor spent
 * on the route they're leaving.
 */
trackingRoutes.post("/route", async (c) => {
  const body = routeVisitSchema.parse(await c.req.json());
  const user = c.get("user");

  await trackingService.recordRouteVisit({
    sessionId: c.get("guestId"),
    userId: user?.id ?? null,
    route: body.route,
    durationSeconds: body.durationSeconds,
  });

  return ok(c, { recorded: true });
});

const listQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

/** GET /api/tracking/sessions - dashboard only. */
trackingRoutes.get(
  "/sessions",
  requireAuth,
  requirePermission({ tracking: ["read-any"] }),
  async (c) => {
    const query = listQuerySchema.parse(c.req.query());
    const result = await trackingService.listSessions(query);
    return ok(c, result);
  },
);

/** GET /api/tracking/stats - aggregate numbers for the dashboard overview page. */
trackingRoutes.get(
  "/stats",
  requireAuth,
  requirePermission({ tracking: ["read-any"] }),
  async (c) => {
    const stats = await trackingService.getTrackingStats();
    return ok(c, stats);
  },
);

export default trackingRoutes;
