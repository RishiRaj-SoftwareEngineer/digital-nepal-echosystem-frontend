export type Sex = "MALE" | "FEMALE" | "OTHER";

export type SyncStatus = "synced" | "pending" | "failed";

export type DigitalLiteracy = "BASIC" | "INTERMEDIATE" | "ADVANCED" | "NONE";

export type EmploymentCategory =
  | "FARMER"
  | "GOVERNMENT"
  | "PRIVATE"
  | "BUSINESS"
  | "STUDENT"
  | "UNEMPLOYED"
  | "FOREIGN_ABROAD"
  | "HOMEMAKER"
  | "RETIRED"
  | "OTHER";

export type IncomeBand =
  | "UNDER_5K"
  | "5K_10K"
  | "10K_25K"
  | "25K_50K"
  | "50K_100K"
  | "OVER_100K";

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

export const EMPLOYMENT_CATEGORIES: EmploymentCategory[] = [
  "FARMER", "GOVERNMENT", "PRIVATE", "BUSINESS", "STUDENT",
  "UNEMPLOYED", "FOREIGN_ABROAD", "HOMEMAKER", "RETIRED", "OTHER",
];

export const INCOME_BANDS: IncomeBand[] = [
  "UNDER_5K", "5K_10K", "10K_25K", "25K_50K", "50K_100K", "OVER_100K",
];

export interface EmploymentData {
  category: EmploymentCategory | "";
  income_band: IncomeBand | "";
  unemployed_duration_months: number;
  unemployed_skills: string[];
  unemployed_office_registered: boolean;
  farmer_land_area_ropani: string;
  farmer_land_type: string;
  farmer_primary_crop: string;
  farmer_irrigation_type: string;
  farmer_agri_loan: boolean;
  foreign_country: string;
  foreign_visa_type: string;
  foreign_employer_name: string;
  foreign_departure_date: string;
  foreign_expected_return: string;
  foreign_remittance_band: string;
  foreign_doe_registered: boolean;
  gov_ministry: string;
  gov_grade: string;
  gov_posting_district: string;
  gov_service_entry_year: string;
  student_institution: string;
  student_level: string;
  student_field_of_study: string;
  student_abroad: boolean;
}

export const SYNC_STATUSES: SyncStatus[] = [
  "synced", "pending", "failed",
];

export const SEXES: Sex[] = ["MALE", "FEMALE", "OTHER"];

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
  employment: EmploymentData;
}
