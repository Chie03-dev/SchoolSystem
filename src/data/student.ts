/**
 * Mock student dataset for the Marben demo portal.
 *
 * All dates are fixed strings around the reference date - never `Date.now()` -
 * so every render is deterministic and prerenderable.
 */

export const REFERENCE_DATE = "2026-10-09"; // Friday, Week 8 of Q2
export const todayWeekday: Weekday = "Fri";
export const todayLabel = "Friday, October 9, 2026";
export const schoolWeek = "Week 8 of Quarter 2";

export type TermId = "q1" | "q2" | "q3" | "q4";

export interface Term {
  id: TermId;
  label: string;
  range: string;
  status: "final" | "in-progress" | "upcoming";
}

export const terms: Term[] = [
  { id: "q1", label: "Q1", range: "Jun 1 – Aug 14, 2026", status: "final" },
  { id: "q2", label: "Q2", range: "Aug 24 – Nov 6, 2026", status: "in-progress" },
  { id: "q3", label: "Q3", range: "Nov 9, 2026 – Jan 22, 2027", status: "upcoming" },
  { id: "q4", label: "Q4", range: "Jan 25 – Apr 2, 2027", status: "upcoming" },
];

export const student = {
  id: "MAB-2026-0148",
  lrn: "136482950173",
  firstName: "Althea Mae",
  lastName: "Dela Cruz",
  email: "althea.delacruz@student.marben.school",
  phone: "0917 555 0148",
  address: "144 Mabini Street, Barangay San Isidro, Quezon City",
  birthDate: "March 14, 2009",
  bloodType: "O+",
  strand: "STEM",
  gradeLevel: "Grade 11",
  section: "STEM-A",
  adviser: "Ms. Roselle Gonzales",
  school: "Maben National High School - Main Campus",
  enrolledSince: "August 12, 2023",
  gwa: 91.25,
  rank: 6,
  classSize: 42,
  attendanceRate: 97.5,
  unitsOnHand: 15.5,
  balance: 2480,
  nextDue: "October 15, 2026",
} as const;

export const guardian = {
  name: "Maria Teresa Dela Cruz",
  relationship: "Mother",
  phone: "0918 222 7734",
  email: "mt.delacruz@email.com",
  occupation: "Public school teacher",
} as const;

export interface SubjectGrade {
  q1: number;
  q2: number | null;
}

export interface Subject {
  code: string;
  name: string;
  shortName: string;
  teacher: string;
  teacherTitle: string;
  room: string;
  units: number;
  category: "Core" | "Applied" | "Specialized";
  description: string;
  grades: SubjectGrade;
  attendance: { present: number; late: number; absent: number; total: number };
}

