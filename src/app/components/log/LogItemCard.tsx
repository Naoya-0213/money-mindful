import React from "react";
import Image from "next/image";
import CategoryIcon from "../category/category-icon/CategoryIcon";

const LogItemCard = () => {
  return (
    <div className="flex gap-5">
      {/* アイコン */}
      <div>
        <CategoryIcon name="drink" alt="飲み物アイコン" />
      </div>

      {/* タイトル */}
      <div>ジュース</div>

      <div className="flex gap-2">
        {/* 金額 */}
        <div>¥150</div>

        {/* 詳細誘導ボタン */}
        <Image
          src="/icon/arrow/next-icon.png"
          alt="矢印"
          width={24}
          height={24}
        />
      </div>
    </div>
  );
};

export default LogItemCard;
