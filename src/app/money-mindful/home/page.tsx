"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import AddRecordCard from "@/app/components/add/AddRecordCard";
import GoalCard from "@/app/components/goal/GoalCard";
import NoGoalCard from "@/app/components/goal/NoGoalCard";

import { createClient } from "@/utils/supabase/clients";
import { getCurrentUser } from "@/utils/supabase/getCurrentUser";

import ClientWrapper from "../ClientWrapper";
import GoalStatusCard from "./component/GoalStatusCard";

// ===== ホーム画面 ======
// 📍サーバー用 → クライアント処理は別と連携

export type Goal = {
  id: string;
  title?: string;
  target_amount?: number;
  start_date?: string;
  end_date?: string;
  created_at: string;
  memo?: string;
  user_id?: string;
};

export default function HomePage() {
  const router = useRouter();
  const [goal, setGoal] = useState<Goal | undefined>(undefined);

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

      if (goalData) {
        const cleanedGoal: Goal = {
          id: goalData.id,
          title: goalData.title ?? undefined,
          target_amount: goalData.target_amount ?? undefined,
          start_date: goalData.start_date ?? undefined,
          end_date: goalData.end_date ?? undefined,
          created_at: goalData.created_at,
          memo: goalData.memo ?? undefined,
          user_id: goalData.user_id ?? undefined,
        };
        setGoal(cleanedGoal);
      }
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
          {/* 履歴表示：実装予定 */}
          {/* <div className="w-full">
            <RecentRecords />
          </div> */}
        </div>
      </div>
    </ClientWrapper>
  );
}
