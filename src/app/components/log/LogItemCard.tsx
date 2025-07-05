// components/log/LogItemCard.tsx

import React from "react";
import Image from "next/image";
import CategoryIcon from "../category/category-icon/CategoryIcon";

import { CategoryType } from "../category/category-icon/lib/categoryIconMap";

type Props = {
  title: string;
  amount: number;
  category: CategoryType; // カテゴリー名 → CategoryIconに渡す用
};

const LogItemCard = ({ title, amount, category }: Props) => {
  return (
    <div className="flex w-full items-center justify-between rounded-2xl bg-[#F3F0EB] p-3">
      <div className="flex items-center gap-5">
        {/* アイコン */}
        <div>
          <CategoryIcon name={category} />
        </div>
        {/* タイトル */}
        <div className="font-bold">{title}</div>
      </div>

      <div className="flex items-center gap-2">
        {/* 金額 */}
        <div className="font-bold">¥{amount}</div>

        {/* 詳細誘導ボタン */}
        <div>
          <Image
            src="/icon/arrow/next-icon.png"
            alt="矢印"
            width={24}
            height={24}
          />
        </div>
      </div>
    </div>
  );
};

export default LogItemCard;
