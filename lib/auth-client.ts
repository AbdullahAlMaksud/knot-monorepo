// import { createAuthClient } from "better-auth/react";

// export const authClient = createAuthClient({});



import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL ?? "http://localhost:3000",
  // This makes the client aware of the additionalFields types
});