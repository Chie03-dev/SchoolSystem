import { CircleCheck, Clock, TriangleAlert } from "lucide-react";
import { ProgressRing } from "@/components/motion/progress-ring";
import { Reveal } from "@/components/motion/reveal";
import { StatCard } from "@/components/portal/stat-card";
import { StatusChip } from "@/components/portal/status-chip";
import { Timeline } from "@/components/portal/timeline";
import { attendanceLog, student, subjects } from "@/data/student";
import { attendanceRate } from "@/lib/grades";
import { formatDateShort } from "@/lib/format";

export const metadata = {
  title: "Attendance",
  description: "Daily attendance log and per-subject attendance rates.",
};

export default function AttendancePage() {
  const totals = subjects.reduce(
    (acc, subject) => ({
      present: acc.present + subject.attendance.present,
      late: acc.late + subject.attendance.late,
      absent: acc.absent + subject.attendance.absent,
      total: acc.total + subject.attendance.total,
    }),
    { present: 0, late: 0, absent: 0, total: 0 }
  );

  const statusMeta = {
    present: { tone: "ok" as const, label: "Present", icon: CircleCheck },
    late: { tone: "warn" as const, label: "Late", icon: Clock },
    absent: { tone: "danger" as const, label: "Absent", icon: TriangleAlert },
  };

  return (
    <div className="space-y-6">
      <Reveal>
        <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Attendance
        </h2>
        <p className="mt-1 text-sm text-ink-muted">
          Quarter 2, SY 2026–2027 · last updated October 9, 2026
        </p>
      </Reveal>

      <section className="grid gap-4 sm:grid-cols-3">
        <Reveal>
          <StatCard
            label="Present"
            value={totals.present}
            icon={CircleCheck}
            hint={`of ${totals.total} class meetings`}
          />
        </Reveal>
        <Reveal delay={0.05}>
          <StatCard label="Late" value={totals.late} icon={Clock} hint="within 30 minutes of bell" />
        </Reveal>
        <Reveal delay={0.1}>
          <StatCard
            label="Absent"
            value={totals.absent}
            icon={TriangleAlert}
            hint="1 excused with certificate"
          />
        </Reveal>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <Reveal delay={0.05} className="rounded-xl border border-hairline bg-surface shadow-warm lg:col-span-2">
          <div className="border-b border-hairline px-4 py-3">
            <h3 className="font-display text-lg font-semibold">By subject</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <caption className="sr-only">Per-subject attendance</caption>
              <thead>
                <tr className="border-b border-hairline text-left">
                  <th scope="col" className="px-4 py-2 text-xs font-semibold text-ink-muted">
                    Subject
                  </th>
                  <th scope="col" className="px-2 py-2 text-right text-xs font-semibold text-ink-muted">
                    Present
                  </th>
                  <th scope="col" className="px-2 py-2 text-right text-xs font-semibold text-ink-muted">
                    Late
                  </th>
                  <th scope="col" className="px-2 py-2 text-right text-xs font-semibold text-ink-muted">
                    Absent
                  </th>
                  <th scope="col" className="px-4 py-2 text-right text-xs font-semibold text-ink-muted">
                    Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject) => {
                  const rate = attendanceRate(subject.attendance);
                  return (
                    <tr key={subject.code} className="border-b border-hairline last:border-0">
                      <td className="px-4 py-2.5">
                        <p className="font-medium">{subject.shortName}</p>
                        <p className="font-mono text-[11px] text-ink-faint">{subject.code}</p>
                      </td>
                      <td className="px-2 py-2.5 text-right tabular-nums">{subject.attendance.present}</td>
                      <td className="px-2 py-2.5 text-right tabular-nums">{subject.attendance.late}</td>
                      <td className="px-2 py-2.5 text-right tabular-nums">{subject.attendance.absent}</td>
                      <td className="px-4 py-2.5 text-right">
                        <span className="font-semibold tabular-nums">{rate}%</span>
                        <div className="mt-1 ml-auto h-1 w-16 overflow-hidden rounded-full bg-surface-2">
                          <div className="h-full rounded-full bg-sage" style={{ width: `${rate}%` }} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col items-center rounded-xl border border-hairline bg-surface p-5 text-center shadow-warm">
          <ProgressRing
            value={student.attendanceRate}
            size={128}
            label={`${student.attendanceRate}%`}
            sublabel="Q2 attendance"
          />
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <StatusChip tone="ok">{totals.present} present</StatusChip>
            <StatusChip tone="warn">{totals.late} late</StatusChip>
            <StatusChip tone="danger">{totals.absent} absent</StatusChip>
          </div>
          <p className="mt-3 text-xs text-ink-muted">
            Excuses are reviewed by your adviser and require a parent signature
            for absences over two days.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.15} className="rounded-xl border border-hairline bg-surface p-4 shadow-warm">
        <h3 className="font-display px-1 text-lg font-semibold">Daily log</h3>
        <Timeline
          className="mt-3"
          items={attendanceLog.map((entry) => {
            const meta = statusMeta[entry.status];
            return {
              title: `${meta.label} · ${entry.detail}`,
              time: formatDateShort(new Date(`${entry.date}T00:00:00`)),
              icon: <meta.icon className={`size-3 ${entry.status === "present" ? "text-ok" : entry.status === "late" ? "text-warn" : "text-danger"}`} aria-hidden />,
            };
          })}
        />
      </Reveal>
    </div>
  );
}
