import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#features", label: "What's inside" },
  { href: "#how-it-works", label: "How the demo works" },
];

export function SiteHeader() {
  return (
    <header data-print-hide className="sticky top-0 z-40 border-b border-hairline bg-paper">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5">
        <Link href="/about" className="flex items-center gap-2.5">
          <BrandMark />
          <span className="font-display text-lg leading-none font-semibold tracking-tight">
            Demo
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
          <Button size="sm" nativeButton={false} render={<Link href="/login" />}>
            Open portal
          </Button>
        </div>
      </div>
    </header>
  );
}
