"use client";

import { useState } from "react";
import {
  BellRing,
  CalendarClock,
  CheckCheck,
  FileCheck2,
  Megaphone,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { notifications as seed } from "@/data/student";
import { cn } from "@/lib/utils";

const kindMeta = {
  grade: { icon: TrendingUp, tone: "text-clay" },
  fee: { icon: Wallet, tone: "text-sage-deep" },
  attendance: { icon: CalendarClock, tone: "text-warn-deep" },
  announcement: { icon: Megaphone, tone: "text-ink-muted" },
  request: { icon: FileCheck2, tone: "text-ok" },
} as const;

interface Item {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  kind: keyof typeof kindMeta;
}

export function NotificationsView() {
  const [items, setItems] = useState<Item[]>(seed);

  const unread = items.filter((item) => !item.read).length;

  const markAllRead = () => {
    setItems((current) => current.map((item) => ({ ...item, read: true })));
    toast.success("All caught up", { description: "Every notification marked as read." });
  };

  return (
    <div className="space-y-6">
      <Reveal className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Notifications
          </h2>
          <p className="mt-1 text-sm text-ink-muted">
            {unread > 0 ? `${unread} unread` : "All read"} · grades, fees,
            attendance, and school alerts
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={markAllRead} disabled={unread === 0}>
          <CheckCheck aria-hidden />
          Mark all read
        </Button>
      </Reveal>

      <section className="overflow-hidden rounded-xl border border-hairline bg-surface shadow-warm">
        <ul className="divide-y divide-hairline">
          {items.map((item, index) => {
            const meta = kindMeta[item.kind];
            return (
              <li
                key={item.id}
                className={cn("flex gap-3 px-4 py-3.5", !item.read && "bg-clay/5")}
              >
                <Reveal delay={Math.min(index, 5) * 0.04} className="flex flex-1 gap-3">
                  <span
                    className={cn(
                      "mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-surface-2",
                      meta.tone
                    )}
                  >
                    <meta.icon className="size-4" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-sm font-medium">{item.title}</p>
                      <span className="shrink-0 text-[11px] text-ink-faint">{item.time}</span>
                    </div>
                    <p className="mt-0.5 text-sm text-ink-muted">{item.body}</p>
                  </div>
                </Reveal>
                {!item.read ? (
                  <span
                    aria-label="Unread"
                    className="mt-2 size-2 shrink-0 rounded-full bg-clay"
                  />
                ) : null}
              </li>
            );
          })}
        </ul>
        {unread === 0 ? (
          <li className="flex items-center justify-center gap-2 px-4 py-5 text-sm text-ink-muted">
            <BellRing className="size-4" aria-hidden />
            You are all caught up.
          </li>
        ) : null}
      </section>
    </div>
  );
}
