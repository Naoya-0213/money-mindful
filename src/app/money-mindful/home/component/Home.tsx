// ホーム画面

"use client";

import React from "react";
import GoalCard from "@/app/components/section-card/GoalCard";
import GoalStatusCard from "./GoalStatusCard";
import AddRecordCard from "./AddRecordCard";
import RecentLogs from "../../../components/log/RecentLogs";

const Home = () => {
  return (
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
  );
};

export default Home;
