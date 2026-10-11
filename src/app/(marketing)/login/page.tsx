"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, CalendarCheck2, IdCard, ShieldCheck, Wallet } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { BorderBeam } from "@/components/motion/border-beam";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/portal/switch";
import { Toaster } from "@/components/ui/sonner";
import { student } from "@/data/student";
import { formatPHP } from "@/lib/format";

const perks = [
  {
    icon: CalendarCheck2,
    title: "Attendance in real time",
    body: "Families see attendance the moment the teacher encodes it.",
  },
  {
    icon: Wallet,
    title: "Fees without the queue",
    body: "Statements, balances, and official receipts — always current.",
  },
  {
    icon: IdCard,
    title: "Digital student ID",
    body: "Presentable on any phone, with a scannable QR for campus entry.",
  },
  {
    icon: ShieldCheck,
    title: "Records you can trust",
    body: "Chronological logs for every grade, payment, and excuse.",
  },
];

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
    <main className="grid flex-1 lg:grid-cols-2">
      <section className="relative hidden flex-col justify-between overflow-hidden border-r border-hairline bg-surface-2/60 p-10 lg:flex">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
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
        </div>

        <div className="max-w-md">
          <p className="eyebrow">Student portal</p>
          <p className="font-display mt-4 text-4xl leading-tight font-semibold tracking-tight text-ink">
            Everything your school year runs on — in one calm place.
          </p>
          <ul className="mt-8 space-y-4">
            {perks.map((perk) => (
              <li key={perk.title} className="flex gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-clay/10 text-clay">
                  <perk.icon className="size-4.5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-medium">{perk.title}</p>
                  <p className="text-sm text-ink-muted">{perk.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="max-w-md text-sm text-ink-muted">
          &ldquo;Marben replaced four spreadsheets and a bulletin board.&rdquo;
          <span className="mt-1 block text-xs text-ink-faint">
            Registrar, Maben National High School
          </span>
        </p>
      </section>

      <section className="flex flex-1 items-center justify-center px-5 py-12">
        <div className="w-full max-w-sm">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink lg:hidden"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back to marben.school
          </Link>

          <div className="lg:hidden">
            <Link href="/" className="mb-6 flex items-center gap-2.5">
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
          </div>

          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Sign in to the portal
          </h1>
          <p className="mt-1.5 text-sm text-ink-muted">
            Use your school-issued account. Demo credentials are pre-filled
            below.
          </p>

          <form className="mt-7 space-y-4" onSubmit={onSubmit} noValidate>
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
                  className="text-xs text-ink-muted underline-offset-2 hover:text-clay hover:underline"
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

          <div className="relative mt-6 overflow-hidden rounded-xl">
            <div className="rounded-xl border border-hairline bg-surface-2/60 p-3.5">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold">Demo account</p>
                  <p className="truncate font-mono text-[11px] text-ink-muted">
                    {student.email}
                  </p>
                  <p className="font-mono text-[11px] text-ink-muted">
                    Balance shown: {formatPHP(student.balance)} · Q2 grades live
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={fillDemo}>
                  Use
                </Button>
              </div>
            </div>
            <BorderBeam duration={5} />
          </div>

          <p className="mt-6 text-center text-xs text-ink-faint">
            New to Marben?{" "}
            <Link href="/" className="text-clay underline-offset-2 hover:underline">
              Explore what your school gets
            </Link>
          </p>
        </div>
      </section>
      <Toaster theme="light" position="bottom-right" richColors />
    </main>
  );
}
