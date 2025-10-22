"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";



import { createClient } from "@/utils/supabase/clients";
import { Button, SectionCard } from "@/app/components";

// ===== メール変更完了ページ（認証コールバック） =====
// 📍メールアドレス変更リンクから遷移した際に表示される確認画面
// Supabaseでセッション確認し、失敗時はエラーページへリダイレクト

const AuthCallbackPage = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const router = useRouter();

  // 初回セッション確認
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

  // エラー発生時は別ページへリダイレクト
  useEffect(() => {
    if (status === "error") {
      router.replace("/callback/callback-error");
    }
  }, [status, router]);

  if (status === "loading") return <p>確認中...</p>;
  if (status === "error") return null;

  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <SectionCard
          icon="/icon/setting/profile/social.png"
          label="メールアドレス変更"
        >
          <div className="flex flex-col items-center gap-5 py-3 font-semibold">
            <h3 className="text-lg text-green-700">変更が完了しました！</h3>
            <p className="text-[#777777]">引き続きご利用ください。</p>
          </div>

          {/* 設定へ戻るボタン */}
          <div className="flex w-full justify-center">
            <Button href="/setting">設定へ戻る</Button>
          </div>

          {/* ホームへ戻るボタン */}
          <div className="flex w-full justify-center">
            <Button href="/home">ホームへ戻る</Button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default AuthCallbackPage;
