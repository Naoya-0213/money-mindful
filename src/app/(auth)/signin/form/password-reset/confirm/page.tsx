"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Button from "@/app/components/atoms/button/Button";
import FormField from "@/app/components/molecules/field/FormField";
import SectionCard from "@/app/components/molecules/section-card/SectionCard";

import { createClient } from "@/utils/supabase/clients";

// ===== パスワード再設定ページ =====
// 📍メールリンクから遷移したユーザーが新しいパスワードを設定する画面
// Supabaseで新しいパスワードを更新し、完了後ログイン画面へリダイレクト

// Zod＆React-hook-form で使用
type Schema = z.infer<typeof schema>;

const schema = z.object({
  password: z.string().min(6, { message: "6文字以上入力する必要があります" }),
});

const NewPasswordPage = () => {
  const router = useRouter();
  const supabase = createClient();

  // ログイン画面遷移前のメッセージ
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const onSubmit = async (data: Schema) => {
    try {
      const { password } = data;

      // パスワードリセットへ遷移
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        console.error("パスワード更新エラー", error.message);
        setMessage({
          type: "error",
          text: "パスワードの更新に失敗しました。\n再度お試しください。",
        });
        return;
      }

      setMessage({
        type: "success",
        text: "パスワードを変更しました。\n再度ログインしてください。",
      });

      // 2秒後にログイン画面へ
      setTimeout(() => {
        router.push("/signin");
      }, 2000);
    } catch (error) {
      console.error("予期しないエラー", error);
      setMessage({
        type: "error",
        text: "予期せぬエラーが発生しました。",
      });
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { password: "" },
    resolver: zodResolver(schema),
  });

  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <form
        className="flex w-full flex-col items-center gap-5 p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <SectionCard label="パスワード変更" icon="/icon/signin/enter.png">
          <div className="flex flex-col gap-3">
            {/* パスワード入力欄 */}
            <FormField
              label="新しいPassword"
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

          {/* 備考 */}
          <div className="flex flex-col items-center gap-5 leading-relaxed font-semibold text-[#777777]">
            <div className="flex flex-col items-center">
              <p>認証が完了しました。</p>
              <p>6文字以上でパスワードを</p>
              <p>再設定してください。</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 pb-5">
            {/* ログイン画面へ遷移前に説明文 */}
            {message && (
              <p
                className={`text-center font-semibold whitespace-pre-line ${
                  message.type === "success" ? "text-green-700" : "text-red-500"
                }`}
              >
                {message.text}
              </p>
            )}

            {/* ログインボタン */}
            <Button type="submit">送信</Button>
          </div>
        </SectionCard>
      </form>
    </div>
  );
};

export default NewPasswordPage;
