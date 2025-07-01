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
        <div></div>

        {/* 目標編集ボタン */}
        <Link href="/money-mindful/add" className="flex w-full justify-center">
          <Button>目標を編集する</Button>
        </Link>
      </SectionCard>
    </div>
  );
};

export default GoalCard;
