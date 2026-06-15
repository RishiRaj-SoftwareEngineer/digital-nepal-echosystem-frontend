"use client";

import Link from "next/link";
import { Add, Search } from "@mui/icons-material";
import { useCitizensFilter } from "@/hooks/useCitizensFilter";
import { EMPLOYMENT_CATEGORIES, SYNC_STATUSES, SEXES } from "@/types/citizen";
import { SYNC_BADGE } from "@/constants";

export default function CitizensPage() {
  const {
    filtered,
    search,
    setSearch,
    nidSearch,
    setNidSearch,
    employmentFilter,
    setEmploymentFilter,
    syncFilter,
    setSyncFilter,
    sexFilter,
    setSexFilter,
    verifiedFilter,
    setVerifiedFilter,
  } = useCitizensFilter();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Citizens</h2>
        <Link
          href="/ward/citizens/new"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <Add className="text-lg" />
          Register Citizen
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200">
        <div className="p-4 border-b border-gray-200 space-y-3">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-50">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search by name (NP/EN)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="text"
              placeholder="NID last 4 digits..."
              value={nidSearch}
              onChange={(e) => setNidSearch(e.target.value)}
              className="w-44 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              value={employmentFilter}
              onChange={(e) => setEmploymentFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Employment</option>
              {EMPLOYMENT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0) + cat.slice(1).toLowerCase()}
                </option>
              ))}
            </select>

            <select
              value={syncFilter}
              onChange={(e) => setSyncFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Sync Status</option>
              {SYNC_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={sexFilter}
              onChange={(e) => setSexFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Sex</option>
              {SEXES.map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0) + s.slice(1).toLowerCase()}
                </option>
              ))}
            </select>

            <select
              value={verifiedFilter}
              onChange={(e) => setVerifiedFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All NID Verification</option>
              <option value="verified">Verified</option>
              <option value="unverified">Unverified</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  Name (NP)
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  Name (EN)
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  NID
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  Employment
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  Sync Status
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr
                  key={`${c.name_en}-${c.nid_masked}`}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-gray-900">{c.name_np}</td>
                  <td className="px-4 py-3 text-gray-900">{c.name_en}</td>
                  <td className="px-4 py-3 text-gray-600 font-mono">
                    {c.nid_masked}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {c.employment_category}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        SYNC_BADGE[c.sync_status] || "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {c.sync_status.charAt(0).toUpperCase() +
                        c.sync_status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/ward/citizens/${c.nid_masked}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No citizens found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
