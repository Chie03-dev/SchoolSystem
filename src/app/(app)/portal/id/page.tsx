import type { Metadata } from "next";
import { StudentIdView } from "./id-view";

export const metadata: Metadata = {
  title: "Digital student ID",
  description: "Presentable student ID with QR, emergency contact, and holographic finish.",
};

export default function StudentIdPage() {
  return <StudentIdView />;
}
