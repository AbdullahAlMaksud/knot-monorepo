"use client";

import { BarChart2, Settings, Pin } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { GlassCard } from "@/components/ui/GlassCard";
import { useSettingsStore } from "@/shared/stores/settingsStore";
import { useThemeStore } from "@/shared/stores/themeStore";
import { useGameStore } from "@/shared/stores/gameStore";
import { useTranslation } from "react-i18next";
import { SudokuLogo } from "@/components/ui";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { ParentNavigator } from "@/components/commons/parent-navigator";

interface SidebarProps {
  activePage: "home" | "game" | "score" | "settings";
  onNavigate: (page: "home" | "score" | "settings") => void;
}

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  const { sidebarPinned, setSidebarPinned } = useSettingsStore();
  const { getTheme } = useThemeStore();
  const theme = getTheme();
  const gameView = useGameStore((s) => s.view);
  const { t } = useTranslation();

  const navItems = [
    { id: "home" as const, icon: SudokuLogo, label: t("navigation.sudoku") },
    { id: "score" as const, icon: BarChart2, label: t("navigation.scores") },
    { id: "settings" as const, icon: Settings, label: t("navigation.settings") },
  ];

  return (
    <TooltipProvider>
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center justify-end w-16 h-fit bg-transparent pr-2 group pointer-events-auto">
        <GlassCard
          intensity="high"
          className={cn(
            "flex flex-col items-center py-4 px-2 gap-2 rounded-3xl w-[50px] transition-all duration-300 ease-in-out shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
            sidebarPinned
              ? "translate-x-0 opacity-100"
              : "translate-x-[calc(100%-14px)] opacity-40 group-hover:translate-x-0 group-hover:opacity-100"
          )}
        >
          {/* Collapse Handle Visual Cue */}
          {!sidebarPinned && (
            <div className="absolute left-1 top-1/2 -translate-y-1/2 w-0.5 h-10 rounded-full bg-white/20 opacity-70 group-hover:opacity-0 transition-opacity duration-200" />
          )}

          {/* Parent Navigator */}
          <ParentNavigator
            variant="plain"
            size={28}
            className="text-white/35 hover:text-white/85 hover:bg-white/8 hover:scale-105 transition-all duration-150"
          />

          {/* Divider */}
          <div className="w-5 h-px bg-white/10 my-1" />

          {/* Nav items */}
          <div className="flex flex-col items-center gap-2">
            {navItems.map(({ id, icon: Icon, label }) => {
              const isActive = activePage === id || (id === "home" && gameView === "game");
              return (
                <SidebarBtn
                  key={id}
                  label={label}
                  active={isActive}
                  accent={theme.accent}
                  onClick={() => onNavigate(id)}
                >
                  <Icon size={16} />
                </SidebarBtn>
              );
            })}
          </div>

          {/* Divider */}
          <div className="w-5 h-px bg-white/10 my-1" />

          {/* Pin */}
          <SidebarBtn
            label={sidebarPinned ? t("navigation.unpinSidebar") : t("navigation.pinSidebar")}
            active={sidebarPinned}
            accent={theme.accent}
            onClick={() => setSidebarPinned(!sidebarPinned)}
          >
            <Pin
              size={16}
              className={cn(
                "transform transition-transform duration-200",
                sidebarPinned && "rotate-45"
              )}
            />
          </SidebarBtn>
        </GlassCard>
      </div>
    </TooltipProvider>
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
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          className={cn(
            "w-[34px] h-[34px] rounded-xl flex items-center justify-center cursor-pointer",
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
      </TooltipTrigger>
      <TooltipContent side="left" className="mr-2">
        {label}
      </TooltipContent>
    </Tooltip>
  );
}
