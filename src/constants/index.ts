export const WARD_ID = "ward-004";

export const SYNC_BADGE: Record<string, string> = {
  synced: "bg-emerald-100 text-emerald-800",
  pending: "bg-amber-100 text-amber-800",
  failed: "bg-red-100 text-red-800",
};

export const STEP_LABELS = ["Core Identity", "Family Tree", "Employment"];

export const BLOOD_GROUP_LABELS: Record<string, string> = {
  A_POS: "A+",
  A_NEG: "A-",
  B_POS: "B+",
  B_NEG: "B-",
  AB_POS: "AB+",
  AB_NEG: "AB-",
  O_POS: "O+",
  O_NEG: "O-",
};

export const CONSENT_CHANNEL_LABELS: Record<string, string> = {
  WARD_OFFICE: "Ward Office",
  FIELD: "Field Visit",
  PORTAL: "Online Portal",
  VERBAL_WITNESS: "Verbal Witness",
  OTHER: "Other",
};

export const EMPLOYMENT_CATEGORY_LABELS: Record<string, string> = {
  FARMER: "Farmer",
  GOVERNMENT: "Government Employee",
  PRIVATE: "Private Sector Employee",
  BUSINESS: "Business / Self-Employed",
  STUDENT: "Student",
  UNEMPLOYED: "Unemployed",
  FOREIGN_ABROAD: "Foreign Employment / Abroad",
  HOMEMAKER: "Homemaker",
  RETIRED: "Retired",
  OTHER: "Other",
};

export const INCOME_BAND_LABELS: Record<string, string> = {
  UNDER_5K: "Under NPR 5,000",
  "5K_10K": "NPR 5,000 – 10,000", 
  "10K_25K": "NPR 10,000 – 25,000",
  "25K_50K": "NPR 25,000 – 50,000",
  "50K_100K": "NPR 50,000 – 100,000",
  OVER_100K: "Over NPR 100,000",
};

export const VISA_TYPE_LABELS: Record<string, string> = {
  WORK_PERMIT: "Work Permit",
  STUDENT_VISA: "Student Visa",
  DEPENDENT_VISA: "Dependent Visa",
  DIPLOMATIC: "Diplomatic",
  TOURIST: "Tourist",
  OTHER: "Other",
};

export const LAND_TYPE_LABELS: Record<string, string> = {
  OWNED: "Owned",
  LEASED: "Leased",
  SHARED: "Shared / Cooperative",
  OTHER: "Other",
};

export const IRRIGATION_TYPE_LABELS: Record<string, string> = {
  CANAL: "Canal",
  TUBEWELL: "Tubewell",
  RAINFED: "Rainfed",
  DRIP: "Drip Irrigation",
  SPRINKLER: "Sprinkler",
  OTHER: "Other",
};

export const REMITTANCE_BAND_LABELS: Record<string, string> = {
  UNDER_10K: "Under NPR 10,000",
  "10K_25K": "NPR 10,000 – 25,000",
  "25K_50K": "NPR 25,000 – 50,000",
  "50K_100K": "NPR 50,000 – 100,000",
  OVER_100K: "Over NPR 100,000",
};

export const GOV_GRADE_LABELS: Record<string, string> = {
  GAZETTED: "Gazetted",
  NON_GAZETTED: "Non-Gazetted",
};

export const STUDENT_LEVEL_LABELS: Record<string, string> = {
  PRIMARY: "Primary (1-5)",
  LOWER_SECONDARY: "Lower Secondary (6-8)",
  SECONDARY: "Secondary (9-10)",
  HIGHER_SECONDARY: "Higher Secondary (11-12)",
  BACHELORS: "Bachelor's",
  MASTERS: "Master's",
  PHD: "PhD / Doctorate",
  OTHER: "Other",
};

export const COUNTRY_OPTIONS = [
  { value: "AE", label: "United Arab Emirates" },
  { value: "SA", label: "Saudi Arabia" },
  { value: "QA", label: "Qatar" },
  { value: "KW", label: "Kuwait" },
  { value: "OM", label: "Oman" },
  { value: "BH", label: "Bahrain" },
  { value: "MY", label: "Malaysia" },
  { value: "KR", label: "South Korea" },
  { value: "JP", label: "Japan" },
  { value: "US", label: "United States" },
  { value: "GB", label: "United Kingdom" },
  { value: "AU", label: "Australia" },
  { value: "CA", label: "Canada" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "IT", label: "Italy" },
  { value: "IL", label: "Israel" },
  { value: "CN", label: "China" },
  { value: "IN", label: "India" },
  { value: "NP", label: "Nepal" },
  { value: "TH", label: "Thailand" },
  { value: "SG", label: "Singapore" },
  { value: "NZ", label: "New Zealand" },
  { value: "OTHER", label: "Other Country" },
];

export const SKILL_OPTIONS = [
  { value: "carpentry", label: "Carpentry" },
  { value: "plumbing", label: "Plumbing" },
  { value: "electrical", label: "Electrical" },
  { value: "welding", label: "Welding" },
  { value: "masonry", label: "Masonry" },
  { value: "driving", label: "Driving" },
  { value: "tailoring", label: "Tailoring / Sewing" },
  { value: "cooking", label: "Cooking / Catering" },
  { value: "farming", label: "Farming / Agriculture" },
  { value: "teaching", label: "Teaching / Tutoring" },
  { value: "nursing", label: "Nursing / Health Care" },
  { value: "it", label: "IT / Computer Skills" },
  { value: "accounting", label: "Accounting / Bookkeeping" },
  { value: "construction", label: "Construction / Labor" },
  { value: "hospitality", label: "Hospitality / Tourism" },
  { value: "other", label: "Other Skill" },
];
