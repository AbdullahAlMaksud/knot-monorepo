"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, BarChart2, Settings, Palette, Maximize2, Minimize2, Pin, PinOff } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { GlassCard } from "@/components/ui/GlassCard";
import { useSettingsStore } from "@/shared/stores/settingsStore";
import { useThemeStore } from "@/shared/stores/themeStore";
import { useGameStore } from "@/shared/stores/gameStore";

interface SidebarProps {
  activePage: "home" | "game" | "score" | "settings";
  onNavigate: (page: "home" | "score" | "settings") => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
}

export function Sidebar({ activePage, onNavigate, onToggleFullscreen, isFullscreen }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { sidebarPinned, setSidebarPinned } = useSettingsStore();
  const { cycleTheme, getTheme } = useThemeStore();
  const theme = getTheme();
  const gameView = useGameStore((s) => s.view);

  const showSidebar = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    setOpen(true);
  }, []);

  const hideSidebar = useCallback(() => {
    if (sidebarPinned) return;
    hideTimerRef.current = setTimeout(() => setOpen(false), 650);
  }, [sidebarPinned]);

  const cancelHide = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
  }, []);

  // Edge hover trigger
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => { if (e.clientX < 10) showSidebar(); };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [showSidebar]);

  // Keep open when pinned
  useEffect(() => {
    if (sidebarPinned) setOpen(true);
    else hideSidebar();
  }, [sidebarPinned, hideSidebar]);

  const navItems = [
    { id: "home"     as const, icon: Home,      label: "Home",     kbd: "" },
    { id: "score"    as const, icon: BarChart2,  label: "Scores",   kbd: "" },
    { id: "settings" as const, icon: Settings,   label: "Settings", kbd: "" },
  ];

  return (
    <>
      {/* Invisible edge strip to trigger hover */}
      {!open && (
        <div
          className="fixed left-0 top-0 w-2.5 h-full z-40 cursor-default"
          onMouseEnter={showSidebar}
        />
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: -68, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -68, opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 320, mass: 0.8 }}
            className="fixed left-3 top-1/2 -translate-y-1/2 z-50"
            onMouseEnter={cancelHide}
            onMouseLeave={hideSidebar}
          >
            <GlassCard intensity="high" className="flex flex-col py-3 px-2 gap-0.5 w-[50px]">

              {/* Nav items */}
              {navItems.map(({ id, icon: Icon, label }) => {
                const isActive = activePage === id || (id === "home" && gameView === "game");
                return (
                  <SidebarBtn
                    key={id}
                    label={label}
                    active={isActive}
                    accent={theme.accent}
                    onClick={() => { onNavigate(id); if (!sidebarPinned) setOpen(false); }}
                  >
                    <Icon size={16} />
                  </SidebarBtn>
                );
              })}

              {/* Divider */}
              <div className="mx-2 my-1 h-px bg-white/10" />

              {/* Theme cycle */}
              <SidebarBtn
                label="Theme (D)"
                accent={theme.accent}
                onClick={cycleTheme}
                badge={<div className="w-2 h-2 rounded-full border border-black/20" style={{ background: theme.accent }} />}
              >
                <Palette size={16} />
              </SidebarBtn>

              {/* Fullscreen */}
              <SidebarBtn
                label={isFullscreen ? "Exit Fullscreen (F)" : "Fullscreen (F)"}
                active={isFullscreen}
                accent={theme.accent}
                onClick={onToggleFullscreen}
              >
                {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </SidebarBtn>

              {/* Pin */}
              <SidebarBtn
                label={sidebarPinned ? "Unpin Sidebar (P)" : "Pin Sidebar (P)"}
                active={sidebarPinned}
                accent={theme.accent}
                onClick={() => setSidebarPinned(!sidebarPinned)}
              >
                {sidebarPinned ? <PinOff size={16} /> : <Pin size={16} />}
              </SidebarBtn>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Sidebar button with tooltip ──────────────────────────────────────────────
interface SidebarBtnProps {
  children: React.ReactNode;
  label: string;
  active?: boolean;
  accent: string;
  onClick: () => void;
  badge?: React.ReactNode;
}

function SidebarBtn({ children, label, active, accent, onClick, badge }: SidebarBtnProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative flex items-center">
      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "w-[34px] h-[34px] rounded-xl flex items-center justify-center",
          "transition-all duration-150 relative outline-none",
          active
            ? "bg-[color-mix(in_srgb,var(--accent-color)_18%,transparent)] text-[var(--accent-color)]"
            : "text-white/35 hover:text-white/85 hover:bg-white/8"
        )}
        style={active ? { color: accent, background: `${accent}22` } : {}}
        aria-label={label}
      >
        {children}
        {badge && (
          <span className="absolute -top-0.5 -right-0.5 pointer-events-none">
            {badge}
          </span>
        )}
      </button>

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute left-[42px] pointer-events-none z-50"
          >
            <div className="whitespace-nowrap backdrop-blur-xl bg-black/75 border border-white/10 text-white/75 text-[11px] font-medium px-2.5 py-1.5 rounded-lg shadow-xl">
              {label}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
