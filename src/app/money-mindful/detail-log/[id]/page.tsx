// 記録履歴、詳細表示・編集・保存・削除用

"use client";

import Button from "@/app/components/button/Button";
import AddCard from "@/app/components/section-card/AddCard";
import SectionCard from "@/app/components/section-card/SectionCard";
import Link from "next/link";
import React from "react";

const DetailLogPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-[480px] flex-col gap-5 bg-[#F3F0EB] p-5">
      <SectionCard label="我慢を記録" icon="/icon/add/pencil.png">
        {/* 我慢記録 */}
        <AddCard buttonTitle="保存">
          {/* 戻るボタン */}
          <div className="flex w-full flex-col items-center gap-5">
            <Link
              href="/money-mindful/home"
              className="flex w-full justify-center"
            >
              <Button>戻る</Button>
            </Link>

            {/* 削除ボタン */}
            <Button
              className="bg-[#D7CDBE] !text-[#795549]"
              onClick={() => alert("削除！")}
            >
              削除
            </Button>
          </div>
        </AddCard>
      </SectionCard>
    </div>
  );
};

export default DetailLogPage;
