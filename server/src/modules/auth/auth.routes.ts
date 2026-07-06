import { Hono } from "hono";
import { auth } from "../../lib/auth.js";
import type { AppEnv } from "../../types/index.js";

const authRoutes = new Hono<AppEnv>();

/**
 * All better-auth endpoints live under /api/auth/*, e.g.
 *   POST /api/auth/sign-up/email
 *   POST /api/auth/sign-in/email
 *   POST /api/auth/sign-out
 *   GET  /api/auth/get-session
 *   POST /api/auth/admin/set-role
 *   POST /api/auth/admin/ban-user
 *   GET  /api/auth/admin/list-users
 * See https://better-auth.com/docs/plugins/admin for the full admin API.
 */
authRoutes.on(["POST", "GET"], "/*", (c) => auth.handler(c.req.raw));

export default authRoutes;
