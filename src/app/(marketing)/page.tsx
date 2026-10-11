import { redirect } from "next/navigation";

export const metadata = {
  title: "Demo",
};

/**
 * The app root goes straight to the portal sign-in; the marketing page
 * lives at /about.
 */
export default function Home() {
  redirect("/login");
}
