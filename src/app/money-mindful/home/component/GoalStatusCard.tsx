"use client";

import { useEffect, useState } from "react";

import SectionCard from "@/app/components/section-card/SectionCard";
import ProgressChart from "@/app/components/table/ProgressChart";

import { createClient } from "@/utils/supabase/clients";
import { getCurrentUser } from "@/utils/supabase/getCurrentUser";

// ===== 目標進捗表示画面 =====

const GoalStatusCard = () => {
  // const router = useRouter();

  const supabase = createClient();

  // 登録金額合計
  const [totalSaved, setTotalSaved] = useState(0);

  // 目標設定額
  const [goalAmount, setGoalAmount] = useState(0);

  // -円グラフ用。記録合計/目標額の割合
  const progress = (totalSaved / goalAmount) * 100;

  const cappedProgress = Math.min(progress, 100);

  // -達成までの額（0未満にならないようにする）
  const getAmountToGoal = Math.max(goalAmount - totalSaved, 0);

  // 目標設定日
  const [startDate, setStartDateData] = useState("");

  // 目標期限
  const [endDate, setEndDate] = useState("");

  // 残日の算出
  const daysLeft =
    startDate && endDate
      ? Math.max(
          Math.ceil(
            (new Date(endDate).getTime() - new Date(startDate).getTime()) /
              (1000 * 60 * 60 * 24),
          ),
          0,
        )
      : 0;

  // 金額フォーマット関数（¥⚫︎⚫︎,⚫︎⚫︎⚫︎）
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    console.log("✅ supabase登録情報取得開始！");

    const fetchRecord = async () => {
      const user = await getCurrentUser(supabase);
      if (!user) return;

      // 合計金額を取得
      const { data: savedData, error: savedError } = await supabase
        .from("money-savings")
        .select("amount")
        .eq("user_id", user.id);

      if (savedError || !savedData) {
        console.error("データ取得失敗", savedError);
        return;
      }

      console.log("✅ Supabaseデータ取得成功!：", savedData);

      const total = savedData.reduce(
        (sum, item) => sum + (item.amount ?? 0),
        0,
      );

      setTotalSaved(total);

      // 目標額の取得
      const { data: goalData, error: goalError } = await supabase
        .from("goals")
        .select("target_amount")
        .eq("user_id", user.id)
        .single();

      if (goalError || !goalData) {
        console.error("目標取得エラー", goalError);
        return;
      }

      setGoalAmount(goalData.target_amount ?? 0);

      // 目標設定日の取得
      const { data: startDateData, error: startDateError } = await supabase
        .from("goals")
        .select("start_date")
        .eq("user_id", user.id)
        .single();

      if (startDateError || !startDateData) {
        console.error("目標取得エラー", startDateError);
        return;
      }

      setStartDateData(startDateData.start_date ?? "");

      // 目標期限の取得
      const { data: endDateData, error: endDateError } = await supabase
        .from("goals")
        .select("end_date")
        .eq("user_id", user.id)
        .single();

      if (endDateError || !endDateData) {
        console.error("目標取得エラー", endDateError);
        return;
      }

      setEndDate(endDateData.end_date ?? "");
    };

    fetchRecord();
  }, [supabase]);

  return (
    <div className="w-full">
      {/* 進捗 */}
      <SectionCard icon="/icon/home/paper-plane.png" label="目標達成まで">
        <div className="flex flex-col gap-5">
          {/* 進捗グラフ */}
          <div className="flex w-full flex-col items-center justify-center gap-5">
            <div className="relative h-[var(--progressChart-height)] w-[var(--progressChart-width)]">
              <ProgressChart progress={cappedProgress} />
              <div className="absolute inset-0 flex translate-y-1 items-center justify-center text-xl font-bold text-[#795549]">
                {Math.round(cappedProgress)}%
              </div>
            </div>
            {progress < 10 && (
              <p className="py-3 text-center text-sm font-semibold text-[#795549]">
                一歩ずつ進んでいます！
                <br />
                続けてみましょう 💪
              </p>
            )}
            {progress >= 10 && progress < 30 && (
              <p className="py-3 text-center text-sm font-semibold text-[#795549]">
                スタートおめでとう🎉
                <br />
                小さな積み重ねが大切です！
              </p>
            )}
            {progress >= 30 && progress < 50 && (
              <p className="py-3 text-center text-sm font-semibold text-[#795549]">
                順調なペースです👍
                <br />
                頑張って習慣化していきましょう〜
              </p>
            )}
            {progress >= 50 && progress < 75 && (
              <p className="py-3 text-center text-sm font-semibold text-[#795549]">
                着実に進んでいます👌
                <br />
                この調子で続けましょう！
              </p>
            )}

            {progress >= 75 && progress < 90 && (
              <p className="py-3 text-center text-sm font-semibold text-[#795549]">
                ゴールが見えてきました...!
              </p>
            )}
            {progress >= 90 && progress < 100 && (
              <p className="py-3 text-center text-sm font-semibold text-[#795549]">
                目標まであと少し...!
              </p>
            )}
            {progress >= 100 && (
              <p className="py-3 text-center text-sm font-semibold text-[#795549]">
                目標達成おめでとう🎉
              </p>
            )}
          </div>

          {/* 合計 */}
          <div className="flex items-center justify-center gap-5">
            <div className="flex min-w-[50px] justify-center">
              <span className="text-lg font-bold">合計</span>
            </div>

            <p className="flex h-auto min-h-[65px] min-w-[100px] items-center justify-center rounded-xl bg-[#F3F0EB] px-6 py-4 text-lg font-bold">
              {formatCurrency(totalSaved)}
            </p>
          </div>

          {/* 区切り線 */}
          <div className="mx-auto mt-2 mb-2 h-0.5 w-[95%] rounded-full bg-[#795549]" />

          {/* 残数表示 */}
          {/* 日数 */}
          <div className="flex items-center justify-center gap-5">
            <div className="flex min-w-[50px] justify-center">
              <span className="text-lg font-bold">残り</span>
            </div>
            <p className="flex h-auto min-h-[65px] min-w-[100px] items-center justify-center rounded-xl bg-[#F3F0EB] px-6 py-4 text-lg font-bold">
              {daysLeft}
            </p>
            <div className="flex min-w-[50px] justify-center">
              <span className="text-lg font-bold">日で</span>
            </div>
          </div>

          {/* 金額 */}
          <div className="flex items-center justify-center gap-5">
            <p className="flex h-auto min-h-[65px] min-w-[100px] items-center justify-center rounded-xl bg-[#F3F0EB] px-6 py-4 text-lg font-bold">
              {formatCurrency(getAmountToGoal)}
            </p>
            <div className="flex min-w-[100px] justify-center">
              <span className="text-lg font-bold">を貯める！</span>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
};

export default GoalStatusCard;
