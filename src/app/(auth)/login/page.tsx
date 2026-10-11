"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { BorderBeam } from "@/components/motion/border-beam";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/portal/switch";
import { Toaster } from "@/components/ui/sonner";
import { student } from "@/data/student";
import { formatPHP } from "@/lib/format";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const fillDemo = () => {
    setEmail("althea.delacruz@student.marben.school");
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
    <div className="relative flex min-h-[100dvh] flex-col overflow-hidden">
      {/* Campus backdrop with paper-tinted overlay */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src="/school.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/92 via-paper/78 to-paper/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgb(28_25_23/0.10)_100%)]" />
      </div>

      <header className="flex items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/about" className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="grid size-8 place-items-center rounded-md bg-clay font-display text-base font-semibold text-primary-foreground"
          >
            M
          </span>
          <span className="font-display text-xl leading-none font-semibold tracking-tight">
            Marben
          </span>
        </Link>
        <Link
          href="/about"
          className="rounded-md text-sm text-ink-muted underline-offset-2 transition-colors hover:text-ink hover:underline"
        >
          What is Marben?
        </Link>
      </header>

      <div className="flex flex-1 items-center justify-center px-5 py-6">
        <div className="w-full max-w-sm">
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
                    className="text-xs text-ink-muted underline-offset-2 hover:text-clay-hover hover:underline"
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
                  aria-describedby={errors.password ? "password-error" : undefined}
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

          <p className="mt-4 text-center text-xs text-ink-faint">
            New to Marben?{" "}
            <Link
              href="/about"
              className="text-clay-hover underline-offset-2 hover:underline"
            >
              Explore what your school gets
            </Link>
          </p>
        </div>
      </div>

      <footer className="px-5 pb-5 text-center text-[11px] text-ink-faint sm:px-8">
        © 2026 Marben · Built for Philippine schools
      </footer>

      <Toaster theme="light" position="bottom-right" richColors />
    </div>
  );
}
