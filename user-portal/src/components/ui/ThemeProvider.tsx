"use client";

import { useEffect, useState } from "react";
import { useThemeStore } from "@/shared/stores/themeStore";
import { useSettingsStore } from "@/shared/stores/settingsStore";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { themeId, getTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Rehydrate stores on the client side to avoid hydration mismatches
    useThemeStore.persist.rehydrate();
    useSettingsStore.persist.rehydrate();
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
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
  }, [themeId, getTheme, mounted]);

  return <>{children}</>;
}
