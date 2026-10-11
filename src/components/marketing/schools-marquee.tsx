import { Marquee } from "@/components/motion/marquee";

const schools = [
  "Sample High School",
  "Demo Academy",
  "Sample Science High School",
  "Sample Institute of Technology",
  "Sample National High School",
  "Sample City College",
  "Sample Montessori School",
  "Sample International School",
];

export function SchoolsMarquee() {
  return (
    <section id="schools" className="scroll-mt-20 px-5 py-14">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-medium tracking-[0.14em] text-ink-faint uppercase">
          Trusted by schools across the Philippines
        </p>
        <div className="mt-6 rounded-xl border border-hairline bg-surface py-4 shadow-warm">
          <Marquee
            duration={36}
            items={schools.map((school) => (
              <span
                key={school}
                className="font-display text-sm font-medium whitespace-nowrap text-ink-muted"
              >
                {school}
              </span>
            ))}
          />
        </div>
      </div>
    </section>
  );
}
