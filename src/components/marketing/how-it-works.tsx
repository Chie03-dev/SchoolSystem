import { ClipboardList, LogIn, MousePointerClick, Printer } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const steps = [
  {
    icon: LogIn,
    title: "Sign in with anything",
    body: "Any email and password are accepted - there is no real authentication behind this form.",
    meta: "instant",
  },
  {
    icon: ClipboardList,
    title: "Tour the screens",
    body: "Dashboard, courses, grades, schedule, attendance, fees, assignments, announcements, notifications, profile, and the digital ID.",
    meta: "12 screens",
  },
  {
    icon: MousePointerClick,
    title: "Click everything",
    body: "Switches, filters, and dialogs all respond - actions confirm with a toast and change demo state only.",
    meta: "safe",
  },
  {
    icon: Printer,
    title: "Print or export",
    body: "Print the Form 138 report card or the fee statement, or download the weekly schedule as .ics.",
    meta: "any time",
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
          <p className="eyebrow">How the demo works</p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Four steps, no setup
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
