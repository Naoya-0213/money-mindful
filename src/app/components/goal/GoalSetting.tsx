"use client";

import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { createClient } from "@/utils/supabase/clients";
import { getCurrentUser } from "@/utils/supabase/getCurrentUser";

import Button from "../button/Button";
import FormField from "../field/FormField";
import SectionCard from "../section-card/SectionCard";

// ＝==== 目標設定用カード ======
// 目標の初回入力欄
// supabaseへの保存
// GoalCardで、保存した目標の表示を行う。

// 入力データの検証ルールを定義
const schema = z.object({
  title: z
    .string()
    .min(1, { message: "1文字以上で入力ください。" })
    .max(20, { message: "20文字以内で入力ください。" }),
  target_amount: z.number().min(1, { message: "金額を入力してください。" }),
  end_date: z.string().min(1, { message: "日付を選択してください。" }),
});

// Zodスキーマから型を自動推論してSchema型を定義
type Schema = z.infer<typeof schema>;

const GoalSetting = () => {
  // 画面遷移やページのリフレッシュなどに使用するRouterオブジェクトを取得
  const router = useRouter();

  // supabase連携（別ページにて連携済み）
  const supabase = createClient();

  // 入力値更新用
  const [title, setTitle] = useState("");

  // React hook formの指定
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    // 初期値
    defaultValues: { title: "", target_amount: 0, end_date: "" },
    // 入力値の検証
    resolver: zodResolver(schema),
  });

  // 送信ボタンの動作
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    const user = await getCurrentUser(supabase);
    if (!user) return;

    const { error } = await supabase.from("goals").insert({
      user_id: user.id,
      title: data.title,
      target_amount: data.target_amount,
      end_date: data.end_date,
      start_date: new Date().toISOString().split("T")[0],
    });

    if (!error) {
      router.replace("/money-mindful/home");
    }
  };

  return (
    <SectionCard icon="/icon/setting/goal/flag.png" label="目標設定">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 目標タイトル */}
        <FormField
          label="目標タイトル"
          icon="/icon/setting/goal/tag.png"
          placeholder="北海道旅行"
          {...register("title")}
        />

        {/* 額 */}
        <FormField
          label="金額"
          icon="/icon/setting/goal/money.png"
          placeholder="¥150"
        />

        {/* 期限 */}
        <FormField
          label="金額"
          icon="/icon/setting/goal/calendar.png"
          placeholder="2025年12月2日（水）"
        />

        {/* 追加日 */}
        <FormField
          label="追加日"
          icon="/icon/setting/goal/pin.png"
          placeholder="2025年7月2日（水）"
        />

        {/* メモ */}
        <FormField
          label="メモ"
          icon="/icon/setting/goal/notes.png"
          placeholder="12月にいく北海道旅行用！"
          isTextarea
        />

        <div className="flex flex-col gap-5 pt-5">
          {/* 保存ボタン */}
          <div className="flex w-full justify-center">
            <Button
              href="/money-mindful/setting"
              onClick={() => alert("supabaseへ保存！")}
            >
              保存
            </Button>
          </div>
          {/* 戻るボタン */}
          <div className="flex w-full justify-center">
            <Button href="/money-mindful/setting">戻る</Button>
          </div>
          {/* 削除ボタン */}
          <div className="flex w-full justify-center">
            <Button
              className="bg-[#D7CDBE] !text-[#795549]"
              onClick={() => alert("削除！")}
            >
              リセット
            </Button>
          </div>
        </div>
      </form>
    </SectionCard>
  );
};

export default GoalSetting;
