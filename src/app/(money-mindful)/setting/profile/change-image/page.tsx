"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Image from "next/image";
import { useRouter } from "next/navigation";

import useUserStore from "@/store/useUserStore";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { Button, SectionCard } from "@/app/components";

import { default_avatar } from "../../page";
import { useHandleSave } from "../../../../../hooks/setting/useUploadImage";

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
  const router = useRouter();
  const { user } = useUserStore();
  const [avatar, setAvatar] = useState(default_avatar);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitted },
  } = useForm({
    defaultValues: {
      image_path: [] as File[],
    },
    resolver: zodResolver(schema),
    reValidateMode: "onSubmit",
  });

  // 選択画像データ
  const value = watch("image_path");

  // File[](RHF) → objectURL[]（ローカルで管理するURL)
  // 選択されていない場合は、デフォルト画像を表示
  const previews = useMemo(() => {
    return value.map((file) => URL.createObjectURL(file));
  }, [value]);

  // 画像更新した場合、objectURL[]をリセット
  useEffect(() => {
    return () => previews.forEach((url) => URL.revokeObjectURL(url));
  }, [previews]);

  useEffect(() => {
    if (previews.length > 0) {
      setAvatar(previews[0]);
    } else if (user?.image_url) {
      setAvatar(user.image_url);
    } else {
      setAvatar(default_avatar);
    }
  }, [user?.image_url, previews]);

  const { handleSave, message } = useHandleSave();

  const onSubmit = (data: Schema) => {
    console.log("登録画像データ", data);
    const file = data.image_path[0];
    if (!file) return;
    handleSave(file);

    toast.success("画像を変更しました！");
    router.replace("/setting/profile");

    console.log("✅ 画像選択成功！");
  };

  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <SectionCard
          icon="/icon/setting/profile/social.png"
          label="ユーザー画像変更"
        >
          <form
            className="flex flex-col items-center gap-5 pb-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex w-full flex-col items-center justify-center gap-3 py-7">
              {/* プロフィール画像のプレビュー表示 */}
              <div className="relative h-36 w-36 overflow-hidden rounded-full ring-2 ring-[#795549]">
                <Image
                  key="previews"
                  src={avatar}
                  fill
                  unoptimized
                  alt="ユーザー画像"
                  className="object-cover object-center"
                />
              </div>

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

              {/* RHFエラーメッセージ */}
              {errors.image_path && isSubmitted && (
                <p className="mt-1 px-4 text-sm text-red-500">
                  {errors.image_path.message}
                </p>
              )}

              {/* 画像アップロード時エラーメッセージ */}
              {message && <div className="text-red-500">{message}</div>}
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
