import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";

// ===== chart.jsを導入 =====
// 📍ホームや合計での、円グラフ表示用

ChartJS.register(ArcElement, Tooltip, Legend);
