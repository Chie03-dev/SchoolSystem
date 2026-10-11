"use client";

import { Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { buildScheduleIcs } from "@/lib/ics";
import { schedule, student, subjects } from "@/data/student";

export function IcsDownloadButton() {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        const ics = buildScheduleIcs(schedule, subjects, {
          studentName: `${student.firstName} ${student.lastName}`,
          startDate: new Date("2026-10-09T00:00:00"),
          weeks: 12,
        });
        const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "marben-class-schedule.ics";
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
        toast.success("Schedule exported", {
          description: "marben-class-schedule.ics - import it into any calendar app.",
        });
      }}
    >
      <Download aria-hidden />
      Export .ics
    </Button>
  );
}
