'use client';

import { useState } from 'react';
import syncBatchesData from '../../../../data/sync-batches.json';

interface SyncBatch {
  batch_id: string;
  ward_id: string;
  status: 'COMPLETED' | 'PROCESSING' | 'FAILED' | 'PENDING';
  record_count: number;
  conflict_count: number;
  submitted_at: string;
  completed_at: string | null;
}

export default function SyncStatusPage() {
  const [syncBatches] = useState<SyncBatch[]>(syncBatchesData as SyncBatch[]);


  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'PROCESSING':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'FAILED':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'PENDING':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Sync Status</h1>
        <p className="text-gray-500 mt-1">Ward data synchronization across devices</p>
      </div>


      {/* Sync Batch History */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Sync Batch History</h2>
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-6 py-4 text-left font-medium text-gray-600">Batch ID</th>
                <th className="px-6 py-4 text-left font-medium text-gray-600">Ward ID</th>
                <th className="px-6 py-4 text-left font-medium text-gray-600">Submitted At</th>
                <th className="px-6 py-4 text-left font-medium text-gray-600">Completed At</th>
                <th className="px-6 py-4 text-left font-medium text-gray-600">Records</th>
                <th className="px-6 py-4 text-left font-medium text-gray-600">Conflicts</th>
                <th className="px-6 py-4 text-left font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {syncBatches.map((batch) => (
                <tr key={batch.batch_id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-5 font-mono text-sm text-gray-600 font-medium">{batch.batch_id}</td>
                  <td className="px-6 py-5 text-gray-600">{batch.ward_id}</td>
                  <td className="px-6 py-5 text-gray-600">
                    {formatDateTime(batch.submitted_at)}
                  </td>
                  <td className="px-6 py-5 text-gray-600">
                    {batch.completed_at ? formatDateTime(batch.completed_at) : '—'}
                  </td>
                  <td className="px-6 py-5 font-medium text-gray-600">{batch.record_count}</td>
                  <td className="px-6 py-5 font-medium text-red-600">
                    {batch.conflict_count}
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${getStatusBadge(batch.status)}`}>
                      {batch.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 flex gap-4">
        <button className="px-6 py-3 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 font-medium transition">
          Resolve Conflicts
        </button>
        <button className="px-6 py-3 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 font-medium transition">
          Force Full Sync
        </button>
      </div>
    </div>
  );
}
