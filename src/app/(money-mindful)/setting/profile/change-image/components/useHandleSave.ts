"use client";

import { useState } from "react";

import useUserStore from "@/store/useUserStore";

import { createClient } from "@/utils/supabase/clients";

export function useHandleSave() {
  const supabase = createClient();

  const [message, setMessage] = useState("");

  const handleSave = async (file: File) => {
    const userId = useUserStore.getState().user?.id;

    if (!userId) {
      console.log("未ログイン、またはユーザー情報未取得");
      return;
    }

    // 選択画像の拡張子を指定
    const ext = file.name.split(".").pop() ?? "png";
    const filepath = `profiles/${userId}/${ext}`;
    // TODO登録日付をいれる

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("profile_image")
      .upload(filepath, file, { upsert: true });

    console.log("アップロード画像情報", {
      filepath,
      file,
      uploadData,
    });

    if (uploadError) {
      setMessage("アップロードに失敗しました。再度選択してください。");
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("profile_image").getPublicUrl(filepath);

    await supabase
      .from("profiles")
      .update({ image_url: publicUrl })
      .eq("id", userId);
  };

  return { handleSave, message };
}
