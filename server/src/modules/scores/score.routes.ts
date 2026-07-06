import { Hono } from "hono";
import { auth } from "../../lib/auth.js";
import { ok, fail } from "../../lib/response.js";
import { createScoreSchema, listScoresQuerySchema } from "./score.types.js";
import * as scoreService from "./score.service.js";
import type { AppEnv } from "../../types/index.js";

const scoreRoutes = new Hono<AppEnv>();

/**
 * POST /api/scores
 * Open to everyone - logged-in users AND anonymous guests (identified by the
 * `gid` cookie set in trackingMiddleware). This is what lets people play the
 * game and submit a score without creating an account.
 */
scoreRoutes.post("/", async (c) => {
  const body = createScoreSchema.parse(await c.req.json());
  const user = c.get("user");
  const guestId = c.get("guestId");
  const country = c.get("country");

  const score = await scoreService.createScore({
    game: body.game,
    score: body.score,
    metadata: body.metadata ?? {},
    playerName: body.playerName ?? user?.name ?? "Guest",
    userId: user?.id ?? null,
    guestId: user ? null : guestId,
    country,
  });

  return ok(c, score, 201);
});

/**
 * GET /api/scores
 * Public read access. Supports ?game=, ?mine=true (scoped to the caller,
 * whether logged in or anonymous), ?userId= (for admins/moderators to
 * inspect a specific player), and pagination via ?page & ?limit.
 */
scoreRoutes.get("/", async (c) => {
  const query = listScoresQuerySchema.parse(c.req.query());
  const user = c.get("user");
  const guestId = c.get("guestId");

  const filter: Parameters<typeof scoreService.listScores>[0] = {
    game: query.game,
    page: query.page,
    limit: query.limit,
  };

  if (query.mine) {
    if (user) filter.userId = user.id;
    else filter.guestId = guestId;
  } else if (query.userId) {
    filter.userId = query.userId;
  }

  const result = await scoreService.listScores(filter);
  return ok(c, result);
});

/** GET /api/scores/:id */
scoreRoutes.get("/:id", async (c) => {
  const score = await scoreService.getScoreById(c.req.param("id"));
  if (!score) return fail(c, "Score not found", 404);
  return ok(c, score);
});

/**
 * DELETE /api/scores/:id
 * - Owners (the user or guest who submitted it) can always delete their own score.
 * - Anyone else needs the `score:delete-any` permission (moderator/admin).
 */
scoreRoutes.delete("/:id", async (c) => {
  const score = await scoreService.getScoreById(c.req.param("id"));
  if (!score) return fail(c, "Score not found", 404);

  const user = c.get("user");
  const guestId = c.get("guestId");

  const isOwner = user ? score.userId === user.id : score.guestId === guestId;

  if (!isOwner) {
    if (!user) return fail(c, "Authentication required", 401);
    const permission = await auth.api.userHasPermission({
      body: { userId: user.id, permissions: { score: ["delete-any"] } },
    });
    if (!permission.success) {
      return fail(c, "You do not have permission to delete this score", 403);
    }
  }

  await scoreService.deleteScoreById(c.req.param("id"));
  return ok(c, { deleted: true });
});

export default scoreRoutes;
