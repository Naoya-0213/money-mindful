// カレンダーでの記録表示セクション
import SectionCard from "@/app/components/section-card/SectionCard";
import MyCalendar from "@/app/money-mindful/calendar/component/Calendar";

export default function CalendarPage() {
  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <SectionCard icon="/icon/calender/calendar.png" label="Calendar">
          <MyCalendar />
        </SectionCard>
      </div>
    </div>
  );
}
