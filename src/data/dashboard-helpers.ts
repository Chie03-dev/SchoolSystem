import { schedule, subjects, todayWeekday } from "./student";

import type { ScheduleSlot, Subject, Weekday } from "./student";

const byCode = new Map(subjects.map((subject) => [subject.code, subject]));

export function subjectByCode(code: string): Subject | undefined {
  return byCode.get(code);
}

/** Today's class slots (breaks excluded) for the mock reference day. */
export function todaySchedule(): ScheduleSlot[] {
  return schedule[todayWeekday].filter((slot) => slot.type === "class");
}

export function weekdaySlots(day: Weekday): ScheduleSlot[] {
  return schedule[day];
}
