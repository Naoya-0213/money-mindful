// 新規登録用

"use client";

import FormField from "@/app/components/field/FormField";
import SectionCard from "@/app/components/section-card/SectionCard";
import { createClient } from "@/utils/supabase/clients";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "@/app/components/button/Button";

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
  const router = useRouter();

  // submitボタンクリック動作
  const onSubmit = async (data: Schema) => {
    const { name, email, password } = data;

    // ① サインアップ
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
      },
    );

    if (signUpError) {
      console.error("登録エラー", signUpError.message);
      alert("登録に失敗しました。再度お試しください。");
      return;
    }

    // ② ユーザーIDを取得
    const userId = signUpData.user?.id;

    if (!userId) {
      alert("ユーザーIDの取得に失敗しました。");
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
      alert("プロフィールの登録に失敗しました。");
      return;
    }

    // 登録成功 → 確認メール送信済み画面へ遷移するなど
    alert("確認メールを送信しました！メールをご確認ください。");
    router.push("/money-mindful/login");
  };

  // supabase連携（別ページにて連携済み）
  const supabase = createClient();

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
        <SectionCard label="新規登録" icon="/icon/login/enter.png">
          <div className="flex flex-col gap-3">
            {/* 名前入力欄 */}
            <FormField
              label="Email"
              placeholder="名前を入力"
              icon="/icon/login/profile-user.png"
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
              icon="/icon/login/email.png"
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
              icon="/icon/login/lock.png"
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
            {/* 新規登録ボタン */}
            <Button type="submit">新規登録</Button>

            {/* ログインへ誘導 */}
            <p className="font-semibold text-[#777777]">
              ログインは
              <Link
                href="/money-mindful/login"
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

export default SignUpPage;
