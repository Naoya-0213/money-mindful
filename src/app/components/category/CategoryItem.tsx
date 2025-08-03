"use client";

import Image from "next/image";

import { CATEGORY_LIST } from "@/const/category-icon/categoryIconMap";

import CategoryIcon from "./category-icon/CategoryIcon";

// ===== カテゴリー選択カードコンポーネント =====
// 📍カテゴリー選択時に使用。カテゴリーデータからタイトルとアイコンを表示
// CATEGORY_LIST から該当のカテゴリーデータを取得し、UIに反映

type CategoryItemProps = {
  id: string;
};

const CategoryItem = ({ id }: CategoryItemProps) => {
  const category = CATEGORY_LIST.find((category) => id === category.id);
  if (!category) {
    return null;
  }

  return (
    <button
      className="w-full rounded-2xl border border-[#E0E0E0] bg-white px-4 py-2 text-[#795549] focus:border-[#795549] focus:ring-0 focus:outline-none"
      style={{ height: "var(--input-height)" }}
      type="button"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5 text-lg font-bold text-[#795549]">
          {/* カテゴリーアイコン */}
          <CategoryIcon id={category.id} />

          {/* カテゴリータイトル */}
          <h2 className="text-xl font-bold">{category.title}</h2>
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
