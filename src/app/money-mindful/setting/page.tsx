// 設定セクション

import Button from "@/app/components/button/Button";
import GoalCard from "@/app/components/section-card/GoalCard";
import SectionCard from "@/app/components/section-card/SectionCard";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SettingPage() {
  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        {/* プロフィール */}
        <SectionCard
          title="プロフィール設定"
          icon="/icon/setting/profile/social.png"
          label="プロフィール設定icon"
        >
          <div className="flex flex-col items-center gap-5">
            {/* プロフィール画像 */}
            <div>
              <Image src="/icon/setting/profile/profile-user.png" alt="プロフィール画像" width={80} height={80} />
            </div>

            {/* ユーザー名表示 */}
            <h2 className="text-lg font-bold">こんにちは、Naoyaさん</h2>

            <div className="flex flex-col items-center font-semibold text-[#777777]">
              <p>アイコンや名前を</p>
              <p>自分好みに変えられます！</p>
            </div>

            {/* プロフィール編集ボタン */}
            <Link
              href="/money-mindful/setting/profile-setting"
              className="flex w-full justify-center"
            >
              <Button>プロフィール編集</Button>
            </Link>
          </div>
        </SectionCard>
        {/* 現在の目標 */}
        <GoalCard />
      </div>
    </div>
  );
}
