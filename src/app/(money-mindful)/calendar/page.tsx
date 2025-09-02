"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import type { CategoryType } from "@/const/category-icon/categoryIconMap";
import useUserStore from "@/store/useUserStore";

import MyCalendar from "@/app/(money-mindful)/calendar/component/Calendar";
import LoadingInSectionCard from "@/app/components/atoms/loading/LoadingInSectionCard";
import SectionCard from "@/app/components/molecules/section-card/SectionCard";

import { createClient } from "@/utils/supabase/clients";

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
  const supabase = createClient();
  const router = useRouter();
  const { user } = useUserStore();
  const [loading, setLoading] = useState(true);

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [dailyRecords, setDailyRecords] = useState<DailyLogs[]>([]);

  const filteredLogs = dailyRecords.find(
    (daily) => daily.date === selectedDate,
  );

  useEffect(() => {
    const fetchRecord = async () => {
      if (!user?.id) return;

      if (!user) {
        router.push("/signin");
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
    setLoading(false);
  }, [router, supabase, user]);

  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <SectionCard icon="/icon/calender/calendar.png" label="Calendar">
          {loading ? (
            <LoadingInSectionCard />
          ) : (
            <>
              <MyCalendar
                onDateSelect={(dateString) => setSelectedDate(dateString)}
                markedDates={dailyRecords.map((d) => d.date)}
              />
            </>
          )}
        </SectionCard>

        <SectionCard icon="/icon/calender/record2.png" label="登録履歴">
          {loading ? (
            <LoadingInSectionCard />
          ) : (
            <>
              {filteredLogs && filteredLogs.logs.length > 0 ? (
                <DataCard date={filteredLogs.date} logs={filteredLogs.logs} />
              ) : (
                <NoDataCard date={selectedDate} />
              )}
            </>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
