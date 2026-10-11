import type { Metadata } from "next";
import { CtaBand } from "@/components/marketing/cta-band";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { Hero } from "@/components/marketing/hero";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { SchoolsMarquee } from "@/components/marketing/schools-marquee";
import { StatsStrip } from "@/components/marketing/stats-strip";

export const metadata: Metadata = {
  title: {
    absolute: "Marben - The Student Portal Schools Can Call Their Own",
  },
  description:
    "Grades, attendance, schedules, fees, announcements, and a digital student ID in one calm, offline-friendly portal for Philippine schools.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <FeatureGrid />
      <HowItWorks />
      <SchoolsMarquee />
      <CtaBand />
    </>
  );
}
