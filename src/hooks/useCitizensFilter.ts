import { useState, useMemo } from 'react';
import type { Citizen } from '@/types/citizen';
import citizensRaw from '../../data/citizens.json';
import { WARD_ID } from '@/constants';

const citizens = citizensRaw as unknown as Citizen[];

export function useCitizensFilter() {
  const wardCitizens = useMemo(
    () => citizens.filter((c: Citizen) => c.ward_id === WARD_ID),
    [],
  );

  const [search, setSearch] = useState('');
  const [nidSearch, setNidSearch] = useState('');
  const [employmentFilter, setEmploymentFilter] = useState('');
  const [syncFilter, setSyncFilter] = useState('');
  const [sexFilter, setSexFilter] = useState('');
  const [verifiedFilter, setVerifiedFilter] = useState('');

  const filtered = useMemo(() => {
    return wardCitizens.filter((c: Citizen) => {
      if (search) {
        const q = search.toLowerCase();
        if (
          !c.name_np.toLowerCase().includes(q) &&
          !c.name_en.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      if (nidSearch && !c.nid_masked.endsWith(nidSearch)) {
        return false;
      }
      if (employmentFilter && c.employment_category !== employmentFilter) {
        return false;
      }
      if (syncFilter && c.sync_status !== syncFilter) {
        return false;
      }
      if (sexFilter && c.sex !== sexFilter) {
        return false;
      }
      if (verifiedFilter === 'verified' && !c.nid_verified) {
        return false;
      }
      if (verifiedFilter === 'unverified' && c.nid_verified) {
        return false;
      }
      return true;
    });
  }, [wardCitizens, search, nidSearch, employmentFilter, syncFilter, sexFilter, verifiedFilter]);

  return {
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
  };
}
