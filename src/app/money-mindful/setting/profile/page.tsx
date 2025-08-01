"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";

import Link from "next/link";

import Button from "@/app/components/button/Button";
import DisplayField from "@/app/components/field/DisplayFeild";
import SectionCard from "@/app/components/section-card/SectionCard";

import { createClient } from "@/utils/supabase/clients";
import { getCurrentUser } from "@/utils/supabase/getCurrentUser";

// ===== プロフィール編集用 =====

const ProfileSetting = () => {
  // supabase連携（別ページにて連携済み）
  const supabase = createClient();

  // 現在のメールアドレス、名前取得用
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  // ページ初回読み込み時のみ実行（ユーザー情報の取得
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser(supabase);
      if (user?.email) setEmail(user.email);
      if (user?.name) setName(user.name);
    };
    fetchUser();
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <SectionCard
          icon="/icon/setting/profile/social.png"
          label="プロフィール設定"
        >
          <div className="flex flex-col gap-7">
            {/* プロフィール画像 */}
            <div className="flex flex-col items-center gap-5">
              <Image
                src="/icon/setting/profile/profile-user.png"
                alt="プロフィール画像"
                width={80}
                height={80}
              />

              {/* 画像変更リンク */}
              <div className="flex flex-col items-center">
                <p className="font-semibold">実装予定...!</p>
                <p className="font-semibold text-[#777777]">
                  画像の変更は
                  <Link
                    href="/money-mindful/setting/profile/change-image"
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
                  href="/money-mindful/setting/profile/change-name"
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
                  href="/money-mindful/setting/profile/change-email"
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
                  href="/money-mindful/setting/profile/change-password"
                  className="text-[#666] underline"
                >
                  こちら
                </Link>
              </p>
            </div>

            {/* 閉じるボタン */}
            <div className="flex w-full justify-center">
              <Button href="/money-mindful/setting">閉じる</Button>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default ProfileSetting;
