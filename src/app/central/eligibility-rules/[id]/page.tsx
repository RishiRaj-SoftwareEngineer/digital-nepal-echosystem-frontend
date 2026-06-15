"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import rulesData from "../../../../../data/eligibility-rules.json";

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

const STORAGE_KEY = "eligibility_rules_state";

export default function RuleDetailPage() {
  const params = useParams();
  const ruleId = params.id as string;

  /* Load rules (no useEffect, no state = no lint issues) */
  const stored =
    typeof window !== "undefined"
      ? localStorage.getItem(STORAGE_KEY)
      : null;

  const allRules: Rule[] = stored
    ? JSON.parse(stored)
    : (rulesData as Rule[]);

  const rule = allRules.find((r) => r.id === ruleId);

  if (!rule) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold text-red-600">
          Rule not found
        </h2>

        <Link
          href="/central/eligibility-rules"
          className="text-blue-600 underline"
        >
          Back to Rules
        </Link>
      </div>
    );
  }

  /* FORMAT CONDITION */
  const formatCondition = (
    condition: Record<string, unknown>
  ): string[] => {
    const lines: string[] = [];

    const field = condition.field;
    const operator = condition.operator;
    const value = condition.value;

    if (field && operator && value !== undefined) {
      lines.push(`${field} ${operator} ${value}`);
    }

    const andCondition = condition.and as
      | Record<string, unknown>
      | undefined;

    if (andCondition) {
      const af = andCondition.field;
      const ao = andCondition.operator;
      const av = andCondition.value;

      if (af && ao && av !== undefined) {
        lines.push(`${af} ${ao} ${av}`);
      }
    }

    return lines;
  };

  /* FORMAT BENEFIT */
  const formatBenefit = (
    benefit: Record<string, unknown>
  ): string[] => {
    const lines: string[] = [];

    if (benefit.card_type) {
      lines.push(`Card Type: ${benefit.card_type}`);
    }

    if (benefit.amount) {
      lines.push(`Amount: NPR ${benefit.amount}`);
    }

    if (benefit.frequency) {
      lines.push(`Frequency: ${benefit.frequency}`);
    }

    return lines;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-900">
      {/* Back */}
      <div className="mb-6">
        <Link
          href="/central/eligibility-rules"
          className="text-blue-600 hover:underline"
        >
          ← Back to Rules
        </Link>
      </div>

      {/* HEADER */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">
          {rule.rule_name}
        </h1>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">
              Benefit Type
            </p>
            <p className="font-medium">
              {rule.benefit_type}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Priority
            </p>
            <p className="font-medium">
              {rule.priority}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Status
            </p>

            <span
              className={`inline-block px-3 py-1 rounded text-white text-sm ${
                rule.is_active
                  ? "bg-green-600"
                  : "bg-gray-500"
              }`}
            >
              {rule.is_active ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
      </div>

      {/* CONDITION */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">
          Condition
        </h2>

        <div className="space-y-2">
          {formatCondition(
            rule.condition_expression
          ).map((item, i) => (
            <p key={i}>{item}</p>
          ))}
        </div>
      </div>

      {/* BENEFIT */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">
          Benefit
        </h2>

        <div className="space-y-2">
          {formatBenefit(rule.benefit_value).map(
            (item, i) => (
              <p key={i}>{item}</p>
            )
          )}
        </div>
      </div>

      {/* HISTORY */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">
          Change History
        </h2>

        <div className="space-y-3">
          <div className="border-b pb-2">
            <p className="font-medium">
              Created by Central Admin
            </p>
            <p className="text-sm text-gray-500">
              2026-06-01 09:15 AM
            </p>
          </div>

          <div className="border-b pb-2">
            <p className="font-medium">
              Priority Updated
            </p>
            <p className="text-sm text-gray-500">
              2026-06-03 11:30 AM
            </p>
          </div>

          <div>
            <p className="font-medium">
              Status Changed
            </p>
            <p className="text-sm text-gray-500">
              2026-06-05 02:45 PM
            </p>
          </div>
        </div>
      </div>

      {/* AFFECTED CITIZENS */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">
          Affected Citizens
        </h2>

        <p className="text-3xl font-bold text-blue-600">
          12,450
        </p>

        <p className="text-sm text-gray-500 mt-2">
          Estimated citizens matching this rule.
        </p>
      </div>
    </div>
  );
}