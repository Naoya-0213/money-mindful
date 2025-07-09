// PageTop
// "use server"

import { Database } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import BeforeLogin from "./components/before-login/BeforeLogin";

export default async function PageTop() {
  const supabase = await createClient<Database>();

  // セッションを取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/money-mindful/home");
  }

  return (
    <div>
      <BeforeLogin />
    </div>
  );
}
