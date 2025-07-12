// ホームセクション

import React from "react";
import GoalCard from "@/app/components/section-card/GoalCard";
import GoalStatusCard from "./component/GoalStatusCard";
import AddRecordCard from "./component/AddRecordCard";
import RecentLogs from "@/app/components/log/RecentLogs";
import { notFound } from "next/navigation";

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        {/* タイトル */}
        <GoalCard />
        {/* 進捗 */}
        <GoalStatusCard />
        {/* 我慢記録 */}
        <AddRecordCard />
        {/* 履歴表示 */}
        <div className="w-full">
          <RecentLogs />
        </div>
      </div>
    </div>
  );
}
