import { Fraunces, Geist, Geist_Mono } from "next/font/google";

/**
 * Editorial type. `display: "optional"` means fonts paint with the first
 * content paint when they arrive within the block period, and otherwise never
 * swap in late — no layout shift, no delayed LCP repaint.
 */
export const fontSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "optional",
});

export const fontMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "optional",
  preload: false,
});

export const fontDisplay = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "optional",
});
