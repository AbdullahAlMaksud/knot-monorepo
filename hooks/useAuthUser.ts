"use client";

import { useAuthSession } from "@/lib/auth-client";

export function useAuthUser() {
  const { data: session } = useAuthSession();

  return {
    user: session?.user,
    userId: session?.user?.id,
    name: session?.user?.name,
    email: session?.user?.email,
  };
}
