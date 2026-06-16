export const WARD_ID = "ward-004";

export const SYNC_BADGE: Record<string, string> = {
  synced: "bg-emerald-100 text-emerald-800",
  pending: "bg-amber-100 text-amber-800",
  failed: "bg-red-100 text-red-800",
};

export const STEP_LABELS = ['Core Identity', 'Family Tree'];

export const BLOOD_GROUP_LABELS: Record<string, string> = {
  A_POS: 'A+', A_NEG: 'A-',
  B_POS: 'B+', B_NEG: 'B-',
  AB_POS: 'AB+', AB_NEG: 'AB-',
  O_POS: 'O+', O_NEG: 'O-',
};

export const CONSENT_CHANNEL_LABELS: Record<string, string> = {
  WARD_OFFICE: 'Ward Office',
  FIELD: 'Field Visit',
  PORTAL: 'Online Portal',
  VERBAL_WITNESS: 'Verbal Witness',
  OTHER: 'Other',
};
