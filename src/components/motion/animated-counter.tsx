"use client";

import { useEffect, useRef, useState } from "react";
import { formatNumber, formatPercent, formatPHPCompact } from "@/lib/format";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

const EASE = (t: number) => 1 - Math.pow(1 - t, 3); // easeOutCubic

/**
 * Counts up to `value` when scrolled into view. SSR renders the final
 * formatted value (hydration-safe); reduced motion skips the count-up.
 * Count-up uses requestAnimationFrame — no animation library.
 */
export function AnimatedCounter({
  value,
  variant = "number",
  decimals = 1,
  duration = 1.2,
  className,
}: {
  value: number;
  variant?: "number" | "percent" | "php";
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotionSafe();
  const [current, setCurrent] = useState(value);
  const [started, setStarted] = useState(false);

  const format = (v: number) => {
    if (variant === "percent") return formatPercent(v, decimals);
    if (variant === "php") return formatPHPCompact(v);
    return formatNumber(Math.round(v));
  };

  useEffect(() => {
    const node = ref.current;
    if (!node || started || reduce) return;

    const run = () => {
      setStarted(true);
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / (duration * 1000));
        setCurrent(value * EASE(t));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          run();
        }
      },
      { rootMargin: "-40px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [duration, reduce, started, value]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {format(current)}
    </span>
  );
}
