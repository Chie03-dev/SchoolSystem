import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  ArrowLeft,
  CalendarDays,
  ClipboardList,
  MapPin,
  MessageSquare,
  User,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { IcsDownloadButton } from "@/components/portal/ics-download-button";
import { StatusChip } from "@/components/portal/status-chip";
import { ProgressRing } from "@/components/motion/progress-ring";
import { RequestDocumentButton } from "@/components/portal/request-document-button";
import { subjectByCode } from "@/data/dashboard-helpers";
import { assignments, schedule, subjects, weekdays } from "@/data/student";
import { attendanceRate, formatGrade, remarksForGrade } from "@/lib/grades";
import { formatTime } from "@/lib/format";

export async function generateStaticParams() {
  return subjects.map((subject) => ({ id: subject.code.toLowerCase() }));
}

export async function generateMetadata({ params }: PageProps<"/portal/courses/[id]">) {
  "use cache";
  const { id } = await params;
  const subject = subjectByCode(id.toUpperCase());
  return {
    title: subject ? subject.shortName : "Course",
    description: subject?.description,
  };
}

const assignmentStatusTone = {
  submitted: "ok",
  graded: "sage",
  "in-progress": "warn",
  "not-started": "neutral",
} as const;

export default function CourseDetailPage({ params }: PageProps<"/portal/courses/[id]">) {
  return (
    <Suspense fallback={<CourseDetailFallback />}>
      <CourseDetail params={params} />
    </Suspense>
  );
}

function CourseDetailFallback() {
  return (
    <div className="space-y-6" aria-busy="true">
      <div className="h-5 w-32 rounded bg-surface-2" />
      <div className="h-10 w-2/3 max-w-md rounded bg-surface-2" />
      <div className="grid gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-20 rounded-xl border border-hairline bg-surface-2/60" />
        ))}
      </div>
      <div className="h-72 rounded-xl border border-hairline bg-surface-2/60" />
    </div>
  );
}

