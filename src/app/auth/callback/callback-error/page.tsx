import React from "react";

import SessionErrorPage from "@/app/components/session-error/SessionError";

// メールアドレス変更時、登録アドレスの送信されるリンククリック時の遷移先

const CallbackErrorPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <SessionErrorPage />
      </div>
    </div>
  );
};

export default CallbackErrorPage;
