"use client";

import { useState } from "react";
import { Printer } from "lucide-react";
import { toast } from "sonner";
import { ProgressRing } from "@/components/motion/progress-ring";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { SegmentedControl } from "@/components/portal/segmented-control";
import { StatusChip } from "@/components/portal/status-chip";
import { gwaHistory, student, subjects, terms } from "@/data/student";
import { computeGwa, formatGrade, gradeForTerm, remarksForGrade } from "@/lib/grades";
import type { TermId } from "@/data/student";

const termOptions = terms.map((term) => ({ value: term.id, label: term.label }));

const gradeTone = (grade: number) =>
  grade >= 90 ? "ok" : grade >= 85 ? "sage" : grade >= 80 ? "warn" : "danger";

export function GradesView() {
  const [term, setTerm] = useState<TermId>("q2");
  const activeTerm = terms.find((t) => t.id === term)!;
  const gwa = computeGwa(subjects, term);
  const gradedCount = subjects.filter((s) => gradeForTerm(s, term) !== null).length;

  return (
    <div className="space-y-6">
      <div className="print-only">
        <p className="font-display text-xl font-semibold">{student.school}</p>
        <p className="text-sm">
          Form 138 - Learner&apos;s Progress Report Card · {activeTerm.label} ·
          SY 2026–2027
        </p>
        <p className="text-sm text-ink-muted">
          {student.firstName} {student.lastName} · LRN {student.lrn} ·{" "}
          {student.gradeLevel} {student.strand} · Section {student.section}
        </p>
      </div>

      <Reveal className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Grades
          </h2>
          <p className="mt-1 text-sm text-ink-muted">
            {activeTerm.label} · {activeTerm.range} ·{" "}
            {activeTerm.status === "final" ? "Final" : "In progress"} ·{" "}
            {gradedCount} of {subjects.length} subjects graded
          </p>
        </div>
        <div data-print-hide className="flex flex-wrap items-center gap-2">
          <SegmentedControl
            ariaLabel="Select term"
            options={termOptions}
            value={term}
            onValueChange={setTerm}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast.success("Report card ready", {
                description: "Form 138 (Q1) exported as PDF - demo only.",
              })
            }
          >
            <Printer aria-hidden />
            Download Form 138
          </Button>
        </div>
      </Reveal>

      <section className="grid gap-4 lg:grid-cols-3">
        <Reveal delay={0.05} className="rounded-xl border border-hairline bg-surface p-5 shadow-warm lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <caption className="sr-only">
                Subject grades for {activeTerm.label}
              </caption>
              <thead>
                <tr className="border-b border-hairline text-left">
                  <th scope="col" className="py-2 pr-3 text-xs font-semibold text-ink-muted">
                    Subject
                  </th>
                  <th scope="col" className="py-2 pr-3 text-xs font-semibold text-ink-muted">
                    Teacher
                  </th>
                  <th scope="col" className="py-2 pr-3 text-right text-xs font-semibold text-ink-muted">
                    {activeTerm.label}
                  </th>
                  <th scope="col" className="py-2 text-xs font-semibold text-ink-muted">
                    Remark
                  </th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject) => {
                  const grade = gradeForTerm(subject, term);
                  return (
                    <tr key={subject.code} className="border-b border-hairline last:border-0">
                      <td className="py-2.5 pr-3">
                        <p className="font-medium">{subject.shortName}</p>
                        <p className="font-mono text-[11px] text-ink-faint">{subject.code}</p>
                      </td>
                      <td className="py-2.5 pr-3 text-ink-muted">
                        <span className="hidden sm:inline">
                          {subject.teacherTitle} {subject.teacher}
                        </span>
                        <span className="sm:hidden">{subject.teacher}</span>
                      </td>
                      <td className="py-2.5 pr-3 text-right font-display text-lg font-semibold tabular-nums">
                        {formatGrade(grade)}
                      </td>
                      <td className="py-2.5">
                        {grade !== null ? (
                          <StatusChip tone={gradeTone(grade)}>
                            {remarksForGrade(grade)}
                          </StatusChip>
                        ) : (
                          <span className="text-xs text-ink-faint">Not yet graded</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-hairline-strong">
                  <td className="py-2.5 pr-3 font-semibold" colSpan={2}>
                    General average
                  </td>
                  <td className="py-2.5 pr-3 text-right font-display text-lg font-semibold tabular-nums text-clay">
                    {formatGrade(gwa)}
                  </td>
                  <td className="py-2.5">
                    {gwa !== null ? (
                      <StatusChip tone="clay">{remarksForGrade(gwa)}</StatusChip>
                    ) : null}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={0.1} className="flex flex-col items-center rounded-xl border border-hairline bg-surface p-5 text-center shadow-warm">
            <ProgressRing
              value={gwa ?? 0}
              size={120}
              thickness={6}
              label={formatGrade(gwa)}
              sublabel={`${activeTerm.label} average`}
            />
            <p className="mt-3 text-sm text-ink-muted">
              Rank {student.rank} of {student.classSize} in {student.section}
            </p>
          </Reveal>

          <Reveal delay={0.15} className="rounded-xl border border-hairline bg-surface p-4 shadow-warm">
            <h3 className="font-display text-lg font-semibold">GWA trend</h3>
            <ul className="mt-3 space-y-3">
              {gwaHistory.map((entry) => (
                <li key={entry.term}>
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="text-ink-muted">{entry.term}</span>
                    <span className="font-semibold tabular-nums">{entry.gwa.toFixed(2)}</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface-2">
                    <div
                      className="h-full rounded-full bg-clay"
                      style={{ width: `${((entry.gwa - 75) / 25) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] text-ink-faint">
              Bars are scaled from 75 to 100. DepEd SHS honors use the quarterly
              GWA.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
