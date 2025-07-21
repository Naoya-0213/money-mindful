// このファイルの役割：
// - このファイルは、auth/signup のページに対応する。
// - Supabaseを使って現在のセッションを取得し、ユーザーがログイン済みかどうかを確認する。
// - ログイン済みの場合は、"/money-mindful/home" に自動リダイレクトして、新規登録ページを表示させないようにする。
// - 未ログイン状態の場合は、クライアント側のSignUpPageコンポーネントを表示する。

// use server

import type { Database } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SignUpPage from "@/app/auth/signup/form/page";

// 認証状態の監視
export default async function SignUpAuthPage() {
  const supabase = await createClient<Database>();

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 認証している場合、リダイレクト
  if (session) {
    redirect("/money-mindful/home");
  }

  return <SignUpPage />;
}
