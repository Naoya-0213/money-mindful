// プロフィール設定/Email変更用

"use client";

import Button from "@/app/components/button/Button";
import DisplayField from "@/app/components/field/DisplayFeild";
import FormField from "@/app/components/field/FormField";
import SectionCard from "@/app/components/section-card/SectionCard";
import Link from "next/link";
import React from "react";

const ChangeEmailPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <SectionCard
          icon="/icon/setting/profile/social.png"
          label="メールアドレス変更"
        >
          {/* 現在のメールアドレス */}
          <DisplayField
            label="現在のEmail"
            icon="/icon/setting/profile/email.png"
          >
            naoya.work0213@gmail.com
          </DisplayField>

          {/* 新しいメールアドレス */}
          <FormField
            label="新しいEmail"
            icon="/icon/setting/profile/email(2).png"
            placeholder="新しいメールアドレスを入力"
          />

          {/* 注意点 */}
          <div className="flex flex-col items-center gap-5">
            <p className="font-semibold text-[#777777]">
              変更には確認が必要です！
            </p>

            <div className="flex flex-col items-center">
              <p className="font-semibold text-[#777777]">
                新旧両方のアドレスに届く
              </p>
              <p className="font-semibold text-[#777777]">
                確認メールからリンクを開いて
              </p>
              <p className="font-semibold text-[#777777]">
                変更を完了してください。
              </p>
            </div>
          </div>

          {/* 保存ボタン */}
          <div className="flex w-full justify-center">
            <Button
              href="/money-mindful/setting/profile-setting"
              onClick={() => alert("supabaseへ保存！")}
            >
              保存
            </Button>
          </div>

          {/* 戻るボタン */}
          <div className="flex w-full justify-center">
            <Button href="/money-mindful/setting/profile-setting">戻る</Button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default ChangeEmailPage;
