import { Marquee } from "@/components/motion/marquee";

const schools = [
  "Sto. Niño Academy",
  "Maben National High School",
  "DepEd Region IV-A",
  "Camarines Norte STEM",
  "San Isidro Institute",
  "Batangas Science High",
  "Laguna Crest School",
  "Holy Cross of Antipolo",
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
