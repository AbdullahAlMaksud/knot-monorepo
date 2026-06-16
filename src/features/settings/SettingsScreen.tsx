"use client";

import { motion } from "framer-motion";
import { Volume2, Lightbulb, Eye, BookOpen, Palette, Check } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Toggle } from "@/components/ui/Toggle";
import { useSettingsStore } from "@/shared/stores/settingsStore";
import { useThemeStore, THEMES, type ThemeId } from "@/shared/stores/themeStore";
import { cn } from "@/shared/lib/utils";

export function SettingsScreen() {
  const {
    soundEnabled, highlightEnabled, autoNoteEnabled, showMistakes,
    toggleSound, toggleHighlight, toggleAutoNote, toggleShowMistakes,
  } = useSettingsStore();

  const { themeId, setTheme, getTheme } = useThemeStore();
  const theme = getTheme();

  const settingsGroups = [
    {
      title: "Gameplay",
      items: [
        {
          label: "Sound Effects",
          description: "Play sounds on input and completion",
          icon: <Volume2 size={15} />,
          checked: soundEnabled,
          onChange: toggleSound,
        },
        {
          label: "Highlight Related",
          description: "Dim unrelated cells when selected",
          icon: <Lightbulb size={15} />,
          checked: highlightEnabled,
          onChange: toggleHighlight,
        },
        {
          label: "Show Mistakes",
          description: "Display error count during play",
          icon: <Eye size={15} />,
          checked: showMistakes,
          onChange: toggleShowMistakes,
        },
        {
          label: "Auto Notes",
          description: "Automatically fill possible notes",
          icon: <BookOpen size={15} />,
          checked: autoNoteEnabled,
          onChange: toggleAutoNote,
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col items-center w-full h-full overflow-y-auto py-6 px-4 gap-5">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="text-xs tracking-[0.25em] text-white/25 uppercase mb-1">Preferences</p>
        <h2 className="text-3xl font-thin text-white/90">Settings</h2>
      </motion.div>

      {/* Theme picker */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-sm"
      >
        <GlassCard intensity="medium" className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Palette size={14} className="text-white/30" />
            <p className="text-xs text-white/30 uppercase tracking-widest font-medium">Theme</p>
            <span className="text-xs text-white/20 ml-auto">Press D to cycle</span>
          </div>

          <div className="grid grid-cols-6 gap-2">
            {THEMES.map((t, i) => (
              <motion.button
                key={t.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + i * 0.04 }}
                onClick={() => setTheme(t.id as ThemeId)}
                className="flex flex-col items-center gap-1.5 group"
              >
                <div
                  className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-150",
                    "border-2 relative overflow-hidden",
                    themeId === t.id ? "scale-110" : "opacity-60 hover:opacity-90 hover:scale-105"
                  )}
                  style={{
                    background: `${t.accent}22`,
                    borderColor: themeId === t.id ? t.accent : "var(--btn-border)",
                    boxShadow: themeId === t.id ? `0 0 12px ${t.ring}` : "none",
                  }}
                >
                  <div className="w-4 h-4 rounded-full" style={{ background: t.accent }} />
                  {themeId === t.id && (
                    <div className="absolute inset-0 flex items-center justify-center"
                      style={{ background: `${t.accent}33` }}>
                      <Check size={14} style={{ color: t.accent }} />
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-white/40 group-hover:text-white/60 transition-colors">
                  {t.label}
                </span>
              </motion.button>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Settings groups */}
      {settingsGroups.map((group, gi) => (
        <motion.div
          key={group.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + gi * 0.08 }}
          className="w-full max-w-sm"
        >
          <GlassCard intensity="low" className="p-4">
            <p className="text-xs text-white/25 uppercase tracking-widest mb-4 font-medium">{group.title}</p>
            <div className="flex flex-col gap-4">
              {group.items.map((item, ii) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + gi * 0.08 + ii * 0.05 }}
                >
                  <Toggle
                    checked={item.checked}
                    onCheckedChange={item.onChange}
                    label={item.label}
                    description={item.description}
                    icon={item.icon}
                  />
                  {ii < group.items.length - 1 && (
                    <div className="mt-4 h-px bg-white/5" />
                  )}
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      ))}

      {/* Keyboard shortcuts */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-sm"
      >
        <GlassCard intensity="low" className="p-4">
          <p className="text-xs text-white/25 uppercase tracking-widest mb-3 font-medium">Keyboard Shortcuts</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {[
              ["D", "Cycle theme"],
              ["F", "Fullscreen"],
              ["P", "Pin sidebar"],
              ["N", "Note mode"],
              ["1–9", "Enter number"],
              ["←↑→↓", "Navigate"],
              ["Backspace", "Erase cell"],
            ].map(([key, desc]) => (
              <div key={key} className="flex items-center gap-2">
                <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono text-white/50"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  {key}
                </kbd>
                <span className="text-xs text-white/35">{desc}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
