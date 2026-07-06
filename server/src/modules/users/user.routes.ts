import { Hono } from "hono";
import { z } from "zod";
import { auth } from "../../lib/auth.js";
import { requireAuth } from "../../middlewares/rbac.middleware.js";
import { ok, fail } from "../../lib/response.js";
import type { AppEnv } from "../../types/index.js";

const userRoutes = new Hono<AppEnv>();

/** GET /api/users/me - the current user's own profile (requires login). */
userRoutes.get("/me", requireAuth, (c) => {
  const user = c.get("user");
  return ok(c, user);
});

const updateMeSchema = z.object({
  name: z.string().min(1).max(80).optional(),
  image: z.string().url().optional(),
});

/** PATCH /api/users/me - update your own display name/avatar. */
userRoutes.patch("/me", requireAuth, async (c) => {
  const body = updateMeSchema.parse(await c.req.json());
  if (Object.keys(body).length === 0) return fail(c, "No fields to update", 400);

  const updated = await auth.api.updateUser({
    headers: c.req.raw.headers,
    body,
  });

  return ok(c, updated);
});

export default userRoutes;
