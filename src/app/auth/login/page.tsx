// use server
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import type { Database } from "@/types/database.types";

import LoginPage from "../../money-mindful/login/page";

// このファイルの役割：
// - Supabaseを使って現在のセッションを取得し、ログイン状態を確認する。
// - すでにログイン済みの場合は、"/money-mindful/home" に自動リダイレクトする。
// - 未ログイン状態の場合は、ログインページ（LoginPage）を表示する。
// 認証状態の監視

export default async function LoinAuthPage() {
  const supabase = await createClient<Database>();

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 認証している場合、リダイレクト
  if (session) {
    redirect("/money-mindful/home");
  }

  return <LoginPage />;
}
