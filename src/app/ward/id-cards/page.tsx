'use client';

import { useState} from 'react';
import idCardsData from '../../../../data/id-cards.json';
import citizensData from '../../../../data/citizens.json';

interface IdCard {
  id: string;
  citizen_id: string;
  card_type: string;
  status: string;
  issued_at: string | null;
  expires_at: string | null;
  collected_at: string | null;
}

interface Citizen {
  id: string;
  name_en: string;
  name_np: string;
}

export default function IdCardsPage() {
  const [idCards, setIdCards] = useState<IdCard[]>(idCardsData);
  const [citizens] = useState<Citizen[]>(citizensData);
  const [filterType, setFilterType] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCitizenId, setSelectedCitizenId] = useState('');
  const [selectedCardType, setSelectedCardType] = useState('');

  const cardTypes = ['FARMER', 'SENIOR_CITIZEN', 'SINGLE_WOMAN', 'UNEMPLOYMENT', 'DISABILITY'];

  // Join ID Cards with Citizen info
  const cardsWithNames = idCards.map(card => {
    const citizen = citizens.find(c => c.id === card.citizen_id);
    return {
      ...card,
      citizenName: citizen ? citizen.name_en : 'Unknown Citizen',
      citizenNameNp: citizen ? citizen.name_np : '',
    };
  });

  const filteredCards = cardsWithNames.filter(card => {
    const typeMatch = filterType === 'ALL' || card.card_type === filterType;
    const statusMatch = filterStatus === 'ALL' || card.status === filterStatus;
    return typeMatch && statusMatch;
  });

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      PENDING_APPROVAL: 'bg-amber-100 text-amber-800 border-amber-200',
      APPROVED: 'bg-green-100 text-green-800 border-green-200',
      COLLECTED: 'bg-teal-100 text-teal-800 border-teal-200',
      EXPIRED: 'bg-gray-100 text-gray-600 border-gray-200',
      REVOKED: 'bg-red-100 text-red-800 border-red-200',
      PENDING: 'bg-amber-100 text-amber-800 border-amber-200',
    };
    return styles[status] || 'bg-gray-100 text-gray-600 border-gray-200';
  };

  const handleInitiateCard = () => {
    if (!selectedCitizenId || !selectedCardType) return;

    const newCard: IdCard = {
      id: `card-${Date.now()}`,
      citizen_id: selectedCitizenId,
      card_type: selectedCardType,
      status: 'PENDING_APPROVAL',
      issued_at: null,
      expires_at: null,
      collected_at: null,
    };

    setIdCards(prev => [...prev, newCard]);
    setIsModalOpen(false);
    setSelectedCitizenId('');
    setSelectedCardType('');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ward ID Cards</h1>
          <p className="text-gray-500 mt-1">Manage citizen identity cards</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition"
        >
          + Initiate New ID Card
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1.5 text-gray-600">Card Type</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2.5 bg-white text-black focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Types</option>
            {cardTypes.map(type => (
              <option key={type} value={type}>{type.replace('_', ' ')}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5 text-gray-600">Status</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2.5 bg-white text-black focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Status</option>
            <option value="PENDING_APPROVAL">Pending Approval</option>
            <option value="APPROVED">Approved</option>
            <option value="COLLECTED">Collected</option>
            <option value="EXPIRED">Expired</option>
            <option value="REVOKED">Revoked</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-4 text-left font-medium text-gray-600">Citizen Name</th>
              <th className="px-6 py-4 text-left font-medium text-gray-600">Card Type</th>
              <th className="px-6 py-4 text-left font-medium text-gray-600">Status</th>
              <th className="px-6 py-4 text-left font-medium text-gray-600">Issued Date</th>
              <th className="px-6 py-4 text-left font-medium text-gray-600">Expiry Date</th>
              <th className="px-6 py-4 text-left font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredCards.map((card) => (
              <tr key={card.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-5 font-medium">
                  {card.citizenName}
                  {card.citizenNameNp && (
                    <span className="block text-sm text-gray-500 mt-0.5">
                      {card.citizenNameNp}
                    </span>
                  )}
                </td>
                <td className="px-6 py-5">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                    {card.card_type.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border ${getStatusBadge(card.status)}`}>
                    {card.status.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="px-6 py-5 text-gray-600">
                  {card.issued_at ? new Date(card.issued_at).toLocaleDateString('en-IN') : '—'}
                </td>
                <td className="px-6 py-5 text-gray-600">
                  {card.expires_at ? new Date(card.expires_at).toLocaleDateString('en-IN') : '—'}
                </td>
                <td className="px-6 py-5">
                  <div className="flex gap-4 text-sm">
                    <button className="text-blue-600 hover:text-blue-700 font-medium">View</button>
                    <button className="text-red-600 hover:text-red-700 font-medium">Revoke</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Initiate Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-2xl w-full max-w-md p-8">
            <h2 className="text-2xl font-semibold mb-6">Initiate New ID Card</h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">Select Citizen</label>
                <select
                  value={selectedCitizenId}
                  onChange={(e) => setSelectedCitizenId(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Citizen...</option>
                  {citizens.map(citizen => (
                    <option key={citizen.id} value={citizen.id}>
                      {citizen.name_en} — {citizen.name_np}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Card Type</label>
                <select
                  value={selectedCardType}
                  onChange={(e) => setSelectedCardType(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Type...</option>
                  {cardTypes.map(type => (
                    <option key={type} value={type}>{type.replace('_', ' ')}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 border border-gray-200 rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleInitiateCard}
                disabled={!selectedCitizenId || !selectedCardType}
                className="flex-1 py-3 bg-blue-600 text-white rounded-xl disabled:opacity-50 hover:bg-blue-700"
              >
                Initiate Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
