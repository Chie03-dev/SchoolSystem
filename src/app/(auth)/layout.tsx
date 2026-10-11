import type { ReactNode } from "react";
import { SkipLink } from "@/components/skip-link";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SkipLink />
      <main id="main-content" className="flex-1">
        {children}
      </main>
    </>
  );
}
