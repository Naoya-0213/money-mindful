// PageTop
// "use server"

import { redirect } from "next/navigation";

export default function PageTop() {
  // login機能は後ほど

  redirect("/money-mindful/home");
}
