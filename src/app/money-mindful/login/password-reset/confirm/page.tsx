// 登録メールアドレスに送られるパスワードリセットリンククリック後画面用

"use client";

import Button from "@/app/components/button/Button";
import FormField from "@/app/components/field/FormField";
import SectionCard from "@/app/components/section-card/SectionCard";
import { createClient } from "@/utils/supabase/clients";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Zod＆React-hook-form で使用
type Schema = z.infer<typeof schema>;

// zodの指定 入力データの検証およびバリデーション
const schema = z.object({
  email: z.string().email({ message: "メールアドレスの形式ではありません" }),
  password: z.string().min(6, { message: "6文字以上入力する必要があります" }),
});

// ログインページ
const NewPasswordPage = () => {
  const router = useRouter();

  // submitボタンクリック動作
  const onSubmit = (data: Schema) => {
    console.log("送信データ:", data);
    // supabase.auth.signInWithPassword などへ接続予定
    // router.push("/home") などで遷移もOK
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
        <SectionCard label="パスワード変更" icon="/icon/login/enter.png">
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
          </div>

          {/* 備考 */}
          <div className="flex flex-col items-center gap-5 leading-relaxed font-semibold text-[#777777]">
            <div className="flex flex-col items-center">
              <p>認証が完了しました。</p>
              <p>6文字以上でパスワードを</p>
              <p>再設定してください。</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 pb-5">
            {/* ログインボタン */}
            <Button type="submit">送信</Button>
          </div>
        </SectionCard>
      </form>
    </div>
  );
};

export default NewPasswordPage;
