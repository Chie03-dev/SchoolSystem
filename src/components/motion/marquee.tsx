import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Seamless infinite marquee strip. The duplicate copy is aria-hidden; under
 * prefers-reduced-motion the strip becomes a static wrapping row (CSS).
 */
export function Marquee({
  items,
  className,
  trackClassName,
  duration = 32,
  gap = "2rem",
}: {
  items: ReactNode[];
  className?: string;
  trackClassName?: string;
  duration?: number;
  gap?: string;
}) {
  return (
    <div
      className={cn("marquee-viewport flex overflow-hidden", className)}
      style={{ "--marquee-duration": `${duration}s`, "--marquee-gap": gap } as React.CSSProperties}
    >
      <div
        className={cn("marquee-track flex w-max items-center", trackClassName)}
        style={{ gap }}
      >
        <div className="flex items-center" style={{ gap }}>
          {items}
        </div>
        <div className="flex items-center" style={{ gap }} aria-hidden>
          {items}
        </div>
      </div>
    </div>
  );
}
