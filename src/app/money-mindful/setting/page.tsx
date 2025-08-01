"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Button from "@/app/components/button/Button";
import GoalCard from "@/app/components/goal/GoalCard";
import NoGoalCard from "@/app/components/goal/NoGoalCard";
import SectionCard from "@/app/components/section-card/SectionCard";

import { createClient } from "@/utils/supabase/clients";
import { getCurrentUser } from "@/utils/supabase/getCurrentUser";

// ===== 設定セクション =====

type Goal = {
  title?: string;
  target_amount?: number;
  start_date?: string;
  end_date?: string;
  created_at: string;
  memo?: string;
  id: string;
  user_id?: string;
};

export default function SettingPage() {
  const router = useRouter();
  const supabase = createClient();

  const [profile, setProfile] = useState<{ id: string; name?: string } | null>(
    null,
  );
  const [name, setName] = useState("");
  const [goal, setGoal] = useState<Goal | undefined>(undefined);

  useEffect(() => {
    const fetchUserAndGoal = async () => {
      const user = await getCurrentUser(supabase);
      if (!user) {
        router.push("/auth/login");
        return;
      }
      setProfile(user);
      if (user.name) setName(user.name);

      const { data: goalData, error } = await supabase
        .from("goals")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!error && goalData) {
        const cleanedGoal: Goal = {
          title: goalData.title ?? undefined,
          target_amount: goalData.target_amount ?? undefined,
          start_date: goalData.start_date ?? undefined,
          end_date: goalData.end_date ?? undefined,
          created_at: goalData.created_at,
          memo: goalData.memo ?? undefined,
          id: goalData.id,
          user_id: goalData.user_id ?? undefined,
        };
        setGoal(cleanedGoal);
      }
    };

    fetchUserAndGoal();
  }, [router, supabase]);

  if (!profile) {
    return null;
  }

  const onClick = () => {
    toast.error("今後、実装予定...!");
  };

  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        {/* プロフィール */}
        <SectionCard
          label="プロフィール設定"
          icon="/icon/setting/profile/social.png"
        >
          <div className="flex flex-col items-center gap-5">
            {/* プロフィール画像 */}
            <div>
              <Image
                src="/icon/setting/profile/profile-user.png"
                alt="プロフィール画像"
                width={80}
                height={80}
              />
            </div>

            {/* ユーザー名表示 */}

            <div className="flex items-center gap-3 text-lg font-bold">
              こんにちは！　
              {name}
              　さん
            </div>

            <div className="flex flex-col items-center leading-relaxed font-semibold text-[#777777]">
              <p>アイコンや名前を</p>
              <p>自分好みに変えられます！</p>
            </div>

            {/* プロフィール編集ボタン */}
            <div className="flex w-full justify-center">
              <Button href="/money-mindful/setting/profile">
                プロフィール編集
              </Button>
            </div>
          </div>
        </SectionCard>

        {/* 目標設定 */}
        {goal ? (
          <GoalCard /> // 設定目標の表示
        ) : (
          <NoGoalCard /> // 目標設定を促す画面
        )}

        {/* アカウント管理 */}
        <SectionCard
          icon="/icon/setting/account/enter.png"
          label="アカウント管理"
        >
          <div className="flex flex-col items-center pt-3 pb-3 leading-relaxed font-semibold text-[#777777]">
            <p>アカウントに関する操作を行えます。</p>
            <p>必要に応じてご利用ください。</p>
          </div>
          <div className="flex flex-col items-center gap-5">
            <Button href="/auth/signout/form">ログアウト</Button>
            <Button onClick={onClick}>アカウントを削除する</Button>
            <Button onClick={onClick}>データリセット</Button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
