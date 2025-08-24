"use client";

import { useEffect, useState } from "react";

import useUserStore from "@/store/useUserStore";

import { createClient } from "@/utils/supabase/clients";

import Button from "../button/Button";
import LoadingInSectionCard from "../loading/LoadingInSectionCard";
import SectionCard from "../section-card/SectionCard";

// ===== 目標表示カードコンポーネント =====
// 📍ホーム画面などで使用。Supabaseから取得した目標データを表示
// タイトル・期限・金額を整ったUIで表示し、編集ページへ誘導

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

const GoalCard = () => {
  const supabase = createClient();
  const { user } = useUserStore();
  const [goal, setGoal] = useState<Goal | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  // 日付フォーマット関数（⚫︎年⚫︎月⚫︎日）
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  // 金額フォーマット関数（¥⚫︎⚫︎,⚫︎⚫︎⚫︎）
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // 変更時の反映
  useEffect(() => {
    const fetchGoal = async () => {
      if (!user?.id) return;

      const { data: goalData, error: goalError } = await supabase
        .from("goals")
        .select(
          "id, title, target_amount, start_date, end_date, created_at, memo, user_id",
        )
        .eq("user_id", user.id)
        .maybeSingle();

      if (goalError) {
        console.error("goals取得エラー", goalError);
        return;
      }

      if (
        goalData &&
        goalData.title !== null &&
        goalData.target_amount !== null &&
        goalData.start_date !== null &&
        goalData.end_date !== null &&
        goalData.created_at !== null &&
        goalData.id !== null
      ) {
        setGoal({
          title: goalData.title,
          target_amount: goalData.target_amount,
          start_date: goalData.start_date,
          end_date: goalData.end_date,
          created_at: goalData.created_at,
          id: goalData.id,
          memo: goalData.memo ?? undefined,
          user_id: goalData.user_id ?? undefined,
        });
      }
    };

    fetchGoal();
    setLoading(false);
  }, [user?.id]);

  return (
    <div className="w-full">
      <SectionCard icon="/icon/home/flag.png" label="現在の目標">
        {loading ? (
          <LoadingInSectionCard />
        ) : (
          <>
            <div className="flex flex-col gap-3">
              {/* 目的 */}
              <div className="flex items-center gap-5">
                <p className="flex h-auto min-h-[65px] min-w-[100px] items-center justify-center rounded-xl bg-[#F3F0EB] px-6 py-4 text-lg font-bold">
                  {goal?.title}
                </p>
                <div className="flex min-w-[80px] justify-center">
                  <span className="text-lg font-bold">のために</span>
                </div>
              </div>

              {/* 期限 */}
              <div className="flex items-center gap-5">
                <p className="flex h-auto min-h-[65px] items-center justify-center rounded-xl bg-[#F3F0EB] px-6 py-4 text-lg font-bold">
                  {goal?.end_date ? formatDate(goal.end_date) : ""}
                </p>
                <div className="flex min-w-[80px] justify-center">
                  <span className="text-lg font-bold">までに</span>
                </div>
              </div>

              {/* 金額 */}
              <div className="flex items-center gap-5">
                <p className="flex h-auto min-h-[65px] min-w-[100px] items-center justify-center rounded-xl bg-[#F3F0EB] px-6 py-4 text-lg font-bold">
                  {goal?.target_amount
                    ? formatCurrency(goal.target_amount)
                    : ""}
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
            <div className="flex w-full justify-center pt-3">
              <Button href="/setting/goal/edit">目標を編集する</Button>
            </div>
          </>
        )}
      </SectionCard>
    </div>
  );
};

export default GoalCard;
