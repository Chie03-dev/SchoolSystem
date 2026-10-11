"use client";

import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Traveling accent light along a card's border. Purely decorative — the
 * animation is disabled under prefers-reduced-motion via CSS.
 */
export function BorderBeam({
  className,
  duration = 6,
  color,
  size = "1.5px",
}: {
  className?: string;
  duration?: number;
  color?: string;
  size?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("border-beam", className)}
      style={{
        "--beam-duration": `${duration}s`,
        "--beam-color": color,
        "--beam-size": size,
      } as CSSProperties}
    />
  );
}
