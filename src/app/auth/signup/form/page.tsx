"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Button from "@/app/components/button/Button";
import FormField from "@/app/components/field/FormField";
import SectionCard from "@/app/components/section-card/SectionCard";

import { createClient } from "@/utils/supabase/clients";

// Zod＆React-hook-form で使用
type Schema = z.infer<typeof schema>;

// zodの指定 入力データの検証およびバリデーション
const schema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "メールアドレスの形式ではありません" }),
  password: z.string().min(6, { message: "6文字以上入力する必要があります" }),
  name: z
    .string()
    .trim()
    .min(1, { message: "1文字以上入力する必要があります" }),
});

const SignUpPage = () => {
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
      const { name, email, password } = data;

      // ① サインアップ
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo:
              "http://localhost:3000/money-mindful/signin/first-signin",
            data: {
              name, // ← ユーザー名をmetadataに渡す
            },
          },
        });

      if (signUpError) {
        console.error("登録エラー", signUpError.message);
        setMessage({
          type: "error",
          text: "登録に失敗しました。もう一度お試しください。",
        });
        return;
      }

      // ② ユーザーIDを取得
      const userId = signUpData.user?.id;

      if (!userId) {
        setMessage({
          type: "error",
          text: "ユーザーIDの取得に失敗しました。",
        });
        return;
      }

      // ③ プロフィール情報などをprofilesテーブルにinsert
      const { error: profileError } = await supabase.from("profiles").insert({
        id: userId, // Supabase AuthのUID
        email, // メールアドレス
        name,
        image_url: null, // 初期はnull
        created_at: new Date().toISOString(),
      });

      if (profileError) {
        console.error("プロフィール登録エラー", profileError.message);
        setMessage({
          type: "error",
          text: `登録に失敗しました：${profileError.message}`,
        });
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
    defaultValues: { name: "", email: "", password: "" },
    // バリデーション（zod連携）
    resolver: zodResolver(schema),
  });

  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <form
        className="flex w-full flex-col items-center gap-5 p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <SectionCard label="新規登録" icon="/icon/signin/enter.png">
          <div className="flex flex-col gap-3">
            {/* 名前入力欄 */}
            <FormField
              label="名前"
              placeholder="名前を入力"
              icon="/icon/signin/profile-user.png"
              type="text"
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1 px-4 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}

            {/* メールアドレス入力欄 */}
            <FormField
              label="Email"
              placeholder="メールアドレスを入力"
              icon="/icon/signin/email.png"
              type="email"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 px-4 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}

            {/* パスワード入力欄 */}
            <FormField
              label="Password"
              placeholder="6文字以上でパスワードを入力"
              icon="/icon/signin/lock.png"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 px-4 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* 説明文 */}
          <div className="flex flex-col items-center gap-5 leading-relaxed font-semibold text-[#777777]">
            <div className="flex flex-col items-center">
              <p>はじめての方は、まず新規登録から！</p>
            </div>
            <div className="flex flex-col items-center">
              <p>入力したメールアドレスに</p>
              <p>届くリンクから</p>
              <p>登録を完了しましょう！</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 pb-5">
            {/* 登録時メッセージ */}
            {message && (
              <div
                className={`font-semibold ${
                  message.type === "error" ? "text-red-500" : "text-green-700"
                }`}
              >
                {message.text}
              </div>
            )}

            {/* 新規登録ボタン */}
            <Button type="submit">新規登録</Button>

            {/* ログインへ誘導 */}
            <p className="font-semibold text-[#777777]">
              ログインは
              <Link href="/auth/signin/form" className="text-[#666] underline">
                こちら
              </Link>
            </p>
          </div>
        </SectionCard>
      </form>
    </div>
  );
};

export default SignUpPage;
