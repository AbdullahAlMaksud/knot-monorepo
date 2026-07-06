import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";
import { mongoClient, getDB } from "./db.js";
import { env, trustedOrigins } from "../config/env.js";
import { ac, roles } from "./permissions.js";

export const auth = betterAuth({
  database: mongodbAdapter(getDB(), { client: mongoClient }),

  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  trustedOrigins,

  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // refresh once a day of activity
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 min in-memory/cookie cache to cut DB roundtrips
    },
  },

  // RBAC: adds `role` (default "user") + "banned" fields to the user, and
  // exposes admin.* endpoints (setRole, banUser, listUsers, ...) guarded by
  // the roles/permissions we defined in lib/permissions.ts
  plugins: [
    admin({
      ac,
      roles,
      defaultRole: "user",
      adminRoles: ["admin"],
    }),
  ],

  advanced: {
    // Different ports on localhost are "same-site" so Lax cookies work in dev.
    // In production, put the dashboard behind the same parent domain or
    // switch to crossSubDomainCookies / sameSite:"none" + secure:true.
    defaultCookieAttributes: {
      sameSite: "lax",
      secure: env.NODE_ENV === "production",
    },
  },
});

export type Auth = typeof auth;
export type Session = typeof auth.$Infer.Session;
