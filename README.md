# 我慢貯金アプリ（仮）

「日々の我慢した支出を仮想的に“貯金”として記録し、節約を習慣化する」ことを目的とした Web アプリです。  
20〜30 代の一人暮らし社会人をターゲットに、使いやすく視覚的に楽しい体験を目指します。

---

## 📅 作成開始時期

- **デザイン検討**：2025 年 6 月 15 日〜
- **App 開発開始**：2025 年 6 月 21 日〜

---

## 🔧 使用技術スタック（予定）

- **フロントエンド**：Next.js (App Router) + TypeScript + Tailwind CSS 
- **バックエンド / DB**：Supabase（Auth & Database）
- **グラフ可視化**：Chart.js
- **状態管理**：Zustand(https://zustand-demo.pmnd.rs/)
- **UI 設計**：Figma

---

## 🎯 主な機能（開発予定）

- [ ] ユーザー登録 / ログイン（Supabase Auth）
- [ ] 最初に目標金額を設定（進捗を％で可視化）
- [ ] 節約金額の登録・表示（CRUD）
- [ ] 節約金額の合計を「週・月・年・総合」で集計
- [ ] グラフ表示（棒グラフなど）
- [ ] カレンダー表示
- [ ] カテゴリ・メモ記録
- [ ] アイコン選択（Notion 風）
- [ ] レスポンシブ対応

---

## 🎯 TODO （編集予定）

- レスポンシブ対応：一時的にスマホ表示に合わせて max-w-[480px] を使用中。あとで消すこと！
- signupのコンポ化。FormFieldとエラーメッセのコンポ化
- supabaseからのメール送信時のロゴ設定
- login・signupフォルダ内の役割分割）page.tsx or action.tsx　への置き換え
- アカウント削除、データリセットの実装
- any型の修正
- カテゴリーリストのicon管理！

## 📌 本番デプロイ時に忘れずにやること（Supabaseメール認証関連）

- `emailRedirectTo` のURLを `localhost` → 本番ドメインに書き換える
- Supabase Auth の「Redirect URLs」に本番URLを追加登録する
- メールテンプレート内の `{confirmation_url}` が正しく埋まるか確認する

---

## 📁 ディレクトリ構成（初期）

```bash
my-app/
├── app/               # App Router構成のルート
│   ├── page.tsx       # トップページ
│   └── layout.tsx     # 全体レイアウト
├── components/        # UIコンポーネント
├── lib/               # Supabase設定や型定義
├── styles/            # グローバルCSS（Tailwind）
├── utils/             # ヘルパー関数など
└── README.md

```
