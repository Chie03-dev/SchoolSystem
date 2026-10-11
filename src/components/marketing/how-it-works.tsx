import { ClipboardList, LogIn, Rocket, Settings2 } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const steps = [
  {
    icon: ClipboardList,
    title: "Enroll your students",
    body: "Import or type in strands, sections, subjects, and fee schedules. Marben structures everything for the school year.",
    meta: "Week 1",
  },
  {
    icon: Settings2,
    title: "Configure roles",
    body: "Assign teachers, cashiers, guidance counselors, and admins. Permissions follow your registrar's rules.",
    meta: "Week 1",
  },
  {
    icon: LogIn,
    title: "Families log in",
    body: "Students and guardians get portal accounts — installable on any phone, with attendance and fees visible from day one.",
    meta: "Week 2",
  },
  {
    icon: Rocket,
    title: "Track the school year",
    body: "Gradebooks, attendance, collections, and digital IDs keep running themselves. Export Form 138 whenever needed.",
    meta: "Ongoing",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 border-y border-hairline bg-surface-2/60 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <p className="eyebrow">How it works</p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Live in one school year, not one semester
          </h2>
        </div>

        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="h-full">
              <Reveal delay={index * 0.07} className="h-full">
                <div className="relative h-full rounded-xl border border-hairline bg-surface p-5 shadow-warm">
                  <div className="flex items-center justify-between">
                    <span className="grid size-9 place-items-center rounded-lg bg-clay/10 text-clay">
                      <step.icon className="size-4.5" aria-hidden />
                    </span>
                    <span className="font-mono text-[11px] text-ink-faint">{step.meta}</span>
                  </div>
                  <p className="mt-4 font-mono text-xs text-clay">
                    Step {index + 1}
                  </p>
                  <h3 className="font-display mt-1 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-muted">{step.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
