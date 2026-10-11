import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll-triggered fade + rise. Pure CSS scroll-driven animation
 * (`animation-timeline: view()`) - zero JS, hydration-free, and static under
 * prefers-reduced-motion and in print.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <div
      data-reveal=""
      className={cn("reveal-rise", className)}
      style={
        {
          animationDelay: delay ? `${delay}s` : undefined,
          "--reveal-y": `${y}px`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
