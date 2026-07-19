import { redirect } from "next/navigation";

// /resources → /notes (permanent redirect for backward compatibility)
export default function ResourcesRedirectPage() {
  redirect("/notes");
}
