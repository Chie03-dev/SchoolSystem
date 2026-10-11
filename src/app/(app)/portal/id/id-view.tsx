"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Switch } from "@/components/portal/switch";
import { Tilt } from "@/components/motion/tilt";
import { StudentIdCard } from "@/components/portal/student-id-card";
import { student } from "@/data/student";

export function StudentIdView() {
  const [hologram, setHologram] = useState(true);

  return (
    <div className="space-y-6">
      <Reveal className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Digital student ID
          </h2>
          <p className="mt-1 text-sm text-ink-muted">
            Present at campus gates, the library, and school events
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-sm text-ink-muted">Holographic sheen</span>
          <Switch checked={hologram} onCheckedChange={setHologram} label="Holographic sheen" />
        </div>
      </Reveal>

      <Reveal delay={0.05} className="flex justify-center">
        <Tilt intensity={6} className="rounded-2xl">
          <StudentIdCard hologram={hologram} />
        </Tilt>
      </Reveal>

      <section className="grid gap-4 sm:grid-cols-3">
        <Reveal delay={0.1} className="rounded-xl border border-hairline bg-surface p-4 shadow-warm">
          <p className="text-[11px] tracking-wide text-ink-muted uppercase">Student ID</p>
          <p className="mt-1 font-mono text-sm font-semibold">{student.id}</p>
        </Reveal>
        <Reveal delay={0.15} className="rounded-xl border border-hairline bg-surface p-4 shadow-warm">
          <p className="text-[11px] tracking-wide text-ink-muted uppercase">Valid through</p>
          <p className="mt-1 text-sm font-semibold">End of S.Y. 2026–2027</p>
        </Reveal>
        <Reveal delay={0.2} className="rounded-xl border border-hairline bg-surface p-4 shadow-warm">
          <p className="text-[11px] tracking-wide text-ink-muted uppercase">Emergency contact</p>
          <p className="mt-1 text-sm font-semibold">Guardian · on file</p>
        </Reveal>
      </section>
    </div>
  );
}
