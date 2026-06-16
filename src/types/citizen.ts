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

export type BloodGroup =
  | "A_POS" | "A_NEG"
  | "B_POS" | "B_NEG"
  | "AB_POS" | "AB_NEG"
  | "O_POS" | "O_NEG";

export const BLOOD_GROUPS: BloodGroup[] = [
  "A_POS", "A_NEG", "B_POS", "B_NEG",
  "AB_POS", "AB_NEG", "O_POS", "O_NEG",
];

export type ConsentChannel =
  | "WARD_OFFICE"
  | "FIELD"
  | "PORTAL"
  | "VERBAL_WITNESS"
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

export const DIGITAL_LITERACIES: DigitalLiteracy[] = [
  "BASIC", "INTERMEDIATE", "ADVANCED", "NONE",
];

export const CONSENT_CHANNELS: ConsentChannel[] = [
  "WARD_OFFICE", "FIELD", "PORTAL", "VERBAL_WITNESS", "OTHER",
];

export interface Citizen {
  id: string;
  ward_id: string;
  household_id: string | null;
  citizenship_number?: string;
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

export type LinkStatus = "pending" | "linked";

export interface FamilyMember {
  id: string;
  relationship: "FATHER" | "MOTHER" | "SPOUSE" | "CHILD";
  name_np: string;
  name_en: string;
  citizenship_number: string;
  link_status: LinkStatus;
}

export interface RegistrationFormData {
  name_np: string;
  name_en: string;
  dob: string;
  sex: Sex | "";
  blood_group: BloodGroup | "";
  religion: string;
  ethnicity: string;
  mother_tongue: string;
  tole: string;
  digital_literacy: DigitalLiteracy | "";
  has_smartphone: boolean;
  nid_number: string;
  nid_verified: boolean;
  citizenship_number: string;
  consent_channel: ConsentChannel | "";
  consent_recorded_at: string;
  photo: string | null;
  father: FamilyMember | null;
  mother: FamilyMember | null;
  spouse: FamilyMember | null;
  children: FamilyMember[];
}