export const subjects: Subject[] = [
  {
    code: "OC-11",
    name: "Oral Communication in Context",
    shortName: "Oral Comm",
    teacher: "Krystal Reyes",
    teacherTitle: "Ms.",
    room: "Room 201",
    units: 1.5,
    category: "Core",
    description:
      "Principles of effective oral communication across contexts - interviews, debates, and public speaking in English and Filipino.",
    grades: { q1: 92, q2: 93 },
    attendance: { present: 38, late: 2, absent: 0, total: 40 },
  },
  {
    code: "KPK-11",
    name: "Komunikasyon at Pananaliksik sa Wika at Kulturang Pilipino",
    shortName: "KomFil",
    teacher: "Dennis Santos",
    teacherTitle: "Mr.",
    room: "Room 202",
    units: 1.5,
    category: "Core",
    description:
      "Pag-aaral ng wika, kultura, at panitikang Pilipino bilang batayan ng akademikong pagsasaliksik.",
    grades: { q1: 90, q2: 91 },
    attendance: { present: 37, late: 1, absent: 2, total: 40 },
  },
  {
    code: "GM-11",
    name: "General Mathematics",
    shortName: "Gen Math",
    teacher: "Angela Cruz",
    teacherTitle: "Ms.",
    room: "Room 210",
    units: 1.5,
    category: "Core",
    description:
      "Functions, rational equations, exponential and logarithmic functions, and basic business mathematics.",
    grades: { q1: 90, q2: 89 },
    attendance: { present: 36, late: 3, absent: 1, total: 40 },
  },
  {
    code: "ELS-11",
    name: "Earth and Life Science",
    shortName: "Earth Sci",
    teacher: "Ramon Bautista",
    teacherTitle: "Mr.",
    room: "Science Lab 1",
    units: 2,
    category: "Core",
    description:
      "Earth systems, minerals and rocks, natural hazards, and the fundamentals of life science with field investigations.",
    grades: { q1: 94, q2: 93 },
    attendance: { present: 39, late: 0, absent: 1, total: 40 },
  },
  {
    code: "PR1-11",
    name: "Practical Research 1",
    shortName: "Prac Research",
    teacher: "Roselle Gonzales",
    teacherTitle: "Ms.",
    room: "Room 118",
    units: 1.5,
    category: "Core",
    description:
      "Qualitative and quantitative research designs, data gathering, and the first full research proposal of the STEM strand.",
    grades: { q1: 93, q2: 91 },
    attendance: { present: 38, late: 1, absent: 1, total: 40 },
  },
  {
    code: "SP-11",
    name: "Statistics and Probability",
    shortName: "Statistics",
    teacher: "Antonio Lim",
    teacherTitle: "Mr.",
    room: "Room 214",
    units: 1.5,
    category: "Specialized",
    description:
      "Descriptive statistics, sampling, probability distributions, and hypothesis testing with real datasets.",
    grades: { q1: 88, q2: 90 },
    attendance: { present: 35, late: 4, absent: 1, total: 40 },
  },
  {
    code: "PEH-11",
    name: "Physical Education and Health 3",
    shortName: "PE & Health",
    teacher: "Marco Villaflor",
    teacherTitle: "Coach",
    room: "Gymnasium",
    units: 1,
    category: "Applied",
    description:
      "Fitness programming, recreational sports, and community health advocacy through the school's outreach calendar.",
    grades: { q1: 95, q2: 96 },
    attendance: { present: 40, late: 0, absent: 0, total: 40 },
  },
  {
    code: "ET-11",
    name: "Empowerment Technologies",
    shortName: "EmpTech",
    teacher: "Liza Ortega",
    teacherTitle: "Ms.",
    room: "Computer Lab 2",
    units: 1,
    category: "Applied",
    description:
      "Digital productivity suites, online safety, and the ICT capstone project - a working mobile web app prototype.",
    grades: { q1: 91, q2: 87 },
    attendance: { present: 37, late: 2, absent: 1, total: 40 },
  },
];

export type Weekday = "Mon" | "Tue" | "Wed" | "Thu" | "Fri";

