"use client";

import { useThemeStore } from "@/shared/stores/themeStore";
import { formatTime } from "@/shared/lib/storage";

interface TimerRingProps {
  elapsed: number;
  difficulty: string;
  maxSeconds?: number;
}

export function TimerRing({ elapsed, difficulty, maxSeconds = 3600 }: TimerRingProps) {
  const { getTheme } = useThemeStore();
  const theme = getTheme();

  const size = 180;
  const strokeW = 2.5;
  const r = (size - strokeW * 2) / 2;
  const circ = 2 * Math.PI * r;
  const progress = Math.min(elapsed / maxSeconds, 1);
  const dash = circ * (1 - progress);
  const cx = size / 2;

  // Dot position
  const angle = -90 + progress * 360;
  const rad = (angle * Math.PI) / 180;
  const dotX = cx + r * Math.cos(rad);
  const dotY = cx + r * Math.sin(rad);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* SVG ring */}
      <svg width={size} height={size} className="absolute inset-0 -rotate-90">
        {/* Track */}
        <circle
          cx={cx} cy={cx} r={r}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeW}
        />
        {/* Progress arc */}
        <circle
          cx={cx} cy={cx} r={r}
          fill="none"
          stroke={theme.accent}
          strokeWidth={strokeW}
          strokeDasharray={circ}
          strokeDashoffset={dash}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${theme.ring})`, transition: "stroke-dashoffset 0.5s linear" }}
        />
        {/* Dot */}
        <circle
          cx={dotX} cy={dotY} r={4}
          fill={theme.accent}
          style={{ filter: `drop-shadow(0 0 8px ${theme.ring})` }}
          className="rotate-90 origin-center"
        />
      </svg>

      {/* Center content */}
      <div className="flex flex-col items-center justify-center z-10">
        <span
          className="text-4xl font-thin tracking-wider tabular-nums"
          style={{ color: "rgba(255,255,255,0.9)", letterSpacing: "0.08em" }}
        >
          {formatTime(elapsed)}
        </span>
        <span className="text-xs uppercase tracking-[0.2em] text-white/30 mt-1 font-medium">
          {difficulty}
        </span>
      </div>

      {/* Glow */}
      <div
        className="absolute inset-4 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)` }}
      />
    </div>
  );
}
