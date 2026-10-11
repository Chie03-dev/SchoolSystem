"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Circular progress indicator. The ring draws itself when scrolled into
 * view; static under prefers-reduced-motion. The slim track uses butt caps -
 * round caps bleed past the arc ends and merge into a notch at high values.
 */
export function ProgressRing({
  value,
  size = 104,
  thickness = 6,
  label,
  sublabel,
  className,
  trackClassName,
  barClassName,
}: {
  value: number;
  size?: number;
  thickness?: number;
  label?: string;
  sublabel?: string;
  className?: string;
  trackClassName?: string;
  barClassName?: string;
}) {
  const reduce = useReducedMotionSafe();
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(100, value));
  const offset = circumference * (1 - pct / 100);

  return (
    <div
      className={cn("relative inline-grid place-items-center", className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={
        label
          ? `${label}${sublabel ? `, ${sublabel}` : ""}`
          : `${pct}%`
      }
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={thickness}
          className={cn("stroke-hairline", trackClassName)}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={thickness}
          strokeLinecap="butt"
          strokeDasharray={circumference}
          className={cn("stroke-clay", barClassName)}
          initial={reduce ? { strokeDashoffset: offset } : { strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: EASE }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          {label ? (
            <p className="text-xl leading-none font-semibold tabular-nums text-ink">
              {label}
            </p>
          ) : null}
          {sublabel ? (
            <p className="mt-1.5 text-[10px] font-medium tracking-[0.12em] text-ink-faint uppercase">
              {sublabel}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
