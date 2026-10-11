import type { Subject, TermId } from "@/data/student";

/** DepEd SHS descriptors. */
export function remarksForGrade(grade: number): string {
  if (grade >= 90) return "Outstanding";
  if (grade >= 85) return "Very Satisfactory";
  if (grade >= 80) return "Satisfactory";
  if (grade >= 75) return "Fairly Satisfactory";
  return "Did Not Meet Expectations";
}

export function gradeForTerm(subject: Subject, term: TermId): number | null {
  return term === "q1" ? subject.grades.q1 : subject.grades.q2;
}

/** General weighted average across subjects for a term (null when ungraded). */
export function computeGwa(subjects: Subject[], term: TermId): number | null {
  const graded = subjects
    .map((subject) => gradeForTerm(subject, term))
    .filter((grade): grade is number => grade !== null);
  if (graded.length === 0) return null;
  const total = graded.reduce((sum, grade) => sum + grade, 0);
  return Math.round((total / graded.length) * 100) / 100;
}

export function attendanceRate(attendance: {
  present: number;
  late: number;
  absent: number;
  total: number;
}): number {
  if (attendance.total === 0) return 100;
  const attended = attendance.present + attendance.late;
  return Math.round((attended / attendance.total) * 1000) / 10;
}

export function formatGrade(grade: number | null): string {
  return grade === null ? "—" : grade.toFixed(2);
}
