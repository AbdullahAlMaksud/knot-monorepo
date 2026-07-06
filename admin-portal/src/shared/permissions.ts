import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

export const statement = {
  ...defaultStatements,
  score: ["create", "read", "update", "delete", "delete-any"],
  leaderboard: ["read"],
  settings: ["read", "update"],
  tracking: ["read", "read-any"],
} as const;

export const ac = createAccessControl(statement);

export const userRole = ac.newRole({
  score: ["create", "read", "update", "delete"],
  leaderboard: ["read"],
  settings: ["read", "update"],
  tracking: ["read"],
});

export const moderatorRole = ac.newRole({
  score: ["create", "read", "update", "delete", "delete-any"],
  leaderboard: ["read"],
  settings: ["read", "update"],
  tracking: ["read", "read-any"],
});

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

export const ALL_ROLES = ["user", "moderator", "admin"] as const;
export type AppRole = (typeof ALL_ROLES)[number];
