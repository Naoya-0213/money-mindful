"use client";

import EditAddForm from "@/app/components/add/EditAddForm";
import Button from "@/app/components/button/Button";
import SectionCard from "@/app/components/section-card/SectionCard";

// 記録履歴、詳細表示・編集・保存・削除用

const DetailLogPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-[480px] flex-col gap-5 bg-[#F3F0EB] p-5">
      <SectionCard label="我慢を記録" icon="/icon/add/pencil.png">
        {/* 我慢記録 */}
        <EditAddForm>
          {/* 戻るボタン */}
          <div className="flex w-full flex-col items-center gap-5 pb-5">
            <div className="flex w-full justify-center">
              <Button href="/money-mindful/home">戻る</Button>
            </div>

            {/* 削除ボタン */}
            <Button
              className="bg-[#D7CDBE] !text-[#795549]"
              onClick={() => alert("削除！")}
            >
              削除
            </Button>
          </div>
        </EditAddForm>
      </SectionCard>
    </div>
  );
};

export default DetailLogPage;
