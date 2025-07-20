// プロフィール設定/ユーザー名変更用

"use client";

import Button from "@/app/components/button/Button";
import DisplayField from "@/app/components/field/DisplayFeild";
import FormField from "@/app/components/field/FormField";
import SectionCard from "@/app/components/section-card/SectionCard";

import React from "react";

const ChangeImagePage = () => {
  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <SectionCard
          icon="/icon/setting/profile/social.png"
          label="ユーザー名変更"
        >
          {/* 現在の名前 */}
          <DisplayField
            label="現在の名前"
            icon="/icon/setting/profile/name.png"
          >
            Naoya
          </DisplayField>

          {/* 新しい名前 */}
          <FormField
            label="新しい名前"
            icon="/icon/setting/profile/name(2).png"
            placeholder="新しい名前を入力"
          />

          <div className="mt-5 flex flex-col gap-5 pb-5">
            {/* 保存ボタン */}
            <div className="flex w-full justify-center">
              <Button
                href="/money-mindful/setting/profile"
                onClick={() => alert("supabaseへ保存！")}
              >
                保存
              </Button>
            </div>
            {/* 戻るボタン */}
            <div className="flex w-full justify-center">
              <Button href="/money-mindful/setting/profile">戻る</Button>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default ChangeImagePage;
