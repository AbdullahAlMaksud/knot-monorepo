import { Hono } from "hono";
import { ok } from "../../lib/response.js";
import { updateSettingsSchema } from "./settings.types.js";
import * as settingsService from "./settings.service.js";
import { actorId } from "../../types/index.js";
import type { AppEnv } from "../../types/index.js";

const settingsRoutes = new Hono<AppEnv>();

/**
 * GET /api/settings
 * Every visitor - guest or logged-in - has their own settings document,
 * keyed by their user id or guest id. Created with defaults on first read.
 */
settingsRoutes.get("/", async (c) => {
  const user = c.get("user");
  const id = actorId({ user, guestId: c.get("guestId") });
  const settings = await settingsService.getOrCreateSettings(id, !user);
  return ok(c, settings);
});

/** PATCH /api/settings - update any subset of theme/lang/sound/vibration/volumes. */
settingsRoutes.patch("/", async (c) => {
  const patch = updateSettingsSchema.parse(await c.req.json());
  const user = c.get("user");
  const id = actorId({ user, guestId: c.get("guestId") });
  const settings = await settingsService.updateSettings(id, !user, patch);
  return ok(c, settings);
});

export default settingsRoutes;
