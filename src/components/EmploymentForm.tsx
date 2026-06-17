'use client';

import type { EmploymentData } from '@/types/citizen';
import {
  EMPLOYMENT_CATEGORIES,
  INCOME_BANDS,
} from '@/types/citizen';
import {
  EMPLOYMENT_CATEGORY_LABELS,
  INCOME_BAND_LABELS,
  VISA_TYPE_LABELS,
  LAND_TYPE_LABELS,
  IRRIGATION_TYPE_LABELS,
  REMITTANCE_BAND_LABELS,
  GOV_GRADE_LABELS,
  STUDENT_LEVEL_LABELS,
  COUNTRY_OPTIONS,
  SKILL_OPTIONS,
} from '@/constants';
import { SectionCard, FormRow, InputField, SelectField } from '@/components/ui';

type EmploymentFormProps = {
  employment: EmploymentData;
  onChange: <K extends keyof EmploymentData>(key: K, value: EmploymentData[K]) => void;
};

export function EmploymentForm({ employment, onChange }: EmploymentFormProps) {
  const cat = employment.category;

  return (
    <div>
      <SectionCard
        title="Employment Information"
        description="Select employment category and provide relevant details"
      >
        <FormRow>
          <SelectField
            label="Employment Category"
            value={employment.category}
            onChange={(v) => onChange('category', v as EmploymentData['category'])}
            options={EMPLOYMENT_CATEGORIES.map((c) => ({
              value: c,
              label: EMPLOYMENT_CATEGORY_LABELS[c] || c,
            }))}
            required
          />
          <SelectField
            label="Monthly Income Band"
            value={employment.income_band}
            onChange={(v) => onChange('income_band', v as EmploymentData['income_band'])}
            options={INCOME_BANDS.map((b) => ({
              value: b,
              label: INCOME_BAND_LABELS[b] || b,
            }))}
            required
          />
        </FormRow>
      </SectionCard>

      {cat === 'UNEMPLOYED' && (
        <SectionCard title="Unemployed Details" description="Additional information for unemployed citizens">
          <FormRow>
            <InputField
              label="Duration of Unemployment (months)"
              value={String(employment.unemployed_duration_months || '')}
              onChange={(v) => onChange('unemployed_duration_months', Number(v) || 0)}
              placeholder="e.g. 6"
              type="number"
            />
          </FormRow>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {SKILL_OPTIONS.map((skill) => {
                const selected = employment.unemployed_skills.includes(skill.value);
                return (
                  <label
                    key={skill.value}
                    className={`flex items-center gap-2 px-3 py-2 border rounded-lg text-sm cursor-pointer transition-colors ${
                      selected
                        ? 'border-blue-400 bg-blue-50 text-blue-800'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => {
                        const next = selected
                          ? employment.unemployed_skills.filter((s) => s !== skill.value)
                          : [...employment.unemployed_skills, skill.value];
                        onChange('unemployed_skills', next);
                      }}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    {skill.label}
                  </label>
                );
              })}
            </div>
          </div>
          <div>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={employment.unemployed_office_registered}
                onChange={(e) => onChange('unemployed_office_registered', e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                Registered with Employment Office
              </span>
            </label>
          </div>
        </SectionCard>
      )}

      {cat === 'FARMER' && (
        <SectionCard title="Farmer Details" description="Agricultural information">
          <FormRow>
            <InputField
              label="Land Area (Ropani)"
              value={employment.farmer_land_area_ropani}
              onChange={(v) => onChange('farmer_land_area_ropani', v)}
              placeholder="e.g. 5.5"
            />
            <SelectField
              label="Land Type"
              value={employment.farmer_land_type}
              onChange={(v) => onChange('farmer_land_type', v)}
              options={Object.entries(LAND_TYPE_LABELS).map(([value, label]) => ({
                value,
                label,
              }))}
            />
            <InputField
              label="Primary Crop"
              value={employment.farmer_primary_crop}
              onChange={(v) => onChange('farmer_primary_crop', v)}
              placeholder="e.g. Rice, Wheat"
            />
          </FormRow>
          <FormRow>
            <SelectField
              label="Irrigation Type"
              value={employment.farmer_irrigation_type}
              onChange={(v) => onChange('farmer_irrigation_type', v)}
              options={Object.entries(IRRIGATION_TYPE_LABELS).map(([value, label]) => ({
                value,
                label,
              }))}
            />
            <div>
              <label className="inline-flex items-center gap-2 mt-6 cursor-pointer">
                <input
                  type="checkbox"
                  checked={employment.farmer_agri_loan}
                  onChange={(e) => onChange('farmer_agri_loan', e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  Has Agricultural Loan
                </span>
              </label>
            </div>
          </FormRow>
        </SectionCard>
      )}

      {cat === 'FOREIGN_ABROAD' && (
        <SectionCard title="Foreign Employment Details" description="Information about employment abroad">
          <FormRow>
            <SelectField
              label="Country"
              value={employment.foreign_country}
              onChange={(v) => onChange('foreign_country', v)}
              options={COUNTRY_OPTIONS.map((c) => ({ value: c.value, label: c.label }))}
            />
            <SelectField
              label="Visa Type"
              value={employment.foreign_visa_type}
              onChange={(v) => onChange('foreign_visa_type', v)}
              options={Object.entries(VISA_TYPE_LABELS).map(([value, label]) => ({
                value,
                label,
              }))}
            />
            <InputField
              label="Employer Name"
              value={employment.foreign_employer_name}
              onChange={(v) => onChange('foreign_employer_name', v)}
              placeholder="Name of employer"
            />
          </FormRow>
          <FormRow>
            <InputField
              label="Departure Date"
              value={employment.foreign_departure_date}
              onChange={(v) => onChange('foreign_departure_date', v)}
              type="date"
            />
            <InputField
              label="Expected Return Date"
              value={employment.foreign_expected_return}
              onChange={(v) => onChange('foreign_expected_return', v)}
              type="date"
            />
            <SelectField
              label="Monthly Remittance Band"
              value={employment.foreign_remittance_band}
              onChange={(v) => onChange('foreign_remittance_band', v)}
              options={Object.entries(REMITTANCE_BAND_LABELS).map(([value, label]) => ({
                value,
                label,
              }))}
            />
          </FormRow>
          <div>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={employment.foreign_doe_registered}
                onChange={(e) => onChange('foreign_doe_registered', e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                Registered with Department of Employment (DOE)
              </span>
            </label>
          </div>
        </SectionCard>
      )}

      {cat === 'GOVERNMENT' && (
        <SectionCard title="Government Employment Details" description="Service information">
          <FormRow>
            <InputField
              label="Ministry / Department"
              value={employment.gov_ministry}
              onChange={(v) => onChange('gov_ministry', v)}
              placeholder="e.g. Ministry of Education"
            />
            <SelectField
              label="Grade"
              value={employment.gov_grade}
              onChange={(v) => onChange('gov_grade', v)}
              options={Object.entries(GOV_GRADE_LABELS).map(([value, label]) => ({
                value,
                label,
              }))}
            />
            <InputField
              label="Posting District"
              value={employment.gov_posting_district}
              onChange={(v) => onChange('gov_posting_district', v)}
              placeholder="e.g. Kathmandu"
            />
          </FormRow>
          <FormRow>
            <InputField
              label="Service Entry Year"
              value={employment.gov_service_entry_year}
              onChange={(v) => onChange('gov_service_entry_year', v)}
              placeholder="e.g. 2075"
            />
          </FormRow>
        </SectionCard>
      )}

      

      {cat === 'STUDENT' && (
        <SectionCard title="Student Details" description="Educational information">
          <FormRow>
            <InputField
              label="Institution Name"
              value={employment.student_institution}
              onChange={(v) => onChange('student_institution', v)}
              placeholder="e.g. Tribhuvan University"
            />
            <SelectField
              label="Level"
              value={employment.student_level}
              onChange={(v) => onChange('student_level', v)}
              options={Object.entries(STUDENT_LEVEL_LABELS).map(([value, label]) => ({
                value,
                label,
              }))}
            />
            <InputField
              label="Field of Study"
              value={employment.student_field_of_study}
              onChange={(v) => onChange('student_field_of_study', v)}
              placeholder="e.g. Engineering"
            />
          </FormRow>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Study Location
            </label>
            <div className="flex gap-4">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="student_abroad"
                  checked={!employment.student_abroad}
                  onChange={() => onChange('student_abroad', false)}
                  className="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Within Nepal</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="student_abroad"
                  checked={employment.student_abroad}
                  onChange={() => onChange('student_abroad', true)}
                  className="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Abroad</span>
              </label>
            </div>
          </div>
        </SectionCard>
      )}
    </div>
  );
}
