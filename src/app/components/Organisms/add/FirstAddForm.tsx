"use client";

import { type ReactNode, useState } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { CATEGORY_LIST } from "@/const/category-icon/categoryIconMap";
import useUserStore from "@/store/useUserStore";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import Button from "@/app/components/atoms/button/Button";
import FormField from "@/app/components/molecules/field/FormField";

import { createClient } from "@/utils/supabase/clients";

import ErrorText from "../../atoms/text/ErrorText";
import CategoryItem from "../../molecules/category/CategoryItem";

// ===== 我慢記録フォーム（初回登録） =====
// 📍初回チュートリアル画面などで使用
// React Hook Form + Zodでバリデーションし、Supabaseに記録を保存

type AddCardProps = {
  children?: ReactNode;
};

type Schema = z.infer<typeof schema>;

const schema = z.object({
  title: z
    .string()
    .min(1, { message: "1文字以上で入力ください。" })
    .max(20, { message: "20文字以内で入力ください。" }),
  amount: z.number({ message: "金額を入力してください。" }),
  saved_date: z.string().min(1, { message: "日付を選択してください。" }),
  category_id: z.string().min(1, { message: "必ず選択してください。" }),
  memo: z.string().optional(),
});

const FirstAddForm = ({ children }: AddCardProps) => {
  const router = useRouter();
  const supabase = createClient();
  const { user } = useUserStore();

  const [isDisplayCategory, setIsDisplayCategory] = useState(false);
  const onClickCategory = () => setIsDisplayCategory(true);
  // 金額入力時の , 表示
  const [formattedAmount, setFormattedAmount] = useState("");

  const onChoiceCategory = (categoryId: string) => {
    setValue("category_id", categoryId);
    setIsDisplayCategory(false);
  };

  const {
    register,
    setValue,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    defaultValues: {
      title: "",
      amount: undefined,
      saved_date: new Date().toISOString().split("T")[0],
      category_id: "category-1",
      memo: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = async (data: Schema) => {
    console.log("🔽 登録データ確認:", data);

    if (!user?.id) return;

    const { error } = await supabase.from("money-savings").insert({
      user_id: user.id,
      title: data.title,
      amount: data.amount,
      saved_date: data.saved_date,
      category_id: data.category_id,
      memo: data.memo ?? "",
    });

    if (!error) {
      toast.success("記録しました！");
      router.replace("/home");
    }
  };

  return (
    <>
      {isDisplayCategory === true && (
        <div className="flex flex-col gap-3">
          {CATEGORY_LIST.map((category) => (
            <div
              key={category.id}
              onClick={() => {
                onChoiceCategory(category.id);
              }}
            >
              <CategoryItem id={category.id} />
            </div>
          ))}
        </div>
      )}
      {isDisplayCategory === false && (
        <form
          className="flex w-full flex-col gap-5 bg-[#EAE3D8]"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* タイトル */}
          <div className="flex flex-col gap-1">
            <FormField
              label="タイトル"
              placeholder="タイトルを入力"
              icon="/icon/add/tag.png"
              {...register("title")}
            />
            {errors.title && <ErrorText> {errors.title.message}</ErrorText>}
          </div>

          {/* 額 */}
          <div className="flex flex-col gap-1">
            <Controller
              name="amount"
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
            {errors.amount && <ErrorText> {errors.amount.message}</ErrorText>}
          </div>

          {/* 追加日 */}
          <div className="flex flex-col gap-1">
            <FormField
              label="追加日"
              icon="/icon/add/calendar.png"
              type="date"
              {...register("saved_date")}
            />
            {errors.saved_date && (
              <ErrorText>{errors.saved_date.message}</ErrorText>
            )}
          </div>

          {/* カテゴリー */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div>
                <Image
                  src="/icon/add/categories.png"
                  alt="カテゴリーアイコン"
                  width={20}
                  height={20}
                />
              </div>
              <h2 className="text-lg font-bold text-[#795549]">カテゴリー</h2>
            </div>

            <div onClick={onClickCategory} className="w-full">
              <CategoryItem id={watch("category_id")} />
            </div>
          </div>

          {/* メモ */}
          <FormField
            label="メモ"
            placeholder="メモを入力"
            icon="/icon/add/memo.png"
            isTextarea
            {...register("memo")}
          />

          <div className="flex justify-center pt-5">
            {/* 保存ボタン */}
            <Button type="submit">保存</Button>
          </div>
          {children}
        </form>
      )}
    </>
  );
};

export default FirstAddForm;
