"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import useUserStore from "@/store/useUserStore";

import NoRecordCard from "@/app/components/records/NoRecordCard";
import RecordItemCard from "@/app/components/records/RecordItemCard";
import SectionCard from "@/app/components/section-card/SectionCard";

import { createClient } from "@/utils/supabase/clients";

import { CategoryType } from "../../../../const/category-icon/categoryIconMap";

// ===== 記録履歴一覧用 =====
// 📍 supabaseへ保存している記録の表示

type Log = {
  id: string;
  title: string;
  amount: number;
  category_id: CategoryType;
  saved_date: string;
};

// 日付ごとのログの型
type DailyLogs = {
  date: string;
  logs: Log[];
};

const RecordsPage = () => {
  const router = useRouter();
  const supabase = createClient();
  const { user } = useUserStore();

  // 日付ごとにグルーピング
  const [dailyRecords, setDailyRecords] = useState<DailyLogs[]>([]);

  // 変更時の反映
  useEffect(() => {
    const fetchRecord = async () => {
      if (!user?.id) return;

      if (!user) {
        router.push("/auth/signin");
        return;
      }

      const { data, error } = await supabase
        .from("money-savings")
        .select("id,title, amount, saved_date , category_id")
        .eq("user_id", user.id)
        .order("saved_date", { ascending: false });

      if (error || !data) {
        console.error("データ取得失敗", error);
        return;
      }

      // 日付ごとにグルーピング
      const grouped: { [date: string]: Log[] } = {};

      data.forEach((item) => {
        if (!item.saved_date) return;

        const date = new Date(item.saved_date).toLocaleDateString("ja-JP", {
          year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "short",
        });

        if (!grouped[date]) grouped[date] = [];

        if (
          !item.title ||
          !item.saved_date ||
          item.amount === null ||
          !item.category_id
        )
          return;

        grouped[date].push({
          id: item.id,
          title: item.title,
          amount: item.amount,
          saved_date: item.saved_date,
          category_id: item.category_id as CategoryType,
        });
      });

      // 配列に変換してセット
      const groupedArray: DailyLogs[] = Object.entries(grouped).map(
        ([date, logs]) => ({ date, logs }),
      );

      setDailyRecords(groupedArray);
    };

    fetchRecord();
  }, [router, supabase]);

  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        {dailyRecords.length > 0 ? (
          <SectionCard label="登録履歴" icon="/icon/record/record2.png">
            {dailyRecords.map((daily, index) => (
              <div
                key={`${daily.date}-${index}`}
                className="flex flex-col gap-3"
              >
                <h2 className="text-base font-bold">{daily.date}</h2>
                {daily.logs.map((log) => (
                  <RecordItemCard
                    key={log.id}
                    id={log.id}
                    title={log.title}
                    amount={log.amount}
                    category_id={log.category_id}
                  />
                ))}
              </div>
            ))}
          </SectionCard>
        ) : (
          <NoRecordCard />
        )}
      </div>
    </div>
  );
};

export default RecordsPage;
