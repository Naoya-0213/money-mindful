"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { createClient } from "@/utils/supabase/clients";

// ===== メール変更時に遷移 ======
// （UIは後ほど調整）

const AuthCallbackPage = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const router = useRouter();

  // ✅ 初回セッション確認
  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        setStatus("error");
      } else {
        setStatus("success");
      }
    };

    checkSession();
  }, []);

  // ✅ エラー発生時は別ページへリダイレクト
  useEffect(() => {
    if (status === "error") {
      router.replace("/auth/callback/callback-error");
    }
  }, [status, router]);

  if (status === "loading") return <p>確認中...</p>;
  if (status === "error") return null; // リダイレクト直前のためUI非表示

  return (
    <div className="p-8 text-center">
      <h1 className="text-xl font-bold text-green-700">
        メール変更が完了しました！
      </h1>
      <p className="mt-4">引き続きご利用ください。</p>
    </div>
  );
};

export default AuthCallbackPage;
