import type { Metadata } from "next";
import { fontSans } from "./fonts";
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
      className={`${fontSans.variable} h-full antialiased`}
    >
      <head>
        {/*
          Next 16.4 does not emit font preloads for next/font (verified against a
          minimal repro). The latin subset is hand-preloaded so text paints with
          the real face at first content paint.
          Filenames come from .next/server/next-font-manifest.json — update them
          if the font files change.
        */}
        <link
          rel="preload"
          href="/_next/static/media/83afe278b6a6bb3c-s.p.2bn3s6zvc0dyp.woff2"
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
