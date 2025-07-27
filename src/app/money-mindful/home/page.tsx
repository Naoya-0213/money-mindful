"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import AddRecordCard from "@/app/components/add/AddRecordCard";
import GoalCard from "@/app/components/goal/GoalCard";
import NoGoalCard from "@/app/components/goal/NoGoalCard";
import RecentRecords from "@/app/components/records/RecentRecords";

import { createClient } from "@/utils/supabase/clients";
import { getCurrentUser } from "@/utils/supabase/getCurrentUser";

import ClientWrapper from "../ClientWrapper";
import GoalStatusCard from "./component/GoalStatusCard";

// ===== ホーム画面 ======
// 📍サーバー用 → クライアント処理は別と連携

export default function HomePage() {
  const router = useRouter();
  const [goal, setGoal] = useState<any>(null);

  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const user = await getCurrentUser(supabase);

      if (!user) {
        router.push("/auth/login");
        return;
      }

      const { data: goalData } = await supabase
        .from("goals")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      setGoal(goalData);
    };

    fetchData();
  }, [router, supabase]);

  return (
    <ClientWrapper>
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
            <RecentRecords />
          </div>
        </div>
      </div>
    </ClientWrapper>
  );
}
