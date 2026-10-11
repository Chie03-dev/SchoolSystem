import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  title: string;
  time?: string;
  body?: string;
  dotClassName?: string;
  icon?: ReactNode;
}

/** Vertical timeline with hairline connector. */
export function Timeline({
  items,
  className,
}: {
  items: TimelineItem[];
  className?: string;
}) {
  return (
    <ol className={cn("relative space-y-6", className)}>
      {items.map((item, index) => (
        <li key={`${item.title}-${index}`} className="relative pl-7">
          {index < items.length - 1 ? (
            <span
              aria-hidden
              className="absolute top-5 left-[9px] bottom-[-1.5rem] w-px bg-hairline"
            />
          ) : null}
          <span
            aria-hidden
            className={cn(
              "absolute top-1 left-0 grid size-[18px] place-items-center rounded-full border border-hairline-strong bg-surface",
              item.dotClassName
            )}
          >
            {item.icon ?? (
              <span className="size-1.5 rounded-full bg-clay" />
            )}
          </span>
          <div className="flex flex-wrap items-baseline gap-x-2">
            <p className="text-sm font-medium text-ink">{item.title}</p>
            {item.time ? (
              <p className="font-mono text-[11px] text-ink-faint">{item.time}</p>
            ) : null}
          </div>
          {item.body ? (
            <p className="mt-0.5 text-sm text-ink-muted">{item.body}</p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
