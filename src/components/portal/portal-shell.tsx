"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { CommandPalette } from "./command-palette";
import { MobileNav } from "./mobile-nav";
import { PortalSidebar } from "./portal-sidebar";
import { PortalTopbar } from "./portal-topbar";
import { SkipLink } from "@/components/skip-link";

export function PortalShell({ children }: { children: ReactNode }) {
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="min-h-full lg:pl-60">
      <SkipLink label="Skip to portal content" />
      <PortalSidebar />
      <PortalTopbar onOpenPalette={() => setPaletteOpen(true)} />
      <main
        id="main-content"
        className="mx-auto w-full max-w-6xl px-4 pt-5 pb-24 lg:px-6 lg:pb-12"
      >
        {children}
      </main>
      <MobileNav />
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      <Toaster theme="light" position="bottom-right" richColors />
    </div>
  );
}
