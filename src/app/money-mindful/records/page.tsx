"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import RecordItemCard from "@/app/components/records/RecordItemCard";
import SectionCard from "@/app/components/section-card/SectionCard";

import { createClient } from "@/utils/supabase/clients";
import { getCurrentUser } from "@/utils/supabase/getCurrentUser";

import { CategoryType } from "../../../const/category-icon/categoryIconMap";

// ===== 記録履歴一覧用 =====
// 📍 supabaseへ保存している記録の表示

type Log = {
  id: string;
  title: string;
  amount: number;
  category_id: CategoryType;
};

// 日付ごとのログの型
type DailyLogs = {
  date: string;
  logs: Log[];
};

// 仮データ（あとでSupabase連携予定）
const mockLogs: DailyLogs[] = [
  {
    date: "2025年7月4日（金）",
    logs: [
      { id: "1", title: "ジュース", amount: 150, category_id: "category-2" },
      { id: "2", title: "カフェラテ", amount: 450, category_id: "category-2" },
      { id: "3", title: "外食", amount: 780, category_id: "category-1" },
    ],
  },
  {
    date: "2025年7月3日（木）",
    logs: [
      { id: "1", title: "飲み会", amount: 3000, category_id: "category-3" },
      {
        id: "2",
        title: "セブンコーヒー",
        amount: 150,
        category_id: "category-2",
      },
      { id: "3", title: "朝ごはん", amount: 500, category_id: "category-1" },
    ],
  },
  {
    date: "2025年7月2日（水）",
    logs: [
      {
        id: "2",
        title: "セブンコーヒー",
        amount: 150,
        category_id: "category-2",
      },
      { id: "3", title: "朝ごはん", amount: 500, category_id: "category-1" },
    ],
  },
  {
    date: "2025年7月1日（火）",
    logs: [
      {
        id: "2",
        title: "セブンコーヒー",
        amount: 150,
        category_id: "category-2",
      },
    ],
  },
];

const RecordsPage = () => {
  // supabase連携（別ページにて連携済み）
  const supabase = createClient();

  // 画面遷移やページのリフレッシュなどに使用するRouterオブジェクトを取得
  const router = useRouter();

  // 登録記録表示
  const [record, setRecord] = useState<{
    title: string;
    amount: number;
    saved_date: string;
    category_id: string;
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

  // 変更時の反映
  useEffect(() => {
    const fetchRecord = async () => {
      const user = await getCurrentUser(supabase);
      if (!user) return;

      const { data } = await supabase
        .from("money-savings")
        .select("title, amount, saved_date , category_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (
        data &&
        data.title !== null &&
        data.amount !== null &&
        data.saved_date !== null &&
        data.category_id !== null
      ) {
        setRecord({
          title: data.title,
          amount: data.amount,
          saved_date: data.saved_date,
          category_id: data.category_id,
        });
      }
    };

    fetchRecord();
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <SectionCard label="登録履歴" icon="/icon/record/record2.png">
          {/* 仮データを map で表示 */}
          {mockLogs.map((daily, index) => (
            <div key={`${daily.date}-${index}`} className="flex flex-col gap-3">
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
      </div>
    </div>
  );
};

export default RecordsPage;
