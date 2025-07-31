"use client";

import { useState } from "react";
import Calendar from "react-calendar";

import "./CalendarStyle.css";

// ===== カレンダー表示用 =====
// 📍カレンダーセクションにて使用
// 自作カスタムCSSにて調整
// https://github.com/wojtekmaj/react-calendar

type MyCalenderProps = {
  onDateSelect: (dateString: string) => void;
  markedDates: string[];
};

const MyCalendar = ({ onDateSelect, markedDates }: MyCalenderProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <div className="">
      <Calendar
        locale="en-US"
        formatShortWeekday={(locale, date) =>
          ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"][date.getDay()]
        }
        onChange={(date) => setSelectedDate(date as Date)}
        // 選択日を親へ渡す（React-calender公式）
        onClickDay={(value: Date) => {
          const dateString = value.toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "short",
          }); // 例: "2025年7月4日(金)"

          // クリックした日→親へ渡す
          onDateSelect(dateString);
        }}
        // データを持った日はマークをつける（アイコンや印など追加可能）
        tileClassName={({ date, view }) => {
          const dateString = date.toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "short",
          });

          if (view === "month" && markedDates.includes(dateString)) {
            return "has-record";
          }

          return "";
        }}
        value={selectedDate}
      />
    </div>
  );
};

export default MyCalendar;
