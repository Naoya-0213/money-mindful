// プロフィール設定/Email変更用

"use client";

import Button from "@/app/components/button/Button";
import DisplayField from "@/app/components/field/DisplayFeild";
import FormField from "@/app/components/field/FormField";
import SectionCard from "@/app/components/section-card/SectionCard";
import { createClient } from "@/utils/supabase/clients";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
type Schema = z.infer<typeof schema>;

// 入力データの検証ルールを定義
const schema = z.object({
  email: z.string().email({ message: "メールアドレスの形式ではありません。" }),
});

// メールアドレス変更
const ChangeEmailPage = ({ email }: { email: string }) => {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // 初期値
    defaultValues: { email: "" },
    // 入力値の検証
    resolver: zodResolver(schema),
  });

  // 送信
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);
    setMessage("");

    try {
      // メールアドレス変更メールを送信
      const { error: updateUserError } = await supabase.auth.updateUser(
        { email: data.email },
        { emailRedirectTo: `${location.origin}/auth/callback` },
      );

      // エラーチェック
      if (updateUserError) {
        setMessage("エラーが発生しました。" + updateUserError.message);
        return;
      }

      setMessage("確認用のURLを記載したメールを送信しました。");

      // ログアウト
      const { error: signOutError } = await supabase.auth.signOut();

      // エラーチェック
      if (signOutError) {
        setMessage("エラーが発生しました。" + signOutError.message);
        return;
      }

      router.push("/auth/signin");
    } catch (error) {
      setMessage("エラーが発生しました。" + error);
      return;
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <SectionCard
          icon="/icon/setting/profile/social.png"
          label="メールアドレス変更"
        >
          {/* 現在のメールアドレス */}
          <DisplayField
            label="現在のEmail"
            icon="/icon/setting/profile/email.png"
          >
            naoya.work0213@gmail.com
          </DisplayField>

          {/* 新しいメールアドレス */}
          <FormField
            label="新しいEmail"
            icon="/icon/setting/profile/email(2).png"
            placeholder="新しいメールアドレスを入力"
          />

          {/* 注意点 */}
          <div className="flex flex-col items-center gap-5">
            <p className="font-semibold text-[#777777]">
              変更には確認が必要です！
            </p>

            <div className="flex flex-col items-center">
              <p className="font-semibold text-[#777777]">
                新旧両方のアドレスに届く
              </p>
              <p className="font-semibold text-[#777777]">
                確認メールからリンクを開いて
              </p>
              <p className="font-semibold text-[#777777]">
                変更を完了してください。
              </p>
            </div>
          </div>

          {/* 保存ボタン */}
          <div className="flex w-full justify-center">
            <Button
              href="/money-mindful/setting/profile-setting"
              onClick={() => alert("supabaseへ保存！")}
            >
              保存
            </Button>
          </div>

          {/* 戻るボタン */}
          <div className="flex w-full justify-center">
            <Button href="/money-mindful/setting/profile-setting">戻る</Button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default ChangeEmailPage;
