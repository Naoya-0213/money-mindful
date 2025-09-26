"use client";

import toast from "react-hot-toast";

import { Button, SectionCard } from "@/app/components";

const deleteAccountConfirmPage = () => {
  const handleClick = () => {
    toast.error("実装予定...!");
  };

  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <SectionCard
          icon="/icon/setting/account/enter.png"
          label="アカウント削除"
        >
          <div className="py-3 leading-relaxed font-semibold text-[#777777]">
            <p className="text-center">最後の確認です...!</p>
            <br />
            <p className="text-center">本当に削除してよろしいでしょうか？</p>
          </div>

          <div className="flex w-full flex-col items-center gap-5 py-3">
            <Button onClick={handleClick}>アカウントを削除する</Button>

            <Button href="/setting">設定に戻る</Button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default deleteAccountConfirmPage;
