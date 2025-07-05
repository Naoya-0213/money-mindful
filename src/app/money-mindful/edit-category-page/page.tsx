// カテゴリー編集ページ用

import Button from "@/app/components/button/Button";
import EditCategoryPage from "@/app/components/category/EditCategoryPage";
import SectionCard from "@/app/components/section-card/SectionCard";
import Link from "next/link";
import React from "react";

const AddEditCategoryPage = () => {
  return (
    <div className="flex gap-5 p-5">
      <SectionCard
        title="カテゴリー編集"
        icon="/icon/categories/categories.png"
        label="進捗icon"
      >
        <EditCategoryPage />

        {/* ホームへ戻るボタン */}
        <Link href="/money-mindful/home" className="flex w-full justify-center">
          <Button>ホームへ戻る</Button>
        </Link>
      </SectionCard>
    </div>
  );
};

export default AddEditCategoryPage;
