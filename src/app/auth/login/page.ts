// // ログインページ実装
// // use client側の components/login の読み込み
// // use server

// import type { Database } from "@/types/database.types";
// import { createClient } from "@/utils/supabase/clients";
// import { redirect } from "next/navigation";
// import BeforeLoginPage from '../../money-mindful/login/page';



// // 認証状態の監視
// export default async function signinPage() {
//   const supabase = await createClient<Database>();

//   // セッションの取得
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   // 認証している場合、リダイレクト
//   if (session) {
//     redirect("/");
//   }

//   return <BeforeLoginPage />;
// }
