"use client";

import React, { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import Button from "@/app/components/button/Button";
import DisplayField from "@/app/components/field/DisplayFeild";
import FormField from "@/app/components/field/FormField";
import SectionCard from "@/app/components/section-card/SectionCard";

import { createClient } from "@/utils/supabase/clients";
import { getCurrentUser } from "@/utils/supabase/getCurrentUser";

// ===== プロフィール設定/ユーザー名変更用 =====

// 入力データの検証ルールを定義
const schema = z.object({
  name: z
    .string()
    .min(1, { message: "1文字以上入力してください。" })
    .max(20, { message: "20文字以内で入力してください。" }),
});
// Zodスキーマから型を自動推論してSchema型を定義
type Schema = z.infer<typeof schema>;

// ユーザー名の変更
const ChangeUserNamePage = () => {
  const router = useRouter();

  // supabase連携（別ページにて連携済み）
  const supabase = createClient();

  // 現在の名前の取得
  const [name, setName] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  // React hook formの指定
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    // 初期値（すでに登録済みname）
    defaultValues: { name: name },
    // 入力値の検証
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser(supabase);
      if (user) {
        setName(user.name ?? "");
        setUserId(user.id);
      }
    };
    fetchUser();
  }, []);

  // 登録時のメッセージ
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // ローディング画面用
  const [loading, setLoading] = useState(false);

  // 変更
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    if (!userId) {
      setMessage({
        type: "error",
        text: "ユーザー情報が取得できませんでした。",
      });
      return;
    }
    setLoading(true);
    setMessage(null);

    try {
      const { error: updateProfileError } = await supabase
        .from("profiles")
        .update({ name: data.name })
        .eq("id", userId);

      if (updateProfileError) {
        console.log("エラーが発生しました。" + updateProfileError.message);
        setMessage({
          type: "error",
          text: "エラーが発生しました。\n再度確認してください。",
        });
        return;
      }

      // 登録成功
      setMessage({
        type: "success",
        text: "名前の変更が完了しました！",
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
      router.refresh();
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <form
        className="flex w-full flex-col items-center gap-5 p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <SectionCard
          icon="/icon/setting/profile/social.png"
          label="ユーザー名変更"
        >
          {/* 現在の名前 */}
          <DisplayField
            label="現在の名前"
            icon="/icon/setting/profile/name.png"
          >
            {name}
          </DisplayField>

          {/* 新しい名前 */}
          <FormField
            label="新しい名前"
            icon="/icon/setting/profile/name(2).png"
            placeholder="新しい名前を入力"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}

          <div className="mt-5 flex flex-col gap-5 pb-5">
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
              <Button href="/money-mindful/setting/profile">戻る</Button>
            </div>
          </div>
        </SectionCard>
      </form>
    </div>
  );
};

export default ChangeUserNamePage;
