"use client";

import { useMemo, useState } from "react";
import logs from "../../../../data/audit-log.json";

/* ================= COLORS ================= */
const eventColors: Record<string, string> = {
  REGISTERED: "bg-green-100 text-green-800",
  UPDATED: "bg-blue-100 text-blue-800",
  APPROVED: "bg-teal-100 text-teal-800",
  REJECTED: "bg-red-100 text-red-800",
  CONFLICT_RESOLVED: "bg-orange-100 text-orange-800",
  ID_CARD_ISSUED: "bg-purple-100 text-purple-800",
  DATA_PURGED: "bg-gray-100 text-gray-800",
  PASSWORD_RESET: "bg-amber-100 text-amber-800",
};

const roleColors: Record<string, string> = {
  CENTRAL_ADMIN: "bg-purple-100 text-purple-800",
  PROVINCE_ADMIN: "bg-blue-100 text-blue-800",
  MUNICIPAL_ADMIN: "bg-green-100 text-green-800",
  WARD_ADMIN: "bg-orange-100 text-orange-800",
};

const maskCitizenId = (id: string) => `${id.slice(0, 8)}****`;

/* ================= COMPONENT ================= */
export default function AuditLogPage() {
  const [eventType, setEventType] = useState("");
  const [province, setProvince] = useState("");
  const [role, setRole] = useState("");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 20;

  /* ================= FILTER LOGIC ================= */
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchEvent =
        !eventType || log.event_type === eventType;

      const matchProvince =
        !province ||
        log.jurisdiction
          .toLowerCase()
          .includes(province.toLowerCase());

      const matchRole =
        !role || log.acted_by_role === role;

      const logTime = new Date(log.timestamp).getTime();
      const from = fromDate ? new Date(fromDate).getTime() : null;
      const to = toDate ? new Date(toDate).getTime() : null;

      const matchDate =
        (!from || logTime >= from) &&
        (!to || logTime <= to);

      return matchEvent && matchProvince && matchRole && matchDate;
    });
  }, [eventType, province, role, fromDate, toDate]);

  const totalPages = Math.ceil(filteredLogs.length / pageSize);

  const paginatedLogs = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredLogs.slice(start, start + pageSize);
  }, [filteredLogs, page]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-900">

      {/* HEADER */}
      <h1 className="mb-6 text-2xl font-bold">
        Audit Log Viewer
      </h1>

      {/* FILTERS */}
      <div className="mb-6 rounded-lg bg-white p-4 shadow">
        <div className="grid gap-4 md:grid-cols-5">

          {/* EVENT TYPE */}
          <div>
            <label
              htmlFor="eventType"
              className="mb-1 block text-sm font-medium"
            >
              Event Type
            </label>

            <select
              id="eventType"
              value={eventType}
              onChange={(e) => {
                setEventType(e.target.value);
                setPage(1);
              }}
              className="w-full rounded border p-2"
            >
              <option value="">All Events</option>
              {Object.keys(eventColors).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>

          {/* PROVINCE */}
          <div>
            <label
              htmlFor="province"
              className="mb-1 block text-sm font-medium"
            >
              Province
            </label>

            <input
              id="province"
              value={province}
              onChange={(e) => {
                setProvince(e.target.value);
                setPage(1);
              }}
              className="w-full rounded border p-2"
              placeholder="Filter by province"
            />
          </div>

          {/* ROLE */}
          <div>
            <label
              htmlFor="role"
              className="mb-1 block text-sm font-medium"
            >
              Role
            </label>

            <select
              id="role"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setPage(1);
              }}
              className="w-full rounded border p-2"
            >
              <option value="">All Roles</option>
              {Object.keys(roleColors).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>

          {/* FROM DATE */}
          <div>
            <label
              htmlFor="fromDate"
              className="mb-1 block text-sm font-medium"
            >
              From Date
            </label>

            <input
              id="fromDate"
              type="date"
              value={fromDate}
              onChange={(e) => {
                setFromDate(e.target.value);
                setPage(1);
              }}
              className="w-full rounded border p-2"
            />
          </div>

          {/* TO DATE */}
          <div>
            <label
              htmlFor="toDate"
              className="mb-1 block text-sm font-medium"
            >
              To Date
            </label>

            <input
              id="toDate"
              type="date"
              value={toDate}
              onChange={(e) => {
                setToDate(e.target.value);
                setPage(1);
              }}
              className="w-full rounded border p-2"
            />
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Event</th>
              <th className="p-3 text-left">Citizen ID</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Jurisdiction</th>
              <th className="p-3 text-left">Timestamp</th>
            </tr>
          </thead>

          <tbody>
            {paginatedLogs.map((log) => (
              <tr key={log.id} className="border-t">
                <td className="p-3">
                  <span
                    className={`rounded px-2 py-1 text-sm font-medium ${
                      eventColors[log.event_type]
                    }`}
                  >
                    {log.event_type}
                  </span>
                </td>

                <td className="p-3">
                  {maskCitizenId(log.citizen_id)}
                </td>

                <td className="p-3">
                  <span
                    className={`rounded px-2 py-1 text-sm font-medium ${
                      roleColors[log.acted_by_role]
                    }`}
                  >
                    {log.acted_by_role}
                  </span>
                </td>

                <td className="p-3">{log.jurisdiction}</td>

                <td className="p-3">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="rounded border px-3 py-1 disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="rounded border px-3 py-1 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
