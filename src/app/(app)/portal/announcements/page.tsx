import { Megaphone, Pin } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { StatusChip } from "@/components/portal/status-chip";
import { announcements } from "@/data/student";

export const metadata = {
  title: "Announcements",
  description: "School-wide announcements for students and guardians.",
};

const categoryTone = {
  Academics: "clay",
  Events: "sage",
  Fees: "warn",
  Advisory: "ok",
} as const;

export default function AnnouncementsPage() {
  const sorted = [...announcements].sort(
    (a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned))
  );

  return (
    <div className="space-y-6">
      <Reveal>
        <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Announcements
        </h2>
        <p className="mt-1 text-sm text-ink-muted">
          Posted by the school registrar&apos;s office · {announcements.length} updates
        </p>
      </Reveal>

      <section className="space-y-4">
        {sorted.map((item, index) => (
          <Reveal key={item.id} delay={Math.min(index, 4) * 0.05}>
            <article
              className={`rounded-xl border bg-surface p-4 shadow-warm ${
                item.pinned ? "border-clay/30" : "border-hairline"
              }`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <StatusChip tone={categoryTone[item.category]}>{item.category}</StatusChip>
                <span className="text-[11px] text-ink-muted">{item.date}</span>
                {item.pinned ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-clay">
                    <Pin className="size-3" aria-hidden />
                    Pinned
                  </span>
                ) : null}
              </div>
              <h3 className="font-display mt-2 flex items-center gap-2 text-lg font-semibold">
                {item.pinned ? (
                  <Megaphone className="size-4 text-clay" aria-hidden />
                ) : null}
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm text-ink-muted">{item.body}</p>
            </article>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
