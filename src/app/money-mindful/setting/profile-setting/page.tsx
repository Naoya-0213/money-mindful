// プロフィール編集用

import SectionCard from "@/app/components/section-card/SectionCard";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProfileSetting = () => {
  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <SectionCard
          title="プロフィール設定"
          icon="/icon/setting/profile/social.png"
          label="目標設定icon"
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
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default ProfileSetting;
