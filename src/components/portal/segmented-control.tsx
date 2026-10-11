"use client";

import { motion } from "framer-motion";
import { useId, useState } from "react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
}

/**
 * iOS-style segmented control with radiogroup semantics and arrow-key
 * navigation. The indicator slides (layout animation) unless the user
 * prefers reduced motion.
 */
export function SegmentedControl<T extends string>({
  options,
  value,
  onValueChange,
  className,
  optionClassName,
  ariaLabel,
}: {
  options: readonly SegmentedOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
  className?: string;
  optionClassName?: string;
  ariaLabel: string;
}) {
  const reduce = useReducedMotionSafe();
  const layoutId = useId();
  const [focusIndex, setFocusIndex] = useState(() =>
    Math.max(
      0,
      options.findIndex((o) => o.value === value)
    )
  );

  const move = (index: number) => {
    const next = (index + options.length) % options.length;
    setFocusIndex(next);
    onValueChange(options[next].value);
  };

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center gap-1 rounded-lg border border-hairline bg-surface-2 p-1",
        className
      )}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          event.preventDefault();
          move(focusIndex + 1);
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          event.preventDefault();
          move(focusIndex - 1);
        }
      }}
    >
      {options.map((option, index) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={index === focusIndex ? 0 : -1}
            onFocus={() => setFocusIndex(index)}
            onClick={() => {
              setFocusIndex(index);
              onValueChange(option.value);
            }}
            className={cn(
              "relative rounded-md px-3 py-1 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-clay/40",
              active ? "text-ink" : "text-ink-muted hover:text-ink",
              optionClassName
            )}
          >
            {active ? (
              <motion.span
                layout={!reduce}
                layoutId={`segmented-${layoutId}`}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                className="absolute inset-0 rounded-md border border-hairline bg-surface shadow-warm"
              />
            ) : null}
            <span className="relative z-1 whitespace-nowrap">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
