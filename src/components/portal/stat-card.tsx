import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** Editorial stat tile: label, tabular figure, optional icon and hint. */
export function StatCard({
  label,
  value,
  icon: Icon,
  hint,
  className,
}: {
  label: string;
  value: ReactNode;
  icon?: LucideIcon;
  hint?: string;
  className?: string;
}) {
  return (
    <Card className={cn("gap-1 p-4", className)}>
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium tracking-wide text-ink-muted uppercase">
          {label}
        </p>
        {Icon ? (
          <span className="grid size-7 shrink-0 place-items-center rounded-md bg-clay/10 text-clay">
            <Icon className="size-4" aria-hidden />
          </span>
        ) : null}
      </div>
      <p className="font-display text-2xl leading-tight font-semibold tabular-nums text-ink">
        {value}
      </p>
      {hint ? <p className="text-xs text-ink-muted">{hint}</p> : null}
    </Card>
  );
}
