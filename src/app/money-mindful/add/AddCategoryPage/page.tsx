// カテゴリー編集ページ用

import Button from "@/app/components/button/Button";
import CategoryItem from "@/app/components/category/CategoryItem";
import SectionCard from "@/app/components/section-card/SectionCard";
import Link from "next/link";
import React from "react";

const AddCategoryPage = () => {
  return (
    <div className="flex gap-5 p-5">
      <SectionCard
        title="カテゴリー選択"
        icon="/icon/categories/categories.png"
        label="カテゴリーicon"
      >
        <div className="flex flex-col gap-3">
          <CategoryItem name="food" />
          <CategoryItem name="drink" />
          <CategoryItem name="beer" />
          <CategoryItem name="shopping" />
          <CategoryItem name="clothing" />
          <CategoryItem name="transportation" />
          <CategoryItem name="money" />
          <CategoryItem name="social" />
          <CategoryItem name="hobby" />
          <CategoryItem name="entertainment" />
          <CategoryItem name="others" />
        </div>

        {/* 編集ボタン */}
        <Link href="/money-mindful/edit-category-page" className="flex w-full justify-center">
          <Button>カテゴリー編集</Button>
        </Link>
      </SectionCard>
    </div>
  );
};

export default AddCategoryPage;
