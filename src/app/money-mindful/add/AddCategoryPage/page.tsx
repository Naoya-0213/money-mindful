"use client";

import { useRouter } from "next/navigation";

import { CATEGORY_LIST } from "@/const/category-icon/categoryIconMap";
import useCategoryStore from "@/store/useCategoryStore";

import CategoryItem from "@/app/components/category/CategoryItem";
import SectionCard from "@/app/components/section-card/SectionCard";

// ===== カテゴリー選択画面 =====
// 📍 初回は,category-1を表示（食費）
// 📍 2回目以降は、直近使用したカテゴリーを表示

const AddCategoryPage = () => {
  const router = useRouter();

  const setCategory = useCategoryStore((state) => state.setCategory);

  return (
    <div className="flex gap-5 p-5">
      <SectionCard
        label="カテゴリー選択"
        icon="/icon/categories/categories.png"
      >
        <div className="flex flex-col gap-3">
          {CATEGORY_LIST.map((category) => (
            <div
              key={category.id}
              onClick={() => {
                setCategory(category.id);
                router.back();
              }}
            >
              <CategoryItem id={category.id} />
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
};

export default AddCategoryPage;
