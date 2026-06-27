// import { createAuthClient } from "better-auth/react";

// export const authClient = createAuthClient({});

import { createAuthClient } from "better-auth/react";

const browserOrigin =
  typeof window !== "undefined" ? window.location.origin : undefined;
const frontendBaseURL =
  browserOrigin ||
  process.env.NEXT_PUBLIC_FRONTEND_URL?.trim() ||
  "http://localhost:3000";

export const authClient = createAuthClient({
  baseURL: frontendBaseURL,
  basePath: "/api/v1/auth",
  // This makes the client aware of the additionalFields types
});

const toAbsoluteFrontendURL = (path: string): string => {
  return new URL(path, `${frontendBaseURL.replace(/\/$/, "")}/`).toString();
};

export const signInWithGoogle = async () => {
  return authClient.signIn.social({
    provider: "google",
    callbackURL: toAbsoluteFrontendURL("/account"),
  });
};

export const signOutEverywhere = async () => {
  await authClient.signOut();
};

export const useAuthSession = () => {
  return authClient.useSession();
};
