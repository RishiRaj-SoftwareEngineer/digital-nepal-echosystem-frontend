'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import idCardsData from '../../../../../data/id-cards.json';
import citizensData from '../../../../../data/citizens.json';

interface IdCard {
  id: string;
  citizen_id: string;
  card_type: string;
  status: string;
  qr_hash: string;
  issued_at: string | null;
  expires_at: string | null;
  collected_at: string | null;
}

interface Citizen {
  id: string;
  name_en: string;
  name_np: string;
  nid_masked: string;
  sex: string;
  dob: string;
  tole: string;
}

const LIFECYCLE_STEPS = [
  "INITIATED",
  "PENDING_APPROVAL",
  "PDF_GENERATION",
  "QR_SIGNED",
  "SMS_PENDING",
  "APPROVED",
  "COLLECTED"
] as const;

export default function IdCardDetailPage() {
  const params = useParams();
  const router = useRouter();
  const cardId = params.id as string;

  const [card, setCard] = useState<IdCard | null>(null);
  const [citizen, setCitizen] = useState<Citizen | null>(null);
  const [currentStatus, setCurrentStatus] = useState<string>("");

  // Load card and citizen data
  useEffect(() => {
    const foundCard = idCardsData.find((c: any) => c.id === cardId) as IdCard | undefined;

    if (foundCard) {
      setCard(foundCard);
      setCurrentStatus(foundCard.status);

      const foundCitizen = citizensData.find((c: any) => c.id === foundCard.citizen_id) as Citizen | undefined;
      setCitizen(foundCitizen || null);
    } else {
      // Fallback
      alert("ID Card not found");
      router.push('/id-cards');
    }
  }, [cardId, router]);

  const currentStepIndex = LIFECYCLE_STEPS.findIndex(step => step === currentStatus);

  const handleCollect = () => {
    if (!card) return;

    const updatedCard = {
      ...card,
      status: "COLLECTED" as const,
      collected_at: new Date().toISOString()
    };

    setCard(updatedCard);
    setCurrentStatus("COLLECTED");

    alert("ID Card marked as COLLECTED successfully!");
  };

  const maskQrHash = (hash: string) => {
    if (!hash) return '—';
    return hash.slice(0, 6) + '••••••' + hash.slice(-4);
  };

  if (!card || !citizen) {
    return <div className="p-8 text-center">Loading ID Card...</div>;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">ID Card Detail</h1>
          <p className="text-gray-500">Card ID: <span className="font-mono">{card.id}</span></p>
        </div>
        <button
          onClick={() => router.push('/id-cards')}
          className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
        >
          ← Back to List
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Citizen & Card Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-8">
            <h2 className="text-xl font-semibold mb-6">Citizen Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6">
              <div>
                <p className="text-sm text-gray-500">Name (English)</p>
                <p className="font-medium text-lg">{citizen.name_en}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Name (Nepali)</p>
                <p className="font-medium text-lg">{citizen.name_np}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">NID Number</p>
                <p className="font-mono">{citizen.nid_masked}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Card Type</p>
                <p className="inline-block px-4 py-1 bg-gray-100 rounded-full text-sm font-medium">
                  {card.card_type.replace('_', ' ')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tole / Area</p>
                <p>{citizen.tole}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p>{citizen.dob}</p>
              </div>
            </div>
          </div>

          {/* QR & Dates */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8">
            <h2 className="text-xl font-semibold mb-6">Card Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">QR Hash</p>
                <p className="font-mono text-sm break-all">{maskQrHash(card.qr_hash)}</p>
                <Link
                  href={`/verify/${card.qr_hash}`}
                  className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                >
                  Verify Card →
                </Link>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Issued Date</p>
                  <p className="font-medium">{card.issued_at ? new Date(card.issued_at).toLocaleDateString() : 'Not Issued'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Expiry Date</p>
                  <p className="font-medium">{card.expires_at ? new Date(card.expires_at).toLocaleDateString() : 'Not Set'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Collected Date</p>
                  <p className="font-medium">{card.collected_at ? new Date(card.collected_at).toLocaleDateString() : 'Not Collected'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Actions</h3>

            {currentStatus === 'APPROVED' && (
              <button
                onClick={handleCollect}
                className="w-full mb-3 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium"
              >
                ✓ Mark as Collected
              </button>
            )}

            <button className="w-full py-3 border border-gray-200 hover:bg-gray-50 rounded-xl font-medium">
              ⬇ Download PDF
            </button>

            <button className="w-full mt-3 py-3 border border-gray-200 hover:bg-gray-50 rounded-xl font-medium text-red-600">
              Revoke Card
            </button>
          </div>
        </div>
      </div>

      {/* Lifecycle Status Tracker */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-6">ID Card Lifecycle Status</h2>
        <div className="bg-white border border-gray-100 rounded-2xl p-8">
          <div className="relative flex justify-between">
            {LIFECYCLE_STEPS.map((step, index) => {
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;
              const isUpcoming = index > currentStepIndex;

              return (
                <div key={step} className="flex flex-col items-center relative z-10 w-1/7">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full border-4 transition-all
                    ${isCompleted ? 'bg-green-500 border-green-500 text-white' : ''}
                    ${isCurrent ? 'bg-blue-600 border-blue-600 text-white ring-4 ring-blue-100' : ''}
                    ${isUpcoming ? 'bg-gray-100 border-gray-300' : ''}
                  `}>
                    {isCompleted ? '✓' : index + 1}
                  </div>
                  <p className={`text-xs text-center mt-3 font-medium max-w-[90px]
                    ${isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-700' : 'text-gray-500'}
                  `}>
                    {step.replace(/_/g, ' ')}
                  </p>
                </div>
              );
            })}

            {/* Connecting Line */}
            <div className="absolute top-5 left-0 right-0 h-[3px] bg-gray-200 -z-10" />
            <div
              className="absolute top-5 left-0 h-[3px] bg-green-500 transition-all duration-500"
              style={{ width: `${(currentStepIndex / (LIFECYCLE_STEPS.length - 1)) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
