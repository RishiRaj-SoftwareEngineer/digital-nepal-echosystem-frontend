'use client';

import { useState, useCallback } from 'react';
import type {
  RegistrationFormData,
  FamilyMember,
  EmploymentData,
} from '@/types/citizen';
import citizensRaw from '../../data/citizens.json';
import { nanoid } from 'nanoid';

function autoLinkFamilyMember(member: FamilyMember): FamilyMember {
  if (!member.citizenship_number) {
    return { ...member, link_status: 'pending' };
  }
  const matched = (citizensRaw as Array<{ citizenship_number?: string }>).some(
    (c) => c.citizenship_number === member.citizenship_number,
  );
  return { ...member, link_status: matched ? 'linked' : 'pending' };
}

const emptyFamilyMember = (
  relationship: FamilyMember['relationship'],
): FamilyMember => ({
  id: nanoid(),
  relationship,
  name_np: '',
  name_en: '',
  citizenship_number: '',
  link_status: 'pending',
});

export function createDefaultEmploymentData(): EmploymentData {
  return {
    category: '',
    income_band: '',
    unemployed_duration_months: 0,
    unemployed_skills: [],
    unemployed_office_registered: false,
    farmer_land_area_ropani: '',        
    farmer_land_type: '',
    farmer_primary_crop: '',
    farmer_irrigation_type: '',
    farmer_agri_loan: false,
    foreign_country: '',
    foreign_visa_type: '',
    foreign_employer_name: '',
    foreign_departure_date: '',
    foreign_expected_return: '',
    foreign_remittance_band: '',
    foreign_doe_registered: false,
    gov_ministry: '',
    gov_grade: '',
    gov_posting_district: '',
    gov_service_entry_year: '',
    student_institution: '',
    student_level: '',
    student_field_of_study: '',
    student_abroad: false,
  };
}

export function createDefaultFormData(): RegistrationFormData {
  return {
    name_np: '',
    name_en: '',
    dob: '',
    sex: '',
    blood_group: '',
    religion: '',
    ethnicity: '',
    mother_tongue: '',
    tole: '',
    digital_literacy: '',
    has_smartphone: false,
    nid_number: '',
    nid_verified: false,
    citizenship_number: '',
    consent_channel: '',
    consent_recorded_at: new Date().toISOString(),
    photo: null,
    father: null,
    mother: null,
    spouse: null,
    children: [],
    employment: createDefaultEmploymentData(),
  };
}

export function useRegistrationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationFormData>(
    createDefaultFormData(),
  );
  const [nidVerifyLoading, setNidVerifyLoading] = useState(false);
  const [nidVerifyError, setNidVerifyError] = useState('');

  const updateField = useCallback(
    <K extends keyof RegistrationFormData>(
      key: K,
      value: RegistrationFormData[K],
    ) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const verifyNid = useCallback(async () => {
    const nid = formData.nid_number.trim();
    if (nid.length !== 10 || !/^\d{10}$/.test(nid)) {
      setNidVerifyError('NID must be exactly 10 digits');
      return;
    }
    setNidVerifyLoading(true);
    setNidVerifyError('');
    await new Promise((r) => setTimeout(r, 800));
    setNidVerifyLoading(false);
    setFormData((prev) => ({ ...prev, nid_verified: true }));
  }, [formData.nid_number]);

  const sanitizeCitizenship = useCallback((value: string) => {
    const cleaned = value.replace(/[-/]/g, '');
    setFormData((prev) => ({ ...prev, citizenship_number: cleaned }));
  }, []);

  const setFather = useCallback((member: FamilyMember | null) => {
    setFormData((prev) => ({
      ...prev,
      father: member ? autoLinkFamilyMember(member) : null,
    }));
  }, []);

  const setMother = useCallback((member: FamilyMember | null) => {
    setFormData((prev) => ({
      ...prev,
      mother: member ? autoLinkFamilyMember(member) : null,
    }));
  }, []);

  const setSpouse = useCallback((member: FamilyMember | null) => {
    setFormData((prev) => ({
      ...prev,
      spouse: member ? autoLinkFamilyMember(member) : null,
    }));
  }, []);

  const addChild = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      children: [...prev.children, emptyFamilyMember('CHILD')],
    }));
  }, []);

  const updateChild = useCallback(
    (index: number, updates: Partial<FamilyMember>) => {
      setFormData((prev) => {
        const children = [...prev.children];
        const merged = { ...children[index], ...updates } as FamilyMember;
        children[index] = autoLinkFamilyMember(merged);
        return { ...prev, children };
      });
    },
    [],
  );

  const removeChild = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      children: prev.children.filter((_, i) => i !== index),
    }));
  }, []);

  const updateEmploymentField = useCallback(
    <K extends keyof EmploymentData>(key: K, value: EmploymentData[K]) => {
      setFormData((prev) => ({
        ...prev,
        employment: { ...prev.employment, [key]: value },
      }));
    },
    [],
  );

  const updateConsentTimestamp = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      consent_recorded_at: new Date().toISOString(),
    }));
  }, []);

  const nextStep = useCallback(() => {
    setStep((s) => Math.min(s + 1, 3));
  }, []);

  const prevStep = useCallback(() => {
    setStep((s) => Math.max(s - 1, 1));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(createDefaultFormData());
    setStep(1);
    setNidVerifyError('');
  }, []);

  return {
    step,
    formData,
    setFormData,
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
    updateEmploymentField,
    nextStep,
    prevStep,
    resetForm,
  };
}
