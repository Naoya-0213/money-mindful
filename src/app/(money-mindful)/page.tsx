// "use server"
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { Database } from "@/types/database.types";

import BeforeSignin from "../components/before-signin/BeforeSignin";

// ===== トップページ（未ログイン時の初期画面） =====
// 📍ルートパス（"/"）で使用
// ログイン済みなら /home にリダイレクト、未ログインなら BeforeSignin を表示

export default async function PageTop() {
  const supabase = await createClient<Database>();

  // セッションを取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/signin");
  }

  if (session) {
    redirect("/home");
  }

  return (
    <div>
      <BeforeSignin />
    </div>
  );
}
