"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { createClient } from "@/utils/supabase/clients";
import SectionCard from "@/app/components/section-card/SectionCard";
import Button from "@/app/components/button/Button";

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
            <Button href="/money-mindful/setting">設定へ戻る</Button>
          </div>

          {/* ホームへ戻るボタン */}
          <div className="flex w-full justify-center">
            <Button href="/money-mindful/home">ホームへ戻る</Button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default AuthCallbackPage;
