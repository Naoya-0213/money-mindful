// import { redirect } from "next/navigation";
// import { createClient } from "@/utils/supabase/server";
// import type { Database } from "@/types/database.types";
// import BeforeLoginPage from "@/app/money-mindful/login/page";

// export default async function AuthLoginPage() {
//   const supabase = await createClient<Database>();
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   if (session) {
//     redirect("/money-mindful/home");
//   }

//   return <BeforeLoginPage />;
// }