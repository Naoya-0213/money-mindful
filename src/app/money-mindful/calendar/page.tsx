"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import type { CategoryType } from "@/const/category-icon/categoryIconMap";

import SectionCard from "@/app/components/section-card/SectionCard";
import MyCalendar from "@/app/money-mindful/calendar/component/Calendar";

import { createClient } from "@/utils/supabase/clients";
import { getCurrentUser } from "@/utils/supabase/getCurrentUser";

import DataCard from "./component/DataCard";
import NoDataCard from "./component/NoDataCard";

// ===== カレンダーでの記録表示用 =====
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

export default function CalendarPage() {
  const [record, setRecord] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");

  // supabase連携（別ページにて連携済み）
  const supabase = createClient();

  // 画面遷移やページのリフレッシュなどに使用するRouterオブジェクトを取得
  const router = useRouter();

  useEffect(() => {
    const fetchRecord = async () => {
      const user = await getCurrentUser(supabase);

      if (!user) {
        router.push("/auth/login");
        return;
      }

      const { data: RecordData } = await supabase
        .from("money-savings")
        .select("*")
        .eq("user_id", user.id)
        .select();

      setRecord(RecordData);
    };

    fetchRecord();
  }, [router, supabase]);

  // 日付ごとにグルーピング
  const [dailyRecords, setDailyRecords] = useState<DailyLogs[]>([]);

  const filteredLogs = dailyRecords.find(
    (daily) => daily.date === selectedDate,
  );

  // 変更時の反映
  useEffect(() => {
    const fetchRecord = async () => {
      const user = await getCurrentUser(supabase);
      if (!user) return;

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
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <SectionCard icon="/icon/calender/calendar.png" label="Calendar">
          <MyCalendar
            // onDateSelect はcalender.jsの関数
            onDateSelect={(dateString) => setSelectedDate(dateString)}

            // 記録のある日付をマークづけ
            markedDates={dailyRecords.map((d) => d.date)}
          />
        </SectionCard>

        <SectionCard icon="/icon/calender/record2.png" label="登録履歴">
          {filteredLogs && filteredLogs.logs.length > 0 ? (
            /* 登録データ有 */
            <DataCard date={filteredLogs.date} logs={filteredLogs.logs} />
          ) : (
            /* 登録データ無 */
            <NoDataCard date={selectedDate} />
          )}
        </SectionCard>
      </div>
    </div>
  );
}
