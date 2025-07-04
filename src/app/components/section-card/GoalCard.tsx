import React from "react";
import SectionCard from "./SectionCard";
import Link from "next/link";
import Button from "../button/Button";

const GoalCard = () => {
  return (
    <div className="w-full">
      {/* セクション */}
      <SectionCard
        title="現在の目標"
        icon="/icon/home/flag.png"
        label="目標設定icon"
      >
        {/* データ取得 */}
        <div className="flex flex-col gap-3">
          {/* 目的 */}
          <div className="flex items-center gap-5">
            <p className="flex h-auto min-h-[65px] min-w-[100px] items-center justify-center rounded-xl bg-[#F3F0EB] px-6 py-4 text-lg font-bold">
              北海道旅行
            </p>
            <div className="flex min-w-[80px] justify-center">
              <span className="text-lg font-bold">のために</span>
            </div>
          </div>

          {/* 期限 */}
          <div className="flex items-center gap-5">
            <p className="flex h-auto min-h-[65px] items-center justify-center rounded-xl bg-[#F3F0EB] px-6 py-4 text-lg font-bold">
              2025年9月30日
            </p>
            <div className="flex min-w-[80px] justify-center">
              <span className="text-lg font-bold">までに</span>
            </div>
          </div>

          {/* 金額 */}
          <div className="flex items-center gap-5">
            <p className="flex h-auto min-h-[65px] min-w-[100px] items-center justify-center rounded-xl bg-[#F3F0EB] px-6 py-4 text-lg font-bold">
              ¥50,000
            </p>
            <div className="flex min-w-[10px] justify-center">
              <span className="text-lg font-bold">を貯める！</span>
            </div>
          </div>
        </div>

        {/* 目標編集ボタン */}
        <Link href="/money-mindful/add" className="flex w-full justify-center">
          <Button>目標を編集する</Button>
        </Link>
      </SectionCard>
    </div>
  );
};

export default GoalCard;
