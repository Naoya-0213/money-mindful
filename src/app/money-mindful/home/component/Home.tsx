// ホーム画面

"use client";

import React from "react";
import Link from "next/link";
import Button from "@/app/components/button/Button";
import Log from "@/app/components/log/Log";
import GoalCard from "@/app/components/section-card/GoalCard";
import GoalStatusCard from "./GoalStatusCard";
import AddRecordCard from "./AddRecordCard";

const Home = () => {
  return (
    <div className="flex w-full flex-col items-center gap-5 p-5">
      {/* タイトル */}
      <GoalCard />

      {/* 進捗 */}
      <GoalStatusCard />

      {/* 我慢記録 */}
      <AddRecordCard />

      {/* 追加ボタン */}
      <Link href="/money-mindful/add" className="flex w-full justify-center">
        <Button>我慢記録を追加する</Button>
      </Link>

      {/* 履歴表示 */}
      <div className="w-full self-start pt-5">
        <h3 className="text-2xl font-bold">直近の登録履歴</h3>
      </div>

      <div className="w-full">
        <Log />
        <Log />
        <Log />
      </div>
    </div>
  );
};

export default Home;
