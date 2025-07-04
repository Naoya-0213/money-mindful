// 追加セクション

import React from "react";
import AddCard from "./component/AddCard";
import SectionCard from "@/app/components/section-card/SectionCard";

export default function AddPage() {
  return (
    <div className="mx-auto flex w-full max-w-[480px] flex-col gap-5 bg-[#F3F0EB] p-5">
      <SectionCard
        title="我慢を記録"
        icon="/icon/add/pencil.png"
        label="進捗icon"
      >
        {/* 我慢記録 */}
        <AddCard />
      </SectionCard>
    </div>
  );
}
