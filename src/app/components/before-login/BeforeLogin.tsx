import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "../button/Button";

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
            <div className="flex flex-col items-center gap-5 font-semibold text-[#777777] py-3">
              <div className="flex flex-col items-center">
                <p>本当は買いたかったけど</p>
                <p>今日は我慢した。</p>
              </div>

              <div className="flex flex-col items-center">
                <p>そんな日常の小さな節約を記録して</p>
                <p>まるで“貯金”のように</p>
                <p>積み重ねるアプリです。</p>
              </div>

              <div className="flex flex-col items-center">
                <p>小さな我慢が</p>
                <p>大きな達成感に変わります。</p>
              </div>

              <div className="flex flex-col items-center">
                <div>さぁ、あなたも今日からはじめよう。</div>
              </div>
            </div>

            {/* ログインボタン */}
            <Link
              href="/money-mindful/login"
              className="flex w-full justify-center"
            >
              <Button>ログイン</Button>
            </Link>

            {/* 新規登録ボタン */}
            <Link
              href="/money-mindful/signup"
              className="flex w-full justify-center"
            >
              <Button>アカウント作成</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeLogin;
