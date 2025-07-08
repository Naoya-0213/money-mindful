import Image from "next/image";
import React from "react";

const BeforeLogin = () => {
  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <div className="w-full rounded-2xl bg-[#EAE3D8]">
          <div className="flex flex-col items-center gap-5 p-5">
            <div className="flex items-center justify-center gap-5">
              {/* アイコン */}
              <div>
                <Image
                  src="/icon/before-login/light-bulb.png"
                  alt="アイコン"
                  width={35}
                  height={35}
                />
              </div>

              {/* ロゴ */}
              <div>
                <Image
                  src="/icon/before-login/money-mindful-title_icon.png"
                  alt="アイコン"
                  width={150}
                  height={25}
                />
              </div>

              {/* タイトル */}
              <h2 className="text-xl font-bold">とは？</h2>
            </div>

            {/* 説明文 */}
            <div className="flex flex-col items-center justify-center font-semibold text-[#777777]">
              <p>コンビニのコーヒーや外食.....</p>
              <p>ちょっとした我慢を記録しよう。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeLogin;
