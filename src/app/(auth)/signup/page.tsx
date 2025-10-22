// use server
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import type { Database } from "@/types/database.types";

import SignUpPage from "./form/page";

// ===== サインアップ認証ページ（サーバー） =====
// 📍/signup にアクセスしたときの認証確認処理
// Supabaseのセッション情報を確認し、ログイン済みならホームにリダイレクト
// 未ログインの場合のみサインアップフォームを表示

// 認証状態の監視
export default async function SignUpAuthPage() {
  const supabase = await createClient<Database>();

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 認証している場合、リダイレクト
  if (session) {
    redirect("/home");
  }

  return <SignUpPage />;
}
