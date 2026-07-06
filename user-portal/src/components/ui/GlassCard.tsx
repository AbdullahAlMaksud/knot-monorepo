import { cn } from "@/shared/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  intensity?: "low" | "medium" | "high";
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, intensity = "medium", ...props }, ref) => {
    const blur = { low: "backdrop-blur-sm", medium: "backdrop-blur-md", high: "backdrop-blur-xl" }[intensity];
    const bg = { low: "bg-white/3", medium: "bg-white/5", high: "bg-white/8" }[intensity];
    return (
      <div
        ref={ref}
        className={cn(
          blur, bg,
          "border border-white/10 rounded-2xl",
          "shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
          className
        )}
        {...props}
      />
    );
  }
);
GlassCard.displayName = "GlassCard";
export { GlassCard };
