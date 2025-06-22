import React from "react";
import Image from "next/image";

const Home = () => {
  return (
    <div className="w-full p-5 text-2xl font-bold flex flex-col items-center">
      <h3>北海道旅行</h3>
      <p>¥50,000</p>

      {/* あとで削除 */}
      <Image src="/icon/仮グラフ.png" alt="仮グラフ" width={32} height={32} />
    </div>
  );
};

export default Home;
