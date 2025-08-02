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

type DailyLogs = {
  date: string;
  logs: Log[];
};

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [dailyRecords, setDailyRecords] = useState<DailyLogs[]>([]);

  const supabase = createClient();
  const router = useRouter();

  const filteredLogs = dailyRecords.find(
    (daily) => daily.date === selectedDate,
  );

  useEffect(() => {
    const fetchRecord = async () => {
      const user = await getCurrentUser(supabase);
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
        <SectionCard icon="/icon/calender/calendar.png" label="Calendar">
          <MyCalendar
            onDateSelect={(dateString) => setSelectedDate(dateString)}
            markedDates={dailyRecords.map((d) => d.date)}
          />
        </SectionCard>

        <SectionCard icon="/icon/calender/record2.png" label="登録履歴">
          {filteredLogs && filteredLogs.logs.length > 0 ? (
            <DataCard date={filteredLogs.date} logs={filteredLogs.logs} />
          ) : (
            <NoDataCard date={selectedDate} />
          )}
        </SectionCard>
      </div>
    </div>
  );
}
