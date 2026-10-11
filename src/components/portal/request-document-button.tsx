"use client";

import { FilePlus2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

/** Demo-only document request — no backend, confirms with a toast. */
export function RequestDocumentButton({
  label = "Request document",
  variant = "outline",
  size = "sm",
}: {
  label?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}) {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={() =>
        toast("Request submitted", {
          description:
            "This is a front-end demo — no document was actually requested.",
          icon: <FilePlus2 className="size-4" aria-hidden />,
        })
      }
    >
      <FilePlus2 aria-hidden />
      {label}
    </Button>
  );
}
