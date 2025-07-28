"use client";

import { useEffect, useState } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { CATEGORY_LIST } from "@/const/category-icon/categoryIconMap";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import Button from "@/app/components/button/Button";
import FormField from "@/app/components/field/FormField";

import { createClient } from "@/utils/supabase/clients";
import { getCurrentUser } from "@/utils/supabase/getCurrentUser";

import CategoryItem from "../category/CategoryItem";

// ===== 我慢の記録、詳細確認・編集・削除画面 =====

type AddCardProps = {
  id: string;
};

// 入力データの検証ルールを定義
const schema = z.object({
  title: z
    .string()
    .min(1, { message: "1文字以上で入力ください。" })
    .max(20, { message: "20文字以内で入力ください。" }),
  amount: z.number().min(1, { message: "金額を入力してください。" }),
  saved_date: z.string().min(1, { message: "日付を選択してください。" }),
  category_id: z.string().min(1, { message: "必ず選択してください。" }),
  memo: z.string().optional(),
});

// Zodスキーマから型を自動推論してSchema型を定義
type Schema = z.infer<typeof schema>;

const EditAddForm = ({ id }: AddCardProps) => {
  const [isDisplayCategory, setIsDisplayCategory] = useState(false);

  const onClickCategory = () => setIsDisplayCategory(true);

  const onChoiceCategory = (categoryId: string) => {
    setValue("category_id", categoryId);
    setIsDisplayCategory(false);
  };

  // 画面遷移やページのリフレッシュなどに使用するRouterオブジェクトを取得
  const router = useRouter();

  // supabase連携（別ページにて連携済み）
  const supabase = createClient();

  // 金額入力時の , 表示
  const [formattedAmount, setFormattedAmount] = useState("");

  // React-hook-form準備
  const {
    register,
    setValue,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    defaultValues: {
      title: "",
      amount: undefined,
      saved_date: new Date().toISOString().split("T")[0],
      category_id: "category-1",
      memo: "",
    },
    // 入力値の検証
    resolver: zodResolver(schema),
  });

  // 各記録のIDを取得
  useEffect(() => {
    console.log("✅ fetchRecord 実行");

    const fetchRecord = async () => {
      const user = await getCurrentUser(supabase);
      if (!user) return;

      const { data, error } = await supabase
        .from("money-savings")
        .select("*")
        .eq("id", id)
        .eq("user_id", user.id)
        .single();

      if (error || !data) {
        console.error("データ取得失敗", error);
        return;
      }

      console.log("📦 Supabaseデータ取得成功:", data);

      if (data.title !== null) {
        setValue("title", data.title);
      }
      if (data.amount !== null) {
        setValue("amount", data.amount);
        setFormattedAmount(data.amount.toLocaleString("ja-JP"));
      }
      if (data.saved_date !== null) {
        setValue("saved_date", data.saved_date);
      }
      if (data.category_id !== null) {
        setValue("category_id", data.category_id);
      }
      if (data.memo !== null) {
        setValue("memo", data.memo);
      }
    };

    fetchRecord();
  }, [id, setValue]);

  // 保存ボタンの動作
  const onSubmit: SubmitHandler<Schema> = async (data: Schema) => {
    console.log("🔽 登録データ確認:", data);
    
    const user = await getCurrentUser(supabase);
    if (!user) return;

    console.log(data);

    const { error } = await supabase
      .from("money-savings")
      .update({
        user_id: user.id,
        title: data.title,
        amount: data.amount,
        saved_date: data.saved_date,
        category_id: data.category_id,
        memo: data.memo ?? "",
      })
      .eq("id", id)
      .eq("user_id", user.id);

    console.log(error);

    if (!error) {
      router.replace(`/money-mindful/records/`);
    }
  };

  return (
    <>
      {isDisplayCategory === true && (
        <div className="flex flex-col gap-3">
          {CATEGORY_LIST.map((category) => (
            <div
              key={category.id}
              onClick={() => {
                onChoiceCategory(category.id);
              }}
            >
              <CategoryItem id={category.id} />
            </div>
          ))}
        </div>
      )}
      {isDisplayCategory === false && (
        <form
          className="flex w-full flex-col gap-5 bg-[#EAE3D8]"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* タイトル */}
          <div className="flex flex-col gap-1">
            <FormField
              label="タイトル"
              placeholder="タイトルを入力"
              icon="/icon/add/tag.png"
              {...register("title")}
            />
            {errors.title && (
              <p className="mt-1 px-4 text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* 額 */}
          <div className="flex flex-col gap-1">
            {/* react-hook-form の Controller導入（金額の , のため）*/}
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <div className="relative w-full">
                  <FormField
                    label="金額"
                    icon="/icon/setting/goal/money.png"
                    placeholder="金額を入力"
                    type="text"
                    InputStyle={{ paddingLeft: "3rem" }}
                    value={formattedAmount}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/,/g, "");
                      const numeric = Number(raw);
                      if (!isNaN(numeric) && raw !== "") {
                        field.onChange(numeric);
                        setFormattedAmount(numeric.toLocaleString("ja-JP"));
                      } else {
                        field.onChange(0);
                        setFormattedAmount("");
                      }
                    }}
                  >
                    <span className="absolute top-1/2 left-4 -translate-y-1/2 text-xl font-bold text-[#795549]">
                      ¥
                    </span>
                  </FormField>
                </div>
              )}
            />
            {errors.amount && (
              <p className="mt-1 px-4 text-sm text-red-500">
                {errors.amount.message}
              </p>
            )}
          </div>

          {/* 追加日 */}
          <div className="flex flex-col gap-1">
            <FormField
              label="追加日"
              icon="/icon/add/calendar.png"
              type="date"
              {...register("saved_date")}
            />
          </div>

          {/* カテゴリー */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div>
                <Image
                  src="/icon/add/categories.png"
                  alt="カテゴリーアイコン"
                  width={20}
                  height={20}
                />
              </div>
              <h2 className="text-lg font-bold text-[#795549]">カテゴリー</h2>
            </div>

            <div onClick={onClickCategory} className="w-full">
              <CategoryItem id={watch("category_id")} />
            </div>
          </div>
          {/* メモ */}
          <FormField
            label="メモ"
            placeholder="メモを入力"
            icon="/icon/add/memo.png"
            isTextarea
            {...register("memo")}
          />

          <div className="flex justify-center pt-5">
            {/* 保存ボタン */}
            <Button type="submit">保存</Button>
          </div>
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
        </form>
      )}
    </>
  );
};

export default EditAddForm;
