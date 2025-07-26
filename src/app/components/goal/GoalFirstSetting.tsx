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
  start_date: z.string().min(1, { message: "日付を選択してください。" }),
  memo: z.string().optional(),
});

// Zodスキーマから型を自動推論してSchema型を定義
type Schema = z.infer<typeof schema>;

const GoalFirstSetting = () => {
  // 画面遷移やページのリフレッシュなどに使用するRouterオブジェクトを取得
  const router = useRouter();

  // supabase連携（別ページにて連携済み）
  const supabase = createClient();

  // 金額入力時の , 表示
  const [formattedAmount, setFormattedAmount] = useState("");

  // React hook formの指定
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Schema>({
    // 初期値
    defaultValues: {
      title: "",
      target_amount: undefined,
      end_date: "",
      start_date: new Date().toISOString().split("T")[0],
      memo: "",
    },
    // 入力値の検証
    resolver: zodResolver(schema),
  });

  // 送信ボタンの動作
  const onSubmit: SubmitHandler<Schema> = async (data: Schema) => {
    const user = await getCurrentUser(supabase);
    if (!user) return;

    const { error } = await supabase.from("goals").insert({
      user_id: user.id,
      title: data.title,
      target_amount: data.target_amount,
      end_date: data.end_date,
      start_date: new Date().toISOString().split("T")[0],
      memo: data.memo ?? "",
    });

    if (!error) {
      router.replace("/money-mindful/home");
    }
  };

  return (
    <SectionCard icon="/icon/setting/goal/flag.png" label="目標設定">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* 目標タイトル */}
        <div className="flex flex-col gap-1">
          <FormField
            label="目標タイトル"
            icon="/icon/setting/goal/tag.png"
            placeholder="タイトルを入力"
            {...register("title")}
          />
          {errors.title && (
            <p className="mt-1 px-4 text-sm text-red-500">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* 額 */}
        <div className="flex flex-col gap-1">
          <div className="relative w-full">
            <FormField
              label="金額"
              icon="/icon/setting/goal/money.png"
              placeholder="金額を入力"
              type="text"
              InputStyle={{ paddingLeft: "3rem" }}
              {...register("target_amount")}
              // 金額入力時の , 表示
              value={formattedAmount}
              onChange={(e) => {
                // 入力された値からカンマを除去（例：“12,000” → “12000”）
                const raw = e.target.value.replace(/,/g, "");

                // 数値に変換する（“12000” → 12000）
                const numeric = Number(raw);
                if (!isNaN(numeric) && raw !== "") {
                  setValue("target_amount", numeric);
                  setFormattedAmount(numeric.toLocaleString("ja-JP"));
                } else {
                  setValue("target_amount", 0);
                  setFormattedAmount("");
                }
              }}
            >
              {/* ¥マーク */}
              <span className="absolute top-1/2 left-4 -translate-y-1/2 text-xl font-bold text-[#795549]">
                ¥
              </span>
            </FormField>
          </div>

          {errors.target_amount && (
            <p className="mt-1 px-4 text-sm text-red-500">
              {errors.target_amount.message}
            </p>
          )}
        </div>

        {/* 期限 */}
        <div className="flex flex-col gap-1">
          <FormField
            label="期限"
            icon="/icon/setting/goal/calendar.png"
            type="date"
            {...register("end_date")}
          />
          {errors.end_date && (
            <p className="mt-1 px-4 text-sm text-red-500">
              {errors.end_date.message}
            </p>
          )}
        </div>

        {/* 追加日 */}
        <div className="flex flex-col gap-1">
          <FormField
            label="追加日"
            icon="/icon/setting/goal/pin.png"
            type="date"
            {...register("start_date")}
          />
          {errors.start_date && (
            <p className="mt-1 px-4 text-sm text-red-500">
              {errors.start_date.message}
            </p>
          )}
        </div>

        {/* メモ */}
        <FormField
          label="メモ"
          icon="/icon/setting/goal/notes.png"
          placeholder={`詳細を入力`}
          isTextarea
          {...register("memo")}
        />

        <div className="flex flex-col gap-5 pt-5">
          {/* 保存ボタン */}
          <div className="flex w-full justify-center">
            <Button type="submit">保存</Button>
          </div>
          {/* 戻るボタン */}
          <div className="flex w-full justify-center">
            <Button href="/money-mindful/setting">戻る</Button>
          </div>
          {/* 削除ボタン */}
          {/* <div className="flex w-full justify-center">
            <Button
              className="bg-[#D7CDBE] !text-[#795549]"
              onClick={() => alert("削除！")}
            >
              リセット
            </Button>
          </div> */}
        </div>
      </form>
    </SectionCard>
  );
};

export default GoalFirstSetting;
