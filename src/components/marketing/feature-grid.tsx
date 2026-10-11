import {
  Building2,
  LayoutGrid,
  ScrollText,
  ShieldCheck,
  Users,
  WifiOff,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const features = [
  {
    icon: LayoutGrid,
    title: "Everything in one place",
    body: "Grades, attendance, class schedules, fees, announcements, and the digital student ID — one login, every record.",
  },
  {
    icon: WifiOff,
    title: "Offline-friendly PWA",
    body: "Installable on any phone. Schedules and announcements stay available even when the campus WiFi drops.",
  },
  {
    icon: ShieldCheck,
    title: "Role-based access",
    body: "Students, parents, teachers, cashiers, guidance, and admins each see exactly what they should — nothing more.",
  },
  {
    icon: ScrollText,
    title: "Transparent records",
    body: "Chronological logs for grades, payments, and excuses. Families can trace every change back to its source.",
  },
  {
    icon: Building2,
    title: "Multi-campus ready",
    body: "Campuses, strands, sections, and fee schedules configured per outlet — with cashier reconciliation built in.",
  },
  {
    icon: Users,
    title: "Parents included",
    body: "Guardians follow attendance and balances in real time and approve excuse letters from their own phone.",
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16 sm:py-20">
      <div className="max-w-2xl">
        <p className="eyebrow">The platform</p>
        <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          One portal, every school workflow
        </h2>
        <p className="mt-4 text-ink-muted">
          Marben replaces the spreadsheet sprawl with a single system of
          record — designed for the way Philippine schools actually run.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Reveal key={feature.title} delay={(index % 3) * 0.06}>
            <article className="group h-full rounded-xl border border-hairline bg-surface p-5 shadow-warm transition-shadow hover:shadow-warm-lg">
              <span className="grid size-9 place-items-center rounded-lg bg-tint text-clay">
                <feature.icon className="size-4.5" aria-hidden />
              </span>
              <h3 className="font-display mt-3.5 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-1.5 text-sm text-ink-muted">{feature.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