export const weekdays: Weekday[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export interface ScheduleSlot {
  start: string;
  end: string;
  subjectCode: string;
  room: string;
  type: "class" | "break" | "homeroom";
}

export const schedule: Record<Weekday, ScheduleSlot[]> = {
  Mon: [
    { start: "07:30", end: "08:50", subjectCode: "OC-11", room: "Room 201", type: "class" },
    { start: "08:50", end: "09:10", subjectCode: "", room: "", type: "break" },
    { start: "09:10", end: "10:30", subjectCode: "ELS-11", room: "Science Lab 1", type: "class" },
    { start: "10:30", end: "11:50", subjectCode: "GM-11", room: "Room 210", type: "class" },
    { start: "13:00", end: "14:20", subjectCode: "SP-11", room: "Room 214", type: "class" },
    { start: "14:30", end: "15:50", subjectCode: "KPK-11", room: "Room 202", type: "class" },
  ],
  Tue: [
    { start: "07:30", end: "08:50", subjectCode: "SP-11", room: "Room 214", type: "class" },
    { start: "08:50", end: "09:10", subjectCode: "", room: "", type: "break" },
    { start: "09:10", end: "10:30", subjectCode: "PR1-11", room: "Room 118", type: "class" },
    { start: "10:30", end: "11:50", subjectCode: "PEH-11", room: "Gymnasium", type: "class" },
    { start: "13:00", end: "14:20", subjectCode: "OC-11", room: "Room 201", type: "class" },
  ],
  Wed: [
    { start: "07:30", end: "08:50", subjectCode: "GM-11", room: "Room 210", type: "class" },
    { start: "08:50", end: "09:10", subjectCode: "", room: "", type: "break" },
    { start: "09:10", end: "10:30", subjectCode: "ET-11", room: "Computer Lab 2", type: "class" },
    { start: "10:30", end: "11:50", subjectCode: "ELS-11", room: "Science Lab 1", type: "class" },
    { start: "13:00", end: "14:20", subjectCode: "PR1-11", room: "Room 118", type: "class" },
    { start: "14:30", end: "15:50", subjectCode: "KPK-11", room: "Room 202", type: "class" },
  ],
  Thu: [
    { start: "07:30", end: "08:50", subjectCode: "KPK-11", room: "Room 202", type: "class" },
    { start: "08:50", end: "09:10", subjectCode: "", room: "", type: "break" },
    { start: "09:10", end: "10:30", subjectCode: "SP-11", room: "Room 214", type: "class" },
    { start: "10:30", end: "11:50", subjectCode: "PEH-11", room: "Gymnasium", type: "class" },
    { start: "13:00", end: "14:20", subjectCode: "ELS-11", room: "Science Lab 1", type: "class" },
  ],
  Fri: [
    { start: "07:30", end: "08:50", subjectCode: "GM-11", room: "Room 210", type: "class" },
    { start: "08:50", end: "09:10", subjectCode: "", room: "", type: "break" },
    { start: "09:10", end: "10:30", subjectCode: "OC-11", room: "Room 201", type: "class" },
    { start: "10:30", end: "11:50", subjectCode: "ET-11", room: "Computer Lab 2", type: "class" },
    { start: "13:00", end: "14:20", subjectCode: "SP-11", room: "Room 214", type: "class" },
    { start: "16:00", end: "17:00", subjectCode: "", room: "Room 118", type: "homeroom" },
  ],
};

export interface DailyAttendance {
  date: string;
  weekday: Weekday;
  status: "present" | "late" | "absent";
  detail: string;
}

export const attendanceLog: DailyAttendance[] = [
  { date: "2026-10-09", weekday: "Fri", status: "present", detail: "All 5 classes attended" },
  { date: "2026-10-08", weekday: "Thu", status: "late", detail: "Arrived 8:12 AM - Earth and Life Science" },
  { date: "2026-10-07", weekday: "Wed", status: "present", detail: "All 5 classes attended" },
  { date: "2026-10-06", weekday: "Tue", status: "present", detail: "All 4 classes attended" },
  { date: "2026-10-05", weekday: "Mon", status: "present", detail: "All 5 classes attended" },
  { date: "2026-10-02", weekday: "Fri", status: "absent", detail: "Excused - medical certificate on file" },
  { date: "2026-10-01", weekday: "Thu", status: "present", detail: "All 4 classes attended" },
  { date: "2026-09-30", weekday: "Wed", status: "present", detail: "All 5 classes attended" },
  { date: "2026-09-29", weekday: "Tue", status: "late", detail: "Arrived 9:35 AM - Practical Research 1" },
  { date: "2026-09-28", weekday: "Mon", status: "present", detail: "All 5 classes attended" },
];

export interface FeeItem {
  label: string;
  amount: number;
  due: string;
  status: "paid" | "pending" | "partial";
  note?: string;
}

export const feeStatement = {
  schoolYear: "SY 2026–2027 · Q2",
  items: [
    { label: "Tuition - Q2", amount: 18500, due: "Aug 24, 2026", status: "paid" },
    { label: "Miscellaneous fees", amount: 3240, due: "Aug 24, 2026", status: "paid" },
    { label: "Laboratory fee - Science", amount: 1200, due: "Sep 30, 2026", status: "partial", note: "₱800 of ₱1,200 settled" },
    { label: "Digital student ID", amount: 350, due: "Oct 15, 2026", status: "pending" },
  ] satisfies FeeItem[],
  payments: [
    { label: "Initial deposit", amount: 12000, date: "Aug 3, 2026", or: "OR-26-01412" },
    { label: "First installment", amount: 8810, date: "Sep 15, 2026", or: "OR-26-02877" },
  ],
  totalBilled: 23290,
  totalPaid: 20810,
  balance: 2480,
  nextDue: "October 15, 2026",
} as const;

export type RequestStatus = "processing" | "ready" | "pending" | "rejected";

export interface DocumentRequest {
  id: string;
  document: string;
  purpose: string;
  requestedOn: string;
  status: RequestStatus;
  eta: string;
  fee: number;
}

export const documentRequests: DocumentRequest[] = [
  {
    id: "REQ-1042",
    document: "Form 138 (Report Card)",
    purpose: "Scholarship application - CHED StuFAP",
    requestedOn: "Oct 6, 2026",
    status: "processing",
    eta: "Oct 14, 2026",
    fee: 100,
  },
  {
    id: "REQ-1038",
    document: "Good Moral Certificate",
    purpose: "District science fair registration",
    requestedOn: "Oct 2, 2026",
    status: "ready",
    eta: "Ready for pickup",
    fee: 50,
  },
  {
    id: "REQ-1029",
    document: "Certificate of Enrollment",
    purpose: "Scholarship stipend renewal",
    requestedOn: "Sep 21, 2026",
    status: "ready",
    eta: "Ready for pickup",
    fee: 50,
  },
];

export interface Announcement {
  id: string;
  title: string;
  category: "Academics" | "Events" | "Fees" | "Advisory";
  date: string;
  body: string;
  pinned?: boolean;
}

export const announcements: Announcement[] = [
  {
    id: "AN-201",
    title: "Q2 parent–teacher conference",
    category: "Advisory",
    date: "Oct 8, 2026",
    body: "The Q2 conference is scheduled on October 24, 8:00 AM–3:00 PM at the covered court. Guardians may book a 10-minute slot through the portal from October 10.",
    pinned: true,
  },
  {
    id: "AN-198",
    title: "Science month research exhibit",
    category: "Events",
    date: "Oct 6, 2026",
    body: "Grade 11 STEM sections will present their Practical Research 1 proposals on October 30, 1:00–4:00 PM, School Library. Judges from the Division office will attend.",
  },
  {
    id: "AN-195",
    title: "Q2 outstanding balance reminder",
    category: "Fees",
    date: "Oct 3, 2026",
    body: "Settle remaining Q2 balances (digital student ID) on or before October 15 to avoid a hold on Q3 enrollment validation.",
  },
  {
    id: "AN-190",
    title: "Intramurals tryout schedule",
    category: "Events",
    date: "Sep 29, 2026",
    body: "Tryouts for basketball, volleyball, and chess run October 12–14 after class. Sign up with your PE teacher or at the student affairs office.",
  },
];

export interface Assignment {
  id: string;
  title: string;
  subjectCode: string;
  due: string;
  status: "submitted" | "in-progress" | "not-started" | "graded";
  weight: string;
  note?: string;
}

export const assignments: Assignment[] = [
  {
    id: "AS-88",
    title: "Research proposal - Chapter 1 draft",
    subjectCode: "PR1-11",
    due: "Oct 13, 2026",
    status: "in-progress",
    weight: "20% of Q2 grade",
    note: "Submit via the portal before 11:59 PM",
  },
  {
    id: "AS-85",
    title: "Debate: 'Social media does more harm'",
    subjectCode: "OC-11",
    due: "Oct 12, 2026",
    status: "submitted",
    weight: "15% of Q2 grade",
  },
  {
    id: "AS-84",
    title: "Problem set 4 - Exponential functions",
    subjectCode: "GM-11",
    due: "Oct 14, 2026",
    status: "not-started",
    weight: "10% of Q2 grade",
  },
  {
    id: "AS-80",
    title: "Earthquake preparedness poster",
    subjectCode: "ELS-11",
    due: "Oct 20, 2026",
    status: "not-started",
    weight: "10% of Q2 grade",
  },
  {
    id: "AS-76",
    title: "Data gathering journal",
    subjectCode: "SP-11",
    due: "Oct 9, 2026",
    status: "graded",
    weight: "15% of Q2 grade",
    note: "Scored 94/100",
  },
];

export interface Notification {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  kind: "grade" | "fee" | "attendance" | "announcement" | "request";
}

export const notifications: Notification[] = [
  {
    id: "NT-301",
    title: "Q2 grade posted - Statistics and Probability",
    body: "Mr. Lim published your data gathering journal score: 94/100.",
    time: "2 hours ago",
    read: false,
    kind: "grade",
  },
  {
    id: "NT-300",
    title: "Payment received - ₱8,810.00",
    body: "First installment posted to your account. Remaining balance: ₱2,480.00.",
    time: "Sep 15, 10:24 AM",
    read: false,
    kind: "fee",
  },
  {
    id: "NT-297",
    title: "Excuse approved - Oct 2 absence",
    body: "Ms. Gonzales approved the medical certificate for your Oct 2 absence.",
    time: "Oct 3, 8:05 AM",
    read: true,
    kind: "attendance",
  },
  {
    id: "NT-295",
    title: "Good Moral Certificate is ready",
    body: "Pick up your certificate at the registrar's office until October 16.",
    time: "Oct 7, 3:41 PM",
    read: true,
    kind: "request",
  },
  {
    id: "NT-290",
    title: "Schedule change - Friday homeroom",
    body: "Homeroom on Fridays moved to 4:00 PM at Room 118.",
    time: "Sep 28, 9:00 AM",
    read: true,
    kind: "announcement",
  },
];

export const gwaHistory = [
  { term: "Grade 10 · Q3", gwa: 92.0 },
  { term: "Grade 10 · Q4", gwa: 92.4 },
  { term: "Grade 11 · Q1", gwa: 91.63 },
  { term: "Grade 11 · Q2", gwa: 91.25 },
];

export const upcomingEvents = [
  { date: "Oct 12", label: "Oral Comm debate submission" },
  { date: "Oct 13", label: "Research proposal draft due" },
  { date: "Oct 14", label: "Gen Math problem set 4" },
  { date: "Oct 15", label: "Balance settlement deadline" },
  { date: "Oct 24", label: "Parent–teacher conference" },
];
