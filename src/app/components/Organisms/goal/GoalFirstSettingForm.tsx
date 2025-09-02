"use client";

import { useState } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

import useUserStore from "@/store/useUserStore";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { createClient } from "@/utils/supabase/clients";

import Button from "../../atoms/button/Button";
import FormField from "../../molecules/field/FormField";
import SectionCard from "../../molecules/section-card/SectionCard";

// ===== 初回目標設定フォームコンポーネント =====
// 📍初回設定画面で使用。目標タイトル・金額・期限などを入力してSupabaseに保存
// 保存後はホーム画面へ遷移。Zod＋React Hook Formでバリデーション

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

type Schema = z.infer<typeof schema>;

const GoalFirstSetting = () => {
  const router = useRouter();
  const supabase = createClient();
  const { user } = useUserStore();

  // 金額入力時の , 表示
  const [formattedAmount, setFormattedAmount] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Schema>({
    defaultValues: {
      title: "",
      target_amount: undefined,
      end_date: "",
      start_date: new Date().toISOString().split("T")[0],
      memo: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = async (data: Schema) => {
    if (!user?.id) return;

    const { error } = await supabase.from("goals").insert({
      user_id: user.id,
      title: data.title,
      target_amount: data.target_amount,
      end_date: data.end_date,
      start_date: new Date().toISOString().split("T")[0],
      memo: data.memo ?? "",
    });

    if (!error) {
      toast.success("登録しました！");
      router.replace("/home");
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
          {/* react-hook-form の Controller導入（金額の , のため）*/}
          <Controller
            name="target_amount"
            control={control}
            render={({ field }) => (
              <div className="relative w-full">
                <FormField
                  label="金額"
                  icon="/icon/setting/goal/money.png"
                  placeholder="金額を入力"
                  type="text"
                  InputStyle={{ paddingLeft: "3rem" }}
                  value={formattedAmount}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/,/g, "");
                    const numeric = Number(raw);
                    if (!isNaN(numeric) && raw !== "") {
                      field.onChange(numeric);
                      setFormattedAmount(numeric.toLocaleString("ja-JP"));
                    } else {
                      field.onChange(0);
                      setFormattedAmount("");
                    }
                  }}
                >
                  <span className="absolute top-1/2 left-4 -translate-y-1/2 text-xl font-bold text-[#795549]">
                    ¥
                  </span>
                </FormField>
              </div>
            )}
          />
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

        {/* 設定日 */}
        <div className="flex flex-col gap-1">
          <FormField
            label="設定日"
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
            <Button href="/setting">戻る</Button>
          </div>
        </div>
      </form>
    </SectionCard>
  );
};

export default GoalFirstSetting;
