"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/utils/supabase/clients";

// ===== メール変更時に遷移 ======
// （uiは後ほど変更）

const AuthCallbackPage = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        setStatus("error");
      } else {
        setStatus("success");
      }
    };

    checkSession();
  }, []);

  if (status === "loading") return <p>確認中...</p>;
  if (status === "error") return <p>ログイン情報が確認できませんでした。</p>;

  return (
    <div className="p-8 text-center">
      <h1 className="text-xl font-bold text-green-700">
        メール変更が完了しました！
      </h1>
      <p className="mt-4">引き続きご利用ください。</p>
    </div>
  );
};

export default AuthCallbackPage;
