import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { BrowserFrame } from "@/components/motion/browser-frame";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { TextReveal } from "@/components/motion/text-reveal";
import { Button } from "@/components/ui/button";
import { PortalPreview } from "./portal-preview";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 pt-14 pb-10 sm:pt-20">
        <div className="max-w-2xl">
          <p className="eyebrow">Student information system · Philippines</p>
          <h1 className="font-display text-display mt-4 font-semibold text-ink">
            <TextReveal text="The student portal your school can call its own." />
          </h1>
          <p className="mt-5 max-w-xl text-base text-ink-muted sm:text-lg">
            Grades, attendance, schedules, fees, announcements, and a digital
            student ID - every student-portal screen, built as a working
            front-end prototype.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <MagneticButton>
              <Button nativeButton={false} render={<Link href="/login" />}>
                Explore the portal
                <ArrowRight aria-hidden />
              </Button>
            </MagneticButton>
            <Button
              variant="outline"
              nativeButton={false}
              render={<a href="#features" />}
            >
              See what&apos;s inside
            </Button>
          </div>
          <p className="mt-4 text-xs text-ink-faint">
            Front-end demo · Fixed sample dataset · No backend or real accounts
          </p>
        </div>

        <div className="relative mt-10 sm:mt-14">
          <div className="rounded-xl shadow-warm-lg">
            <BrowserFrame url="portal.demo.school/dashboard">
              <PortalPreview />
            </BrowserFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
