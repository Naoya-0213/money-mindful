import { redirect } from "next/navigation";

import GoalCard from "@/app/components/goal/GoalCard";
import NoGoalCard from "@/app/components/goal/NoGoalCard";
import RecentRecords from "@/app/components/records/RecentRecords";

import { getCurrentUser } from "@/utils/supabase/getCurrentUser";
import { createClient } from "@/utils/supabase/server";

import AddRecordCard from "../../components/add/AddRecordCard";
import GoalStatusCard from "./component/GoalStatusCard";

// ===== ホーム画面 ======

export default async function HomePage() {
  // supabase連携（別ページにて連携済み）
  const supabase = await createClient();

  const profile = await getCurrentUser(supabase);

  if (!profile) {
    redirect("/auth/login");
  }

  const { data: goal } = await supabase
    .from("goals")
    .select("*")
    .eq("user_id", profile.id)
    .maybeSingle();

  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        {/* 目標 */}
        {goal ? (
          <GoalCard /> // 設定目標の表示
        ) : (
          <NoGoalCard /> // 目標設定を促す画面
        )}
        {/* 進捗 */}
        <GoalStatusCard />
        {/* 我慢記録 */}
        <AddRecordCard />
        {/* 履歴表示 */}
        <div className="w-full">
          <RecentRecords />
        </div>
      </div>
    </div>
  );
}
