"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Settings } from "lucide-react";
import { portalNav } from "./nav-items";
import { student } from "@/data/student";
import { cn } from "@/lib/utils";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function PortalSidebar() {
  const pathname = usePathname();

  return (
    <aside
      data-print-hide
      className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-hairline bg-surface lg:flex"
    >
      <div className="flex h-14 items-center gap-2.5 border-b border-hairline px-5">
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
      </div>

      <nav aria-label="Portal" className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-0.5">
          {portalNav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-tint text-ink"
                      : "text-ink-muted hover:bg-surface-2 hover:text-ink"
                  )}
                >
                  <item.icon
                    className={cn("size-4.5", active ? "text-clay" : "text-ink-faint")}
                    aria-hidden
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-hairline p-3">
        <div className="flex items-center gap-2.5 rounded-lg px-1.5 py-1.5">
          <span
            aria-hidden
            className="grid size-8 shrink-0 place-items-center rounded-full bg-clay/12 font-display text-sm font-semibold text-clay-hover"
          >
            {initials(`${student.firstName} ${student.lastName}`)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{student.firstName}</p>
            <p className="truncate text-xs text-ink-muted">
              {student.gradeLevel} · {student.strand}
            </p>
          </div>
        </div>
        <div className="mt-1 flex gap-1">
          <Link
            href="/portal/profile"
            className="flex flex-1 items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
          >
            <Settings className="size-3.5" aria-hidden />
            Profile
          </Link>
          <Link
            href="/"
            className="flex flex-1 items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
          >
            <LogOut className="size-3.5" aria-hidden />
            Sign out
          </Link>
        </div>
      </div>
    </aside>
  );
}
