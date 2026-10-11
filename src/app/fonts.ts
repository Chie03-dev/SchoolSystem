import { Inter } from "next/font/google";

/**
 * Universal type family. Inter handles every role — body, UI, display, and
 * tabular data (via `tabular-nums`) — for one coherent, institutional look.
 * `display: "optional"` paints the real face at first content paint or not
 * at all (no late swap, no layout shift).
 */
export const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "optional",
});
