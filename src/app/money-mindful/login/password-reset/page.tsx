// パスワードリセット用

"use client";

import Button from "@/app/components/button/Button";
import FormField from "@/app/components/field/FormField";
import SectionCard from "@/app/components/section-card/SectionCard";
import Link from "next/link";

const BeforeLoginPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <SectionCard label="パスワード変更" icon="/icon/login/enter.png">
          {/* メールアドレス入力欄 */}
          <FormField
            label="Email"
            placeholder="メールアドレスを入力"
            icon="/icon/login/email.png"
          />

          <div className="flex flex-col items-center gap-5 leading-relaxed font-semibold text-[#777777]">
            <div className="flex flex-col items-center">
              <p>入力されたメールアドレスに</p>
              <p>パスワード変更用の</p>
              <p>リンクを送信します。</p>
            </div>
            <div className="flex flex-col items-center">
              <p>メール内のリンクから</p>
              <p>再設定をお願いします。</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-5 pb-5">
            {/* 送信ボタン */}
            <Button onClick={() => alert("supabaseへ送信！")}>送信</Button>

            {/* 戻るボタン */}
            <Link
              href="/money-mindful/login"
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

export default BeforeLoginPage;
