"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { createClient } from "@/utils/supabase/clients";
import { getCurrentUser } from "@/utils/supabase/getCurrentUser";

import Button from "../button/Button";
import SectionCard from "../section-card/SectionCard";

// ===== 目標表示 =====

const GoalCard = () => {
  // supabase連携（別ページにて連携済み）
  const supabase = createClient();

  // 画面遷移やページのリフレッシュなどに使用するRouterオブジェクトを取得
  const router = useRouter();

  const [goal, setGoal] = useState<{
    title: string;
    start_date: string;
    end_date: string;
    target_amount: number;
  } | null>(null);

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

  useEffect(() => {
    const fetchGoal = async () => {
      const user = await getCurrentUser(supabase);
      if (!user) return;

      const { data } = await supabase
        .from("goals")
        .select("title, target_amount, start_date, end_date")
        .eq("user_id", user.id)
        .maybeSingle();

      if (
        data &&
        data.title !== null &&
        data.target_amount !== null &&
        data.start_date !== null &&
        data.end_date !== null
      ) {
        setGoal({
          title: data.title,
          target_amount: data.target_amount,
          start_date: data.start_date,
          end_date: data.end_date,
        });
      }
    };

    fetchGoal();
  }, []);

  return (
    <div className="w-full">
      {/* セクション */}
      <SectionCard icon="/icon/home/flag.png" label="現在の目標">
        {/* データ取得 */}
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
              {goal?.target_amount ? formatCurrency(goal.target_amount) : ""}
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
        <div className="flex w-full justify-center">
          <Button href="/money-mindful/setting/goal">目標を編集する</Button>
        </div>
      </SectionCard>
    </div>
  );
};

export default GoalCard;
