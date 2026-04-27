// import { createAuthClient } from "better-auth/react";

// export const authClient = createAuthClient({});

import { createAuthClient } from "better-auth/react";

const authBaseURL =
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL?.trim() ||
  process.env.NEXT_PUBLIC_APP_URL?.trim() ||
  (typeof window !== "undefined"
    ? window.location.origin
    : "http://localhost:3000");

export const authClient = createAuthClient({
  baseURL: authBaseURL,
  // This makes the client aware of the additionalFields types
});
