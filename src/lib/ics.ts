import type { ScheduleSlot, Subject, Weekday } from "@/data/student";
import { weekdays } from "@/data/student";

function pad(value: number): string {
  return value.toString().padStart(2, "0");
}

/** Floating local-time stamp: 20261012T073000 */
function stamp(date: Date, time: string): string {
  const [hour, minute] = time.split(":").map(Number);
  return (
    `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}` +
    `T${pad(hour)}${pad(minute)}00`
  );
}

function escapeText(value: string): string {
  return value.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
}

/** First occurrence date for each weekday, starting the week after the reference date. */
function firstOccurrence(weekday: Weekday, startDate: Date): Date {
  const target = weekdays.indexOf(weekday); // 0 = Monday
  const date = new Date(startDate);
  // Move to next Monday relative to startDate, then add the weekday offset.
  const mondayOffset = (8 - date.getDay()) % 7 || 7;
  date.setDate(date.getDate() + mondayOffset + target);
  return date;
}

/**
 * Builds a weekly-recurring .ics calendar for the student's class schedule.
 * Times are floating (local) - school calendars shouldn't shift with TZ.
 */
export function buildScheduleIcs(
  schedule: Record<Weekday, ScheduleSlot[]>,
  subjects: Subject[],
  options: { studentName: string; startDate: Date; weeks?: number } = { studentName: "Student", startDate: new Date("2026-10-09"), weeks: 12 }
): string {
  const byCode = new Map(subjects.map((subject) => [subject.code, subject]));
  const weeks = options.weeks ?? 12;

  const events: string[] = [];

  for (const weekday of weekdays) {
    for (const slot of schedule[weekday]) {
      if (slot.type !== "class") continue;
      const subject = byCode.get(slot.subjectCode);
      if (!subject) continue;

      const date = firstOccurrence(weekday, options.startDate);
      const uid = `${subject.code.toLowerCase()}-${weekday.toLowerCase()}-${date.getTime()}@marben.school`;
      const summary = `${subject.name} · ${subject.teacherTitle} ${subject.teacher}`;

      events.push(
        [
          "BEGIN:VEVENT",
          `UID:${uid}`,
          `DTSTAMP:${stamp(options.startDate, "00:00")}`,
          `DTSTART:${stamp(date, slot.start)}`,
          `DTEND:${stamp(date, slot.end)}`,
          `RRULE:FREQ=WEEKLY;COUNT=${weeks}`,
          `SUMMARY:${escapeText(summary)}`,
          `LOCATION:${escapeText(slot.room)}`,
          `DESCRIPTION:${escapeText(
            `Subject ${subject.code} · ${subject.units} units · ${options.studentName} - exported from Marben`
          )}`,
          "END:VEVENT",
        ].join("\r\n")
      );
    }
  }

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Marben//Student Portal//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeText(`${options.studentName} - Class Schedule (Marben)`)}`,
    ...events,
    "END:VCALENDAR",
  ].join("\r\n");
}
