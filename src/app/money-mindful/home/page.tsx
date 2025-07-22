import GoalCard from "@/app/components/goal/GoalCard";
import RecentLogs from "@/app/components/log/RecentLogs";

import AddRecordCard from "../../components/add/AddRecordCard";
import GoalStatusCard from "./component/GoalStatusCard";

// ===== ホーム画面 ======

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        {/* 目標 */}
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
