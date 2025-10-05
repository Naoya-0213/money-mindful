"use client";

import { useState } from "react";

import useUserStore from "@/store/useUserStore";

import { createClient } from "@/utils/supabase/clients";

export function useUploadImage() {
  const supabase = createClient();

  const [errorMessage, setErrorMessage] = useState("");

  const handleSave = async (file: File) => {
    const userId = useUserStore.getState().user?.id;

    if (!userId) {
      console.log("✅ 未ログイン、またはユーザー情報未取得");
      setErrorMessage(
        "ユーザー情報が取得できません。ログインし直してください。",
      );
      return;
    }
    // TODO ログアウトし、再度ログインを促す。

    // 選択画像の拡張子を指定
    const ext = (file.name.split(".").pop() || "png").toLowerCase();

    // 更新日付
    const imageUpdatedDate = new Date()
      .toISOString()
      .slice(0, 16) // "2025-08-19T12:53"
      .replace("T", "_"); // "2025-08-19_12:53"

    // 保存ファイル名
    const fileName = `${imageUpdatedDate}_${crypto.randomUUID()}.${ext}`;

    // 保存ディレクトリ
    const filePath = `profiles/${userId}/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("profile_image")
      .upload(filePath, file);

    console.log("✅ アップロード画像情報", { filePath, uploadData });

    if (uploadError) {
      console.error("✅ アップロードエラー", uploadError);
      setErrorMessage("アップロードに失敗しました。再度選択してください。");
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("profile_image").getPublicUrl(filePath);

    // TODO　ここはそのまま！
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ image_url: publicUrl, image_updated_at: imageUpdatedDate })
      .eq("id", userId);

    if (updateError) {
      console.log("✅ 画像更新失敗", updateError);

      try {
        await supabase.storage.from("profile_image").remove([filePath]);
      } catch {}

      setErrorMessage(
        "プロフィール画像の更新に失敗しました。時間をおいて再度お試しください。",
      );
      return;
    }

    if (!updateError) {
      // 古い画像を削除
      const prefix = `profiles/${userId}`;
      const { data: existing, error: listError } = await supabase.storage
        .from("profile_image")
        .list(prefix, { limit: 100 });

      if (listError) {
        console.log("✅ 古い画像取得に失敗", listError);
      } else if (existing && existing.length > 0) {
        const toDelete = existing
          .filter((obj) => obj.name !== fileName)
          .map((obj) => `${prefix}/${obj.name}`);

        if (toDelete.length > 0) {
          const { error: removeError } = await supabase.storage
            .from("profile_image")
            .remove(toDelete);
          if (removeError) {
            console.error("古い画像の削除に失敗", removeError);
          }
        }
      }
    }

    // zustand保存のuser情報更新
    useUserStore.setState((s) => ({
      ...s, // 既存の state を展開（他のプロパティは維持）
      user: s.user
        ? {
            ...s.user,
            image_url: publicUrl,
            image_updated_at: imageUpdatedDate,
          } // userが存在すれば差し替え
        : s.user, // userがnull/未定義ならそのまま
    }));
  };

  return { handleSave, errorMessage };
}
