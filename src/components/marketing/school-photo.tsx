import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Campus photo card for the login page — shows the school's building and
 * grounds with a caption scrim.
 */
export function SchoolPhoto({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-hairline shadow-warm-lg",
        className
      )}
    >
      <Image
        src="/school.jpg"
        alt="Maben National High School — main campus building and grounds"
        width={1200}
        height={900}
        sizes="(max-width: 1024px) 100vw, 420px"
        className="h-48 w-full object-cover sm:h-56"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 p-3.5">
        <p className="font-display text-sm leading-tight font-semibold text-primary-foreground">
          Maben National High School
        </p>
        <p className="text-xs text-primary-foreground/80">
          Main Campus · Quezon City
        </p>
      </div>
    </div>
  );
}
