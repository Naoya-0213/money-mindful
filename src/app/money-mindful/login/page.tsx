// ログイン確認画面用

"use client";

import Button from "@/app/components/button/Button";
import FormField from "@/app/components/field/FormField";
import SectionCard from "@/app/components/section-card/SectionCard";
import { createClient } from "@/utils/supabase/clients";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Zod＆React-hook-form で使用
type Schema = z.infer<typeof schema>;

// zodの指定 入力データの検証およびバリデーション
const schema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "メールアドレスの形式ではありません" }),
  password: z.string().min(6, { message: "6文字以上入力する必要があります" }),
});

// ログインページ
const LoginPage = () => {
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
      const { email, password } = data;

      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        console.error("ログインエラー", signInError.message);
        setMessage({
          type: "error",
          text: "ログインに失敗しました。\n再度確認してください。",
        });
        return;
      }

      router.push("/money-mindful/home");
    } catch (error) {
      console.error("予期せぬエラー", error);
      setMessage({
        type: "error",
        text: "予期せぬエラーが発生しました。",
      });
    }
  };

  // react-hook-form連携
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // 初期値
    defaultValues: { email: "", password: "" },
    // バリデーション（zod連携）
    resolver: zodResolver(schema),
  });

  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <form
        className="flex w-full flex-col items-center gap-5 p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <SectionCard label="ログイン" icon="/icon/login/enter.png">
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

          <div className="flex flex-col gap-3">
            {/* パスワード入力欄 */}
            <FormField
              label="Password"
              placeholder="6文字以上でパスワードを入力"
              icon="/icon/login/lock.png"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 px-4 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}

            {/* パスワードを忘れた方へ */}
            <div className="flex flex-col items-center gap-5">
              <p className="font-semibold text-[#777777]">
                パスワードを忘れた方は
                <Link
                  href="/money-mindful/login/password-reset"
                  className="text-[#666] underline"
                >
                  こちら
                </Link>
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 pt-5 pb-5">
            {/* メッセージ表示 */}
            {message && (
              <div
                className={`text-center font-semibold whitespace-pre-line ${
                  message.type === "error" ? "text-red-500" : "text-green-700"
                }`}
              >
                {message.text}
              </div>
            )}
            {/* ログインボタン */}
            <Button type="submit">ログイン</Button>

            {/* 新規登録へ誘導 */}
            <p className="font-semibold text-[#777777]">
              アカウント作成は
              <Link
                href="/money-mindful/signup"
                className="text-[#666] underline"
              >
                こちら
              </Link>
            </p>
          </div>
        </SectionCard>
      </form>
    </div>
  );
};

export default LoginPage;
