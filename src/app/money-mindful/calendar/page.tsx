// カレンダーでの記録表示セクション
import SectionCard from "@/app/components/section-card/SectionCard";
import MyCalendar from "@/app/money-mindful/calendar/component/Calendar";

import DataCard from "./component/DataCard";
import NoDataCard from "./component/NoDataCard";

export default function CalendarPage() {
  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <SectionCard icon="/icon/calender/calendar.png" label="Calendar">
          <MyCalendar />
        </SectionCard>

        {/* 登録データ有 */}
        <div className="w-full rounded-2xl bg-[#EAE3D8] pb-3">
          <div className="flex flex-col gap-5 px-5 pt-5 pb-2">
            <DataCard />
          </div>
        </div>

        {/* 登録データ無 */}
        <div className="w-full rounded-2xl bg-[#EAE3D8] pb-3">
          <div className="flex flex-col gap-5 p-5">
            <NoDataCard />
          </div>
        </div>
      </div>
    </div>
  );
}
