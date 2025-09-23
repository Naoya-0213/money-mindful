"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import useUserStore from "@/store/useUserStore";

import {
  Button,
  GoalCard,
  LoadingSpinner,
  NoGoalCard,
  SectionCard,
} from "@/app/components";

import { createClient } from "@/utils/supabase/clients";

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

export const default_avatar = "/icon/setting/profile/profile-user.png";

export default function SettingPage() {
  const router = useRouter();
  const supabase = createClient();
  const { user } = useUserStore();

  const [profile, setProfile] = useState<{ id: string; name?: string } | null>(
    null,
  );
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(default_avatar);
  const [goal, setGoal] = useState<Goal | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndGoal = async () => {
      if (!user?.id) return;

      if (!user) {
        router.push("/signin");
        return;
      }
      setProfile(user);
      if (user.name) setName(user.name);
      if (user.image_url) setAvatar(user.image_url);
      setLoading(false);

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
  }, [user, router, supabase]);

  if (!profile) {
    return null;
  }

  if (loading === true || goal === undefined) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        {/* プロフィール */}
        <SectionCard
          label="プロフィール設定"
          icon="/icon/setting/profile/social.png"
        >
          <div className="flex flex-col items-center gap-5 pt-5">
            {/* プロフィール画像 */}
            <div className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-[#795549]">
              <Image
                src={avatar || "/icon/setting/profile/profile-user.png"}
                fill
                unoptimized
                alt="ユーザー画像"
                className="object-cover object-center"
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
              <Button href="/setting/profile">プロフィール編集</Button>
            </div>
          </div>
        </SectionCard>

        {/* 目標設定 */}
        {goal ? <GoalCard /> : <NoGoalCard />}

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
            <Button href="/signout/form">ログアウト</Button>
            <Button href="/setting/delete-account">アカウント削除</Button>
            <Button href="/setting/data-reset">データリセット</Button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
