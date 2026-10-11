import { School } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Brand tile: clay square with a school glyph. Shared by the marketing
 * header/footer, the portal chrome, and the login page.
 */
export function BrandMark({
  className,
  iconClassName,
}: {
  className?: string;
  iconClassName?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-7 place-items-center rounded-md bg-clay text-primary-foreground",
        className
      )}
    >
      <School
        className={cn("size-4", iconClassName)}
        strokeWidth={2.25}
        aria-hidden
      />
    </span>
  );
}
