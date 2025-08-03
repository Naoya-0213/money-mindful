"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Button from "@/app/components/button/Button";
import FormField from "@/app/components/field/FormField";
import SectionCard from "@/app/components/section-card/SectionCard";

import { createClient } from "@/utils/supabase/clients";

// ===== サインインフォームページ =====
// 📍ログインフォームの入力画面
// Supabaseでログイン処理し、成功すればホームに遷移

type Schema = z.infer<typeof schema>;

const schema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "メールアドレスの形式ではありません" }),
  password: z.string().min(6, { message: "6文字以上入力する必要があります" }),
});

const SigninPage = () => {
  const router = useRouter();
  const supabase = createClient();

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Schema) => {
    try {
      const { email, password } = data;
      const { error: signInError } = await supabase.auth.signInWithPassword({
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

      router.replace("/money-mindful/home");
      toast.success("ログインしました。");
    } catch (error) {
      console.error("予期せぬエラー", error);
      setMessage({
        type: "error",
        text: "予期せぬエラーが発生しました。",
      });
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <form
        className="flex w-full flex-col items-center gap-5 p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <SectionCard label="ログイン" icon="/icon/signin/enter.png">
          <div className="flex flex-col gap-3">
            {/* メールアドレス入力欄 */}
            <FormField
              label="Email"
              placeholder="メールアドレスを入力"
              icon="/icon/signin/email.png"
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
              icon="/icon/signin/lock.png"
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
                  href="/auth/signin/form/password-reset"
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
              <Link href="/auth/signup/form" className="text-[#666] underline">
                こちら
              </Link>
            </p>
          </div>
        </SectionCard>
      </form>
    </div>
  );
};

export default SigninPage;
