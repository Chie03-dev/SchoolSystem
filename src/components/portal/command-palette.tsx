"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  CalendarDays,
  FileText,
  IdCard,
  Megaphone,
  Search,
  Wallet,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { portalNav } from "./nav-items";
import { student } from "@/data/student";
import { formatPHP } from "@/lib/format";
import { cn } from "@/lib/utils";

interface Command {
  id: string;
  label: string;
  hint?: string;
  group: "Navigate" | "Actions";
  icon: typeof Search;
  run: () => void;
}

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const commands = useMemo<Command[]>(() => {
    const navigate: Command[] = [
      ...portalNav.map((item) => ({
        id: `nav-${item.href}`,
        label: item.label,
        hint: item.href.replace("/portal/", "/"),
        group: "Navigate" as const,
        icon: item.icon,
        run: () => router.push(item.href),
      })),
      {
        id: "nav-profile",
        label: "Profile",
        hint: "/profile",
        group: "Navigate" as const,
        icon: IdCard,
        run: () => router.push("/portal/profile"),
      },
    ];

    const actions: Command[] = [
      {
        id: "action-pay",
        label: "Pay remaining balance",
        hint: formatPHP(student.balance),
        group: "Actions" as const,
        icon: Wallet,
        run: () => router.push("/portal/fees"),
      },
      {
        id: "action-download",
        label: "Download Form 138 (Q1)",
        hint: "Grades",
        group: "Actions" as const,
        icon: FileText,
        run: () => router.push("/portal/grades"),
      },
      {
        id: "action-schedule",
        label: "Export class schedule",
        hint: ".ics",
        group: "Actions" as const,
        icon: CalendarDays,
        run: () => router.push("/portal/schedule"),
      },
      {
        id: "action-announcements",
        label: "Read school announcements",
        group: "Actions" as const,
        icon: Megaphone,
        run: () => router.push("/portal/announcements"),
      },
    ];

    return [...navigate, ...actions];
  }, [router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (command) =>
        command.label.toLowerCase().includes(q) ||
        command.hint?.toLowerCase().includes(q)
    );
  }, [commands, query]);

  const groups = filtered.reduce<Record<string, Command[]>>((acc, command) => {
    acc[command.group] = [...(acc[command.group] ?? []), command];
    return acc;
  }, {});

  const execute = (index: number) => {
    const command = filtered[index];
    if (!command) return;
    command.run();
    setQuery("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="top-[14%] max-w-lg translate-y-0 gap-0 p-0 sm:max-w-lg"
      >
        <DialogTitle className="sr-only">Command palette</DialogTitle>

        <div className="flex items-center gap-2.5 border-b border-hairline px-3.5">
          <Search className="size-4 shrink-0 text-ink-faint" aria-hidden />
          <Input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
              } else if (event.key === "ArrowUp") {
                event.preventDefault();
                setActiveIndex((i) => Math.max(i - 1, 0));
              } else if (event.key === "Enter") {
                event.preventDefault();
                execute(activeIndex);
              }
            }}
            placeholder="Search pages and actions…"
            aria-label="Search pages and actions"
            className="border-0 bg-transparent shadow-none focus-visible:ring-0"
          />
        </div>

        <div
          role="listbox"
          aria-label="Commands"
          className="max-h-72 overflow-y-auto p-1.5"
        >
          {filtered.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-ink-muted">
              No matches for “{query}”
            </p>
          ) : (
            Object.entries(groups).map(([group, items]) => (
              <div key={group} className="mb-1">
                <p className="px-2.5 py-1 text-[11px] font-semibold tracking-wide text-ink-faint uppercase">
                  {group}
                </p>
                {items.map((command) => {
                  const index = filtered.indexOf(command);
                  const active = index === activeIndex;
                  return (
                    <button
                      key={command.id}
                      type="button"
                      role="option"
                      aria-selected={active}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => execute(index)}
                      className={cn(
                        "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors outline-none",
                        active ? "bg-tint text-ink" : "text-ink-muted"
                      )}
                    >
                      <command.icon
                        className={cn(
                          "size-4 shrink-0",
                          active ? "text-clay" : "text-ink-faint"
                        )}
                        aria-hidden
                      />
                      <span className="flex-1 truncate">{command.label}</span>
                      {command.hint ? (
                        <span className="font-mono text-[11px] text-ink-faint">
                          {command.hint}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-between border-t border-hairline px-3.5 py-2 text-[11px] text-ink-faint">
          <span>↑↓ to navigate · ↵ to select · esc to close</span>
          <span className="font-mono">⌘K</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
