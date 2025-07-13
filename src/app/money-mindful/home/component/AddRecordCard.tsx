// ホーム専用コンポーネント：我慢記録セクション

import Button from "@/app/components/button/Button";
import CategoryIcon from "@/app/components/category/category-icon/CategoryIcon";
import SectionCard from "@/app/components/section-card/SectionCard";
import SectionInfoBox from "@/app/components/section-card/SectionInfoBox";
import Link from "next/link";
import React from "react";

const AddRecordCard = () => {
  return (
    <div className="w-full">
      <SectionCard icon="/icon/home/pencil.png" label="我慢を記録しよう！">
        {/* 説明文 */}
        <div className="flex flex-col items-center justify-center leading-relaxed font-semibold text-[#777777]">
          <p>コンビニのコーヒーや外食.....</p>
          <p>ちょっとした我慢を記録しよう。</p>
        </div>

        {/* 備考 */}
        <SectionInfoBox>
          <div className="flex flex-col items-center">
            <p>カテゴリーを追加して、</p>
            <p>整理できます。</p>
          </div>

          {/* カテゴリー例 */}
          <div className="flex gap-5">
            <CategoryIcon name="clothing" />
            <CategoryIcon name="beer" />
            <CategoryIcon name="transportation" />
            <CategoryIcon name="food" />
          </div>
        </SectionInfoBox>

        {/* 追加へ移動ボタン */}
        <div className="flex w-full justify-center">
          <Button href="/money-mindful/add">我慢を記録する</Button>
        </div>
      </SectionCard>
    </div>
  );
};

export default AddRecordCard;
