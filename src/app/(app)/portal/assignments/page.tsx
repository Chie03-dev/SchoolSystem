import { AssignmentsView } from "./assignments-view";

export const metadata = {
  title: "Assignments",
  description: "Submissions, deadlines, and grading status per subject.",
};

export default function AssignmentsPage() {
  return <AssignmentsView />;
}
