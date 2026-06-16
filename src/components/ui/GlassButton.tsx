import { cn } from "@/shared/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "ghost" | "accent" | "outline";
  size?: "sm" | "md" | "lg";
}

const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant = "ghost", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative rounded-xl font-medium transition-all duration-150 select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          // Sizes
          size === "sm" && "px-3 py-1.5 text-xs",
          size === "md" && "px-4 py-2 text-sm",
          size === "lg" && "px-6 py-3 text-base",
          // Variants
          variant === "ghost" && [
            "backdrop-blur-sm btn-glass-ghost",
            "active:scale-95",
          ],
          variant === "outline" && [
            "backdrop-blur-sm btn-glass-outline",
            "active:scale-95",
          ],
          variant === "accent" && [
            "bg-[var(--accent)] text-[var(--accent-fg)]",
            "hover:opacity-90 shadow-[0_0_20px_var(--accent-glow)]",
            "active:scale-95",
          ],
          className
        )}
        {...props}
      />
    );
  }
);
GlassButton.displayName = "GlassButton";
export { GlassButton };
