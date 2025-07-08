// 目標設定用
"use client";

import Button from "@/app/components/button/Button";
import FormField from "@/app/components/field/FormField";
import SectionCard from "@/app/components/section-card/SectionCard";
import Link from "next/link";
import React, { useState } from "react";

const GoalSetting = () => {
  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <SectionCard icon="/icon/setting/goal/flag.png" label="目標設定">
          {/* 目標タイトル */}
          <FormField
            label="目標タイトル"
            icon="/icon/setting/goal/tag.png"
            placeholder="北海道旅行"
          />

          {/* 額 */}
          <FormField
            label="金額"
            icon="/icon/setting/goal/money.png"
            placeholder="¥150"
          />

          {/* 期限 */}
          <FormField
            label="金額"
            icon="/icon/setting/goal/calendar.png"
            placeholder="2025年12月2日（水）"
          />

          {/* 追加日 */}
          <FormField
            label="追加日"
            icon="/icon/setting/goal/pin.png"
            placeholder="2025年7月2日（水）"
          />

          {/* メモ */}
          <FormField
            label="メモ"
            icon="/icon/setting/goal/notes.png"
            placeholder="12月にいく北海道旅行用！"
            isTextarea
          />

          <div className="flex flex-col gap-5 pt-5">
            {/* 保存ボタン */}
            <Link
              href="/money-mindful/setting"
              className="flex w-full justify-center"
            >
              <Button onClick={() => alert("supabaseへ保存！")}>保存</Button>
            </Link>
            {/* 戻るボタン */}
            <Link
              href="/money-mindful/setting"
              className="flex w-full justify-center"
            >
              <Button>戻る</Button>
            </Link>
            {/* 削除ボタン */}
            <div className="flex w-full justify-center">
              <Button
                className="bg-[#D7CDBE] !text-[#795549]"
                onClick={() => alert("削除！")}
              >
                リセット
              </Button>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default GoalSetting;
