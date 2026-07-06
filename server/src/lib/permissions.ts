import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

/**
 * Central permission map for the whole app.
 * `defaultStatements` brings in the built-in `user` / `session` resources
 * used by better-auth's admin plugin (ban, impersonate, list, etc).
 *
 * Add new resources/actions here as the app grows - keep `as const` so
 * TypeScript can narrow the literal types for `ac.newRole`.
 */
export const statement = {
  ...defaultStatements,
  score: ["create", "read", "update", "delete", "delete-any"],
  leaderboard: ["read"],
  settings: ["read", "update"],
  tracking: ["read", "read-any"],
} as const;

export const ac = createAccessControl(statement);

/** Regular authenticated player. Can manage their own scores/settings only. */
export const userRole = ac.newRole({
  score: ["create", "read", "update", "delete"],
  leaderboard: ["read"],
  settings: ["read", "update"],
  tracking: ["read"],
});

/** Trusted staff: can moderate any score and view aggregate tracking data. */
export const moderatorRole = ac.newRole({
  score: ["create", "read", "update", "delete", "delete-any"],
  leaderboard: ["read"],
  settings: ["read", "update"],
  tracking: ["read", "read-any"],
});

/** Full administrative access, including user management (ban/role/delete). */
export const adminRole = ac.newRole({
  ...adminAc.statements,
  score: ["create", "read", "update", "delete", "delete-any"],
  leaderboard: ["read"],
  settings: ["read", "update"],
  tracking: ["read", "read-any"],
});

export const roles = {
  user: userRole,
  moderator: moderatorRole,
  admin: adminRole,
};

export type AppRole = keyof typeof roles;
export const ALL_ROLES = ["user", "moderator", "admin"] as const satisfies readonly AppRole[];
