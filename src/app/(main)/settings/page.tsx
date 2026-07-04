"use client";

import dynamic from "next/dynamic";
import { useState, useCallback, useEffect } from "react";

const SettingsScreen = dynamic(
  () => import("@/features/settings/SettingsScreen").then((m) => m.SettingsScreen),
  { ssr: false }
);

export default function SettingsRoutePage() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  return (
    <SettingsScreen isFullscreen={isFullscreen} onToggleFullscreen={toggleFullscreen} />
  );
}
