"use client";

import Button from "@/app/components/button/Button";
import FormField from "@/app/components/field/FormField";
import SectionCard from "@/app/components/section-card/SectionCard";
import Link from "next/link";

import React from "react";

const SignUpPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <SectionCard label="新規登録" icon="/icon/login/enter.png">
          {/* メールアドレス入力欄 */}
          <FormField
            label="Email"
            placeholder="メールアドレスを入力"
            icon="/icon/login/email.png"
          />

          {/* パスワード入力欄 */}
          <FormField
            label="Password"
            placeholder="パスワードを入力"
            icon="/icon/login/lock.png"
          />

          {/* 説明文 */}
          <div className="flex flex-col items-center gap-5 leading-relaxed font-semibold text-[#777777]">
            <div className="flex flex-col items-center">
              <p>はじめての方は、まず新規登録から！</p>
            </div>
            <div className="flex flex-col items-center">
              <p>入力したメールアドレスに</p>
              <p>届くリンクから</p>
              <p>登録を完了しましょう！</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 pb-5">
            {/* 新規登録ボタン */}
            <Button onClick={() => alert("supabaseへ送信！")}>新規登録</Button>

            {/* ログインへ誘導 */}
            <p className="font-semibold text-[#777777]">
              ログインは
              <Link
                href="/money-mindful/login"
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

export default SignUpPage;
