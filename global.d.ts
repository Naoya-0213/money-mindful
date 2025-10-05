// TypeScriptでCSSファイルをインポートしたときの型エラーを防ぐための宣言
// 例: `import "react-calendar/dist/Calendar.css";`
// 「このCSSモジュールは存在する」とTSに教えて、型チェックをしないようにする

declare module "*.css";