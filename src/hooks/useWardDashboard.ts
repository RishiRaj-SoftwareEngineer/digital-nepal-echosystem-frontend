import { useMemo } from "react";
import type { Citizen } from "@/types/citizen";
import citizensRaw from "../../data/citizens.json";
import { getWardStats } from "@lib/utils";

const citizens = citizensRaw as unknown as Citizen[];

export function useWardDashboard(wardId: string) {
  return useMemo(() => {
    const wardCitizens = citizens.filter((c: Citizen) => c.ward_id === wardId);
    const stats = getWardStats(wardCitizens);

    return [
      { title: "Total Citizens", value: stats.total_citizens, icon: "People" },
      {
        title: "NID Verified",
        value: stats.nid_verified,
        icon: "VerifiedUser",
      },
      { title: "Pending Sync", value: stats.pending_sync, icon: "SyncProblem" },
      {
        title: "ID Cards Issued",
        value: stats.id_cards_issued,
        icon: "CreditCard",
      },
    ];
  }, [wardId]);
}
