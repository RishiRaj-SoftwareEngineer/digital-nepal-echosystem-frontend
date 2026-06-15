export type Sex = "MALE" | "FEMALE" | "OTHER";

export type SyncStatus = "synced" | "pending" | "failed";

export type DigitalLiteracy = "BASIC" | "INTERMEDIATE" | "ADVANCED" | "NONE";

export type EmploymentCategory =
  | "FARMER"
  | "BUSINESS"
  | "GOVERNMENT_EMPLOYEE"
  | "PRIVATE_EMPLOYEE"
  | "STUDENT"
  | "UNEMPLOYED"
  | "OTHER";

export type ConsentChannel =
  | "WARD_OFFICE"
  | "FIELD"
  | "PORTAL"
  | "OTHER";

export const EMPLOYMENT_CATEGORIES:  EmploymentCategory[] = [
  "FARMER", "BUSINESS", "GOVERNMENT_EMPLOYEE", "PRIVATE_EMPLOYEE",
  "STUDENT", "UNEMPLOYED", "OTHER",
];

export const SYNC_STATUSES: SyncStatus[] = [
  "synced", "pending", "failed",
];

export const SEXES: Sex[] = [
  "MALE", "FEMALE", "OTHER",
];

export interface Citizen {
  id: string;
  ward_id: string;
  household_id: string | null;
  name_np: string;
  name_en: string;
  nid_masked: string;
  sex: Sex;
  dob: string;
  tole: string;
  digital_literacy: DigitalLiteracy;
  has_smartphone: boolean;
  consent_recorded_at: string;
  sync_status: SyncStatus;
  nid_verified: boolean;
  is_active: boolean;
  employment_category?: EmploymentCategory;
  consent_channel: ConsentChannel;
  created_at: string;
}

export type CitizenList = Citizen[];