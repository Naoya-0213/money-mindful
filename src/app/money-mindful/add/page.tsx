// 追加セクション

import FirstAddForm from "@/app/components/add/FirstAddForm";
import SectionCard from "@/app/components/section-card/SectionCard";

export default function AddPage() {
  return (
    <div className="mx-auto flex w-full max-w-[480px] flex-col gap-5 bg-[#F3F0EB] p-5">
      <SectionCard label="我慢を記録" icon="/icon/add/pencil.png">
        {/* 我慢記録 */}
        <FirstAddForm buttonTitle="保存" />
      </SectionCard>
    </div>
  );
}
