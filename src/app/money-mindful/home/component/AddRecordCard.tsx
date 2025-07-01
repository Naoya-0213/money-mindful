// ホーム専用コンポーネント：我慢記録セクション

import Button from "@/app/components/button/Button";
import SectionCard from "@/app/components/section-card/SectionCard";
import Link from "next/link";
import React from "react";

const AddRecordCard = () => {
  return (
    <div className="w-full">
      <SectionCard
        title="我慢を記録しよう！"
        icon="/icon/home/pencil.png"
        label="我慢記録icon"
      >
        {/* 説明文 */}
        <div className="flex flex-col items-center justify-center font-semibold text-[#777777]">
          <p>コンビニのコーヒーや外食.....</p>
          <p>ちょっとした我慢を記録しよう。</p>
        </div>

        {/* 備考 */}
        <div className="flex w-full flex-col items-center rounded-2xl bg-[#F3F0EB] p-5 font-semibold">
          <p>カテゴリーを追加して、</p>
          <p>整理できます。</p>

          {/* カテゴリー例 */}
        </div>

        {/* 追加へ移動ボタン */}
        <Link href="/money-mindful/add" className="flex w-full justify-center">
          <Button>我慢を記録する</Button>
        </Link>
      </SectionCard>
    </div>
  );
};

export default AddRecordCard;
