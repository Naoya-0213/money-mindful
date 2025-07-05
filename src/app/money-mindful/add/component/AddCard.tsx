"use client";

import Button from "@/app/components/button/Button";
import CategoryIcon from "@/app/components/category/category-icon/CategoryIcon";
import FormField from "@/app/components/form/FormField";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ImageResponse } from "next/server";

import React from "react";

const AddCard = () => {
  const router = useRouter();

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
        <button
          className="w-full rounded-2xl border border-[#E0E0E0] bg-white px-4 py-2 text-[#795549] focus:border-[#795549] focus:ring-0 focus:outline-none"
          style={{ height: "var(--input-height)" }}
          onClick={() =>
            router.push("/money-mindful/add/component/AddEditCategoryPage")
          }
          type="button"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-5 text-lg font-bold text-[#795549]">
              <CategoryIcon name="beer" alt="飲み会" />
              飲み会
            </div>
            <div>
              <Image
                src="/icon/arrow/next-icon.png"
                alt="矢印"
                width={24}
                height={24}
              />
            </div>
          </div>
        </button>
      </div>

      {/* メモ */}
      <FormField
        label="メモ"
        placeholder="メモを入力"
        icon="/icon/add/memo.png"
        isTextarea
      />

      {/* 追加ボタン */}
      <div className="flex justify-center">
        <Button onClick={() => alert("supabaseへ送信！")}>追加</Button>
      </div>
    </div>
  );
};

export default AddCard;
