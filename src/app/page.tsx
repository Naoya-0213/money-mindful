// PageTop
// "use server"
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { Database } from "@/types/database.types";

import BeforeSignin from "./components/before-signin/BeforeSignin";

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
      <BeforeSignin />
    </div>
  );
}
