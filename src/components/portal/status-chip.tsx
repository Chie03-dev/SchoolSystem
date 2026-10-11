import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const tones = {
  ok: "bg-ok/12 text-ok-deep",
  warn: "bg-warn/12 text-warn-deep",
  danger: "bg-danger/12 text-danger",
  clay: "bg-clay/12 text-clay-hover",
  sage: "bg-sage/12 text-sage-deep",
  teal: "bg-viz-teal/12 text-viz-teal-deep",
  neutral: "bg-surface-2 text-ink-muted",
} as const;

export type StatusTone = keyof typeof tones;

/** Tinted status pill (present / late / enrolled / ...). */
export function StatusChip({
  tone = "neutral",
  icon: Icon,
  children,
  className,
}: {
  tone?: StatusTone;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 rounded-full px-2.5 text-xs font-medium whitespace-nowrap",
        tones[tone],
        className
      )}
    >
      {Icon ? <Icon className="size-3" aria-hidden /> : null}
      {children}
    </span>
  );
}
