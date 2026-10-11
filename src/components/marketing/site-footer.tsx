import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";

const columns = [
  {
    title: "Portal",
    links: [
      { label: "Student portal", href: "/login" },
      { label: "What's inside", href: "#features" },
      { label: "How the demo works", href: "#how-it-works" },
    ],
  },
  {
    title: "Student views",
    links: [
      { label: "Grades & report card", href: "/login" },
      { label: "Attendance", href: "/login" },
      { label: "Fees & statement", href: "/login" },
      { label: "Digital student ID", href: "/login" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer data-print-hide className="border-t border-hairline bg-surface-2/60">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/about" className="flex items-center gap-2.5">
              <BrandMark />
              <span className="font-display text-lg leading-none font-semibold tracking-tight">
                Demo
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-ink-muted">
              A front-end student portal prototype - sample data, no backend,
              nothing leaves your browser.
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="text-xs font-semibold tracking-[0.14em] text-ink-faint uppercase">
                {column.title}
              </p>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-muted transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-6 text-xs text-ink-faint">
          <p>© 2026 Demo · Front-end showcase with sample data</p>
          <p>Grades · Attendance · Schedules · Fees · Announcements · Digital ID</p>
        </div>
      </div>
    </footer>
  );
}
