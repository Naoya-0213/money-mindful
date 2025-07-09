// ログイン確認画面用

"use client";

import Button from "@/app/components/button/Button";
import FormField from "@/app/components/field/FormField";
import SectionCard from "@/app/components/section-card/SectionCard";
import Link from "next/link";
import React from "react";

const BeforeLoginPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <SectionCard label="ログイン" icon="/icon/login/enter.png">
          {/* メールアドレス入力欄 */}
          <FormField
            label="Email"
            placeholder="メールアドレスを入力"
            icon="/icon/login/email.png"
          />

          <div className="flex flex-col gap-3">
            {/* パスワード入力欄 */}
            <FormField
              label="Password"
              placeholder="パスワードを入力"
              icon="/icon/login/lock.png"
            />
            {/* パスワードを忘れた方へ */}
            <div className="flex flex-col items-center gap-5">
              <p className="font-semibold text-[#777777]">
                パスワードを忘れた方は
                <Link
                  href="/money-mindful/login/password-reset"
                  className="text-[#666] underline"
                >
                  こちら
                </Link>
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 pt-5 pb-5">
            {/* ログインボタン */}
            <Button onClick={() => alert("supabaseへ送信！")}>ログイン</Button>

            {/* 新規登録へ誘導 */}
            <p className="font-semibold text-[#777777]">
              アカウント作成は
              <Link
                href="/money-mindful/signup"
                className="text-[#666] underline"
              >
                こちら
              </Link>
            </p>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default BeforeLoginPage;
