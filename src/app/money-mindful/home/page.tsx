import GoalCard from "@/app/components/goal/GoalCard";
import NoGoalCard from "@/app/components/goal/NoGoalCard";
import RecentLogs from "@/app/components/log/RecentLogs";

import { createClient } from "@/utils/supabase/server";

import AddRecordCard from "../../components/add/AddRecordCard";
import GoalStatusCard from "./component/GoalStatusCard";

// ===== ホーム画面 ======

export default async function HomePage({ profile }: { profile: { id: string } }) {
  const supabase = await createClient();

  const { data: goal } = await supabase
    .from("goals")
    .select("*")
    .eq("user_id", profile.id)
    .maybeSingle();

  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        {/* 目標 */}
        {goal ? <GoalCard /> : <NoGoalCard />}
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
