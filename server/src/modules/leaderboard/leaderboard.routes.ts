import { Hono } from "hono";
import { z } from "zod";
import { ok } from "../../lib/response.js";
import { getLeaderboard } from "./leaderboard.service.js";
import type { AppEnv } from "../../types/index.js";

const leaderboardRoutes = new Hono<AppEnv>();

const querySchema = z.object({
  game: z.string().min(1).max(64),
  period: z.enum(["all", "day", "week", "month"]).default("all"),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

/**
 * GET /api/leaderboard?game=snake&period=week&limit=20
 * Public - anyone (guest or logged-in) can view the leaderboard.
 */
leaderboardRoutes.get("/", async (c) => {
  const query = querySchema.parse(c.req.query());
  const entries = await getLeaderboard(query);
  return ok(c, entries);
});

export default leaderboardRoutes;