async function CourseDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const subject = subjectByCode(id.toUpperCase());
  if (!subject) notFound();

  const slots = weekdays
    .flatMap((day) =>
      schedule[day]
        .filter((slot) => slot.subjectCode === subject.code)
        .map((slot) => ({ ...slot, day }))
    )
    .sort((a, b) => a.start.localeCompare(b.start));

  const subjectAssignments = assignments.filter(
    (assignment) => assignment.subjectCode === subject.code
  );

  const rate = attendanceRate(subject.attendance);

  return (
    <div className="space-y-6">
      <Reveal>
        <Link
          href="/portal/courses"
          className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-4" aria-hidden />
          All courses
        </Link>

        <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] text-ink-faint">{subject.code}</span>
              <StatusChip tone="clay">{subject.category}</StatusChip>
              <StatusChip tone="neutral">{subject.units} units</StatusChip>
            </div>
            <h2 className="font-display mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              {subject.name}
            </h2>
            <p className="mt-2 text-sm text-ink-muted">{subject.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <RequestDocumentButton />
            <IcsDownloadButton />
          </div>
        </div>
      </Reveal>

      <section className="grid gap-4 sm:grid-cols-3">
        <Reveal>
          <div className="flex h-full items-center gap-3 rounded-xl border border-hairline bg-surface p-4 shadow-warm">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-clay/10 text-clay">
              <User className="size-4.5" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] tracking-wide text-ink-muted uppercase">Teacher</p>
              <p className="truncate text-sm font-medium">
                {subject.teacherTitle} {subject.teacher}
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="flex h-full items-center gap-3 rounded-xl border border-hairline bg-surface p-4 shadow-warm">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-clay/10 text-clay">
              <MapPin className="size-4.5" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] tracking-wide text-ink-muted uppercase">Room</p>
              <p className="truncate text-sm font-medium">{subject.room}</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex h-full items-center gap-3 rounded-xl border border-hairline bg-surface p-4 shadow-warm">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-clay/10 text-clay">
              <CalendarDays className="size-4.5" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] tracking-wide text-ink-muted uppercase">Meets</p>
              <p className="truncate text-sm font-medium">
                {[...new Set(slots.map((slot) => slot.day))].join(" · ")}
                {slots.length > 0
                  ? ` · ${formatTime(Number(slots[0].start.split(":")[0]), Number(slots[0].start.split(":")[1]))}`
                  : " · -"}
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <Reveal delay={0.05} className="rounded-xl border border-hairline bg-surface p-4 shadow-warm lg:col-span-2">
          <h3 className="font-display text-lg font-semibold">Grades</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {[
              { term: "Q1", value: subject.grades.q1, note: "Final · Aug 14, 2026" },
              { term: "Q2", value: subject.grades.q2, note: "In progress · 8 of 10 weeks" },
            ].map((entry) => (
              <div
                key={entry.term}
                className="rounded-lg border border-hairline bg-surface-2/60 p-3"
              >
                <div className="flex items-center justify-between">
                  <p className="font-mono text-xs text-ink-muted">{entry.term}</p>
                  <StatusChip tone={entry.term === "Q1" ? "sage" : "clay"}>
                    {entry.term === "Q1" ? "Final" : "Current"}
                  </StatusChip>
                </div>
                <p className="font-display mt-1.5 text-3xl leading-none font-semibold tabular-nums">
                  {formatGrade(entry.value)}
                </p>
                <p className="mt-1 text-xs text-ink-muted">
                  {entry.value !== null ? remarksForGrade(entry.value) : "-"} · {entry.note}
                </p>
              </div>
            ))}
          </div>

          <h3 className="font-display mt-6 text-lg font-semibold">Weekly slots</h3>
          <ul className="mt-2 divide-y divide-hairline">
            {slots.map((slot) => (
              <li key={`${slot.day}-${slot.start}`} className="flex items-center gap-3 py-2">
                <span className="w-10 font-mono text-xs text-ink-muted">{slot.day}</span>
                <span className="font-mono text-xs">
                  {formatTime(Number(slot.start.split(":")[0]), Number(slot.start.split(":")[1]))} –{" "}
                  {formatTime(Number(slot.end.split(":")[0]), Number(slot.end.split(":")[1]))}
                </span>
                <span className="ml-auto text-xs text-ink-muted">{slot.room}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={0.1} className="rounded-xl border border-hairline bg-surface p-4 shadow-warm">
            <h3 className="font-display text-lg font-semibold">Attendance</h3>
            <div className="mt-2 flex items-center gap-4">
              <ProgressRing
                value={rate}
                size={84}
                thickness={7}
                label={`${rate}%`}
                sublabel="attended"
              />
              <div className="grid grid-cols-3 gap-x-4 gap-y-1 text-xs">
                <span className="text-ink-muted">Present</span>
                <span className="text-right font-semibold tabular-nums">{subject.attendance.present}</span>
                <span />
                <span className="text-ink-muted">Late</span>
                <span className="text-right font-semibold tabular-nums">{subject.attendance.late}</span>
                <span />
                <span className="text-ink-muted">Absent</span>
                <span className="text-right font-semibold tabular-nums">{subject.attendance.absent}</span>
                <span />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="rounded-xl border border-hairline bg-surface shadow-warm">
            <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
              <h3 className="font-display text-lg font-semibold">Assignments</h3>
              <ClipboardList className="size-4 text-ink-faint" aria-hidden />
            </div>
            {subjectAssignments.length === 0 ? (
              <p className="px-4 py-5 text-sm text-ink-muted">
                No assignments posted for this subject yet.
              </p>
            ) : (
              <ul className="divide-y divide-hairline">
                {subjectAssignments.map((assignment) => (
                  <li key={assignment.id} className="px-4 py-3">
                    <p className="text-sm font-medium">{assignment.title}</p>
                    <p className="mt-0.5 text-xs text-ink-muted">
                      Due {assignment.due} · {assignment.weight}
                    </p>
                    <div className="mt-1.5">
                      <StatusChip tone={assignmentStatusTone[assignment.status]}>
                        {assignment.status.replace("-", " ")}
                      </StatusChip>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>

          <Reveal delay={0.2} className="rounded-xl border border-clay/20 bg-clay/8 p-4">
            <h3 className="font-display flex items-center gap-2 text-base font-semibold">
              <MessageSquare className="size-4 text-clay" aria-hidden />
              Message your teacher
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              Questions about a grade or an absence? Teachers reply within one
              school day.
            </p>
            <div className="mt-2.5">
              <RequestDocumentButton label="Request grade clarification" variant="outline" />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
