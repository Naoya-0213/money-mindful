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

    // 画像処理 ===
    // 1) Storageへアップロード
    try {
      const { data } = await supabase.storage
        .from("profile_image")
        .upload(filePath, file);

      console.log("✅ アップロード完了", { data });
    } catch (e) {
      console.log("❌ アップロード失敗", e);
      setErrorMessage(
        "プロフィール画像の更新に失敗しました。時間をおいて再度お試しください。",
      );
      // 画像データ削除
      await supabase.storage.from("profile_image").remove([filePath]);
      throw e instanceof Error ? e : new Error(String(e));
    }

    // 2) 公開URL取得

    let publicUrl: string | null = null;

    try {
      const { data } = supabase.storage
        .from("profile_image")
        .getPublicUrl(filePath);

      publicUrl = data.publicUrl;
      console.log("✅ 公開URL取得成功:", publicUrl);
    } catch (e) {
      console.log("❌ アップロード失敗", e);
      setErrorMessage(
        "画像の公開URL取得に失敗しました。時間をおいて再度お試しください。",
      );
      throw e instanceof Error ? e : new Error(String(e));
    }

    // 3) DB更新
    try {
      const { data } = await supabase
        .from("profiles")
        .update({ image_url: publicUrl, image_updated_at: imageUpdatedDate })
        .eq("id", userId);

      console.log("✅ アップロード画像情報", {
        data,
      });
    } catch (e) {
      console.log("❌ 画像更新失敗", e);
      setErrorMessage(
        "プロフィール画像の更新に失敗しました。時間をおいて再度お試しください。",
      );
      throw e instanceof Error ? e : new Error(String(e));
    }

    // 4) ここまで成功したら「成功後のみ」古い画像を削除
    const prefix = `profiles/${userId}`;
    const { data: existing, error: listError } = await supabase.storage
      .from("profile_image")
      .list(prefix, { limit: 100 });

    if (listError) {
      console.log("❌ 古い画像取得に失敗", listError);
    } else if (existing && existing.length > 0) {
      const toDelete = existing
        .filter((obj) => obj.name !== fileName)
        .map((obj) => `${prefix}/${obj.name}`);

      if (toDelete.length > 0) {
        const { error: removeError } = await supabase.storage
          .from("profile_image")
          .remove(toDelete);
        if (removeError) {
          console.error("❌ 古い画像の削除に失敗", removeError);
        }
      }
    }

    // 5) 最後にZustandを同期（DB成功後に限定）
    try {
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
    } catch (e) {
      console.log("❌ Zustand同期失敗");
      throw e instanceof Error ? e : new Error(String(e));
    }
  };

  return { handleSave, errorMessage };
}
