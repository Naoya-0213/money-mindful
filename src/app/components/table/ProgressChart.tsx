"use client";

import { Doughnut } from "react-chartjs-2";

import "@/lib/chart";

// ===== 進捗円グラフ =====
// 📍ホーム画面や合計画面にて表示
// progress：全記録の合計

type Props = {
  progress: number; // 0〜100 の達成率
};

const ProgressChart = ({ progress }: Props) => {
  const data = {
    datasets: [
      {
        data: [progress, 100 - progress],
        backgroundColor: ["#795549", "#EAE3D8"],
        borderWidth: 0,
        borderColor: "#795549", // 外枠ライン色を指定
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%",
  };

  return (
    <div className="h-[var(--progressChart-height)] w-[var(--progressChart-width)]">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default ProgressChart;
