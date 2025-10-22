"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import useUserStore from "@/store/useUserStore";

import { Button, DisplayField, SectionCard } from "@/app/components";

import { default_avatar } from "../page";

// ===== プロフィール編集用 =====

const ProfileSetting = () => {
  const { user } = useUserStore();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("(未設定)");
  const [avatar, setAvatar] = useState(default_avatar);

  // ページ初回読み込み時のみ実行（ユーザー情報の取得）
  useEffect(() => {
    const fetchUser = async () => {
      if (!user?.id) return;
      if (user?.email) setEmail(user.email);
      if (user?.name) setName(user.name);
      if (user?.image_url) setAvatar(user.image_url);
    };
    fetchUser();
  }, [user]);

  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <SectionCard
          icon="/icon/setting/profile/social.png"
          label="プロフィール設定"
        >
          <div className="flex flex-col gap-7 pt-7">
            {/* プロフィール画像 */}
            <div className="flex flex-col items-center gap-5">
              <div className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-[#795549]">
                <Image
                  src={avatar || "/icon/setting/profile/profile-user.png"}
                  fill
                  unoptimized
                  alt="ユーザー画像"
                  className="object-cover object-center"
                />
              </div>

              {/* 画像変更リンク */}
              <div className="flex flex-col items-center">
                <p className="font-semibold text-[#777777]">
                  画像の変更は
                  <Link
                    href="/setting/profile/change-image"
                    className="text-[#666] underline"
                  >
                    こちら
                  </Link>
                </p>
              </div>
            </div>

            {/* ユーザー名 */}
            <div className="flex flex-col gap-3">
              <DisplayField label="名前" icon="/icon/setting/profile/name.png">
                {name}
              </DisplayField>

              {/* ユーザー名変更リンク */}
              <p className="font-semibold text-[#777777]">
                名前の変更は
                <Link
                  href="/setting/profile/change-name"
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
                {email}
              </DisplayField>

              {/* Email変更リンク */}
              <p className="font-semibold text-[#777777]">
                メールアドレスの変更は
                <Link
                  href="/setting/profile/change-email"
                  className="text-[#666] underline"
                >
                  こちら
                </Link>
              </p>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-3">
              <DisplayField
                label="Password（実装予定）"
                icon="/icon/setting/profile/password.png"
              >
                ⚫ ⚫ ⚫ ⚫︎ ⚫ ⚫ ⚫ ⚫ ⚫
              </DisplayField>

              {/* Password変更リンク */}
              <p className="font-semibold text-[#777777]">
                パスワードの変更は
                <Link
                  href="/setting/profile/change-password"
                  className="text-[#666] underline"
                >
                  こちら
                </Link>
              </p>
            </div>

            {/* 閉じるボタン */}
            <div className="flex w-full justify-center">
              <Button href="/setting">閉じる</Button>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default ProfileSetting;
