"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import rulesData from "../../../../data/eligibility-rules.json";

/* types */
type Rule = {
  id: string;
  rule_name: string;
  benefit_type: string;
  condition_expression: Record<string, unknown>;
  benefit_value: Record<string, unknown>;
  priority: number;
  is_active: boolean;
};

/* storage key */
const STORAGE_KEY = "eligibility_rules_state";

export default function Page() {
  /* FIX: initialize directly (removes setState-in-useEffect lint error) */
  const [data, setData] = useState<Rule[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored) as Rule[];
    }
    return rulesData as Rule[];
  });

  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [showModal, setShowModal] = useState(false);

  /* save state */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  /* toggle */
  const handleToggleClick = (rule: Rule) => {
    setSelectedRule(rule);
    setShowModal(true);
  };

  const confirmToggle = () => {
    if (!selectedRule) return;

    setData((prev) =>
      prev.map((r) =>
        r.id === selectedRule.id
          ? { ...r, is_active: !r.is_active }
          : r
      )
    );

    setShowModal(false);
    setSelectedRule(null);
  };

  /* priority up */
  const moveUp = (index: number) => {
    if (index === 0) return;

    setData((prev) => {
      const arr = [...prev];
      [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];

      return arr.map((r, i) => ({
        ...r,
        priority: i + 1,
      }));
    });
  };

  /* priority down */
  const moveDown = (index: number) => {
    setData((prev) => {
      if (index === prev.length - 1) return prev;

      const arr = [...prev];
      [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];

      return arr.map((r, i) => ({
        ...r,
        priority: i + 1,
      }));
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-900">
      <h1 className="text-2xl font-bold mb-6">
        Eligibility Rules
      </h1>

      {/* TABLE */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Rule</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Priority</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((rule, index) => (
              <tr key={rule.id} className="border-t">

                {/* Rule */}
                <td className="p-3 font-medium">
                  {rule.rule_name}
                </td>

                {/* Type */}
                <td className="p-3">
                  {rule.benefit_type}
                </td>

                {/* Priority */}
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    {rule.priority}

                    <div className="flex flex-col text-xs">
                      <button onClick={() => moveUp(index)}>
                        ▲
                      </button>
                      <button onClick={() => moveDown(index)}>
                        ▼
                      </button>
                    </div>
                  </div>
                </td>

                {/* Status */}
                <td className="p-3">
                  <button
                    onClick={() => handleToggleClick(rule)}
                    className={`px-3 py-1 rounded text-white text-sm ${
                      rule.is_active
                        ? "bg-green-600"
                        : "bg-gray-500"
                    }`}
                  >
                    {rule.is_active
                      ? "Active"
                      : "Inactive"}
                  </button>
                </td>

                {/* View */}
                <td className="p-3 text-blue-600 hover:underline">
                  <Link
                    href={`/central/eligibility-rules/${rule.id}`}
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && selectedRule && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-[420px]">

            <p className="mb-4">
              {selectedRule.is_active
                ? `Disabling this rule will stop automatic eligibility detection for ${selectedRule.benefit_type}. Confirm?`
                : `Enabling this rule will allow automatic eligibility detection for ${selectedRule.benefit_type}. Confirm?`}
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                onClick={confirmToggle}
                className="bg-blue-600 text-white px-4 py-2"
              >
                Confirm
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}