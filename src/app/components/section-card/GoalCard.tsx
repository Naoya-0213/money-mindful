import React from "react";
import SectionCard from "./SectionCard";
import Link from "next/link";
import Button from "../button/Button";

const GoalCard = () => {
  return (
    <div className="w-full">
      {/* セクション */}
      <SectionCard icon="/icon/home/flag.png" label="現在の目標">
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

        {/* 説明文 */}
        <div className="flex flex-col items-center justify-center leading-relaxed font-semibold text-[#777777]">
          <p>「やっぱり変更したい…！」</p>
          <p>そんなときは</p>
          <p>こちらから編集できます！</p>
        </div>

        {/* 目標編集ボタン */}
        <div className="flex w-full justify-center">
          <Button href="/money-mindful/setting/goal">目標を編集する</Button>
        </div>
      </SectionCard>
    </div>
  );
};

export default GoalCard;
