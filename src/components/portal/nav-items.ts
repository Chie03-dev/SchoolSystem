import {
  BookOpen,
  CalendarCheck2,
  CalendarDays,
  ClipboardList,
  GraduationCap,
  IdCard,
  LayoutGrid,
  Megaphone,
  Wallet,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: typeof LayoutGrid;
}

export const portalNav: NavItem[] = [
  { href: "/portal/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/portal/courses", label: "Courses", icon: BookOpen },
  { href: "/portal/grades", label: "Grades", icon: GraduationCap },
  { href: "/portal/schedule", label: "Schedule", icon: CalendarDays },
  { href: "/portal/attendance", label: "Attendance", icon: CalendarCheck2 },
  { href: "/portal/fees", label: "Fees", icon: Wallet },
  { href: "/portal/assignments", label: "Assignments", icon: ClipboardList },
  { href: "/portal/announcements", label: "Announcements", icon: Megaphone },
  { href: "/portal/id", label: "Student ID", icon: IdCard },
];

export const mobileNav: NavItem[] = [
  portalNav[0], // Dashboard
  portalNav[2], // Grades
  portalNav[3], // Schedule
  portalNav[5], // Fees
  portalNav[8], // Student ID
];
