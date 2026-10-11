"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, ChevronDown, LogOut, Search, User } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mobileNav } from "./nav-items";
import { notifications, student } from "@/data/student";
import { cn } from "@/lib/utils";

const titles: Record<string, string> = {
  "/portal/dashboard": "Dashboard",
  "/portal/courses": "Courses",
  "/portal/grades": "Grades",
  "/portal/schedule": "Schedule",
  "/portal/attendance": "Attendance",
  "/portal/fees": "Fees",
  "/portal/assignments": "Assignments",
  "/portal/announcements": "Announcements",
  "/portal/profile": "Profile",
  "/portal/notifications": "Notifications",
  "/portal/id": "Student ID",
};

function currentTitle(pathname: string): string {
  if (titles[pathname]) return titles[pathname];
  if (pathname.startsWith("/portal/courses/")) return "Course detail";
  return "Portal";
}

const unread = notifications.filter((n) => !n.read).length;

export function PortalTopbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header data-print-hide className="sticky top-0 z-20 border-b border-hairline bg-paper">
      <div className="flex h-14 items-center gap-3 px-4 lg:px-6">
        <Link href="/portal/dashboard" className="flex items-center gap-2 lg:hidden">
          <span
            aria-hidden
            className="grid size-7 place-items-center rounded-md bg-clay font-display text-sm font-semibold text-primary-foreground"
          >
            M
          </span>
          <span className="font-display text-base leading-none font-semibold tracking-tight">
            Marben
          </span>
        </Link>

        <h1 className="hidden font-display text-base font-semibold lg:block">
          {currentTitle(pathname)}
        </h1>

        <div className="flex-1" />

        <button
          type="button"
          onClick={onOpenPalette}
          aria-label="Open command palette"
          className="flex h-8 items-center gap-2 rounded-lg border border-hairline bg-surface px-2.5 text-xs text-ink-muted transition-colors hover:bg-tint hover:text-ink sm:w-56 sm:px-3"
        >
          <Search className="size-3.5" aria-hidden />
          <span className="hidden flex-1 text-left sm:block">Search…</span>
          <kbd className="hidden rounded border border-hairline bg-surface-2 px-1.5 font-mono text-[10px] text-ink-faint sm:block">
            ⌘K
          </kbd>
        </button>

        <Link
          href="/portal/notifications"
          aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`}
          className="relative grid size-8 place-items-center rounded-lg text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
        >
          <Bell className="size-4.5" aria-hidden />
          {unread > 0 ? (
            <span className="absolute top-1 right-1 grid size-3.5 place-items-center rounded-full bg-clay text-[9px] font-semibold text-primary-foreground">
              {unread}
            </span>
          ) : null}
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger
            className="flex items-center gap-1.5 rounded-lg p-1 transition-colors hover:bg-surface-2"
          >
            <span className="sr-only">Account menu</span>
            <span
              aria-hidden
              className="grid size-7 place-items-center rounded-full bg-clay/12 font-display text-xs font-semibold text-clay-hover"
            >
              {student.firstName[0]}
              {student.lastName[0]}
            </span>
            <ChevronDown className="size-3.5 text-ink-faint" aria-hidden />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                <p className="text-sm font-medium text-ink">
                  {student.firstName} {student.lastName}
                </p>
                <p className="truncate text-xs font-normal text-ink-muted">
                  {student.email}
                </p>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<Link href="/portal/profile" />}>
              <User aria-hidden />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                toast.success("Signed out", {
                  description: "This was a demo session - no data was stored.",
                });
                router.push("/");
              }}
            >
              <LogOut aria-hidden />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <nav aria-label="Quick sections" className="flex gap-1 overflow-x-auto px-4 pb-2 lg:hidden">
        {mobileNav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors",
                active
                  ? "bg-clay/12 text-clay-hover"
                  : "bg-surface-2 text-ink-muted hover:text-ink"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
