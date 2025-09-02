// ===== サインインページ =====
// 📍ログインページ（未ログイン状態の初回アクセス時に表示）
// Supabaseの認証状態に応じてログインページまたはリダイレクトを表示する
import { BeforeSignin } from "@/app/components";

export default async function SigninAuthPage() {
  return <BeforeSignin />;
}
