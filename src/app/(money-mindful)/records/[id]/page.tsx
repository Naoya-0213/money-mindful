"use client";

import { useParams } from "next/navigation";

import SectionCard from "@/app/components/Molecules/section-card/SectionCard";
import EditAddForm from "@/app/components/Organisms/add/EditAddForm";

// ==== 登録記録の詳細確認＆編集画面 =====

const DetailLogPage = () => {
  const params = useParams();
  const id = params.id as string; // idはstringとして扱う

  return (
    <div className="mx-auto flex w-full max-w-[480px] flex-col gap-5 bg-[#F3F0EB] p-5">
      <SectionCard label="我慢を記録" icon="/icon/add/pencil.png">
        {/* 我慢記録 */}
        <EditAddForm id={id} />
      </SectionCard>
    </div>
  );
};

export default DetailLogPage;
