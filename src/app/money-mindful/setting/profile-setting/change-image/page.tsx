// プロフィール設定/画像変更用

"use client";

import Button from "@/app/components/button/Button";
import DisplayField from "@/app/components/field/DisplayFeild";
import FormField from "@/app/components/field/FormField";
import SectionCard from "@/app/components/section-card/SectionCard";
import Link from "next/link";
import React from "react";

const ChangeImagePage = () => {
  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <SectionCard
          icon="/icon/setting/profile/social.png"
          label="プロフィール設定"
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

          <div className="mt-5 flex flex-col gap-5">
            {/* 保存ボタン */}
            <Link
              href="/money-mindful/setting/profile-setting"
              className="flex w-full justify-center"
            >
              <Button onClick={() => alert("supabaseへ保存！")}>保存</Button>
            </Link>
            {/* 戻るボタン */}
            <Link
              href="/money-mindful/setting/profile-setting"
              className="flex w-full justify-center"
            >
              <Button>戻る</Button>
            </Link>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default ChangeImagePage;
