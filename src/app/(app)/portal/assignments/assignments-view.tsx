"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SegmentedControl } from "@/components/portal/segmented-control";
import { StatusChip } from "@/components/portal/status-chip";
import { subjectByCode } from "@/data/dashboard-helpers";
import { assignments, student } from "@/data/student";

const filters = [
  { value: "all", label: "All" },
  { value: "not-started", label: "Not started" },
  { value: "in-progress", label: "In progress" },
  { value: "submitted", label: "Submitted" },
  { value: "graded", label: "Graded" },
] as const;

const statusTone = {
  submitted: "ok",
  graded: "sage",
  "in-progress": "warn",
  "not-started": "neutral",
} as const;

const statusLabel = {
  submitted: "Submitted",
  graded: "Graded",
  "in-progress": "In progress",
  "not-started": "Not started",
} as const;

export function AssignmentsView() {
  const [filter, setFilter] = useState<(typeof filters)[number]["value"]>("all");

  const visible = useMemo(
    () =>
      filter === "all"
        ? assignments
        : assignments.filter((assignment) => assignment.status === filter),
    [filter]
  );

  const counts = useMemo(
    () => ({
      all: assignments.length,
      "not-started": assignments.filter((a) => a.status === "not-started").length,
      "in-progress": assignments.filter((a) => a.status === "in-progress").length,
      submitted: assignments.filter((a) => a.status === "submitted").length,
      graded: assignments.filter((a) => a.status === "graded").length,
    }),
    []
  );

  return (
    <div className="space-y-6">
      <Reveal className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Assignments
          </h2>
          <p className="mt-1 text-sm text-ink-muted">
            Quarter 2 · {counts.submitted + counts.graded} of {counts.all} submitted
          </p>
        </div>
        <SegmentedControl
          ariaLabel="Filter assignments"
          options={filters.map((f) => ({
            value: f.value,
            label: `${f.label} · ${counts[f.value as keyof typeof counts]}`,
          }))}
          value={filter}
          onValueChange={setFilter}
        />
      </Reveal>

      <section className="space-y-3">
        {visible.length === 0 ? (
          <Reveal className="rounded-xl border border-hairline bg-surface p-8 text-center shadow-warm">
            <p className="text-sm text-ink-muted">
              Nothing here. Nice work staying on top of things, {student.firstName}.
            </p>
          </Reveal>
        ) : (
          visible.map((assignment, index) => {
            const subject = subjectByCode(assignment.subjectCode);
            return (
              <Reveal key={assignment.id} delay={Math.min(index, 4) * 0.04}>
                <article className="rounded-xl border border-hairline bg-surface p-4 shadow-warm">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] text-ink-faint">
                          {assignment.subjectCode}
                        </span>
                        <span className="text-[11px] text-ink-muted">
                          {subject?.shortName}
                        </span>
                      </div>
                      <h3 className="font-display mt-1 font-semibold">{assignment.title}</h3>
                      <p className="mt-0.5 text-xs text-ink-muted">
                        Due {assignment.due} · {assignment.weight}
                      </p>
                      {assignment.note ? (
                        <p className="mt-1 text-xs text-ink-faint">{assignment.note}</p>
                      ) : null}
                    </div>
                    <StatusChip tone={statusTone[assignment.status]}>
                      {statusLabel[assignment.status]}
                    </StatusChip>
                  </div>
                </article>
              </Reveal>
            );
          })
        )}
      </section>
    </div>
  );
}
