"use client";

import { authClient } from "@/lib/auth-client";

export function useAuthUser() {
  const { data: session } = authClient.useSession();

  return {
    user: session?.user,
    userId: session?.user?.id,
    name: session?.user?.name,
    email: session?.user?.email,
  };
}
