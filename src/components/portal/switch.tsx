"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

/** iOS-style toggle switch with spring knob. Static under reduced motion. */
export function Switch({
  checked,
  onCheckedChange,
  label,
  className,
  disabled,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  className?: string;
  disabled?: boolean;
}) {
  const reduce = useReducedMotionSafe();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors outline-none focus-visible:ring-3 focus-visible:ring-clay/40 disabled:opacity-50",
        checked ? "border-clay bg-clay" : "border-hairline-strong bg-surface-2",
        className
      )}
    >
      <motion.span
        className="absolute left-0.5 block size-[18px] rounded-full bg-surface shadow-warm"
        animate={{ x: checked ? 20 : 0 }}
        transition={
          reduce
            ? { duration: 0 }
            : { type: "spring", stiffness: 500, damping: 32 }
        }
      />
    </button>
  );
}
