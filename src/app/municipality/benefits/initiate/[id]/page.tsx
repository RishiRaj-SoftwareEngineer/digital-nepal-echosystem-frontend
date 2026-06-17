"use client";

import citizensData from "../../../../../../data/citizens.json";
import { Citizen } from "@/types/citizen";

const citizens = citizensData as Citizen[];

import { useParams } from "next/navigation";

export default function InitiatePage() {
  const params = useParams();

  const id = params.id as string;
  {
    const handleInitiate = () => {
      alert("ID Card Initiated");
    };

    const citizen = citizens.find((c) => c.id === params.id);

    if (!citizen) {
      return <div>Citizen not found</div>;
    }
    const getAge = (dob: string) => {
      const birthDate = new Date(dob);
      const today = new Date();

      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age;
    };
    const age = getAge(citizen.dob);
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Initiate ID Card</h1>

        <div className="border p-4 rounded">
          <p>
            Name:
            {citizen.name_en}
          </p>

          <p>
            Ward:
            {citizen.ward_id}
          </p>

          <p>
            Age:
            {age}
          </p>

          <p>
            Current Status:
            {
              // citizen.hasCard
              //     ? "Has Card"
              //     : "No Card"
              "No Card"
            }
          </p>
          {/* Citizens JSON ma hasCard vana xaina */}
        </div>

        <select className="border p-2 mt-4">
          <option>SENIOR CITIZEN</option>

          <option>DISABILITY</option>

          <option>UNEMPLOYMENT</option>
        </select>

        <button
          className="bg-blue-600 text-white px-4 py-2 mt-4"
          onClick={handleInitiate}
        >
          Initiate
        </button>
      </div>
    );
  }
}
