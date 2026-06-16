"use client";

import { cn } from "@/shared/lib/utils";

interface ToggleProps {
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  label?: string;
  description?: string;
  icon?: React.ReactNode;
}

export function Toggle({ checked, onCheckedChange, label, description, icon }: ToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className="flex items-center gap-3 w-full text-left group"
    >
      {icon && <span className="text-white/40 group-hover:text-white/60 transition-colors">{icon}</span>}
      <div className="flex-1 min-w-0">
        {label && <p className="text-sm text-white/80 font-medium">{label}</p>}
        {description && <p className="text-xs text-white/40 mt-0.5">{description}</p>}
      </div>
      <div
        className={cn(
          "relative w-10 h-6 rounded-full transition-all duration-200 shrink-0",
          checked ? "bg-[var(--accent)]" : "bg-white/10 border border-white/15"
        )}
      >
        <div
          className={cn(
            "absolute top-1 w-4 h-4 rounded-full transition-all duration-200 shadow-sm",
            checked ? "left-5 bg-[var(--accent-fg)]" : "left-1 bg-white/50"
          )}
        />
      </div>
    </button>
  );
}
