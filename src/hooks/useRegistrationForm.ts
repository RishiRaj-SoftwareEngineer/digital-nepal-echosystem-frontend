'use client';
import { useState, useCallback } from 'react';
import type {
  RegistrationFormData,
  FamilyMember,
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

  const updateConsentTimestamp = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      consent_recorded_at: new Date().toISOString(),
    }));
  }, []);

  const nextStep = useCallback(() => {
    setStep((s) => Math.min(s + 1, 2));
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
    nextStep,
    prevStep,
    resetForm,
  };
}
