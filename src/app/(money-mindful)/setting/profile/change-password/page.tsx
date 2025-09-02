"use client";

import Button from "@/app/components/Atoms/button/Button";
import DisplayField from "@/app/components/Molecules/field/DisplayFeild";
import FormField from "@/app/components/Molecules/field/FormField";
import SectionCard from "@/app/components/Molecules/section-card/SectionCard";

// ===== プロフィール設定/Password変更用 =====

const ChangeImagePage = () => {
  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <SectionCard
          icon="/icon/setting/profile/social.png"
          label="パスワード変更（実装予定）"
        >
          {/* 現在のパスワード */}
          <DisplayField
            label="現在のPassword"
            icon="/icon/setting/profile/password.png"
          >
            ⚫ ⚫ ⚫ ⚫︎ ⚫ ⚫ ⚫ ⚫ ⚫
          </DisplayField>

          {/* 新しいパスワード */}
          <FormField
            label="新しいPassword"
            icon="/icon/setting/profile/password(2).png"
            placeholder="新しいパスワードを入力"
          />

          {/* 注意点 */}
          <div className="flex flex-col items-center gap-5">
            <div className="flex flex-col items-center">
              <p className="font-semibold text-[#777777]">
                ログイン中であれば、
              </p>
              <p className="font-semibold text-[#777777]">
                いつでも変更可能です！
              </p>
            </div>
          </div>

          {/* 保存ボタン */}
          <div className="flex w-full justify-center">
            <Button onClick={() => alert("実装予定...！")}>保存</Button>
          </div>
          {/* 戻るボタン */}
          <div className="flex w-full justify-center pb-5">
            <Button href="/setting/profile">戻る</Button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default ChangeImagePage;
