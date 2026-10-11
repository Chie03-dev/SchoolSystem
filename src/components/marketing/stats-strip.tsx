import { CalendarCheck2, School, Wallet } from "lucide-react";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { Reveal } from "@/components/motion/reveal";

const stats = [
  {
    label: "Schools on Marben",
    value: 128,
    variant: "number" as const,
    icon: School,
    hint: "across 14 provinces",
  },
  {
    label: "Students served",
    value: 84000,
    variant: "number" as const,
    icon: CalendarCheck2,
    hint: "JHS, SHS & college",
  },
  {
    label: "Fees collected / month",
    value: 12800000,
    variant: "php" as const,
    icon: Wallet,
    hint: "verified, reconciled",
  },
];

export function StatsStrip() {
  return (
    <section aria-label="Marben by the numbers" className="border-y border-hairline bg-surface-2/60">
      <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-hairline px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {stats.map((stat, index) => (
          <Reveal
            key={stat.label}
            delay={index * 0.06}
            className="flex items-center gap-4 px-1 py-6 sm:px-8"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-clay/10 text-clay">
              <stat.icon className="size-5" aria-hidden />
            </span>
            <div>
              <p className="font-display text-3xl leading-none font-semibold tabular-nums text-ink">
                <AnimatedCounter value={stat.value} variant={stat.variant} />
              </p>
              <p className="mt-1.5 text-sm font-medium text-ink-muted">{stat.label}</p>
              <p className="text-xs text-ink-faint">{stat.hint}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
