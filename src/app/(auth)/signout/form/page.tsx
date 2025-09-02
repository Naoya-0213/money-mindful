"use client";

import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

import Button from "@/app/components/Atoms/button/Button";
import LoadingSpinner from "@/app/components/Atoms/loading/LoadingSpinner";
import SectionCard from "@/app/components/Molecules/section-card/SectionCard";

import { createClient } from "@/utils/supabase/clients";

// ===== ログアウトページ =====
// 📍設定画面から遷移し、ログアウト処理を実行する画面
// SupabaseのsignOutメソッドでセッションを削除し、ログイン画面へリダイレクト

type Schema = { email: string };

const SignoutPage = () => {
  const router = useRouter();
  const supabase = createClient();

  const { handleSubmit } = useForm({
    defaultValues: { email: "" },
  });

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<Schema> = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        setMessage({
          type: "error",
          text: "エラーが発生しました。\n" + error.message,
        });
        return;
      }

      router.replace("/signin");
      toast.success("ログアウトしました。");
    } catch (error) {
      console.error("予期せぬエラー", error);
      setMessage({
        type: "error",
        text: "予期せぬエラーが発生しました。",
      });
      return;
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <LoadingSpinner />
        </div>
      )}
      <form
        className="flex w-full flex-col items-center gap-5 p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <SectionCard
          icon="/icon/setting/account/enter.png"
          label="アカウント管理"
        >
          <div className="flex flex-col items-center gap-5">
            <div className="py-3 leading-relaxed font-semibold text-[#777777]">
              <p>本当にログアウトしますか？</p>
            </div>

            {/* ボタン */}
            <Button type="submit">ログアウト</Button>

            {/* メッセージ表示 */}
            {message && (
              <p className="mt-1 px-4 text-sm text-red-500">{message.text}</p>
            )}

            <Button href="/setting">設定に戻る</Button>
          </div>
        </SectionCard>
      </form>
    </div>
  );
};

export default SignoutPage;
