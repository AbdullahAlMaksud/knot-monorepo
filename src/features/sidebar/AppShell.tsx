"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sidebar } from "@/features/sidebar/Sidebar";
import { HomeScreen } from "@/features/game/HomeScreen";
import { GameScreen } from "@/features/game/GameScreen";
import { ScoreScreen } from "@/features/score/ScoreScreen";
import { SettingsScreen } from "@/features/settings/SettingsScreen";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { useGameStore } from "@/shared/stores/gameStore";
import { useThemeStore } from "@/shared/stores/themeStore";
import { useKeyboard } from "@/shared/hooks/useKeyboard";
import { useTimer } from "@/shared/hooks/useTimer";
import { useSettingsStore } from "@/shared/stores/settingsStore";
import { cn } from "@/shared/lib/utils";
import "@/shared/lib/i18n";
import { useTranslation } from "react-i18next";

type Page = "home" | "score" | "settings";

export function AppShell() {
  const [page, setPage] = useState<Page>("home");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const gameView = useGameStore((s) => s.view);
  const { getTheme } = useThemeStore();
  const theme = getTheme();
  const { language } = useSettingsStore();
  const { i18n } = useTranslation();

  useTimer();

  // Sync i18next language on load / change
  useEffect(() => {
    if (language && i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => { });
    } else {
      document.exitFullscreen().catch(() => { });
    }
  }, []);

  useKeyboard(toggleFullscreen, () => { });

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const activePage: "home" | "game" | "score" | "settings" =
    gameView === "game" ? "game" : page;

  const handleNavigate = (target: "home" | "score" | "settings") => {
    // If game is running and they click home, reset to home
    if (target === "home" && gameView === "game") {
      useGameStore.getState().resetGame();
    }
    setPage(target);
  };

  const showGame = gameView === "game";
  const showScore = gameView !== "game" && page === "score";
  const showSettings = gameView !== "game" && page === "settings";
  const showHome = gameView !== "game" && page === "home";
  const pageKey = showGame ? "game" : page;

  // Sync page back to home when game resets
  useEffect(() => {
    if (gameView === "home") setPage("home");
  }, [gameView]);

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

        {/* Floating sidebar */}
        <Sidebar
          activePage={activePage}
          onNavigate={handleNavigate}
        />

        {/* Main content area */}
        <div className="relative w-full h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={pageKey}
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.975 }}
              transition={{ duration: 0.26, ease: [0.4, 0, 0.2, 1] }}
              className="w-full h-full flex items-center justify-center"
            >
              {showHome && <HomeScreen />}
              {showGame && <GameScreen />}
              {showScore && <ScoreScreen />}
              {showSettings && (
                <SettingsScreen
                  isFullscreen={isFullscreen}
                  onToggleFullscreen={toggleFullscreen}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </ThemeProvider>
  );
}
