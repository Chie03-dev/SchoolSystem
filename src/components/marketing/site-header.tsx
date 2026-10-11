import Link from "next/link";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#schools", label: "Schools" },
];

export function SiteHeader() {
  return (
    <header data-print-hide className="sticky top-0 z-40 border-b border-hairline bg-paper">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5">
        <Link href="/" className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="grid size-7 place-items-center rounded-md bg-clay font-display text-sm font-semibold text-primary-foreground"
          >
            M
          </span>
          <span className="font-display text-lg leading-none font-semibold tracking-tight">
            Marben
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 text-sm md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" nativeButton={false} render={<Link href="/login" />}>
            Sign in
          </Button>
          <Button size="sm" nativeButton={false} render={<a href="#demo" />}>
            Book a demo
          </Button>
        </div>
      </div>
    </header>
  );
}
