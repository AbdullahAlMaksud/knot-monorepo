"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sidebar } from "@/features/sidebar/Sidebar";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { useThemeStore } from "@/shared/stores/themeStore";
import { useKeyboard } from "@/shared/hooks/useKeyboard";
import { useTimer } from "@/shared/hooks/useTimer";
import { useSettingsStore } from "@/shared/stores/settingsStore";
import { useGameStore } from "@/shared/stores/gameStore";
import { cn } from "@/shared/lib/utils";
import "@/shared/lib/i18n";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import { ShareCardLanding } from "@/features/game/ShareCardLanding";

type Page = "home" | "sudoku" | "queens" | "score" | "settings";

function pathnameToPage(pathname: string): Page {
  if (pathname.startsWith("/sudoku")) return "sudoku";
  if (pathname.startsWith("/queens")) return "queens";
  if (pathname.startsWith("/score")) return "score";
  if (pathname.startsWith("/settings")) return "settings";
  return "home"; // covers both "/" and any unrecognized path
}

function MainLayout({ children }: { children: React.ReactNode }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { themeId, getTheme } = useThemeStore();
  const theme = getTheme();
  const { language } = useSettingsStore();
  const { i18n } = useTranslation();
  const pathname = usePathname();
  const gameView = useGameStore((s) => s.view);

  useTimer();

  // Sync i18next language on load / change
  useEffect(() => {
    if (language && i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  useKeyboard(toggleFullscreen, () => {});

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const currentPage = pathnameToPage(pathname);
  // When game is active, sidebar shows sudoku as active
  const activePage: Page =
    gameView === "game" ? "sudoku" : currentPage;

  return (
    <ThemeProvider>
      <div
        className={cn(
          "fixed inset-0 overflow-hidden",
          language === "bn" && "lang-bn"
        )}
        style={{ background: "var(--bg-app, #080808)", transition: "background-color 0.3s ease" }}
      >
        {/* Animated background gradient that reacts to theme */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: [
              `radial-gradient(ellipse 65% 55% at 25% 35%, ${theme.glow} 0%, transparent 65%),
               radial-gradient(ellipse 45% 40% at 78% 72%, ${theme.glow.replace("0.15", "0.06")} 0%, transparent 65%)`,
            ],
          }}
          transition={{ duration: 0.6 }}
          style={{
            background: `radial-gradient(ellipse 65% 55% at 25% 35%, ${theme.glow} 0%, transparent 65%),
                         radial-gradient(ellipse 45% 40% at 78% 72%, ${theme.glow.replace("0.15", "0.06")} 0%, transparent 65%)`,
          }}
        />

        {/* Subtle noise texture */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px",
          }}
        />

        {/* Challenge landing modal if URL shared params exist */}
        <ShareCardLanding />

        {/* Floating sidebar */}
        <Sidebar
          activePage={activePage}
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
        />

        {/* Main content area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.975 }}
            transition={{ duration: 0.26, ease: [0.4, 0, 0.2, 1] }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}

export default MainLayout;
