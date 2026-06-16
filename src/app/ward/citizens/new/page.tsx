'use client';

import { useRegistrationForm } from '@/hooks/useRegistrationForm';
import { WARD_ID, BLOOD_GROUP_LABELS, CONSENT_CHANNEL_LABELS } from '@/constants';
import type { FamilyMember, Sex, BloodGroup, DigitalLiteracy, ConsentChannel } from '@/types/citizen';
import {
  SEXES,
  BLOOD_GROUPS,
  DIGITAL_LITERACIES,
  CONSENT_CHANNELS,
} from '@/types/citizen';
import { classNames } from '@/utils';
import { InputField, SelectField, StepIndicator, SectionCard, FormRow, FamilyMemberCard } from '@/components/ui';

export default function NewCitizenPage() {
  const {
    step,
    formData,
    updateField,
    nidVerifyLoading,
    nidVerifyError,
    verifyNid,
    sanitizeCitizenship,
    setFather,
    setMother,
    setSpouse,
    addChild,
    updateChild,
    removeChild,
    updateConsentTimestamp,
    nextStep,
    prevStep,
    resetForm,
  } = useRegistrationForm();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Register New Citizen
          </h2>
          <p className="text-sm text-gray-500 mt-1">Ward {WARD_ID}</p>
        </div>
      </div>

      <StepIndicator currentStep={step} />

      {step === 1 && (
        <div>
          <SectionCard
            title="Core Identity"
            description="Basic personal information of the citizen"
          >
            <FormRow>
              <InputField
                label="Name (Nepali)"
                value={formData.name_np}
                onChange={(v) => updateField('name_np', v)}
                placeholder="नेपाली अक्षरमा नाम"
                required
              />
              <InputField
                label="Name (English)"
                value={formData.name_en}
                onChange={(v) => updateField('name_en', v)}
                placeholder="Full name in English"
                required
              />
              <InputField
                label="Date of Birth"
                value={formData.dob}
                onChange={(v) => updateField('dob', v)}
                type="date"
                required
              />
            </FormRow>

            <FormRow>
              <SelectField
                label="Sex"
                value={formData.sex}
                onChange={(v) => updateField('sex', v as Sex)}
                options={SEXES.map((s) => ({
                  value: s,
                  label: s.charAt(0) + s.slice(1).toLowerCase(),
                }))}
                required
              />
              <SelectField
                label="Blood Group"
                value={formData.blood_group}
                onChange={(v) => updateField('blood_group', v as BloodGroup)}
                options={BLOOD_GROUPS.map((bg) => ({
                  value: bg,
                  label: BLOOD_GROUP_LABELS[bg] || bg,
                }))}
              />
              <InputField
                label="Religion"
                value={formData.religion}
                onChange={(v) => updateField('religion', v)}
                placeholder="e.g. Hindu, Buddhist"
              />
            </FormRow>

            <FormRow>
              <InputField
                label="Ethnicity"
                value={formData.ethnicity}
                onChange={(v) => updateField('ethnicity', v)}
                placeholder="e.g. Brahmin, Chhetri"
              />
              <InputField
                label="Mother Tongue"
                value={formData.mother_tongue}
                onChange={(v) => updateField('mother_tongue', v)}
                placeholder="e.g. Nepali"
              />
              <InputField
                label="Tole / Location"
                value={formData.tole}
                onChange={(v) => updateField('tole', v)}
                placeholder="e.g. Bhagwati Tole"
                required
              />
            </FormRow>

            <FormRow>
              <SelectField
                label="Digital Literacy"
                value={formData.digital_literacy}
                onChange={(v) => updateField('digital_literacy', v as DigitalLiteracy)}
                options={DIGITAL_LITERACIES.map((dl) => ({
                  value: dl,
                  label: dl.charAt(0) + dl.slice(1).toLowerCase(),
                }))}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Has Smartphone
                </label>
                <label className="inline-flex items-center gap-2 mt-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.has_smartphone}
                    onChange={(e) =>
                      updateField('has_smartphone', e.target.checked)
                    }
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    {formData.has_smartphone ? 'Yes' : 'No'}
                  </span>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Photo
                </label>
                <div className="mt-2">
                  <label className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Upload Photo
                    <input type="file" accept="image/*" className="hidden" />
                  </label>
                </div>
              </div>
            </FormRow>
          </SectionCard>

          <SectionCard
            title="National ID & Citizenship"
            description="Verify identity through NID and citizenship records"
          >
            <FormRow>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  NID Number
                  <span className="text-red-500 ml-0.5">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.nid_number}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                      updateField('nid_number', digits);
                      if (formData.nid_verified) {
                        updateField('nid_verified', false);
                      }
                    }}
                    placeholder="10-digit NID number"
                    maxLength={10}
                    disabled={formData.nid_verified}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500 font-mono"
                  />
                  <button
                    type="button"
                    onClick={verifyNid}
                    disabled={
                      nidVerifyLoading ||
                      formData.nid_number.length !== 10 ||
                      formData.nid_verified
                    }
                    className={classNames(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap',
                      formData.nid_verified
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500',
                    )}
                  >
                    {nidVerifyLoading ? (
                      <span className="inline-flex items-center gap-1">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Verifying...
                      </span>
                    ) : formData.nid_verified ? (
                      'Verified ✓'
                    ) : (
                      'Verify NID'
                    )}
                  </button>
                </div>
                {nidVerifyError && (
                  <p className="text-sm text-red-600 mt-1">{nidVerifyError}</p>
                )}
                {formData.nid_verified && (
                  <p className="text-sm text-emerald-700 mt-1">
                    NID verified successfully
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Citizenship Number
                </label>
                <input
                  type="text"
                  value={formData.citizenship_number}
                  onChange={(e) => sanitizeCitizenship(e.target.value)}
                  placeholder="XX-XX-XXXXX"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono overflow-hidden text-ellipsis whitespace-nowrap"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Dashes and slashes are removed automatically
                </p>
              </div>
            </FormRow>
          </SectionCard>

          <SectionCard
            title="Consent"
            description="Record consent for data collection and processing"
          >
            <FormRow>
              <SelectField
                label="Consent Channel"
                value={formData.consent_channel}
                onChange={(v) => {
                  updateField('consent_channel', v as ConsentChannel);
                  updateConsentTimestamp();
                }}
                options={CONSENT_CHANNELS.filter((cc) =>
                  ['WARD_OFFICE', 'FIELD', 'VERBAL_WITNESS'].includes(cc),
                ).map((cc) => ({
                  value: cc,
                  label: CONSENT_CHANNEL_LABELS[cc] || cc,
                }))}
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Consent Recorded At
                </label>
                <input
                  type="text"
                  value={new Date(formData.consent_recorded_at).toLocaleString()}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-600"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Auto-filled with current timestamp
                </p>
              </div>
            </FormRow>
          </SectionCard>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={nextStep}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Next: Family Tree
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <SectionCard title="Family Tree" description="Add family members of the citizen">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  Father
                </h4>
                {formData.father ? (
                  <FamilyMemberCard
                    member={formData.father}
                    onChange={(updates) => {
                      if (formData.father) {
                        setFather({ ...formData.father, ...updates } as FamilyMember);
                      }
                    }}
                    onRemove={() => setFather(null)}
                    showRemove
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      setFather({
                        id: '',
                        relationship: 'FATHER',
                        name_np: '',
                        name_en: '',
                        citizenship_number: '',
                        link_status: 'pending',
                      })
                    }
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    + Add Father
                  </button>
                )}
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  Mother
                </h4>
                {formData.mother ? (
                  <FamilyMemberCard
                    member={formData.mother}
                    onChange={(updates) => {
                      if (formData.mother) {
                        setMother({ ...formData.mother, ...updates } as FamilyMember);
                      }
                    }}
                    onRemove={() => setMother(null)}
                    showRemove
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      setMother({
                        id: '',
                        relationship: 'MOTHER',
                        name_np: '',
                        name_en: '',
                        citizenship_number: '',
                        link_status: 'pending',
                      })
                    }
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    + Add Mother
                  </button>
                )}
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  Spouse
                </h4>
                {formData.spouse ? (
                  <FamilyMemberCard
                    member={formData.spouse}
                    onChange={(updates) => {
                      if (formData.spouse) {
                        setSpouse({ ...formData.spouse, ...updates } as FamilyMember);
                      }
                    }}
                    onRemove={() => setSpouse(null)}
                    showRemove
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      setSpouse({
                        id: '',
                        relationship: 'SPOUSE',
                        name_np: '',
                        name_en: '',
                        citizenship_number: '',
                        link_status: 'pending',
                      })
                    }
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    + Add Spouse
                  </button>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                    Children
                  </h4>
                  <button
                    type="button"
                    onClick={addChild}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    + Add Child
                  </button>
                </div>
                {formData.children.length === 0 ? (
                  <p className="text-sm text-gray-400 italic">
                    No children added yet
                  </p>
                ) : (
                  <div className="space-y-3">
                    {formData.children.map((child, index) => (
                      <FamilyMemberCard
                        key={child.id}
                        member={child}
                        onChange={(updates) => updateChild(index, updates)}
                        onRemove={() => removeChild(index)}
                        showRemove
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </SectionCard>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={prevStep}
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('Citizen registered successfully! (mock)');
                  resetForm();
                }}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Register Citizen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
