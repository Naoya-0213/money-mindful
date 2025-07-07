// カテゴリー編集ページ用

import CategoryItem from "@/app/components/category/CategoryItem";
import SectionCard from "@/app/components/section-card/SectionCard";
import React from "react";

const AddCategoryPage = () => {
  return (
    <div className="flex gap-5 p-5">
      <SectionCard
        label="カテゴリー選択"
        icon="/icon/categories/categories.png"
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
      </SectionCard>
    </div>
  );
};

export default AddCategoryPage;
