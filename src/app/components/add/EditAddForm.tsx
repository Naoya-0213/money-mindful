"use client";

import { type ReactNode, useEffect, useState } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import Image from "next/image";
import { useRouter } from "next/navigation";

import useCategoryStore from "@/store/useCategoryStore";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import Button from "@/app/components/button/Button";
import FormField from "@/app/components/field/FormField";

import { createClient } from "@/utils/supabase/clients";
import { getCurrentUser } from "@/utils/supabase/getCurrentUser";

import CategoryItem from "../category/CategoryItem";

// ===== 我慢の記録、初回登録画面 =====

type AddCardProps = {
  children?: ReactNode;
};

// 入力データの検証ルールを定義
const schema = z.object({
  title: z
    .string()
    .min(1, { message: "1文字以上で入力ください。" })
    .max(20, { message: "20文字以内で入力ください。" }),
  amount: z.number().min(1, { message: "金額を入力してください。" }),
  saved_date: z.string().min(1, { message: "日付を選択してください。" }),
  category_id: z.string().nullable(),
  memo: z.string().optional(),
});

// Zodスキーマから型を自動推論してSchema型を定義
type Schema = z.infer<typeof schema>;

const EditAddForm = ({ children }: AddCardProps) => {
  // 画面遷移やページのリフレッシュなどに使用するRouterオブジェクトを取得
  const router = useRouter();

  // supabase連携（別ページにて連携済み）
  const supabase = createClient();

  // 金額入力時の , 表示
  const [formattedAmount, setFormattedAmount] = useState("");

  // const [date, setDate] = useState(
  //   () => new Date().toISOString().split("T")[0],
  // );

  // カテゴリー選択管理（zustandで管理：storeと連携。詳細はuseCategoryStoreにて）
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);
  const setCategory = useCategoryStore((state) => state.setCategory);

  // React-hook-form準備
  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    defaultValues: {
      title: "",
      amount: undefined,
      saved_date: new Date().toISOString().split("T")[0],
      category_id: null,
      memo: "",
    },
    // 入力値の検証
    resolver: zodResolver(schema),
  });

  // カテゴリーが選択されたら反映
  useEffect(() => {
    if (selectedCategory) {
      setValue("category_id", selectedCategory);
    }
  }, [selectedCategory, setValue]);

  // 初回登録時、登録履歴がないため、食費カテゴリーを表示
  useEffect(() => {
    if (!selectedCategory) {
      setCategory("category-1");
    }
  }, []);

  // 保存ボタンの動作
  const onSubmit: SubmitHandler<Schema> = async (data: Schema) => {
    const user = await getCurrentUser(supabase);
    if (!user) return;

    const { error } = await supabase.from("money-savings").insert({
      user_id: user.id,
      title: data.title,
      amount: data.amount,
      saved_date: data.saved_date,
      category_id: data.category_id,
      memo: data.memo ?? "",
    });

    if (!error) {
      router.replace("/money-mindful/home");
    }
  };

  return (
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
        {errors.amount && (
          <p className="mt-1 px-4 text-sm text-red-500">
            {errors.amount.message}
          </p>
        )}
      </div>

      {/* 追加日 */}
      <div className="flex flex-col gap-1">
        <FormField
          label="追加日"
          icon="/icon/add/calendar.png"
          type="date"
          {...register("saved_date")}
          // value={date}
          // onChange={(e) => setDate(e.target.value)}
        />
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

        {/* zustandと連携。登録履歴があれば、直近選択したカテゴリーを表示。（なければ、食費を表示）。クリックすれば他カテゴリーが選択できる！ */}
        {selectedCategory && (
          <div
            onClick={() => router.push("/money-mindful/add/addCategoryPage")}
            className="w-full"
          >
            <CategoryItem id={selectedCategory} />
          </div>
        )}
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
  );
};

export default EditAddForm;
