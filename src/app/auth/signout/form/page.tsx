"use client";

import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

import z from "zod";

import Button from "@/app/components/button/Button";
import SectionCard from "@/app/components/section-card/SectionCard";

import { createClient } from "@/utils/supabase/clients";

// ===== ログアウト画面用 ======

// 入力データの検証ルールを定義
const schema = z.object({
  email: z.string().email({ message: "メールアドレスの形式ではありません。" }),
});

// Zodスキーマから型を自動推論してSchema型を定義
type Schema = z.infer<typeof schema>;

const signoutPage = () => {
  const router = useRouter();

  // supabase連携（別ページにて連携済み）
  const supabase = createClient();

  // React hook formの指定
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // 初期値
    defaultValues: { email: "" },
  });

  // エラーメッセージ表示用
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  // ローディング画面用
  const [loading, setLoading] = useState(false);

  // クリック動作
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);
    setMessage(null);

    try {
      // ログアウト
      const { error } = await supabase.auth.signOut();

      // エラーチェック
      if (error) {
        setMessage({
          type: "error",
          text: "エラーが発生しました。\n" + error.message,
        });
        return;
      }

      router.replace("/auth/signin");
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

            <Button href="/money-mindful/setting">設定に戻る</Button>
          </div>
        </SectionCard>
      </form>
    </div>
  );
};

export default signoutPage;
