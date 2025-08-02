"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import BeforeSignin from "@/app/components/before-signin/BeforeSignin";

import { createClient } from "@/utils/supabase/clients";

// このファイルの役割：
// - Supabaseを使って現在のセッションを取得し、ログイン状態を確認する。
// - すでにログイン済みの場合は、"/money-mindful/home" に自動リダイレクトする。
// - 未ログイン状態の場合は、ログイン初回ページ（Beforesignin）を表示する。
// 認証状態の監視

export default function SigninAuthPage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        if (window.location.pathname !== "/money-mindful/home") {
          router.push("/money-mindful/home");
        }
      } else {
        setLoading(false);
      }
    };

    checkUser();
  }, [router, supabase]);

  if (loading) return null;

  return <BeforeSignin />;
}
