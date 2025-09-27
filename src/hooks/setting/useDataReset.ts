import useUserStore from "@/store/useUserStore";

import { createClient } from "@/utils/supabase/clients";

type DataResetResult =
  | { ok: true }
  | { ok: false; reason: "no-user" | "db-error"; dbError?: unknown };

export function useDataReset() {
  const supabase = createClient();

  const dataReset = async (): Promise<DataResetResult> => {
    try {
      const userId = useUserStore.getState().user?.id;

      if (!userId) {
        return { ok: false, reason: "no-user" };
      }

      const { error: dbError } = await supabase
        .from("money-savings")
        .delete()
        .eq("user_id", userId);

      if (dbError) return { ok: false, reason: "db-error", dbError };
      return { ok: true };
    } catch (dbError) {
      // ネットワーク例外など
      return { ok: false, reason: "db-error", dbError };
    }
  };

  return { dataReset };
}
