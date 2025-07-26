// カテゴリー編集ページ用
import { CATEGORY_LIST } from "@/const/category-icon/categoryIconMap";

import CategoryItem from "@/app/components/category/CategoryItem";
import SectionCard from "@/app/components/section-card/SectionCard";

const AddCategoryPage = () => {
  // カテゴリー排列の準備

  return (
    <div className="flex gap-5 p-5">
      <SectionCard
        label="カテゴリー選択"
        icon="/icon/categories/categories.png"
      >
        <div className="flex flex-col gap-3">
          {CATEGORY_LIST.map((category) => (
            <CategoryItem id={category.id} key={category.id} />
          ))}
        </div>
      </SectionCard>
    </div>
  );
};

export default AddCategoryPage;
