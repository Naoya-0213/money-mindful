// 設定セクション

"use client";

import Button from "@/app/components/button/Button";
import GoalCard from "@/app/components/goal/GoalCard";
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
            <h2 className="text-lg font-bold">こんにちは、Naoyaさん</h2>

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
        <GoalCard />

        {/* アカウント管理 */}
        <SectionCard
          icon="/icon/setting/account/enter.png"
          label="アカウント管理"
        >
          <div className="flex flex-col items-center leading-relaxed font-semibold text-[#777777]">
            <p>アカウントに関する操作を行えます。</p>
            <p>必要に応じてご利用ください。</p>
          </div>

          <div className="flex flex-col items-center gap-5">
            <Button onClick={() => alert("ログアウト！")}>ログアウト</Button>
            <Button onClick={() => alert("アカウント削除！")}>
              アカウントを削除する
            </Button>
            <Button onClick={() => alert("データリセット！")}>
              データリセット
            </Button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
