import type { Metadata } from "next";
import { CtaBand } from "@/components/marketing/cta-band";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { Hero } from "@/components/marketing/hero";
import { HowItWorks } from "@/components/marketing/how-it-works";

export const metadata: Metadata = {
  title: {
    absolute: "Demo - The Student Portal Schools Can Call Their Own",
  },
  description:
    "Grades, attendance, schedules, fees, announcements, and a digital student ID in one calm portal for Philippine schools.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Hero />
      <FeatureGrid />
      <HowItWorks />
      <CtaBand />
    </>
  );
}
