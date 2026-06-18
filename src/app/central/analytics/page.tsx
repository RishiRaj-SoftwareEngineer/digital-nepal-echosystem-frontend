"use client";

import { useMemo } from "react";

// Data dumps from the legacy system extraction
import citizens from "../../../../data/citizens.json";
import employment from "../../../../data/employment.json";
import disability from "../../../../data/disability.json";
import education from "../../../../data/education.json";
import provinces from "../../../../data/provinces.json";
import wards from "../../../../data/wards.json";

// Shared data shapes for the linter contracts
interface Province {
  id: string;
  name_en: string;
}
interface Ward {
  id: string;
  ward_no: number;
}
interface Citizen {
  id: string;
  ward_id: string;
  sex: string;
  dob: string;
  digital_literacy: string;
  has_smartphone: boolean;
}
interface Employment {
  citizen_id: string;
  category: string;
  income_band: string;
  sub_fields?: { country_code?: string };
}
interface Education {
  citizen_id: string;
  level: string;
  study_location_ward_id: string;
  is_dropped_out: boolean;
  scholarship?: { is_receiving: boolean };
}
interface Disability {
  citizen_id: string;
  disability_type?: string;
  severity_body?: number;
  certificate_no?: string | null;
}

// Display lookup dictionaries for UI strings
const mappings = {
  literacy: {
    NONE: "No Literacy",
    BASIC: "Basic Literacy",
    INTERMEDIATE: "Intermediate Literacy",
    ADVANCED: "Advanced Literacy",
  } as Record<string, string>,
  sex: { MALE: "Male", FEMALE: "Female", OTHER: "Other" } as Record<
    string,
    string
  >,
  disabilityType: {
    NONE: "No Disability",
    PHYSICAL: "Physical Impairment",
    VISUAL: "Visual Impairment",
    HEARING: "Hearing Impairment",
    COGNITIVE: "Cognitive Impairment",
    PSYCHOSOCIAL: "Psychosocial Disability",
  } as Record<string, string>,
  severity: {
    0: "No Disability",
    1: "Mild",
    2: "Moderate",
    3: "Severe",
  } as Record<number, string>,
  income: {
    UNDER_5K: "Below Rs 5,000",
    "10K_25K": "Rs 10,000 – Rs 25,000",
    "25K_50K": "Rs 25,000 – Rs 50,000",
    "50K_100K": "Rs 50,000 – Rs 100,000",
  } as Record<string, string>,
  
  education: {
    NO_FORMAL: "No Formal Education",
    "No Formal Education": "No Formal Education",
    BASIC_1_5: "Basic Education (Class 1-5)",
    BASIC_6_8: "Basic Education (Class 6-8)",
    SECONDARY_9_10: "Secondary Education (Class 9-10)",
    HIGHER_SECONDARY_11_12: "Higher Secondary (Class 11-12)",
    TECHNICAL_CERTIFICATE: "Technical Certificate / Diploma",
    BACHELOR: "Bachelor's Degree",
    BACHELOR4: "Bachelor's Degree",
    MASTER: "Master's Degree",
    PhD: "PhD",
  } as Record<string, string>,
  countries: {
    MY: "Malaysia",
    QA: "Qatar",
    SA: "Saudi Arabia",
    AE: "United Arab Emirates",
    KW: "Kuwait",
    BH: "Bahrain",
    OM: "Oman",
    KR: "South Korea",
    JP: "Japan",
    CY: "Cyprus",
    UNKNOWN: "Not Specified",
  } as Record<string, string>,
};

// Shorthand helper for basic age brackets
const getAgeGroup = (dob: string) => {
  const age = new Date().getFullYear() - new Date(dob).getFullYear();
  if (age <= 18) return "0-18";
  if (age <= 35) return "19-35";
  if (age <= 60) return "36-60";
  return "60+";
};

// Base layout shell for tables to keep styling dry
const TableShell = ({ children }: { children: React.ReactNode }) => (
  <div className="overflow-x-auto shadow rounded border">
    <table className="w-full bg-white border-collapse text-sm">
      {children}
    </table>
  </div>
);

