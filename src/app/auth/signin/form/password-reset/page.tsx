// パスワードリセット用

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Button from "@/app/components/button/Button";
import FormField from "@/app/components/field/FormField";
import SectionCard from "@/app/components/section-card/SectionCard";

import { createClient } from "@/utils/supabase/clients";

// パスワードリセット用

// パスワードリセット用

// パスワードリセット用

// Zod＆React-hook-form で使用
type Schema = z.infer<typeof schema>;

// zodの指定 入力データの検証およびバリデーション
const schema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "メールアドレスの形式ではありません" }),
});

const PasswordResetConfirmPage = () => {
  // const router = useRouter();

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

      // パスワードリセットリンク送信処理
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo:
          "http://localhost:3000/money-mindful/signin/password-reset/confirm",
      });

      if (error) {
        console.error("更新エラー", error.message);
        setMessage({
          type: "error",
          text: "更新に失敗しました。\n再度お試しください。",
        });
        return;
      }

      // 送信成功 → メッセージ表示
      setMessage({
        type: "success",
        text: "変更用のリンクを送信しました！\nメールをご確認ください。",
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
        <SectionCard label="パスワード再設定" icon="/icon/signin/enter.png">
          <div className="flex flex-col gap-3">
            {/* パスワード入力欄 */}
            <FormField
              label="Email"
              placeholder="メールアドレスを入力"
              type="email"
              icon="/icon/signin/email.png"
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
                className={`text-center font-semibold whitespace-pre-line ${
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
              <Button href="/money-mindful/signin">戻る</Button>
            </div>
          </div>
        </SectionCard>
      </form>
    </div>
  );
};

export default PasswordResetConfirmPage;
