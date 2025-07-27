import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { Database } from "@/types/database.types";

// このファイルは「/money-mindful」にアクセスされた際に、
// ユーザーがログイン済みであれば /money-mindful/home へ遷移させる役割を持つ。
// 実際の認証チェックや未ログイン時のリダイレクトは middleware.ts にて制御しており、
// このファイルではログイン済みユーザー向けの誘導のみを担っている。

export default async function MoneyMindfulRoot() {
  const supabase = await createClient<Database>();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/auth/signin");
  }

  // 万が一middlewareをすり抜けたときの保険（念のため）
  return redirect("/money-mindful/home");
}
