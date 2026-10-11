import {
  BookOpenCheck,
  CalendarCheck2,
  ClipboardList,
  IdCard,
  LayoutGrid,
  Wallet,
} from "lucide-react";
import { StatusChip } from "@/components/portal/status-chip";
import { formatPHP } from "@/lib/format";

const tiles = [
  { label: "GWA", value: "91.25", icon: BookOpenCheck },
  { label: "Attendance", value: "97.5%", icon: CalendarCheck2 },
  { label: "Balance", value: formatPHP(2480), icon: Wallet },
  { label: "Excuses", value: "1 pending", icon: ClipboardList },
];

const schedule = [
  {
    time: "1:00 PM",
    subject: "Statistics and Probability",
    room: "Room 214",
    tone: "clay" as const,
    label: "Up next",
  },
  {
    time: "2:30 PM",
    subject: "Komunikasyon at Pananaliksik",
    room: "Room 202",
    tone: "neutral" as const,
    label: "Later",
  },
  {
    time: "4:00 PM",
    subject: "Homeroom",
    room: "Room 118",
    tone: "neutral" as const,
    label: "Later",
  },
];

/** Static mini-portal mockup shown inside the hero browser frame. */
export function PortalPreview() {
  return (
    <div className="flex">
      <nav aria-hidden className="hidden w-12 shrink-0 flex-col items-center gap-3 border-r border-hairline bg-surface py-4 sm:flex">
        <span className="grid size-7 place-items-center rounded-md bg-clay/10 text-clay">
          <LayoutGrid className="size-4" />
        </span>
        <span className="grid size-7 place-items-center rounded-md text-ink-faint">
          <BookOpenCheck className="size-4" />
        </span>
        <span className="grid size-7 place-items-center rounded-md text-ink-faint">
          <CalendarCheck2 className="size-4" />
        </span>
        <span className="grid size-7 place-items-center rounded-md text-ink-faint">
          <IdCard className="size-4" />
        </span>
      </nav>

      <div className="min-w-0 flex-1 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-[11px] text-ink-muted">Friday, October 9, 2026</p>
            <p className="font-display text-base font-semibold sm:text-lg">
              Welcome back, Althea
            </p>
          </div>
          <div className="flex items-center gap-2">
            <StatusChip tone="ok">On track</StatusChip>
            <StatusChip tone="clay" icon={IdCard}>
              STEM · A
            </StatusChip>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {tiles.map((tile) => (
            <div
              key={tile.label}
              className="rounded-lg border border-hairline bg-surface p-2.5"
            >
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-medium tracking-wide text-ink-muted uppercase">
                  {tile.label}
                </p>
                <tile.icon className="size-3.5 text-ink-faint" aria-hidden />
              </div>
              <p className="mt-1 font-display text-lg leading-tight font-semibold tabular-nums">
                {tile.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-lg border border-hairline bg-surface">
          <div className="flex items-center justify-between border-b border-hairline px-3 py-2">
            <p className="text-xs font-semibold">Today&apos;s schedule</p>
            <p className="text-[11px] text-ink-muted">Grade 11 · Q2</p>
          </div>
          <ul className="divide-y divide-hairline">
            {schedule.map((row) => (
              <li key={row.subject} className="flex items-center gap-3 px-3 py-2">
                <span className="font-mono text-[11px] text-ink-muted">{row.time}</span>
                <span className="min-w-0 flex-1 truncate text-xs font-medium">
                  {row.subject}
                </span>
                <span className="hidden text-[11px] text-ink-faint sm:inline">{row.room}</span>
                {row.tone === "clay" ? (
                  <StatusChip tone={row.tone}>{row.label}</StatusChip>
                ) : (
                  <span className="text-[11px] text-ink-faint">{row.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
