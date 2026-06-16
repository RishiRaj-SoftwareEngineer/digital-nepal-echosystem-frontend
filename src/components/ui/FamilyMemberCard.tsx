'use client';
import type { FamilyMember } from '@/types/citizen';
import { classNames } from '@/utils';
import InputField from './InputField';

export default function FamilyMemberCard({
  member,
  onChange,
  onRemove,
  showRemove,
}: {
  member: FamilyMember;
  onChange: (updates: Partial<FamilyMember>) => void;
  onRemove?: () => void;
  showRemove?: boolean;
}) {
  return (
    <div className="border border-gray-200 rounded-xl p-4 relative">
      {showRemove && onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-2 right-2 text-gray-400 hover:text-red-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <InputField
          label="Name (Nepali)"
          value={member.name_np}
          onChange={(v) => onChange({ name_np: v })}
          placeholder="नेपाली अक्षरमा नाम"
        />
        <InputField
          label="Name (English)"
          value={member.name_en}
          onChange={(v) => onChange({ name_en: v })}
          placeholder="Full name in English"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Citizenship No.
          </label>
          <input
            type="text"
            value={member.citizenship_number}
            onChange={(e) => {
              const cleaned = e.target.value.replace(/[-/]/g, '');
              onChange({ citizenship_number: cleaned });
            }}
            placeholder="XX-XX-XXXXX"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden text-ellipsis whitespace-nowrap"
          />
        </div>
      </div>
      <div className="mt-2">
        <span
          className={classNames(
            'inline-block px-2.5 py-0.5 rounded-full text-xs font-medium',
            member.link_status === 'linked'
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-amber-100 text-amber-800',
          )}
        >
          {member.link_status === 'linked' ? 'Linked' : 'Pending'}
        </span>
        {member.link_status === 'linked' && (
          <span className="text-xs text-emerald-700 ml-2">
            Auto-linked via citizenship record
          </span>
        )}
      </div>
    </div>
  );
}
