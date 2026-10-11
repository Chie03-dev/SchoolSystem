"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { BorderBeam } from "@/components/motion/border-beam";
import { FadeRise } from "@/components/motion/fade-rise";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/portal/switch";
import { Toaster } from "@/components/ui/sonner";
import {
  feeStatement,
  schoolWeek,
  student,
} from "@/data/student";
import { formatPHP } from "@/lib/format";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const fillDemo = () => {
    setEmail(student.email);
    setPassword("demo1234");
    setErrors({});
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: { email?: string; password?: string } = {};
    if (!email.trim()) nextErrors.email = "Enter your school email";
    if (!password.trim()) nextErrors.password = "Enter your password";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      toast.success(`Welcome back, ${student.firstName}`, {
        description: "You are signed in to the Marben demo portal.",
      });
      router.push("/portal/dashboard");
    }, 650);
  };

  return (
    <div className="grid min-h-[100dvh] grid-rows-[auto_1fr] overflow-hidden lg:grid-cols-[1.05fr_0.95fr] lg:grid-rows-1">
      {/* Campus rail - full-bleed photo with warm night-paper scrim */}
      <div className="relative h-44 overflow-hidden sm:h-56 lg:h-auto">
        <Image
          src="/school.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 52vw, 100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/55 to-ink/30 lg:bg-gradient-to-br lg:from-ink/85 lg:via-ink/55 lg:to-ink/75"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,transparent_40%,rgb(28_25_23/0.45)_100%)]"
        />
        <div className="relative flex h-full flex-col justify-between gap-4 p-5 sm:p-8 lg:p-10">
          <FadeRise delay={0.05}>
            <Link
              href="/about"
              className="inline-flex items-center gap-2.5 rounded-md"
            >
              <span
                aria-hidden
                className="grid size-8 place-items-center rounded-md bg-clay font-display text-base font-semibold text-primary-foreground"
              >
                M
              </span>
              <span className="font-display text-xl leading-none font-semibold tracking-tight text-paper">
                Marben
              </span>
            </Link>
          </FadeRise>

          <div className="lg:hidden">
            <p className="text-sm font-semibold text-paper">
              {student.school}
            </p>
            <p className="mt-0.5 text-xs text-paper/65">
              {feeStatement.schoolYear}
            </p>
          </div>

          <FadeRise delay={0.18} className="hidden max-w-md lg:block">
            <p className="text-sm font-semibold text-paper">
              {student.school}
            </p>
            <p className="mt-1 text-xs text-paper/60">
              {feeStatement.schoolYear} · {schoolWeek}
            </p>
            <p className="font-display mt-6 text-2xl leading-tight font-semibold tracking-tight text-paper sm:text-3xl">
              One student record the whole family can actually read.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-paper/75">
              Grades, attendance, and fees for {student.gradeLevel}{" "}
              {student.section} - verified by the adviser, printable for
              submissions.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { label: "GWA", value: student.gwa.toFixed(2) },
                { label: "Attendance", value: `${student.attendanceRate}%` },
                {
                  label: "Class rank",
                  value: `${student.rank} / ${student.classSize}`,
                },
              ].map((chip) => (
                <span
                  key={chip.label}
                  className="inline-flex items-center gap-1.5 rounded-md border border-paper/25 bg-paper/10 px-2.5 py-1 text-xs text-paper backdrop-blur-sm"
                >
                  <span className="text-paper/60">{chip.label}</span>
                  <span className="font-semibold tabular-nums">
                    {chip.value}
                  </span>
                </span>
              ))}
            </div>
          </FadeRise>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex flex-col bg-paper px-5 py-6 sm:px-8">
        <div className="flex justify-end">
          <Link
            href="/about"
            className="rounded-md text-sm text-ink-muted underline-offset-2 transition-colors hover:text-ink hover:underline"
          >
            What is Marben?
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center py-8">
          <FadeRise delay={0.22} className="w-full max-w-sm">
            <div className="relative overflow-hidden rounded-xl border border-hairline bg-surface p-6 shadow-warm-lg">
              <p className="eyebrow">Student portal</p>
              <h1 className="font-display mt-2 text-2xl font-semibold tracking-tight">
                Sign in to the portal
              </h1>
              <p className="mt-1.5 text-sm text-ink-muted">
                Use your school-issued account to view grades, attendance, fees,
                and your digital ID.
              </p>

              <form className="mt-6 space-y-4" onSubmit={onSubmit} noValidate>
                <div>
                  <label htmlFor="email" className="text-sm font-medium">
                    School email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@student.marben.school"
                    className="mt-1.5"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email ? (
                    <p id="email-error" className="mt-1 text-xs text-danger">
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                <div>
                  <div className="flex items-baseline justify-between">
                    <label htmlFor="password" className="text-sm font-medium">
                      Password
                    </label>
                    <a
                      href="#reset"
                      className="rounded-xs text-xs text-ink-muted underline-offset-2 hover:text-clay-hover hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="mt-1.5"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={
                      errors.password ? "password-error" : undefined
                    }
                  />
                  {errors.password ? (
                    <p id="password-error" className="mt-1 text-xs text-danger">
                      {errors.password}
                    </p>
                  ) : null}
                </div>

                <div className="flex items-center gap-2.5">
                  <Switch
                    checked={remember}
                    onCheckedChange={setRemember}
                    label="Keep me signed in"
                  />
                  <span className="text-sm text-ink-muted">Keep me signed in</span>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing in…" : "Sign in"}
                </Button>
              </form>

              <div className="relative mt-5 overflow-hidden rounded-xl">
                <div className="rounded-xl border border-hairline bg-surface-2/60 p-3.5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold">Demo account</p>
                      <p className="truncate font-mono text-[11px] text-ink-muted">
                        {student.email}
                      </p>
                      <p className="font-mono text-[11px] text-ink-muted">
                        Balance shown: {formatPHP(student.balance)} · Q2 grades
                        live
                      </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={fillDemo}>
                      Use
                    </Button>
                  </div>
                </div>
                <BorderBeam duration={5} />
              </div>
            </div>
          </FadeRise>
        </div>

        <div className="text-center">
          <p className="text-xs text-ink-faint">
            New to Marben?{" "}
            <Link
              href="/about"
              className="rounded-xs text-clay-hover underline-offset-2 hover:underline"
            >
              Explore what your school gets
            </Link>
          </p>
          <footer className="mt-3 text-[11px] text-ink-faint">
            © 2026 Marben · Built for Philippine schools
          </footer>
        </div>
      </div>

      <Toaster theme="light" position="bottom-right" richColors />
    </div>
  );
}