export default function AnalyticsPage() {
  // Explicitly casting the json imports here to avoid the ESLint "any" build failures
  const rawProvinces = provinces as Province[];
  const rawWards = wards as Ward[];
  const rawCitizens = citizens as Citizen[];
  const rawEmployment = employment as Employment[];
  const rawEducation = education as Education[];
  const rawDisability = disability as Disability[];

  // Map out lookups beforehand to prevent expensive nested O(N^2) searches inside metric loops
  const { citizenToProvince, wardToProvince } = useMemo(() => {
    const wardMap: Record<string, string> = {};
    rawWards.forEach((w) => {
      // NOTE: Current dataset only defaults to Koshi Province mapping structure ("ward-0...")
      wardMap[w.id] = w.id.startsWith("ward-0") ? "prov-1" : "unknown";
    });

    const citizenMap: Record<string, string> = {};
    rawCitizens.forEach((c) => {
      citizenMap[c.id] = wardMap[c.ward_id] || "unknown";
    });

    return { citizenToProvince: citizenMap, wardToProvince: wardMap };
  }, [rawWards, rawCitizens]);

  // Aggregate Demographics Breakdowns
  const demoMetrics = useMemo(() => {
    const sex = { MALE: 0, FEMALE: 0, OTHER: 0 } as Record<string, number>;
    const literacy = {
      NONE: 0,
      BASIC: 0,
      INTERMEDIATE: 0,
      ADVANCED: 0,
    } as Record<string, number>;
    const age = { "0-18": 0, "19-35": 0, "36-60": 0, "60+": 0 } as Record<
      string,
      number
    >;
    let totalSmartphones = 0;

    const geoCounts: Record<string, { total: number; smart: number }> = {};
    rawProvinces.forEach((p) => {
      geoCounts[p.id] = { total: 0, smart: 0 };
    });

    rawCitizens.forEach((c) => {
      sex[c.sex] = (sex[c.sex] || 0) + 1;
      literacy[c.digital_literacy] = (literacy[c.digital_literacy] || 0) + 1;

      const bracket = getAgeGroup(c.dob);
      if (age[bracket] !== undefined) age[bracket]++;
      if (c.has_smartphone) totalSmartphones++;

      const provId = citizenToProvince[c.id];
      if (geoCounts[provId]) {
        geoCounts[provId].total++;
        if (c.has_smartphone) geoCounts[provId].smart++;
      }
    });

    return {
      sex,
      literacy,
      age,
      nationalSmartRate: (
        (totalSmartphones / (rawCitizens.length || 1)) *
        100
      ).toFixed(1),
      regional: rawProvinces.map((p) => {
        const chunk = geoCounts[p.id] || { total: 0, smart: 0 };
        return {
          name: p.name_en,
          total: chunk.total,
          count: chunk.smart,
          rate: ((chunk.smart / (chunk.total || 1)) * 100).toFixed(1),
        };
      }),
    };
  }, [citizenToProvince, rawProvinces, rawCitizens]);

  // Aggregate Labor Force Data
  const jobMetrics = useMemo(() => {
    const categories: Record<string, number> = {};
    const brackets: Record<string, number> = {};
    const passportDestinations: Record<string, number> = {};

    const geoCounts: Record<
      string,
      { totalForce: number; unemployed: number }
    > = {};
    rawProvinces.forEach((p) => {
      geoCounts[p.id] = { totalForce: 0, unemployed: 0 };
    });

    rawEmployment.forEach((e) => {
      categories[e.category] = (categories[e.category] || 0) + 1;
      brackets[e.income_band] = (brackets[e.income_band] || 0) + 1;

      if (e.category === "FOREIGN_ABROAD") {
        const dest = e.sub_fields?.country_code || "UNKNOWN";
        passportDestinations[dest] = (passportDestinations[dest] || 0) + 1;
      }

      const provId = citizenToProvince[e.citizen_id];
      if (geoCounts[provId]) {
        geoCounts[provId].totalForce++;
        if (e.category === "UNEMPLOYED") geoCounts[provId].unemployed++;
      }
    });

    const topDestinations = Object.entries(passportDestinations)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    return {
      categories,
      brackets,
      topDestinations,
      regional: rawProvinces.map((p) => {
        const chunk = geoCounts[p.id] || { totalForce: 0, unemployed: 0 };
        return {
          name: p.name_en,
          total: chunk.totalForce,
          count: chunk.unemployed,
          rate: ((chunk.unemployed / (chunk.totalForce || 1)) * 100).toFixed(1),
        };
      }),
    };
  }, [citizenToProvince, rawProvinces, rawEmployment]);

  // Aggregate Academic Enrollment and Attrition
  const educationMetrics = useMemo(() => {
    const distribution: Record<string, number> = {};
    let activeGrants = 0;

    const geoCounts: Record<string, { total: number; dropouts: number }> = {};
    rawProvinces.forEach((p) => {
      geoCounts[p.id] = { total: 0, dropouts: 0 };
    });

    rawEducation.forEach((e) => {
      distribution[e.level] = (distribution[e.level] || 0) + 1;
      if (e.scholarship?.is_receiving) activeGrants++;

      const provId = wardToProvince[e.study_location_ward_id];
      if (geoCounts[provId]) {
        geoCounts[provId].total++;
        if (e.is_dropped_out) geoCounts[provId].dropouts++;
      }
    });

    return {
      distribution,
      scholarshipRate: (
        (activeGrants / (rawEducation.length || 1)) *
        100
      ).toFixed(1),
      regional: rawProvinces.map((p) => {
        const chunk = geoCounts[p.id] || { total: 0, dropouts: 0 };
        return {
          name: p.name_en,
          total: chunk.total,
          count: chunk.dropouts,
          rate: ((chunk.dropouts / (chunk.total || 1)) * 100).toFixed(1),
        };
      }),
    };
  }, [wardToProvince, rawProvinces, rawEducation]);

  // Aggregate Disability Demographics
  const healthMetrics = useMemo(() => {
    const types: Record<string, number> = {};
    const levelCounts: Record<number, number> = {};
    let totalCardsWithIds = 0;

    const geoCounts: Record<string, { total: number; certified: number }> = {};
    rawProvinces.forEach((p) => {
      geoCounts[p.id] = { total: 0, certified: 0 };
    });

    rawDisability.forEach((d) => {
      const condition = d.disability_type || "NONE";
      types[condition] = (types[condition] || 0) + 1;

      const scale = d.severity_body ?? 0;
      levelCounts[scale] = (levelCounts[scale] || 0) + 1;

      if (d.certificate_no) totalCardsWithIds++;

      const provId = citizenToProvince[d.citizen_id];
      if (geoCounts[provId]) {
        geoCounts[provId].total++;
        if (d.certificate_no) geoCounts[provId].certified++;
      }
    });

    return {
      types,
      levelCounts,
      idCardCoverage: (
        (totalCardsWithIds / (rawDisability.length || 1)) *
        100
      ).toFixed(1),
      regional: rawProvinces.map((p) => {
        const chunk = geoCounts[p.id] || { total: 0, certified: 0 };
        return {
          name: p.name_en,
          total: chunk.total,
          count: chunk.certified,
          rate: ((chunk.certified / (chunk.total || 1)) * 100).toFixed(1),
        };
      }),
    };
  }, [citizenToProvince, rawProvinces, rawDisability]);

  return (
    <div className="p-6 space-y-10 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900">
        National Analytics Dashboard
      </h1>

      {/* Demographics View Wrapper */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-1 text-gray-800">
          Demographics
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TableShell>
            <tbody className="divide-y text-gray-700">
              <tr className="bg-gray-100 font-bold text-gray-900">
                <td colSpan={2} className="p-3">
                  Sex Distribution
                </td>
              </tr>
              {Object.entries(demoMetrics.sex).map(([k, v]) => (
                <tr key={k}>
                  <td className="p-3 pl-6">{mappings.sex[k] || k}</td>
                  <td className="p-3">{v}</td>
                </tr>
              ))}
              <tr className="bg-gray-100 font-bold text-gray-900">
                <td colSpan={2} className="p-3">
                  Age Band Distribution
                </td>
              </tr>
              {Object.entries(demoMetrics.age).map(([k, v]) => (
                <tr key={k}>
                  <td className="p-3 pl-6">Age Group {k}</td>
                  <td className="p-3">{v}</td>
                </tr>
              ))}
              <tr className="bg-gray-100 font-bold text-gray-900">
                <td colSpan={2} className="p-3">
                  Digital Literacy
                </td>
              </tr>
              {Object.entries(demoMetrics.literacy).map(([k, v]) => (
                <tr key={k}>
                  <td className="p-3 pl-6">{mappings.literacy[k] || k}</td>
                  <td className="p-3">{v}</td>
                </tr>
              ))}
              <tr className="font-semibold bg-gray-100 text-gray-900">
                <td className="p-3">Smartphone Ownership</td>
                <td className="p-3">{demoMetrics.nationalSmartRate}%</td>
              </tr>
            </tbody>
          </TableShell>

          <div>
            <h3 className="font-semibold mb-2 text-gray-700">
              Smartphone Ownership by Province
            </h3>
            <TableShell>
              <thead className="bg-gray-100 border-b text-gray-900 font-bold">
                <tr>
                  <th className="p-3 text-left">Province</th>
                  <th className="p-3 text-left">Total Sample</th>
                  <th className="p-3 text-left">Owners</th>
                  <th className="p-3 text-left">Ownership %</th>
                </tr>
              </thead>
              <tbody className="divide-y text-gray-700">
                {demoMetrics.regional.map((p) => (
                  <tr key={p.name}>
                    <td className="p-3 font-medium text-gray-900">{p.name}</td>
                    <td className="p-3">{p.total}</td>
                    <td className="p-3">{p.count}</td>
                    <td className="p-3">{p.rate}%</td>
                  </tr>
                ))}
              </tbody>
            </TableShell>
          </div>
        </div>
      </section>

      {/* Labor Force View Wrapper */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-1 text-gray-800">
          Employment
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <TableShell>
              <tbody className="divide-y text-gray-700">
                <tr className="bg-gray-100 font-bold text-gray-900">
                  <td colSpan={2} className="p-3">
                    Employment Categories
                  </td>
                </tr>
                {Object.entries(jobMetrics.categories).map(([k, v]) => (
                  <tr key={k}>
                    <td className="p-3 pl-6">{k}</td>
                    <td className="p-3">{v}</td>
                  </tr>
                ))}
                <tr className="bg-gray-100 font-bold text-gray-900">
                  <td colSpan={2} className="p-3">
                    Income Distribution
                  </td>
                </tr>
                {Object.entries(jobMetrics.brackets).map(([k, v]) => (
                  <tr key={k}>
                    <td className="p-3 pl-6">{mappings.income[k] || k}</td>
                    <td className="p-3">{v}</td>
                  </tr>
                ))}
              </tbody>
            </TableShell>

            <div>
              <h3 className="font-semibold mb-2 text-gray-700">
                Top Foreign Countries
              </h3>
              <TableShell>
                <tbody className="divide-y text-gray-700">
                  {jobMetrics.topDestinations.map(([k, v]) => (
                    <tr key={k}>
                      <td className="p-3 pl-4">
                        {mappings.countries[k.toUpperCase()] || k}
                      </td>
                      <td className="p-3">{v} workers</td>
                    </tr>
                  ))}
                </tbody>
              </TableShell>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-gray-700">
              Unemployment Rate by Province
            </h3>
            <TableShell>
              <thead className="bg-gray-100 border-b text-gray-900 font-bold">
                <tr>
                  <th className="p-3 text-left">Province</th>
                  <th className="p-3 text-left">Total Labor Force</th>
                  <th className="p-3 text-left">Unemployed</th>
                  <th className="p-3 text-left">Unemployment Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y text-gray-700">
                {jobMetrics.regional.map((p) => (
                  <tr key={p.name}>
                    <td className="p-3 font-medium text-gray-900">{p.name}</td>
                    <td className="p-3">{p.total}</td>
                    <td className="p-3">{p.count}</td>
                    <td className="p-3">{p.rate}%</td>
                  </tr>
                ))}
              </tbody>
            </TableShell>
          </div>
        </div>
      </section>

      {/* Academic Development View Wrapper */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-1 text-gray-800">
          Education
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TableShell>
            <tbody className="divide-y text-gray-700">
              <tr className="bg-gray-100 font-bold text-gray-900">
                <td colSpan={2} className="p-3">
                  Education Level Distribution
                </td>
              </tr>
              {Object.entries(educationMetrics.distribution).map(([k, v]) => (
                <tr key={k}>
                  <td className="p-3 pl-6">{mappings.education[k] || k}</td>
                  <td className="p-3">{v}</td>
                </tr>
              ))}
              <tr className="font-semibold bg-gray-100 text-gray-900">
                <td className="p-3">Scholarship Coverage</td>
                <td className="p-3">{educationMetrics.scholarshipRate}%</td>
              </tr>
            </tbody>
          </TableShell>

          <div>
            <h3 className="font-semibold mb-2 text-gray-700">
              Dropout by Province
            </h3>
            <TableShell>
              <thead className="bg-gray-100 border-b text-gray-900 font-bold">
                <tr>
                  <th className="p-3 text-left">Province</th>
                  <th className="p-3 text-left">Total Enrolled</th>
                  <th className="p-3 text-left">Dropouts</th>
                  <th className="p-3 text-left">Dropout Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y text-gray-700">
                {educationMetrics.regional.map((p) => (
                  <tr key={p.name}>
                    <td className="p-3 font-medium text-gray-900">{p.name}</td>
                    <td className="p-3">{p.total}</td>
                    <td className="p-3">{p.count}</td>
                    <td className="p-3">{p.rate}%</td>
                  </tr>
                ))}
              </tbody>
            </TableShell>
          </div>
        </div>
      </section>

      {/* Disability Support Systems View Wrapper */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-1 text-gray-800">
          Disability
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TableShell>
            <tbody className="divide-y text-gray-700">
              <tr className="bg-gray-100 font-bold text-gray-900">
                <td colSpan={2} className="p-3">
                  Disability Type Distribution
                </td>
              </tr>
              {Object.entries(healthMetrics.types).map(([k, v]) => (
                <tr key={k}>
                  <td className="p-3 pl-6">
                    {mappings.disabilityType[k] || k}
                  </td>
                  <td className="p-3">{v}</td>
                </tr>
              ))}
              <tr className="bg-gray-100 font-bold text-gray-900">
                <td colSpan={2} className="p-3">
                  Severity Level Distribution
                </td>
              </tr>
              {Object.entries(healthMetrics.levelCounts).map(([k, v]) => (
                <tr key={k}>
                  <td className="p-3 pl-6">
                    {mappings.severity[Number(k)] || k}
                  </td>
                  <td className="p-3">{v}</td>
                </tr>
              ))}
              <tr className="font-semibold bg-gray-100 text-gray-900">
                <td className="p-3">
                  Official Identity Card Registration Rate
                </td>
                <td className="p-3">{healthMetrics.idCardCoverage}%</td>
              </tr>
            </tbody>
          </TableShell>

          <div>
            <h3 className="font-semibold mb-2 text-gray-700">
              Official Registration Coverage by Province
            </h3>
            <TableShell>
              <thead className="bg-gray-100 border-b text-gray-900 font-bold">
                <tr>
                  <th className="p-3 text-left">Province</th>
                  <th className="p-3 text-left">
                    Total People with Disabilities
                  </th>
                  <th className="p-3 text-left">Registered Identity Cards</th>
                  <th className="p-3 text-left">Official Registration Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y text-gray-700">
                {healthMetrics.regional.map((p) => (
                  <tr key={p.name}>
                    <td className="p-3 font-medium text-gray-900">{p.name}</td>
                    <td className="p-3">{p.total}</td>
                    <td className="p-3">{p.count}</td>
                    <td className="p-3">{p.rate}%</td>
                  </tr>
                ))}
              </tbody>
            </TableShell>
          </div>
        </div>
      </section>
    </div>
  );
}
