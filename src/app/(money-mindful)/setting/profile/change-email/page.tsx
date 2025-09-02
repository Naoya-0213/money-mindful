"use client";

import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

import Image from "next/image";
import { useRouter } from "next/navigation";

import useUserStore from "@/store/useUserStore";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import Button from "@/app/components/Atoms/button/Button";
import LoadingSpinner from "@/app/components/Atoms/loading/LoadingSpinner";
import DisplayField from "@/app/components/Molecules/field/DisplayFeild";
import FormField from "@/app/components/Molecules/field/FormField";
import SectionCard from "@/app/components/Molecules/section-card/SectionCard";
import SectionInfoBox from "@/app/components/Molecules/section-card/SectionInfoBox";

import { createClient } from "@/utils/supabase/clients";

// ===== プロフィール設定/Email変更用 =====

type Schema = z.infer<typeof schema>;

const schema = z.object({
  email: z.string().email({ message: "メールアドレスの形式ではありません。" }),
});

const ChangeEmailPage = () => {
  const router = useRouter();
  const supabase = createClient();
  const { user } = useUserStore();
  const [email, setEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "" },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (!user?.id) return;
      if (user?.email) setEmail(user.email);
    };
    fetchUser();
  }, [supabase, router, user]);

  // 登録時のメッセージ
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // ローディング画面用
  const [loading, setLoading] = useState(false);

  // メール変更確認メールの送信
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);
    setMessage(null);

    try {
      // メールアドレス変更メールを送信
      const { error: updateUserError } = await supabase.auth.updateUser(
        { email: data.email },
        { emailRedirectTo: `${location.origin}/callback` },
      );

      // エラーチェック
      if (updateUserError) {
        console.log("エラーが発生しました。" + updateUserError.message);
        setMessage({
          type: "error",
          text: "エラーが発生しました。\n再度確認してください。",
        });
        return;
      }

      // 登録成功 → 確認メール送信済み画面へ遷移するなど
      setMessage({
        type: "success",
        text: "確認用のURLを記載したメールを\n送信しました。",
      });
    } catch (error) {
      console.error("予期せぬエラー", error);
      setMessage({
        type: "error",
        text: "予期せぬエラーが発生しました。",
      });
      return;
    } finally {
      setLoading(false);

      // メール変更完了後に画面をリフレッシュするために使用するRouterフック
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
          icon="/icon/setting/profile/social.png"
          label="メールアドレス変更"
        >
          {/* 現在のメールアドレス */}
          <DisplayField
            label="現在のEmail"
            icon="/icon/setting/profile/email.png"
          >
            {email}
          </DisplayField>

          {/* 新しいメールアドレス */}
          <FormField
            label="新しいEmail"
            icon="/icon/setting/profile/email(2).png"
            placeholder="新しいメールアドレスを入力"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 px-4 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}

          {/* 注意点 */}
          <div className="flex flex-col items-center gap-5 py-3 font-semibold text-[#777777]">
            <div className="flex flex-col items-center">
              <p>新旧両方のメールに</p>
              <p>届くリンクを</p>
              <p>クリックする必要があります。</p>
            </div>

            <div className="flex flex-col items-center">
              <p>必ず両方のメールを</p>
              <p>ご確認ください。</p>
            </div>
          </div>
          <SectionInfoBox>
            <div className="flex flex-col gap-5 pb-5">
              <div className="flex gap-3">
                <Image
                  src="/icon/error/warning.png"
                  alt="アイコン"
                  width={25}
                  height={25}
                />
                <p className="text-lg font-bold">注意点</p>
              </div>
              <div className="flex flex-col items-center gap-5 text-[#777777]">
                <div className="flex flex-col items-center">
                  <p>リンクはログインした状態で</p>
                  <p>開いてください。</p>
                </div>

                <div className="flex flex-col items-center">
                  <p>ログインが切れていた場合は、</p>
                  <p>もう一度ログインしてから</p>
                  <p>再度、変更してください。</p>
                </div>
              </div>
            </div>
          </SectionInfoBox>

          <div className="flex flex-col items-center gap-3 pt-3">
            {/* 保存ボタン */}
            <div className="flex w-full justify-center">
              <Button type="submit">保存</Button>
            </div>

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

            {/* 戻るボタン */}
            <div className="flex w-full justify-center">
              <Button href="/setting/profile">戻る</Button>
            </div>
          </div>
        </SectionCard>
      </form>
    </div>
  );
};

export default ChangeEmailPage;
