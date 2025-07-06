// カテゴリー選択セクション用　各アイテムカード

"use client"

import React from "react";
import CategoryIcon from "./category-icon/CategoryIcon";
import { CATEGORY_ICON_LIST } from "@/const/category-icon/categoryIconMap";
import Image from "next/image";
import { useRouter } from "next/navigation";

type CategoryItemProps = {
  name: keyof typeof CATEGORY_ICON_LIST;
};

const CategoryItem = ({ name }: CategoryItemProps) => {
  const router = useRouter();
  const icon = CATEGORY_ICON_LIST[name];

  return (
    <button
      className="w-full rounded-2xl border border-[#E0E0E0] bg-white px-4 py-2 text-[#795549] focus:border-[#795549] focus:ring-0 focus:outline-none"
      style={{ height: "var(--input-height)" }}
      onClick={() => router.push("/money-mindful/add/")}
      type="button"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5 text-lg font-bold text-[#795549]">
          {/* カテゴリーアイコン */}
          <CategoryIcon name={name} />

          {/* カテゴリータイトル */}
          <h2 className="text-xl font-bold">{icon.title}</h2>
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
  );
};

export default CategoryItem;
