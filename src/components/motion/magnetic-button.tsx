"use client";

import { motion, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

const SPRING = { stiffness: 250, damping: 18 } as const;

/**
 * Magnetic hover wrapper for primary CTAs — the content drifts toward the
 * cursor. Mouse only; disabled under prefers-reduced-motion.
 */
export function MagneticButton({
  children,
  className,
  strength = 0.2,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduce = useReducedMotionSafe();
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("inline-flex", className)}
      style={{ x, y }}
      onPointerMove={(event) => {
        if (event.pointerType === "touch") return;
        const rect = event.currentTarget.getBoundingClientRect();
        const dx = (event.clientX - (rect.left + rect.width / 2)) * strength;
        const dy = (event.clientY - (rect.top + rect.height / 2)) * strength;
        x.set(dx);
        y.set(dy);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
