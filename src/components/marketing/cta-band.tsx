import { ArrowRight, Mail } from "lucide-react";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { Button } from "@/components/ui/button";

export function CtaBand() {
  return (
    <section id="demo" className="scroll-mt-20 px-5 pb-20">
      <Reveal className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-2xl bg-clay px-6 py-14 text-center sm:px-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 15%, #fff 0, transparent 45%), radial-gradient(circle at 85% 90%, #fff 0, transparent 40%)",
            }}
          />
          <p className="eyebrow relative text-primary-foreground/80">
            Get started
          </p>
          <h2 className="font-display relative mx-auto mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">
            <TextReveal text="Give your school a portal it can be proud of." />
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-primary-foreground/85">
            Book a 20-minute walkthrough. We&apos;ll set up a demo school with
            your strands, sections, and fee schedules - no commitment.
          </p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
            <MagneticButton>
              <Button
                size="lg"
                nativeButton={false}
                className="bg-surface text-clay hover:bg-surface/90"
                render={
                  <a href="mailto:hello@demo.school?subject=Demo%20request" />
                }
              >
                Book a demo
                <ArrowRight aria-hidden />
              </Button>
            </MagneticButton>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              render={<a href="mailto:hello@demo.school" />}
            >
              <Mail aria-hidden />
              hello@demo.school
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
