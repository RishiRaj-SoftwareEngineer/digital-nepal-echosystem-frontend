import type { FamilyMember } from "@/types/citizen";

type FamilyMemberCardProps = {
  member: FamilyMember;
  onChange: (updates: Partial<FamilyMember>) => void;
  onRemove: () => void;
  showRemove?: boolean;
};

export function FamilyMemberCard({
  member,
  onChange,
  onRemove,
  showRemove,
}: FamilyMemberCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 relative">
      {showRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-sm"
        >
          ✕
        </button>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Name (Nepali)
          </label>
          <input
            type="text"
            value={member.name_np}
            onChange={(e) => onChange({ name_np: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Name (English)
          </label>
          <input
            type="text"
            value={member.name_en}
            onChange={(e) => onChange({ name_en: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Citizenship Number
          </label>
          <input
            type="text"
            value={member.citizenship_number}
            onChange={(e) => onChange({ citizenship_number: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
