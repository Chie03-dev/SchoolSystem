import type { Metadata } from "next";
import { fontDisplay, fontMono, fontSans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://marben.school"),
  title: {
    default: "Marben — The Student Portal Schools Can Call Their Own",
    template: "%s · Marben",
  },
  description:
    "Marben is a modern student information system for Philippine schools — grades, attendance, schedules, fees, and digital IDs in one calm portal.",
  applicationName: "Marben",
  openGraph: {
    type: "website",
    siteName: "Marben",
    locale: "en_PH",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marben — The Student Portal Schools Can Call Their Own",
    description:
      "Grades, attendance, schedules, fees, announcements, and a digital student ID — one calm, offline-friendly portal for Philippine schools.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontMono.variable} ${fontDisplay.variable} h-full antialiased`}
    >
      <head>
        {/*
          Next 16.4 does not emit font preloads for next/font (verified against a
          minimal repro). These two latin subsets are hand-preloaded so text
          paints with the real faces instead of swapping in late.
          Filenames come from .next/server/next-font-manifest.json — update them
          if the font files change.
        */}
        <link
          rel="preload"
          href="/_next/static/media/caa3a2e1cccd8315-s.p.0wgildi0cnwt9.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/_next/static/media/03bda585a99c6450-s.p.32sris142tqlb.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="paper-grain flex min-h-full flex-col">
        {children}
      </body>
    </html>
  );
}
