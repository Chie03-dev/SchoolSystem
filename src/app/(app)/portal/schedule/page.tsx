import { Coffee } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { IcsDownloadButton } from "@/components/portal/ics-download-button";
import { StatusChip } from "@/components/portal/status-chip";
import { subjectByCode } from "@/data/dashboard-helpers";
import { schedule, student, subjects, todayWeekday, weekdays } from "@/data/student";
import { formatTime } from "@/lib/format";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Class schedule",
  description: "Weekly class schedule for Grade 11 STEM-A.",
};

export default function SchedulePage() {
  const timeSlots = Array.from(
    new Set(weekdays.flatMap((day) => schedule[day].map((slot) => slot.start)))
  ).sort();

  return (
    <div className="space-y-6">
      <div className="print-only">
        <p className="font-display text-xl font-semibold">{student.school}</p>
        <p className="text-sm">Class Schedule · Quarter 2 · SY 2026–2027</p>
        <p className="text-sm text-ink-muted">
          {student.firstName} {student.lastName} · {student.gradeLevel}{" "}
          {student.strand} · Section {student.section}
        </p>
      </div>

      <Reveal className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Class schedule
          </h2>
          <p className="mt-1 text-sm text-ink-muted">
            Quarter 2, SY 2026–2027 · {subjects.length} subjects · {student.section}
          </p>
        </div>
        <div data-print-hide>
          <IcsDownloadButton />
        </div>
      </Reveal>

      <Reveal delay={0.05} className="overflow-hidden rounded-xl border border-hairline bg-surface shadow-warm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <caption className="sr-only">Weekly class schedule</caption>
            <thead>
              <tr className="border-b border-hairline">
                <th scope="col" className="w-20 px-3 py-2.5 text-left text-xs font-semibold text-ink-muted">
                  Time
                </th>
                {weekdays.map((day) => (
                  <th
                    key={day}
                    scope="col"
                    className={cn(
                      "px-3 py-2.5 text-left text-xs font-semibold",
                      day === todayWeekday ? "bg-clay/8 text-clay" : "text-ink-muted"
                    )}
                  >
                    {day}
                    {day === todayWeekday ? (
                      <span className="ml-1 font-normal">· today</span>
                    ) : null}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((time) => (
                <tr key={time} className="border-b border-hairline last:border-0">
                  <th scope="row" className="px-3 py-2.5 text-left font-mono text-xs font-medium text-ink-muted">
                    {formatTime(Number(time.split(":")[0]), Number(time.split(":")[1]))}
                  </th>
                  {weekdays.map((day) => {
                    const slot = schedule[day].find((s) => s.start === time);
                    if (!slot) {
                      return (
                        <td key={day} className="px-3 py-2.5">
                          <span className="text-xs text-ink-faint">—</span>
                        </td>
                      );
                    }
                    if (slot.type !== "class") {
                      return (
                        <td key={day} className="px-3 py-2.5">
                          <span className="inline-flex items-center gap-1 text-xs text-ink-faint">
                            <Coffee className="size-3" aria-hidden />
                            {slot.type === "break" ? "Break" : "Homeroom"}
                          </span>
                        </td>
                      );
                    }
                    const subject = subjectByCode(slot.subjectCode);
                    const isToday = day === todayWeekday;
                    return (
                      <td
                        key={day}
                        className={cn("px-2 py-1.5", isToday && "bg-clay/8")}
                      >
                        <div className="rounded-md border border-hairline bg-surface-2/60 px-2 py-1.5">
                          <p className="truncate text-xs font-medium">{subject?.shortName}</p>
                          <p className="truncate text-[11px] text-ink-muted">{slot.room}</p>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject, index) => {
          const days = weekdays.filter((day) =>
            schedule[day].some((slot) => slot.subjectCode === subject.code)
          );
          const times = weekdays
            .flatMap((day) =>
              schedule[day]
                .filter((slot) => slot.subjectCode === subject.code)
                .map((slot) => `${day} ${formatTime(Number(slot.start.split(":")[0]))}`)
            )
            .slice(0, 3);
          return (
            <Reveal key={subject.code} delay={(index % 3) * 0.05}>
              <article className="h-full rounded-xl border border-hairline bg-surface p-4 shadow-warm">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-mono text-[11px] text-ink-faint">{subject.code}</p>
                  <StatusChip tone="neutral">{subject.units} units</StatusChip>
                </div>
                <h3 className="font-display mt-1.5 font-semibold">{subject.shortName}</h3>
                <p className="mt-1 text-xs text-ink-muted">
                  {subject.teacherTitle} {subject.teacher}
                </p>
                <ul className="mt-2 space-y-0.5 text-xs text-ink-muted">
                  {times.map((time) => (
                    <li key={time} className="font-mono">
                      {time}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-[11px] text-ink-faint">
                  Meets {days.length}× per week
                </p>
              </article>
            </Reveal>
          );
        })}
      </section>
    </div>
  );
}
