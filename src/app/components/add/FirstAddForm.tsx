"use client";

import { type ReactNode, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Button from "@/app/components/button/Button";
import FormField from "@/app/components/field/FormField";

import CategoryItem from "../category/CategoryItem";

type AddCardProps = {
  children?: ReactNode;
  buttonTitle: string;
};

const FirstAddForm = ({ children, buttonTitle }: AddCardProps) => {
  const router = useRouter();
  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0],
  );

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

        <CategoryItem id="category-1" />
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
