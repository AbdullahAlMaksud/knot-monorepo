"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/shared/stores/themeStore";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { themeId, getTheme } = useThemeStore();

  useEffect(() => {
    const theme = getTheme();
    const root = document.documentElement;
    root.style.setProperty("--accent", theme.accent);
    root.style.setProperty("--accent-fg", theme.accentFg);
    root.style.setProperty("--accent-ring", theme.ring);
    root.style.setProperty("--accent-glow", theme.glow);

    if (theme.isLight) {
      root.classList.add("light-theme");
    } else {
      root.classList.remove("light-theme");
    }
  }, [themeId, getTheme]);

  return <>{children}</>;
}
