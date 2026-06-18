'use client';

import { useState, useEffect } from 'react';
import grievancesData from '../../../../data/grievances.json';
import citizensData from '../../../../data/citizens.json';

interface Grievance {
  id: string;
  tracking_code: string;
  citizen_id: string;
  category: string;
  status: 'RECEIVED' | 'IN_PROGRESS' | 'RESOLVED_WARD' | 'REFERRED_JUDICIAL' | 'CLOSED';
  filed_at: string;
  escalation_level?: string;
}

export default function GrievancesPage() {
  const [grievances, setGrievances] = useState<Grievance[]>(grievancesData as Grievance[]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCitizenId, setSelectedCitizenId] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const CATEGORIES = [
    'DATA_INACCURACY', 'BENEFIT_DENIAL', 'ID_CARD_ISSUE',
    'PRIVACY_VIOLATION', 'SYSTEM_ACCESS', 'OTHER'
  ];

  // Join with citizen names
  const grievancesWithNames = grievances.map(grv => {
    const citizen = citizensData.find(c => c.id === grv.citizen_id);
    return {
      ...grv,
      citizen_name: citizen ? citizen.name_en : 'Unknown Citizen',
      citizen_name_np: citizen ? citizen.name_np : '',
    };
  });

  const filteredGrievances = grievancesWithNames
    .filter(g => {
      const matchesSearch =
        g.citizen_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.tracking_code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'ALL' || g.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => new Date(b.filed_at).getTime() - new Date(a.filed_at).getTime());

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      RECEIVED: 'bg-blue-100 text-blue-800 border-blue-200',
      IN_PROGRESS: 'bg-amber-100 text-amber-800 border-amber-200',
      RESOLVED_WARD: 'bg-green-100 text-green-800 border-green-200',
      REFERRED_JUDICIAL: 'bg-orange-100 text-orange-800 border-orange-200',
      CLOSED: 'bg-gray-100 text-gray-600 border-gray-200',
    };
    return styles[status] || 'bg-gray-100 text-gray-600 border-gray-200';
  };

  const generateTrackingCode = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(100000 + Math.random() * 900000);
    return `GRV-${year}-${random}`;
  };

  const handleSubmitGrievance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCitizenId || !category || !description) return;

    const citizen = citizensData.find(c => c.id === selectedCitizenId);

    const newGrievance: Grievance = {
      id: `grv-${Date.now()}`,
      tracking_code: generateTrackingCode(),
      citizen_id: selectedCitizenId,
      category,
      status: 'RECEIVED',
      filed_at: new Date().toISOString(),
      escalation_level: 'WARD'
    };

    setGrievances(prev => [newGrievance, ...prev]);
    setIsModalOpen(false);

    // Reset form
    setSelectedCitizenId('');
    setCategory('');
    setDescription('');

    alert(`✅ Grievance filed successfully!\n\nTracking Code: ${newGrievance.tracking_code}`);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Grievances</h1>
          <p className="text-gray-500 mt-1">Citizen complaints and feedback management</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2"
        >
          + File New Grievance
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or tracking code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="ALL">All Status</option>
          <option value="RECEIVED">Received</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="RESOLVED_WARD">Resolved by Ward</option>
          <option value="REFERRED_JUDICIAL">Referred to Judicial</option>
          <option value="CLOSED">Closed</option>
        </select>
      </div>

      {/* Grievances Table */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-4 text-left">Tracking Code</th>
              <th className="px-6 py-4 text-left">Citizen Name</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">Filed Date</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredGrievances.map((grievance) => (
              <tr key={grievance.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-5 font-mono font-medium text-sm">{grievance.tracking_code}</td>
                <td className="px-6 py-5 font-medium">
                  {grievance.citizen_name}
                </td>
                <td className="px-6 py-5">
                  <span className="text-sm capitalize">
                    {grievance.category.replace('_', ' ').toLowerCase()}
                  </span>
                </td>
                <td className="px-6 py-5 text-gray-600">
                  {new Date(grievance.filed_at).toLocaleDateString('en-IN')}
                </td>
                <td className="px-6 py-5">
                  <span className={`inline-flex px-4 py-1 text-xs font-medium rounded-full border ${getStatusBadge(grievance.status)}`}>
                    {grievance.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <button className="text-blue-600 hover:underline text-sm font-medium">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Grievance Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-6">File New Grievance</h2>

            <form onSubmit={handleSubmitGrievance} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Select Citizen</label>
                <select
                  value={selectedCitizenId}
                  onChange={(e) => setSelectedCitizenId(e.target.value)}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Citizen...</option>
                  {citizensData.map((citizen: any) => (
                    <option key={citizen.id} value={citizen.id}>
                      {citizen.name_en} — {citizen.name_np}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category...</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={5}
                  placeholder="Please describe the grievance in detail..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium"
                >
                  Submit Grievance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
