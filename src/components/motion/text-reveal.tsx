import { Fragment } from "react";
import { cn } from "@/lib/utils";

/**
 * Word-by-word rise reveal for display headings, using a pure CSS animation
 * (no JS runtime). Under prefers-reduced-motion the words render static.
 */
export function TextReveal({
  text,
  className,
  wordClassName,
  delay = 0,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
}) {
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span
            className="word-rise inline-block overflow-hidden pb-[0.08em] align-bottom"
            style={{ animationDelay: `${delay + i * 0.05}s` }}
          >
            <span className={cn("inline-block", wordClassName)}>{word}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
