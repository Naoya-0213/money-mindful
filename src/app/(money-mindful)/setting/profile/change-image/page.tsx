"use client";

import Image from "next/image";

import { Button, SectionCard } from "@/app/components";

// プロフィール設定/画像変更用

const ChangeImagePage = () => {
  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <SectionCard
          icon="/icon/setting/profile/social.png"
          label="ユーザー画像変更（実装予定）"
        >
          <div className="flex flex-col items-center gap-5 pb-5">
            {/* プロフィール画像 */}
            <div>
              <Image
                src="/icon/setting/profile/profile-user.png"
                alt="プロフィール画像"
                width={100}
                height={100}
              />
            </div>

            {/* 注意点 */}
            <div className="flex flex-col items-center">
              <p className="font-semibold text-[#777777]">
                お好きな画像に変更できます！
              </p>
            </div>

            {/* 画像を選択ボタン */}
            <div className="flex w-full justify-center">
              <Button
                onClick={() => alert("実装予定...！")}
                className="bg-[#D7CDBE] !text-[#795549]"
              >
                画像を選択
              </Button>
            </div>

            {/* 保存ボタン */}
            <div className="flex w-full justify-center">
              <Button onClick={() => alert("実装予定...！")}>保存</Button>
            </div>

            {/* 戻るボタン */}
            <div className="flex w-full justify-center">
              <Button href="/setting/profile">戻る</Button>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default ChangeImagePage;
