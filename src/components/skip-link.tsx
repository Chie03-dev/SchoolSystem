/** Keyboard skip link — visible only when focused. */
export function SkipLink({
  targetId = "main-content",
  label = "Skip to content",
}: {
  targetId?: string;
  label?: string;
}) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-clay focus:px-3.5 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
    >
      {label}
    </a>
  );
}
