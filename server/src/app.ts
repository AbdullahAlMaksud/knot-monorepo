import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { trustedOrigins } from "./config/env.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { sessionMiddleware } from "./middlewares/session.middleware.js";
import { trackingMiddleware } from "./middlewares/tracking.middleware.js";
import type { AppEnv } from "./types/index.js";

import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/users/user.routes.js";
import scoreRoutes from "./modules/scores/score.routes.js";
import leaderboardRoutes from "./modules/leaderboard/leaderboard.routes.js";
import settingsRoutes from "./modules/settings/settings.routes.js";
import trackingRoutes from "./modules/tracking/tracking.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";

export function createApp() {
  const app = new Hono<AppEnv>();

  app.use("*", logger());

  // CORS must be registered before the auth handler so preflight requests
  // for cross-origin (dashboard on a different port) cookie-based auth work.
  app.use(
    "*",
    cors({
      origin: trustedOrigins,
      credentials: true,
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    }),
  );

  // Mounted before the global session/tracking middleware: better-auth
  // manages its own request lifecycle for sign-up/sign-in/sign-out/etc.
  app.route("/api/auth", authRoutes);

  // From here on, every route can read c.get("user")/c.get("session")
  // and c.get("guestId")/c.get("ip")/c.get("country").
  app.use("*", sessionMiddleware);
  app.use("*", trackingMiddleware);

  app.get("/health", (c) => c.json({ status: "ok", time: new Date().toISOString() }));

  app.route("/api/users", userRoutes);
  app.route("/api/scores", scoreRoutes);
  app.route("/api/leaderboard", leaderboardRoutes);
  app.route("/api/settings", settingsRoutes);
  app.route("/api/tracking", trackingRoutes);
  app.route("/api/admin", adminRoutes);

  app.notFound((c) => c.json({ success: false, error: { message: "Not found" } }, 404));
  app.onError(errorHandler);

  return app;
}
