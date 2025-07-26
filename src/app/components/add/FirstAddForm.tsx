"use client";

import { type ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Image from "next/image";
import { useRouter } from "next/navigation";

import useCategoryStore from "@/store/useCategoryStore";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import Button from "@/app/components/button/Button";
import FormField from "@/app/components/field/FormField";

import CategoryItem from "../category/CategoryItem";

// ===== 我慢の記録、初回登録画面 =====

type AddCardProps = {
  children?: ReactNode;
  buttonTitle: string;
};

// 入力データの検証ルールを定義
const schema = z.object({
  title: z
    .string()
    .min(1, { message: "1文字以上で入力ください。" })
    .max(20, { message: "20文字以内で入力ください。" }),
  target_amount: z.number().min(1, { message: "金額を入力してください。" }),
  end_date: z.string().min(1, { message: "日付を選択してください。" }),
  start_date: z.string().min(1, { message: "日付を選択してください。" }),
  category_id: z.string().nullable(),
});

// Zodスキーマから型を自動推論してSchema型を定義
type Schema = z.infer<typeof schema>;

const FirstAddForm = ({ children, buttonTitle }: AddCardProps) => {
  const router = useRouter();
  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0],
  );

  // カテゴリー選択管理（zustandで管理：storeと連携。詳細はuseCategoryStoreにて）
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);
  const setCategory = useCategoryStore((state) => state.setCategory);

  // React-hook-form準備
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { category_id: null },
    // 入力値の検証
    resolver: zodResolver(schema),
  });

  // カテゴリーが選択されたら反映
  useEffect(() => {
    if (selectedCategory) {
      setValue("category_id", selectedCategory);
    }
  }, [selectedCategory, setValue]);

  useEffect(() => {
    if (!selectedCategory) {
      // 初回なら category-1 を初期選択として反映
      setCategory("category-1");
    }
  }, []);

  return (
    <div className="flex w-full flex-col gap-5 bg-[#EAE3D8]">
      {/* タイトル */}
      <FormField
        label="タイトル"
        placeholder="タイトルを入力"
        icon="/icon/add/tag.png"
      />
      {/* 額 */}
      <FormField
        label="金額"
        placeholder="金額を入力"
        icon="/icon/add/money.png"
      />
      {/* カレンダー */}
      <FormField
        label="カレンダー"
        placeholder=""
        icon="/icon/add/calendar.png"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
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
        {selectedCategory && (
          <div
            onClick={() => router.push("/money-mindful/add/addCategoryPage")}
            className="w-full"
          >
            <CategoryItem id={selectedCategory} />
          </div>
        )}

        {/* <CategoryItem id="category-1" /> */}
      </div>
      {/* メモ */}
      <FormField
        label="メモ"
        placeholder="メモを入力"
        icon="/icon/add/memo.png"
        isTextarea
      />
      {/* 追加or保存ボタン */}
      <div className="flex justify-center pt-5">
        <Button onClick={() => alert("supabaseへ送信！")}>{buttonTitle}</Button>
      </div>
      {children}
    </div>
  );
};

export default FirstAddForm;
