import { motion } from "framer-motion";
import { Volume2, Lightbulb, Eye, BookOpen, Palette, Check, Globe, Maximize2, Minimize2 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Toggle } from "@/components/ui/Toggle";
import { useSettingsStore } from "@/shared/stores/settingsStore";
import { useThemeStore, THEMES, type ThemeId } from "@/shared/stores/themeStore";
import { cn } from "@/shared/lib/utils";
import { useTranslation } from "react-i18next";
import { translateNumber } from "@/shared/lib/i18n";

interface SettingsScreenProps {
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export function SettingsScreen({ isFullscreen, onToggleFullscreen }: SettingsScreenProps) {
  const {
    soundEnabled, highlightEnabled, autoNoteEnabled, showMistakes, language,
    toggleSound, toggleHighlight, toggleAutoNote, toggleShowMistakes, setLanguage,
  } = useSettingsStore();

  const { themeId, setTheme, getTheme } = useThemeStore();
  const theme = getTheme();
  const { t } = useTranslation();

  const settingsGroups = [
    {
      title: t("settings.gameplay"),
      items: [
        {
          label: t("settings.sound.label"),
          description: t("settings.sound.desc"),
          icon: <Volume2 size={15} />,
          checked: soundEnabled,
          onChange: toggleSound,
        },
        {
          label: t("settings.highlight.label"),
          description: t("settings.highlight.desc"),
          icon: <Lightbulb size={15} />,
          checked: highlightEnabled,
          onChange: toggleHighlight,
        },
        {
          label: t("settings.mistakes.label"),
          description: t("settings.mistakes.desc"),
          icon: <Eye size={15} />,
          checked: showMistakes,
          onChange: toggleShowMistakes,
        },
        {
          label: t("settings.notes.label"),
          description: t("settings.notes.desc"),
          icon: <BookOpen size={15} />,
          checked: autoNoteEnabled,
          onChange: toggleAutoNote,
        },
        {
          label: t("settings.language.label"),
          description: t("settings.language.desc"),
          icon: <Globe size={15} />,
          checked: language === "bn",
          onChange: () => setLanguage(language === "bn" ? "en" : "bn"),
        },
        {
          label: t("settings.fullscreen.label"),
          description: t("settings.fullscreen.desc"),
          icon: isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />,
          checked: isFullscreen,
          onChange: onToggleFullscreen,
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
        <p className="text-xs tracking-[0.25em] text-white/25 uppercase mb-1">{t("settings.preferences")}</p>
        <h2 className="text-3xl font-thin text-white/90">{t("settings.title")}</h2>
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
            <p className="text-xs text-white/30 uppercase tracking-widest font-medium">{t("settings.theme")}</p>
            <span className="text-xs text-white/20 ml-auto">{t("settings.press_d")}</span>
          </div>

          <div className="grid grid-cols-6 gap-2">
            {THEMES.map((themeItem, i) => (
              <motion.button
                key={themeItem.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + i * 0.04 }}
                onClick={() => setTheme(themeItem.id as ThemeId)}
                className="flex flex-col items-center gap-1.5 group"
              >
                <div
                  className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-150",
                    "border-2 relative overflow-hidden",
                    themeId === themeItem.id ? "scale-110" : "opacity-60 hover:opacity-90 hover:scale-105"
                  )}
                  style={{
                    background: `${themeItem.accent}22`,
                    borderColor: themeId === themeItem.id ? themeItem.accent : "var(--btn-border)",
                    boxShadow: themeId === themeItem.id ? `0 0 12px ${themeItem.ring}` : "none",
                  }}
                >
                  <div className="w-4 h-4 rounded-full" style={{ background: themeItem.accent }} />
                  {themeId === themeItem.id && (
                    <div className="absolute inset-0 flex items-center justify-center"
                      style={{ background: `${themeItem.accent}33` }}>
                      <Check size={14} style={{ color: themeItem.accent }} />
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-white/40 group-hover:text-white/60 transition-colors">
                  {t(`themes.${themeItem.id}`)}
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
          <p className="text-xs text-white/25 uppercase tracking-widest mb-3 font-medium">{t("settings.shortcuts.title")}</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {[
              ["D", t("settings.shortcuts.cycle_theme")],
              ["F", t("settings.shortcuts.fullscreen")],
              ["P", t("settings.shortcuts.pin_sidebar")],
              ["L", t("settings.shortcuts.toggle_language")],
              ["N", t("settings.shortcuts.note_mode")],
              [language === "bn" ? "১–৯" : "1–9", t("settings.shortcuts.enter_number")],
              ["←↑→↓", t("settings.shortcuts.navigate")],
              ["Backspace", t("settings.shortcuts.erase_cell")],
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
