import {
  Download,
  GraduationCap,
  IdCard,
  LayoutGrid,
  ScrollText,
  FileText,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const features = [
  {
    icon: LayoutGrid,
    title: "Everything in one place",
    body: "Grades, attendance, class schedules, fees, announcements, and the digital student ID - every student record in one portal.",
  },
  {
    icon: ScrollText,
    title: "Chronological records",
    body: "Daily attendance logs, payment history, and a notification trail - every entry dated and traceable.",
  },
  {
    icon: GraduationCap,
    title: "DepEd-aligned grading",
    body: "Term selector, GWA trend, honors remarks on the SHS scale, and a Form 138 print header on the report card view.",
  },
  {
    icon: FileText,
    title: "Self-service documents",
    body: "Request Form 138, good moral, or enrollment certificates - each request shows status, ETA, and fee.",
  },
  {
    icon: IdCard,
    title: "Digital student ID",
    body: "A QR-ready campus ID with guardian contact and validity, plus a holographic sheen you can toggle.",
  },
  {
    icon: Download,
    title: "Exports that matter",
    body: "The weekly schedule downloads as .ics for any calendar app, and report cards and statements are print-ready.",
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16 sm:py-20">
      <div className="max-w-2xl">
        <p className="eyebrow">What&apos;s inside</p>
        <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Every student-portal screen, working
        </h2>
        <p className="mt-4 text-ink-muted">
          A front-end prototype: twelve screens running on a fixed sample
          dataset - no backend, no real accounts, nothing leaves your browser.
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
