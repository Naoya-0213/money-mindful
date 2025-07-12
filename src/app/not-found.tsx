// ページ遷移後の 404 および not-found 表示用（自動で表示）

import React from "react";
import SectionCard from "./components/section-card/SectionCard";

import Button from "./components/button/Button";

const NotFoundPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center p-5">
        <SectionCard
          label="ページが迷子です..."
          icon="/icon/not-found/kids.png"
        >
          {/* 備考 */}
          <div className="flex flex-col items-center gap-5 py-20 leading-relaxed font-semibold">
            <h3 className="text-4xl">404</h3>

            <div className="flex flex-col items-center text-[#777777]">
              <p>お探しのページは見つかりません。</p>
              <p>This page seems to be lost.</p>
            </div>
          </div>

          {/* ホームへ戻る */}
          <div className="flex w-full items-center justify-center pb-5">
            <Button href="/money-mindful/home">ホームへ戻る</Button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default NotFoundPage;
