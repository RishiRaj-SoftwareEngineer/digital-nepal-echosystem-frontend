export type AuditLog = {
  id: string;
  event_type: string;
  citizen_id: string;
  acted_by_role: string;
  jurisdiction: string;
  timestamp: string;
  ip_hash: string;
};