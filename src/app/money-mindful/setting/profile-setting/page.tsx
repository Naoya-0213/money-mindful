// プロフィール編集用

import DisplayField from "@/app/components/field/DisplayFeild";
import SectionCard from "@/app/components/section-card/SectionCard";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProfileSetting = () => {
  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <SectionCard
          icon="/icon/setting/profile/social.png"
          label="プロフィール設定"
        >
          <div className="flex flex-col gap-5">
            {/* プロフィール画像 */}
            <div className="flex flex-col items-center gap-5">
              <Image
                src="/icon/setting/profile/profile-user.png"
                alt="プロフィール画像"
                width={80}
                height={80}
              />

              {/* 画像変更リンク */}
              <p className="font-semibold text-[#777777]">
                画像の変更は
                <Link
                  href="/money-mindful/setting/profile-setting/change-image"
                  className="text-[#666] underline"
                >
                  こちら
                </Link>
              </p>
            </div>

            {/* ユーザー名 */}
            <div className="flex flex-col gap-3">
              <DisplayField label="名前" icon="/icon/setting/profile/name.png">
                Naoya
              </DisplayField>

              {/* ユーザー名変更リンク */}
              <p className="font-semibold text-[#777777]">
                名前の変更は
                <Link
                  href="/money-mindful/setting/profile-setting/change-image"
                  className="text-[#666] underline"
                >
                  こちら
                </Link>
              </p>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-3">
              <DisplayField
                label="Email"
                icon="/icon/setting/profile/email.png"
              >
                naoya.work0213@gmail.com
              </DisplayField>

              {/* Email変更リンク */}
              <p className="font-semibold text-[#777777]">
                メールアドレスの変更は
                <Link
                  href="/money-mindful/setting/profile-setting/change-email"
                  className="text-[#666] underline"
                >
                  こちら
                </Link>
              </p>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-3">
              <DisplayField
                label="Password"
                icon="/icon/setting/profile/password.png"
              >
                ⚫ ⚫ ⚫ ⚫︎ ⚫ ⚫ ⚫ ⚫ ⚫
              </DisplayField>

              {/* Email変更リンク */}
              <p className="font-semibold text-[#777777]">
                パスワードの変更は
                <Link
                  href="/money-mindful/setting/profile-setting/change-password"
                  className="text-[#666] underline"
                >
                  こちら
                </Link>
              </p>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default ProfileSetting;
