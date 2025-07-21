import React from "react";

const CallbackErrorPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <p>セッションが切れております。再度ログインしてください。</p>
      </div>
    </div>
  );
};

export default CallbackErrorPage;
