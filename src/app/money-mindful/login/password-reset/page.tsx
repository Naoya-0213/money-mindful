// パスワードリセット用

"use client";

import Button from "@/app/components/button/Button";
import FormField from "@/app/components/field/FormField";
import SectionCard from "@/app/components/section-card/SectionCard";
import { createClient } from "@/utils/supabase/clients";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Zod＆React-hook-form で使用
type Schema = z.infer<typeof schema>;

// zodの指定 入力データの検証およびバリデーション
const schema = z.object({
  email: z.string().email({ message: "メールアドレスの形式ではありません" }),
});

const PasswordResetForEmailPage = () => {
  const router = useRouter();

  // supabase連携（別ページにて連携済み）
  const supabase = createClient();

  // 登録時のメッセージ
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // submitボタンクリック動作
  const onSubmit = async (data: Schema) => {
    try {
      const { email } = data;

      // パスワードリセットへ遷移
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo:
          "http://localhost:3000/money-mindful/login/password-reset/confirm",
      });

      if (error) {
        console.error("登録エラー", error.message);
        alert("登録に失敗しました。再度お試しください。");
        return;
      }

      // 登録成功 → 確認メール送信済み画面へ遷移するなど
      setMessage({
        type: "success",
        text: "確認メールを送信しました！",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: "予期せぬエラーが発生しました。",
      });
      console.error(error);
    }
  };

  // react-hook-form連携
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // 初期値
    defaultValues: { email: "" },
    // バリデーション（zod連携）
    resolver: zodResolver(schema),
  });

  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <form
        className="flex w-full flex-col items-center gap-5 p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <SectionCard label="パスワード変更" icon="/icon/login/enter.png">
          <div className="flex flex-col gap-3">
            {/* メールアドレス入力欄 */}
            <FormField
              label="Email"
              placeholder="メールアドレスを入力"
              icon="/icon/login/email.png"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 px-4 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* 備考 */}
          <div className="flex flex-col items-center gap-5 leading-relaxed font-semibold text-[#777777]">
            <div className="flex flex-col items-center">
              <p>入力されたメールアドレスに</p>
              <p>パスワード変更用の</p>
              <p>リンクを送信します。</p>
            </div>
            <div className="flex flex-col items-center">
              <p>メール内のリンクから</p>
              <p>再設定をお願いします。</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-5 pb-5">
            {/* 登録時メッセージ */}
            {message && (
              <div
                className={`font-bold ${
                  message.type === "error" ? "text-red-500" : "text-green-700"
                }`}
              >
                {message.text}
              </div>
            )}
            {/* 送信ボタン */}
            <Button type="submit">送信</Button>

            {/* 戻るボタン */}
            <div className="flex w-full justify-center">
              <Button href="/money-mindful/login">戻る</Button>
            </div>
          </div>
        </SectionCard>
      </form>
    </div>
  );
};

export default PasswordResetForEmailPage;
