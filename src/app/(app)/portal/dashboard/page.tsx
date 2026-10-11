import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  ClipboardList,
  GraduationCap,
  Megaphone,
  Pin,
  UserRoundCheck,
  Wallet,
} from "lucide-react";
import { ProgressRing } from "@/components/motion/progress-ring";
import { Reveal } from "@/components/motion/reveal";
import { StatCard } from "@/components/portal/stat-card";
import { StatusChip } from "@/components/portal/status-chip";
import { Timeline } from "@/components/portal/timeline";
import { subjectByCode, todaySchedule } from "@/data/dashboard-helpers";
import {
  announcements,
  assignments,
  documentRequests,
  schedule,
  schoolWeek,
  student,
  todayLabel,
  todayWeekday,
} from "@/data/student";
import { formatPHP } from "@/lib/format";

const activeRequests = documentRequests.filter(
  (request) => request.status !== "ready"
).length;

const readyRequests = documentRequests.filter(
  (request) => request.status === "ready"
).length;

const upcomingAssignments = assignments
  .filter((assignment) => assignment.status !== "graded")
  .slice(0, 4);

export default function DashboardPage() {
  const classes = todaySchedule();

  return (
    <div className="space-y-6">
      <Reveal className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm text-ink-muted">
            {todayLabel} · {schoolWeek}
          </p>
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Welcome back, {student.firstName}
          </h2>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <StatusChip tone="clay" icon={GraduationCap}>
              {student.gradeLevel} · {student.strand} · {student.section}
            </StatusChip>
            <StatusChip tone="ok" icon={UserRoundCheck}>
              Enrolled
            </StatusChip>
          </div>
        </div>
        <Link
          href="/portal/id"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-clay underline-offset-2 hover:underline"
        >
          View student ID
          <ArrowUpRight className="size-4" aria-hidden />
        </Link>
      </Reveal>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Reveal>
          <StatCard
            label="General average"
            value={student.gwa.toFixed(2)}
            icon={GraduationCap}
            hint={`Rank ${student.rank} of ${student.classSize} · Outstanding`}
          />
        </Reveal>
        <Reveal delay={0.05}>
          <StatCard
            label="Attendance"
            value={`${student.attendanceRate}%`}
            icon={CalendarDays}
            hint="40 school days this quarter"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <StatCard
            label="Balance"
            value={formatPHP(student.balance)}
            icon={Wallet}
            hint={`Due ${student.nextDue}`}
          />
        </Reveal>
        <Reveal delay={0.15}>
          <StatCard
            label="Open requests"
            value={activeRequests}
            icon={ClipboardList}
            hint={readyRequests > 0 ? `${readyRequests} ready for pickup` : "None pending"}
          />
        </Reveal>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <Reveal className="rounded-xl border border-hairline bg-surface shadow-warm">
            <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
              <h3 className="font-display text-lg font-semibold">
                Today&apos;s classes
              </h3>
              <Link
                href="/portal/schedule"
                className="text-xs font-medium text-clay underline-offset-2 hover:underline"
              >
                Full schedule
              </Link>
            </div>
            <ul className="divide-y divide-hairline">
              {classes.map((slot, index) => {
                const subject = subjectByCode(slot.subjectCode);
                const isNext = slot.start === "13:00";
                return (
                  <li key={`${slot.start}-${slot.subjectCode}`} className="flex items-center gap-3 px-4 py-3">
                    <span className="w-20 shrink-0 font-mono text-xs text-ink-muted">
                      {slot.start}
                    </span>
                    <span
                      aria-hidden
                      className={
                        isNext
                          ? "size-2 shrink-0 rounded-full bg-clay"
                          : "size-2 shrink-0 rounded-full bg-hairline-strong"
                      }
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{subject?.name}</p>
                      <p className="truncate text-xs text-ink-muted">
                        {subject?.teacherTitle} {subject?.teacher} · {slot.room}
                      </p>
                    </div>
                    {isNext ? (
                      <StatusChip tone="clay">Up next</StatusChip>
                    ) : index === 0 ? (
                      <StatusChip tone="ok">Done</StatusChip>
                    ) : (
                      <span className="text-[11px] text-ink-faint">Later</span>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="border-t border-hairline px-4 py-2.5 text-xs text-ink-muted">
              {schedule[todayWeekday].find((slot) => slot.type === "homeroom")
                ? "Homeroom follows at 4:00 PM · Room 118"
                : "No homeroom today"}
            </div>
          </Reveal>

          <Reveal delay={0.05} className="mt-6 rounded-xl border border-hairline bg-surface shadow-warm">
            <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
              <h3 className="font-display text-lg font-semibold">Upcoming deadlines</h3>
              <Link
                href="/portal/assignments"
                className="text-xs font-medium text-clay underline-offset-2 hover:underline"
              >
                All assignments
              </Link>
            </div>
            <ul className="divide-y divide-hairline">
              {upcomingAssignments.map((assignment) => (
                <li key={assignment.id} className="flex items-center gap-3 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{assignment.title}</p>
                    <p className="truncate text-xs text-ink-muted">
                      {subjectByCode(assignment.subjectCode)?.shortName} ·{" "}
                      {assignment.weight}
                    </p>
                  </div>
                  <span className="hidden text-xs text-ink-muted sm:block">
                    Due {assignment.due}
                  </span>
                  <StatusChip
                    tone={
                      assignment.status === "submitted"
                        ? "ok"
                        : assignment.status === "in-progress"
                          ? "warn"
                          : "neutral"
                    }
                  >
                    {assignment.status === "in-progress"
                      ? "In progress"
                      : assignment.status === "submitted"
                        ? "Submitted"
                        : "Not started"}
                  </StatusChip>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section className="space-y-6">
          <Reveal delay={0.05} className="rounded-xl border border-hairline bg-surface p-4 shadow-warm">
            <h3 className="font-display text-lg font-semibold">Attendance</h3>
            <div className="mt-2 flex items-center gap-4">
              <ProgressRing
                value={student.attendanceRate}
                size={92}
                label={`${student.attendanceRate}%`}
                sublabel="this quarter"
              />
              <div className="text-sm text-ink-muted">
                <p>
                  <span className="font-semibold text-ink">2 lates</span> · 1
                  excused absence
                </p>
                <p className="mt-1 text-xs">Keep it up - no unexcused absences.</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="rounded-xl border border-hairline bg-surface shadow-warm">
            <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
              <h3 className="font-display text-lg font-semibold">Announcements</h3>
              <Link
                href="/portal/announcements"
                className="text-xs font-medium text-clay underline-offset-2 hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="px-4 py-3">
              <Timeline
                items={announcements.slice(0, 3).map((item) => ({
                  title: item.title,
                  time: item.date,
                  body: item.body,
                  icon: <Pin className="size-3 text-clay" aria-hidden />,
                }))}
              />
            </div>
          </Reveal>

          <Reveal delay={0.15} className="rounded-xl border border-clay/20 bg-clay/8 p-4">
            <div className="flex items-start gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-clay text-primary-foreground">
                <Megaphone className="size-4.5" aria-hidden />
              </span>
              <div>
                <h3 className="font-display text-base font-semibold">
                  Settle before October 15
                </h3>
                <p className="mt-1 text-sm text-ink-muted">
                  {formatPHP(student.balance)} remaining for the digital student
                  ID. Pay online or at the cashier.
                </p>
                <Link
                  href="/portal/fees"
                  className="mt-2.5 inline-flex items-center gap-1.5 text-sm font-medium text-clay underline-offset-2 hover:underline"
                >
                  Go to fees
                  <ArrowUpRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
