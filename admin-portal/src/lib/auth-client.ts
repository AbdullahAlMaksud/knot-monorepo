"use client";

import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import { ac, roles } from "@/shared/permissions";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export const authClient = createAuthClient({
  baseURL: apiUrl,
  basePath: "/api/auth",
  plugins: [adminClient({ ac, roles })],
  fetchOptions: {
    credentials: "include",
  },
});

export const { useSession, signIn, signOut } = authClient;
