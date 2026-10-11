import Link from "next/link";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Student portal", href: "/login" },
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Digital student ID", href: "/login" },
    ],
  },
  {
    title: "Schools",
    links: [
      { label: "Book a demo", href: "#demo" },
      { label: "Multi-campus", href: "#features" },
      { label: "Parent access", href: "#features" },
      { label: "Contact", href: "mailto:hello@marben.school" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help center", href: "#how-it-works" },
      { label: "Status", href: "#demo" },
      { label: "Privacy", href: "#demo" },
      { label: "Terms", href: "#demo" },
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
            <p className="mt-3 max-w-xs text-sm text-ink-muted">
              The student information system Philippine schools can call their
              own. Installable, offline-friendly, and built for every role.
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
          <p>© 2026 Marben. Built for Philippine schools.</p>
          <p>Grades · Attendance · Schedules · Fees · Announcements · Digital ID</p>
        </div>
      </div>
    </footer>
  );
}
