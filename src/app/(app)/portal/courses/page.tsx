import Link from "next/link";
import { ArrowUpRight, BookOpen, MapPin, User } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { StatusChip } from "@/components/portal/status-chip";
import { schedule, student, subjects, weekdays } from "@/data/student";
import { computeGwa, formatGrade, remarksForGrade } from "@/lib/grades";

export const metadata = {
  title: "Courses",
  description: "Subjects, teachers, and current grades for this quarter.",
};

const categoryTone = {
  Core: "clay",
  Applied: "sage",
  Specialized: "teal",
} as const;

export default function CoursesPage() {
  const q2 = computeGwa(subjects, "q2") ?? 0;

  return (
    <div className="space-y-6">
      <Reveal>
        <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Courses
        </h2>
        <p className="mt-1 text-sm text-ink-muted">
          {subjects.length} subjects · {student.gradeLevel} {student.strand} ·{" "}
          {student.section} · Q2 average {formatGrade(q2)}
        </p>
      </Reveal>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject, index) => {
          const days = weekdays.filter((day) =>
            schedule[day].some((slot) => slot.subjectCode === subject.code)
          );

          return (
            <Reveal key={subject.code} delay={(index % 3) * 0.05}>
              <Link
                href={`/portal/courses/${subject.code.toLowerCase()}`}
                className="group block h-full rounded-xl border border-hairline bg-surface p-4 shadow-warm transition-shadow hover:shadow-warm-lg"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] text-ink-faint">{subject.code}</span>
                  <StatusChip tone={categoryTone[subject.category]}>
                    {subject.category}
                  </StatusChip>
                </div>

                <h3 className="font-display mt-2 leading-snug font-semibold">{subject.name}</h3>

                <ul className="mt-3 space-y-1 text-xs text-ink-muted">
                  <li className="flex items-center gap-1.5">
                    <User className="size-3.5 text-ink-faint" aria-hidden />
                    {subject.teacherTitle} {subject.teacher}
                  </li>
                  <li className="flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-ink-faint" aria-hidden />
                    {subject.room}
                  </li>
                  <li className="flex items-center gap-1.5">
                    <BookOpen className="size-3.5 text-ink-faint" aria-hidden />
                    {subject.units} units · meets {days.length}× weekly
                  </li>
                </ul>

                <div className="mt-4 flex items-end justify-between border-t border-hairline pt-3">
                  <div>
                    <p className="text-[11px] text-ink-faint">Q2 grade</p>
                    <p className="font-display text-xl leading-none font-semibold tabular-nums">
                      {formatGrade(subject.grades.q2)}
                    </p>
                    <p className="text-[11px] text-ink-muted">
                      {subject.grades.q2 !== null
                        ? remarksForGrade(subject.grades.q2)
                        : "Not yet graded"}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-clay">
                    Open
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </section>
    </div>
  );
}
