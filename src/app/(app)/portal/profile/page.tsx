import Link from "next/link";
import {
  BadgeCheck,
  BookOpen,
  CalendarDays,
  Fingerprint,
  IdCard,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { StatusChip } from "@/components/portal/status-chip";
import { RequestDocumentButton } from "@/components/portal/request-document-button";
import { guardian, student, subjects } from "@/data/student";
import { computeGwa } from "@/lib/grades";

export const metadata = {
  title: "Profile",
  description: "Student record, guardian contacts, and enrollment details.",
};

export default function ProfilePage() {
  const gwa = computeGwa(subjects, "q2");

  const details = [
    { icon: Fingerprint, label: "LRN", value: student.lrn },
    { icon: IdCard, label: "Student ID", value: student.id },
    { icon: BookOpen, label: "Program", value: `${student.gradeLevel} · ${student.strand} · ${student.section}` },
    { icon: CalendarDays, label: "Enrolled since", value: student.enrolledSince },
    { icon: UserRound, label: "Class adviser", value: student.adviser },
    { icon: CalendarDays, label: "Birth date", value: student.birthDate },
    { icon: BadgeCheck, label: "Blood type", value: student.bloodType },
  ];

  return (
    <div className="space-y-6">
      <Reveal className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Profile
          </h2>
          <p className="mt-1 text-sm text-ink-muted">
            Registrar&apos;s record · verified October 1, 2026
          </p>
        </div>
        <div className="flex gap-2">
          <RequestDocumentButton label="Request records update" />
          <ButtonLink />
        </div>
      </Reveal>

      <section className="grid gap-6 lg:grid-cols-3">
        <Reveal delay={0.05} className="rounded-xl border border-hairline bg-surface p-5 text-center shadow-warm">
          <span
            aria-hidden
            className="mx-auto grid size-20 place-items-center rounded-full bg-clay/12 font-display text-2xl font-semibold text-clay"
          >
            {student.firstName[0]}
            {student.lastName[0]}
          </span>
          <h3 className="font-display mt-3 text-xl font-semibold">
            {student.firstName} {student.lastName}
          </h3>
          <p className="text-sm text-ink-muted">
            {student.gradeLevel} · {student.strand} · {student.section}
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <StatusChip tone="ok" icon={BadgeCheck}>
              Enrolled
            </StatusChip>
            <StatusChip tone="clay">Q2 average {gwa?.toFixed(2)}</StatusChip>
          </div>
          <Link
            href="/portal/id"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-clay underline-offset-2 hover:underline"
          >
            <IdCard className="size-4" aria-hidden />
            View digital student ID
          </Link>
        </Reveal>

        <Reveal delay={0.1} className="rounded-xl border border-hairline bg-surface shadow-warm lg:col-span-2">
          <div className="border-b border-hairline px-4 py-3">
            <h3 className="font-display text-lg font-semibold">Student record</h3>
          </div>
          <div className="grid gap-x-6 gap-y-3.5 p-4 sm:grid-cols-2">
            {details.map((detail) => (
              <div key={detail.label} className="flex items-start gap-2.5">
                <detail.icon className="mt-0.5 size-4 shrink-0 text-ink-faint" aria-hidden />
                <div className="min-w-0">
                  <p className="text-[11px] tracking-wide text-ink-muted uppercase">
                    {detail.label}
                  </p>
                  <p className="text-sm font-medium break-words">{detail.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Reveal delay={0.05} className="rounded-xl border border-hairline bg-surface p-4 shadow-warm">
          <h3 className="font-display text-lg font-semibold">Contact</h3>
          <ul className="mt-3 space-y-3 text-sm">
            <li className="flex items-center gap-2.5">
              <Mail className="size-4 shrink-0 text-ink-faint" aria-hidden />
              <span className="truncate">{student.email}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="size-4 shrink-0 text-ink-faint" aria-hidden />
              <span>{student.phone}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-ink-faint" aria-hidden />
              <span>{student.address}</span>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="rounded-xl border border-hairline bg-surface p-4 shadow-warm">
          <h3 className="font-display text-lg font-semibold">Guardian</h3>
          <div className="mt-3 space-y-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-ink-muted">Name</span>
              <span className="font-medium">{guardian.name}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-ink-muted">Relationship</span>
              <span className="font-medium">{guardian.relationship}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-ink-muted">Phone</span>
              <span className="font-medium">{guardian.phone}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-ink-muted">Occupation</span>
              <span className="font-medium">{guardian.occupation}</span>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

function ButtonLink() {
  return (
    <Link
      href="/portal/grades"
      className="inline-flex h-8 items-center rounded-lg border border-hairline bg-surface px-2.5 text-sm font-medium transition-colors hover:bg-tint"
    >
      Academic record
    </Link>
  );
}
