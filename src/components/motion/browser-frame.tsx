import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Browser chrome frame used to present the product preview on the landing page. */
export function BrowserFrame({
  url = "portal.marben.school",
  children,
  className,
}: {
  url?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-hairline bg-surface shadow-warm-lg",
        className
      )}
    >
      <div className="flex items-center gap-3 border-b border-hairline bg-surface-2 px-3 py-2">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-hairline-strong" />
          <span className="size-2.5 rounded-full bg-hairline-strong" />
          <span className="size-2.5 rounded-full bg-hairline-strong" />
        </div>
        <div className="flex-1 rounded-md bg-surface px-3 py-0.5 text-center font-mono text-[11px] text-ink-faint">
          {url}
        </div>
        <div className="w-10" aria-hidden />
      </div>
      <div className="bg-paper">{children}</div>
    </div>
  );
}
