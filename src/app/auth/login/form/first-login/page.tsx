// 初回ログイン画面用

import NoGoalCard from "@/app/components/goal/NoGoalCard";
import SectionCard from "@/app/components/section-card/SectionCard";
import Image from "next/image";
import React from "react";
import AddRecordCard from "../../../../components/add/AddRecordCard";
import SectionInfoBox from "@/app/components/section-card/SectionInfoBox";
import Button from "@/app/components/button/Button";

const FirstLoginPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        {/* 導入 */}
        <div className="w-full rounded-2xl bg-[#EAE3D8]">
          <div className="flex flex-col items-center gap-5 p-5">
            <div className="flex items-center justify-center gap-3">
              {/* アイコン */}
              <div>
                <Image
                  src="/icon/login/first-login/cracker.png"
                  alt="アイコン"
                  width={30}
                  height={30}
                />
              </div>

              {/* ロゴ */}
              <div>
                <Image
                  src="/icon/login/before-login/money-mindful-title_icon.png"
                  alt="アイコン"
                  width={150}
                  height={25}
                />
              </div>

              {/* タイトル */}
              <h2 className="min-w-[110px] text-lg font-bold">へようこそ！</h2>
            </div>

            {/* 説明文 */}
            <div className="flex flex-col items-center gap-5 py-3 font-semibold text-[#777777]">
              <div className="flex flex-col items-center">
                <p>登録ありがとうございます！</p>
              </div>

              <div className="flex flex-col items-center">
                <p>あなたの節約ストーリーが</p>
                <p>今日から始まります。</p>
              </div>

              <div className="flex flex-col items-center">
                <p>さっそく使い方を見てみましょう。</p>
              </div>
            </div>
          </div>
        </div>

        {/* step1：目標設定 */}
        <NoGoalCard numberIcon="/icon/login/step1/number-1.png" />

        {/* step2：我慢記録 */}
        <AddRecordCard numberIcon="/icon/login/step2/number-2.png" />

        {/* step3：記録確認 */}
        <SectionCard
          label="記録を振り返ろう！"
          numberIcon="/icon/login/step3/number-3.png"
          icon="/icon/login/step3/money.png"
        >
          {/* 備考 */}
          <div className="flex flex-col items-center justify-center gap-5 leading-relaxed font-semibold text-[#777777]">
            <div className="flex flex-col items-center">
              <p>あなたの我慢は、</p>
              <p>どんどん貯金に変わります。</p>
            </div>

            <div className="flex flex-col items-center">
              <p>カレンダーや集計で振り返って</p>
              <p>がんばりを実感しましょう！</p>
            </div>
          </div>

          {/* 説明文1 */}
          <SectionInfoBox>
            <div className="flex justify-between gap-3 px-5">
              {/* アイコン */}
              <div className="flex w-1/3 min-w-[70px] flex-col items-center justify-center gap-1">
                <Image
                  src="/icon/setting/goal/profile-user.png"
                  alt="アイコン"
                  width={35}
                  height={35}
                />
                <p className="mt-[1px] text-sm font-semibold">合計</p>
              </div>

              {/* 備考 */}
              <div className="flex w-2/3 flex-col items-center">
                <p>これまでの成果を</p>
                <p>グラフでチェック！</p>
              </div>
            </div>
          </SectionInfoBox>

          {/* 説明文2 */}
          <SectionInfoBox>
            <div className="flex justify-between gap-5 px-5">
              {/* アイコン */}
              <div className="flex w-1/3 min-w-[70px] flex-col items-center justify-center gap-1">
                <Image
                  src="/icon/setting/goal/profile-user.png"
                  alt="アイコン"
                  width={35}
                  height={35}
                />
                <p className="mt-[1px] text-sm font-semibold">カレンダー</p>
              </div>

              {/* 備考 */}
              <div className="flex w-2/3 flex-col items-center">
                <p>日々の我慢記録を</p>
                <p>振り返ろう！</p>
              </div>
            </div>
          </SectionInfoBox>
        </SectionCard>

        {/* ホームに戻るボタン */}
        <div className="flex w-full justify-center py-5">
          <Button href="/money-mindful/home">ホームへ移動する</Button>
        </div>
      </div>
    </div>
  );
};

export default FirstLoginPage;
