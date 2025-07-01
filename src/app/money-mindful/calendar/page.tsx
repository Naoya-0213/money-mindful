// カレンダーでの記録表示セクション

import Calendar from "@/app/components/calendar/Calendar";
import React from "react";

export default function CalendarPage() {
  return (
    <div className="mx-auto flex w-full max-w-[480px] flex-col gap-5 bg-[#F3F0EB]">
      <Calendar />
    </div>
  );
}
