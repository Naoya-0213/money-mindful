"use client";

import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { Button, SectionCard } from "@/app/components";

// TODOプロフィール設定/画像変更用

type Schema = z.infer<typeof schema>;

const schema = z.object({
  image_path: z
    .array(z.instanceof(File), {
      message: "画像ファイルを選択してください！",
    })
    .min(1, { message: "画像は必須です！" }),
});

const ChangeImagePage = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitted },
  } = useForm({
    defaultValues: {
      image_path: [] as File[],
    },
    resolver: zodResolver(schema),
    reValidateMode: "onSubmit",
  });

  const onSubmit = (data: Schema) => {
    console.log("登録画像データ", data);
  };

  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <SectionCard
          icon="/icon/setting/profile/social.png"
          label="ユーザー画像変更（実装予定）"
        >
          <form
            className="flex flex-col items-center gap-5 pb-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* プロフィール画像 */}

            {/* <Image
                src="/icon/setting/profile/profile-user.png"
                alt="プロフィール画像"
                width={100}
                height={100}
              /> */}

            <div className="flex w-full flex-col items-center justify-center gap-3 py-10">
              <Controller
                name="image_path"
                control={control}
                render={({ field }) => (
                  <input
                    ref={inputRef}
                    className="hidden"
                    type="file"
                    accept="image/*"
                    // 画像選択時の処理
                    onChange={(e) => {
                      const files = Array.from(e.target.files ?? []);
                      field.onChange(files.slice(0, 1));
                    }}
                  />
                )}
              ></Controller>
              {errors.image_path && isSubmitted && (
                <p className="mt-1 px-4 text-sm text-red-500">
                  {errors.image_path.message}
                </p>
              )}
            </div>

            {/* 注意点 */}
            <div className="flex flex-col items-center">
              <p className="font-semibold text-[#777777]">
                お好きな画像に変更できます！
              </p>
            </div>

            {/* 画像を選択ボタン */}
            <div className="flex w-full justify-center">
              <Button
                className="bg-[#D7CDBE] !text-[#795549]"
                type="button"
                onClick={() => inputRef.current?.click()}
              >
                画像を選択
              </Button>
            </div>

            {/* 保存ボタン */}
            <div className="flex w-full justify-center">
              <Button type="submit">保存</Button>
            </div>

            {/* 戻るボタン */}
            <div className="flex w-full justify-center">
              <Button href="/setting/profile">戻る</Button>
            </div>
          </form>
        </SectionCard>
      </div>
    </div>
  );
};

export default ChangeImagePage;
