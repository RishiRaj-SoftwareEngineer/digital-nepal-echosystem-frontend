import { type Citizen } from "@/types/citizen";
export type {Citizen}

export function getWardStats(citizens: Citizen[]) {
  return {
    total_citizens: citizens.length,
    nid_verified: citizens.filter((c) => c.nid_verified).length,
    pending_sync: citizens.filter((c) => c.sync_status !== "synced").length,
    id_cards_issued: citizens.filter((c) => c.nid_verified).length,
  };
}
